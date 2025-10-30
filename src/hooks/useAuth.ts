// Authentication hook

import { useAuthStore } from '@/store/auth-store';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAnonymous,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    setAnonymous,
    clearError,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAnonymous,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    setAnonymous,
    clearError,
  };
};
