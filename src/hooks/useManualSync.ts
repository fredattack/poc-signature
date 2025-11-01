// Manual sync hook for triggering cloud synchronization

import { useCallback, useState } from 'react';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAuthStore } from '@/store/auth-store';
import {
  signatureSyncService,
  SyncResult,
} from '@/services/sync/signature-sync';
import { useAnalytics } from './useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';

export interface UseManualSyncResult {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  syncError: string | null;
  triggerSync: () => Promise<SyncResult | null>;
  canSync: boolean;
}

export const useManualSync = (): UseManualSyncResult => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const { getAll, updateSignature } = useSignaturesStore();
  const { isAuthenticated } = useAuthStore();
  const { track } = useAnalytics();

  const canSync = isAuthenticated && !isSyncing;

  const triggerSync = useCallback(async (): Promise<SyncResult | null> => {
    if (!isAuthenticated) {
      setSyncError('You must be logged in to sync');
      return null;
    }

    if (isSyncing) {
      return null;
    }

    setIsSyncing(true);
    setSyncError(null);

    track(ANALYTICS_EVENTS.SYNC_TRIGGERED, {
      signature_count: getAll().length,
    });

    try {
      const signatures = getAll();

      // Sync pending signatures to cloud
      const result = await signatureSyncService.syncPending(signatures);

      if (result.success) {
        // Mark synced signatures
        const syncedSignatures = signatures.filter(
          (sig) => !result.failedSignatures.includes(sig.id)
        );

        for (const sig of syncedSignatures) {
          await updateSignature(sig.id, {
            syncStatus: 'synced' as any,
            cloudImageUrl: `https://cdn.signature-app.com/${sig.id}.png`,
          });
        }

        // Mark failed signatures
        for (const failedId of result.failedSignatures) {
          await updateSignature(failedId, {
            syncStatus: 'failed' as any,
          });
        }

        // Update last sync time
        const lastSync = await signatureSyncService.getLastSyncTime();
        setLastSyncTime(lastSync);

        track(ANALYTICS_EVENTS.SYNC_COMPLETED, {
          synced_count: result.syncedCount,
          failed_count: result.failedCount,
        });
      } else {
        setSyncError('Sync failed. Please try again.');

        track(ANALYTICS_EVENTS.SYNC_FAILED, {
          failed_count: result.failedCount,
        });
      }

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Sync failed';
      setSyncError(errorMessage);

      track(ANALYTICS_EVENTS.SYNC_FAILED, {
        error_message: errorMessage,
      });

      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [isAuthenticated, isSyncing, getAll, updateSignature, track]);

  return {
    isSyncing,
    lastSyncTime,
    syncError,
    triggerSync,
    canSync,
  };
};
