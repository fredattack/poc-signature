/**
 * Debug Authentication Utilities
 *
 * Utilities for testing authentication flows.
 * Use these to reset auth state during development.
 */

import { clearAuthData } from './storage';
import { useAuthStore } from '@/store/authStore';

/**
 * Completely resets all authentication data
 * Clears both storage and Zustand store
 */
export const resetAuth = async (): Promise<void> => {
  try {
    // Clear secure storage and async storage
    await clearAuthData();

    // Reset Zustand store
    useAuthStore.setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      requiresMFA: false,
      mfaSessionToken: null,
      isLoading: false,
      error: null,
    });

    console.log('✅ Authentication reset successful');
  } catch (error) {
    console.error('❌ Failed to reset authentication:', error);
    throw error;
  }
};

/**
 * Logs current auth state for debugging
 */
export const debugAuthState = (): void => {
  const state = useAuthStore.getState();

  console.log('🔍 Current Auth State:', {
    isAuthenticated: state.isAuthenticated,
    hasUser: !!state.user,
    hasTokens: !!state.tokens,
    requiresMFA: state.requiresMFA,
    hasMFASessionToken: !!state.mfaSessionToken,
    isLoading: state.isLoading,
    error: state.error,
  });

  if (state.user) {
    console.log('👤 User:', {
      id: state.user.id,
      email: state.user.email,
      name: `${state.user.first_name} ${state.user.last_name}`,
      mfa_enabled: state.user.mfa_enabled,
    });
  }
};
