// Authentication Zustand store

import { create } from 'zustand';
import {
  authService,
  LoginRequest,
  RegisterRequest,
  User,
} from '@/services/api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAnonymous: boolean;

  // Actions
  login: (request: LoginRequest) => Promise<boolean>;
  register: (request: RegisterRequest) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAnonymous: (isAnonymous: boolean) => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAnonymous: false,

  login: async (request: LoginRequest) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login(request);

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      set({
        user: response.data!.user,
        isAuthenticated: true,
        isAnonymous: false,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      return false;
    }
  },

  register: async (request: RegisterRequest) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.register(request);

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      set({
        user: response.data!.user,
        isAuthenticated: true,
        isAnonymous: false,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
      return false;
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.loginWithGoogle();

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      set({
        user: response.data!.user,
        isAuthenticated: true,
        isAnonymous: false,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Google login failed',
        isLoading: false,
      });
      return false;
    }
  },

  loginWithApple: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.loginWithApple();

      if (response.error) {
        set({ error: response.error, isLoading: false });
        return false;
      }

      set({
        user: response.data!.user,
        isAuthenticated: true,
        isAnonymous: false,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Apple login failed',
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({
        user: null,
        isAuthenticated: false,
        isAnonymous: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setAnonymous: (isAnonymous: boolean) => {
    set({ isAnonymous });
  },

  loadUser: async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        set({
          user,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
