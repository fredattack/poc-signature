/**
 * Authentication Zustand Store
 *
 * Centralized state management for authentication including email/password,
 * OAuth, MFA, and token persistence.
 */

import { create } from 'zustand';
import {
  AuthState,
  MFASetupData,
  OAuthProvider,
  RegisterData,
} from '@/types/auth.types';
import { authApi } from '@/services/api/authApi';
import { getMFASessionToken, getTokens, removeTokens } from '@/utils/storage';

// ============================================================================
// AUTH STORE
// ============================================================================

export const useAuthStore = create<AuthState>((set, get) => ({
  // ============================================================================
  // STATE
  // ============================================================================

  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  requiresMFA: false,
  mfaSessionToken: null,

  // ============================================================================
  // ACTIONS
  // ============================================================================

  /**
   * Register new user
   */
  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register(data);

      if (response.success && response.data) {
        if (response.data.requires_mfa) {
          // MFA required
          set({
            requiresMFA: true,
            mfaSessionToken: response.data.mfa_session_token || null,
            isLoading: false,
          });
        } else {
          // Registration complete
          set({
            user: response.data.user,
            tokens: response.data.tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        }
      } else {
        set({
          error: response.error?.message || 'Registration failed',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
    }
  },

  /**
   * Login with email and password
   */
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login(email, password);

      if (response.success && response.data) {
        if (response.data.requires_mfa) {
          // MFA required
          set({
            requiresMFA: true,
            mfaSessionToken: response.data.mfa_session_token || null,
            isLoading: false,
          });
        } else {
          // Login complete
          set({
            user: response.data.user,
            tokens: response.data.tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        }
      } else {
        set({
          error: response.error?.message || 'Login failed',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
    }
  },

  /**
   * Login with OAuth provider
   */
  loginWithOAuth: async (provider: OAuthProvider, token: string) => {
    set({ isLoading: true, error: null });

    try {
      const oauthData =
        provider === 'apple'
          ? { identity_token: token }
          : { access_token: token };

      const response = await authApi.loginWithOAuth(provider, oauthData);

      if (response.success && response.data) {
        if (response.data.requires_mfa) {
          // MFA required
          set({
            requiresMFA: true,
            mfaSessionToken: response.data.mfa_session_token || null,
            isLoading: false,
          });
        } else {
          // Login complete
          set({
            user: response.data.user,
            tokens: response.data.tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        }
      } else {
        set({
          error: response.error?.message || `${provider} login failed`,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : `${provider} login failed`,
        isLoading: false,
      });
    }
  },

  /**
   * Logout current user
   */
  logout: async () => {
    set({ isLoading: true });

    try {
      await authApi.logout();

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        requiresMFA: false,
        mfaSessionToken: null,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      // Still clear state even if API call fails
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        requiresMFA: false,
        mfaSessionToken: null,
        error: null,
        isLoading: false,
      });
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    try {
      const response = await authApi.refreshToken();

      if (response.success && response.data) {
        set({ tokens: response.data });
      } else {
        // Refresh failed - logout
        await get().logout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await get().logout();
    }
  },

  /**
   * Setup MFA for current user
   */
  setupMFA: async (): Promise<MFASetupData> => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.setupMFA();

      set({ isLoading: false });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error?.message || 'MFA setup failed');
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  /**
   * Verify MFA code during login
   */
  verifyMFA: async (code: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.verifyMFA(code);

      if (response.success && response.data) {
        set({
          user: response.data.user,
          tokens: response.data.tokens,
          isAuthenticated: true,
          requiresMFA: false,
          mfaSessionToken: null,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          error: response.error?.message || 'MFA verification failed',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'MFA verification failed',
        isLoading: false,
      });
    }
  },

  /**
   * Enable MFA (after setup verification)
   */
  enableMFA: async (code: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.enableMFA(code);

      if (response.success) {
        // Update user MFA status
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, mfa_enabled: true },
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      } else {
        set({
          error: response.error?.message || 'Failed to enable MFA',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to enable MFA',
        isLoading: false,
      });
    }
  },

  /**
   * Disable MFA
   */
  disableMFA: async (password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.disableMFA(password);

      if (response.success) {
        // Update user MFA status
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, mfa_enabled: false },
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      } else {
        set({
          error: response.error?.message || 'Failed to disable MFA',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to disable MFA',
        isLoading: false,
      });
    }
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.forgotPassword(email);

      if (response.success) {
        set({ isLoading: false });
      } else {
        set({
          error:
            response.error?.message || 'Failed to send password reset email',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to send password reset email',
        isLoading: false,
      });
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.resetPassword(token, password, password);

      if (response.success) {
        set({ isLoading: false });
      } else {
        set({
          error: response.error?.message || 'Failed to reset password',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to reset password',
        isLoading: false,
      });
    }
  },

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },
}));

// ============================================================================
// STORE HYDRATION (Auto-load user on app start)
// ============================================================================

/**
 * Hydrates the auth store from persisted storage
 * Call this on app initialization
 */
export const hydrateAuthStore = async () => {
  try {
    const tokens = await getTokens();
    const mfaSessionToken = await getMFASessionToken();

    if (tokens) {
      // Get current user info
      const response = await authApi.getCurrentUser();

      if (response.success && response.data) {
        useAuthStore.setState({
          user: response.data,
          tokens,
          isAuthenticated: true,
        });
      }
    }

    if (mfaSessionToken) {
      useAuthStore.setState({
        requiresMFA: true,
        mfaSessionToken,
      });
    }
  } catch (error) {
    console.error('Failed to hydrate auth store:', error);
    // Clear invalid tokens
    await removeTokens();
  }
};
