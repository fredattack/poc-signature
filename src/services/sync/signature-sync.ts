// Manual signature sync service

import {
  Signature,
  SignatureStatus,
  SyncStatus,
} from '@/types/signature.types';
import { signaturesApi } from '../api/signatures';
import { asyncStorage } from '../storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';

export interface SyncQueueItem {
  signature: Signature;
  operation: 'create' | 'update' | 'delete';
}

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  failedCount: number;
  failedSignatures: string[];
}

/**
 * Manual sync service for signatures
 * Implements queue-based sync with retry logic
 */
class SignatureSyncService {
  /**
   * Get pending signatures that need to be synced
   */
  getPendingSync(signatures: Signature[]): Signature[] {
    return signatures.filter(
      (sig) =>
        sig.syncStatus === SyncStatus.Pending &&
        sig.status === SignatureStatus.Active
    );
  }

  /**
   * Sync all pending signatures to cloud
   */
  async syncPending(signatures: Signature[]): Promise<SyncResult> {
    const pendingSignatures = this.getPendingSync(signatures);

    if (pendingSignatures.length === 0) {
      return {
        success: true,
        syncedCount: 0,
        failedCount: 0,
        failedSignatures: [],
      };
    }

    try {
      // Batch sync to backend
      const response = await signaturesApi.batchSync(pendingSignatures);

      if (response.error) {
        return {
          success: false,
          syncedCount: 0,
          failedCount: pendingSignatures.length,
          failedSignatures: pendingSignatures.map((s) => s.id),
        };
      }

      const { synced, failed } = response.data!;

      // Save last sync timestamp
      await this.saveLastSyncTime();

      return {
        success: failed.length === 0,
        syncedCount: synced.length,
        failedCount: failed.length,
        failedSignatures: failed,
      };
    } catch (error) {
      console.error('Sync error:', error);
      return {
        success: false,
        syncedCount: 0,
        failedCount: pendingSignatures.length,
        failedSignatures: pendingSignatures.map((s) => s.id),
      };
    }
  }

  /**
   * Mark signature as synced
   */
  markAsSynced(signature: Signature, cloudImageUrl: string): Signature {
    return {
      ...signature,
      syncStatus: SyncStatus.Synced,
      cloudImageUrl,
    };
  }

  /**
   * Mark signature as sync failed
   */
  markAsFailed(signature: Signature): Signature {
    return {
      ...signature,
      syncStatus: SyncStatus.Failed,
    };
  }

  /**
   * Get last sync timestamp
   */
  async getLastSyncTime(): Promise<Date | null> {
    try {
      const timestamp = await asyncStorage.get<string>(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? new Date(timestamp) : null;
    } catch (error) {
      console.error('Failed to get last sync time:', error);
      return null;
    }
  }

  /**
   * Save last sync timestamp
   */
  private async saveLastSyncTime(): Promise<void> {
    try {
      await asyncStorage.set(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Failed to save last sync time:', error);
    }
  }

  /**
   * Pull signatures from cloud and merge with local
   */
  async pullFromCloud(localSignatures: Signature[]): Promise<Signature[]> {
    try {
      const response = await signaturesApi.getAll();

      if (response.error || !response.data) {
        console.error('Failed to pull from cloud:', response.error);
        return localSignatures;
      }

      const cloudSignatures = response.data;

      // Simple merge strategy: cloud wins for conflicts
      const mergedMap = new Map<string, Signature>();

      // Add local signatures
      localSignatures.forEach((sig) => {
        mergedMap.set(sig.id, sig);
      });

      // Override with cloud signatures
      cloudSignatures.forEach((sig) => {
        mergedMap.set(sig.id, {
          ...sig,
          syncStatus: SyncStatus.Synced,
        });
      });

      return Array.from(mergedMap.values());
    } catch (error) {
      console.error('Pull from cloud error:', error);
      return localSignatures;
    }
  }
}

export const signatureSyncService = new SignatureSyncService();
