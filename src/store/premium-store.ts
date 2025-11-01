// Premium subscription Zustand store

import { create } from 'zustand';
import {
  Subscription,
  SubscriptionPlan,
  subscriptionService,
} from '@/services/api/subscriptions';
import { asyncStorage } from '@/services/storage/async-storage';

const PREMIUM_CACHE_KEY = '@signature_app/premium_status';

interface PremiumState {
  isPremium: boolean;
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  checkPremiumStatus: () => Promise<void>;
  activatePremium: (plan: SubscriptionPlan) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  setIsPremium: (isPremium: boolean) => void;
  loadCachedStatus: () => Promise<void>;
}

export const usePremiumStore = create<PremiumState>((set, get) => ({
  isPremium: false,
  subscription: null,
  isLoading: false,
  error: null,

  checkPremiumStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await subscriptionService.getSubscriptionStatus();

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return;
      }

      const subscription = response.data;
      const isPremium = subscription
        ? await subscriptionService.checkPremiumStatus()
        : false;

      // Cache premium status
      await asyncStorage.set(PREMIUM_CACHE_KEY, isPremium);

      set({
        isPremium,
        subscription,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to check premium status',
        isLoading: false,
      });
    }
  },

  activatePremium: async (_plan: SubscriptionPlan) => {
    set({ isLoading: true, error: null });

    try {
      // Mock activation for POC
      const response = await subscriptionService.mockActivatePremium();

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      // Cache premium status
      await asyncStorage.set(PREMIUM_CACHE_KEY, true);

      set({
        isPremium: true,
        subscription: response.data!,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to activate premium',
        isLoading: false,
      });
      return false;
    }
  },

  cancelSubscription: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await subscriptionService.cancelSubscription();

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      // Update subscription to mark as canceling at period end
      if (get().subscription) {
        set({
          subscription: {
            ...get().subscription!,
            cancelAtPeriodEnd: true,
          },
          isLoading: false,
        });
      }

      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to cancel subscription',
        isLoading: false,
      });
      return false;
    }
  },

  setIsPremium: (isPremium: boolean) => {
    set({ isPremium });
    void asyncStorage.set(PREMIUM_CACHE_KEY, isPremium);
  },

  loadCachedStatus: async () => {
    try {
      const cachedStatus = await asyncStorage.get<boolean>(PREMIUM_CACHE_KEY);
      if (cachedStatus !== null) {
        set({ isPremium: cachedStatus });
      }
    } catch (error) {
      console.error('Failed to load cached premium status:', error);
    }
  },
}));
