// Zustand store for signature management

import { create } from 'zustand';
import {
  Signature,
  SignatureColor,
  SignatureStatus,
  SyncStatus,
} from '@/types/signature.types';
import { asyncStorage } from '@/services/storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';

interface SignaturesState {
  signatures: Signature[];
  isLoading: boolean;
  error: string | null;

  // Actions
  loadSignatures: () => Promise<void>;
  addSignature: (signature: Signature) => Promise<void>;
  updateSignature: (id: string, updates: Partial<Signature>) => Promise<void>;
  removeSignature: (id: string) => Promise<void>;
  getById: (id: string) => Signature | undefined;
  getAll: () => Signature[];
  getActiveSignatures: () => Signature[];
  clearAll: () => Promise<void>;
  getSortedSignatures: (
    sortBy: 'recent' | 'oldest' | 'a-z' | 'z-a'
  ) => Signature[];

  // Sync methods
  markAsSynced: (id: string, cloudImageUrl: string) => Promise<void>;
  markAsSyncFailed: (id: string) => Promise<void>;
  getPendingSyncSignatures: () => Signature[];
}

export const useSignaturesStore = create<SignaturesState>((set, get) => ({
  signatures: [],
  isLoading: false,
  error: null,

  loadSignatures: async () => {
    set({ isLoading: true, error: null });
    try {
      const stored = await asyncStorage.get<Signature[]>(
        STORAGE_KEYS.SIGNATURES
      );
      const signatures = stored || [];

      // Filter out permanently deleted signatures
      const activeSignatures = signatures.filter(
        (sig) => sig.status !== SignatureStatus.PermanentlyDeleted
      );

      set({ signatures: activeSignatures, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load signatures', isLoading: false });
      console.error('Load signatures error:', error);
    }
  },

  addSignature: async (signature: Signature) => {
    try {
      const currentSignatures = get().signatures;
      const updatedSignatures = [...currentSignatures, signature];

      await asyncStorage.set(STORAGE_KEYS.SIGNATURES, updatedSignatures);
      set({ signatures: updatedSignatures });
    } catch (error) {
      set({ error: 'Failed to add signature' });
      console.error('Add signature error:', error);
      throw error;
    }
  },

  updateSignature: async (id: string, updates: Partial<Signature>) => {
    try {
      const currentSignatures = get().signatures;
      const updatedSignatures = currentSignatures.map((sig) =>
        sig.id === id ? { ...sig, ...updates } : sig
      );

      await asyncStorage.set(STORAGE_KEYS.SIGNATURES, updatedSignatures);
      set({ signatures: updatedSignatures });
    } catch (error) {
      set({ error: 'Failed to update signature' });
      console.error('Update signature error:', error);
      throw error;
    }
  },

  removeSignature: async (id: string) => {
    try {
      const currentSignatures = get().signatures;

      // Soft delete: mark as deleted
      const updatedSignatures = currentSignatures.map((sig) =>
        sig.id === id
          ? {
              ...sig,
              status: SignatureStatus.SoftDeleted,
              deletedAt: new Date(),
            }
          : sig
      );

      await asyncStorage.set(STORAGE_KEYS.SIGNATURES, updatedSignatures);
      set({ signatures: updatedSignatures });
    } catch (error) {
      set({ error: 'Failed to remove signature' });
      console.error('Remove signature error:', error);
      throw error;
    }
  },

  getById: (id: string) => {
    return get().signatures.find((sig) => sig.id === id);
  },

  getAll: () => {
    return get().signatures;
  },

  getActiveSignatures: () => {
    return get().signatures.filter(
      (sig) => sig.status === SignatureStatus.Active
    );
  },

  clearAll: async () => {
    try {
      await asyncStorage.remove(STORAGE_KEYS.SIGNATURES);
      set({ signatures: [] });
    } catch (error) {
      set({ error: 'Failed to clear signatures' });
      console.error('Clear signatures error:', error);
      throw error;
    }
  },

  // Sync methods
  markAsSynced: async (id: string, cloudImageUrl: string) => {
    await get().updateSignature(id, {
      syncStatus: SyncStatus.Synced,
      cloudImageUrl,
    });
  },

  markAsSyncFailed: async (id: string) => {
    await get().updateSignature(id, {
      syncStatus: SyncStatus.Failed,
    });
  },

  getPendingSyncSignatures: () => {
    return get().signatures.filter(
      (sig) =>
        sig.syncStatus === SyncStatus.Pending &&
        sig.status === SignatureStatus.Active
    );
  },

  // Sort and filter methods
  getSortedSignatures: (sortBy: 'recent' | 'oldest' | 'a-z' | 'z-a') => {
    const activeSignatures = get().getActiveSignatures();

    switch (sortBy) {
      case 'recent':
        return [...activeSignatures].sort(
          (a, b) =>
            new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
        );
      case 'oldest':
        return [...activeSignatures].sort(
          (a, b) =>
            new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime()
        );
      case 'a-z':
        return [...activeSignatures].sort((a, b) =>
          a.celebrityName.localeCompare(b.celebrityName)
        );
      case 'z-a':
        return [...activeSignatures].sort((a, b) =>
          b.celebrityName.localeCompare(a.celebrityName)
        );
      default:
        return activeSignatures;
    }
  },
}));
