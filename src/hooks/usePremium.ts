// Premium subscription hook

import { usePremiumStore } from '@/store/premium-store';

export const usePremium = () => {
  const {
    isPremium,
    subscription,
    isLoading,
    error,
    checkPremiumStatus,
    activatePremium,
    cancelSubscription,
    setIsPremium,
  } = usePremiumStore();

  return {
    isPremium,
    subscription,
    isLoading,
    error,
    checkPremiumStatus,
    activatePremium,
    cancelSubscription,
    setIsPremium,
  };
};
