// Authentication API service (mock implementation for POC)

import { apiClient as _apiClient, ApiResponse } from './client';
import { secureStorage } from '../storage/secure-storage';
import { asyncStorage } from '../storage/async-storage';
import { STORAGE_KEYS } from '@/utils/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Mock authentication service for POC
 * Replace with actual Firebase/Supabase implementation
 */
class AuthService {
  /**
   * Register new user
   * TODO: Replace with actual API call
   */
  async register(
    request: RegisterRequest
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    // Mock implementation - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user creation
    const user: User = {
      id: `user_${Date.now()}`,
      email: request.email,
      name: request.name,
      isPremium: false,
      createdAt: new Date(),
    };

    const tokens: AuthTokens = {
      accessToken: `mock_access_token_${user.id}`,
      refreshToken: `mock_refresh_token_${user.id}`,
    };

    // Store tokens
    await this.storeTokens(tokens);
    await asyncStorage.set(STORAGE_KEYS.USER_DATA, user);

    return {
      data: { user, tokens },
      status: 201,
    };

    // Real implementation:
    // return apiClient.post('/auth/register', request);
  }

  /**
   * Login with email/password
   * TODO: Replace with actual API call
   */
  async login(
    request: LoginRequest
  ): Promise<ApiResponse<{ user: User; tokens: AuthTokens }>> {
    // Mock implementation - simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock user login
    const user: User = {
      id: `user_${Date.now()}`,
      email: request.email,
      name: request.email.split('@')[0] ?? 'user',
      isPremium: false,
      createdAt: new Date(),
    };

    const tokens: AuthTokens = {
      accessToken: `mock_access_token_${user.id}`,
      refreshToken: `mock_refresh_token_${user.id}`,
    };

    // Store tokens
    await this.storeTokens(tokens);
    await asyncStorage.set(STORAGE_KEYS.USER_DATA, user);

    return {
      data: { user, tokens },
      status: 200,
    };

    // Real implementation:
    // return apiClient.post('/auth/login', request);
  }

  /**
   * Login with Google
   * TODO: Implement Google Sign-In
   */
  async loginWithGoogle(): Promise<
    ApiResponse<{ user: User; tokens: AuthTokens }>
  > {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      error: 'Google Sign-In not yet implemented',
      status: 501,
    };

    // Real implementation:
    // 1. Use expo-auth-session or @react-native-google-signin/google-signin
    // 2. Get Google ID token
    // 3. Send to backend: apiClient.post('/auth/google', { idToken })
  }

  /**
   * Login with Apple
   * TODO: Implement Apple Sign-In
   */
  async loginWithApple(): Promise<
    ApiResponse<{ user: User; tokens: AuthTokens }>
  > {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      error: 'Apple Sign-In not yet implemented',
      status: 501,
    };

    // Real implementation:
    // 1. Use expo-apple-authentication
    // 2. Get Apple ID token
    // 3. Send to backend: apiClient.post('/auth/apple', { idToken })
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN);
    await secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    await asyncStorage.remove(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Refresh access token
   * TODO: Replace with actual API call
   */
  async refreshToken(): Promise<ApiResponse<AuthTokens>> {
    const refreshToken = await secureStorage.get(STORAGE_KEYS.REFRESH_TOKEN);

    if (!refreshToken) {
      return {
        error: 'No refresh token available',
        status: 401,
      };
    }

    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tokens: AuthTokens = {
      accessToken: `mock_refreshed_access_token_${Date.now()}`,
      refreshToken,
    };

    await this.storeTokens(tokens);

    return {
      data: tokens,
      status: 200,
    };

    // Real implementation:
    // return apiClient.post('/auth/refresh', { refreshToken });
  }

  /**
   * Request password reset
   * TODO: Replace with actual API call
   */
  async forgotPassword(
    _email: string
  ): Promise<ApiResponse<{ message: string }>> {
    // Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      data: { message: 'Password reset email sent' },
      status: 200,
    };

    // Real implementation:
    // return apiClient.post('/auth/forgot-password', { email });
  }

  /**
   * Get current user from storage
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      return await asyncStorage.get<User>(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Store authentication tokens
   */
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    await secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken);
    await secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  }
}

export const authService = new AuthService();
