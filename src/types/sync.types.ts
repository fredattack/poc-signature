// Sync types

export enum SyncStatus {
  Pending = 'pending',
  Synced = 'synced',
  Failed = 'failed',
}

export interface SyncQueueItem {
  id: string;
  entityType: 'signature' | 'wallpaper' | 'user';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  payload: any;
  status: SyncStatus;
  retryCount: number;
  lastAttempt?: Date;
  createdAt: Date;
}

export interface SyncResult {
  success: boolean;
  syncedItems: number;
  failedItems: number;
  errors: SyncError[];
}

export interface SyncError {
  entityId: string;
  entityType: string;
  error: string;
}

export interface ManualSyncState {
  isSyncing: boolean;
  lastSyncAt?: Date;
  pendingCount: number;
}
