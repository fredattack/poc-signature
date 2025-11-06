/**
 * Authentication API Service
 *
 * Complete authentication service with email/password, OAuth, MFA,
 * password reset, and token management.
 */

import { httpClient } from './httpClient';
import { API_ENDPOINTS, ApiResponse } from '@/types/api.types';
import {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  MFAEnableRequest,
  MFASetupData,
  MFASetupResponse,
  MFAVerifyRequest,
  OAuthLoginRequest,
  OAuthProvider,
  RegisterRequest,
  ResetPasswordRequest,
  Tokens,
  User,
} from '@/types/auth.types';
import {
  getTokens,
  removeTokens,
  saveTokens,
  saveMFASessionToken,
  getMFASessionToken,
  removeMFASessionToken,
} from '@/utils/storage';
import { collectDeviceInfo } from '@/utils/device';

// ============================================================================
// AUTHENTICATION API SERVICE
// ============================================================================

class AuthApiService {
  /**
   * Register new user with email and password
   */
  async register(data: Omit<RegisterRequest, 'device_info'>): Promise<ApiResponse<AuthResponse>> {
    try {
      const deviceInfo = await collectDeviceInfo();

      const response = await httpClient.post<AuthResponse['data']>(
        API_ENDPOINTS.AUTH.REGISTER,
        {
          ...data,
          device_info: deviceInfo,
        }
      );

      if (response.success && response.data) {
        // Save tokens
        await saveTokens(response.data.tokens);

        // Handle MFA if required
        if (response.data.requires_mfa && response.data.mfa_session_token) {
          await saveMFASessionToken(response.data.mfa_session_token);
        }

        return {
          success: true,
          data: response.data,
        };
      }

      return response as ApiResponse<AuthResponse>;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: {
          message: 'Registration failed',
          code: 'REGISTRATION_ERROR',
        },
      };
    }
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const deviceInfo = await collectDeviceInfo();

      const response = await httpClient.post<AuthResponse['data']>(
        API_ENDPOINTS.AUTH.LOGIN,
        {
          email,
          password,
          device_info: deviceInfo,
        }
      );

      if (response.success && response.data) {
        // Save tokens
        await saveTokens(response.data.tokens);

        // Handle MFA if required
        if (response.data.requires_mfa && response.data.mfa_session_token) {
          await saveMFASessionToken(response.data.mfa_session_token);
        }

        return {
          success: true,
          data: response.data,
        };
      }

      return response as ApiResponse<AuthResponse>;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: {
          message: 'Login failed',
          code: 'LOGIN_ERROR',
        },
      };
    }
  }

  /**
   * Login with OAuth provider (Google, Apple, Facebook, Twitter, Instagram, TikTok)
   */
  async loginWithOAuth(
    provider: OAuthProvider,
    oauthData: Omit<OAuthLoginRequest, 'device_info'>
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const deviceInfo = await collectDeviceInfo();

      const endpoint = API_ENDPOINTS.AUTH[provider.toUpperCase() as keyof typeof API_ENDPOINTS.AUTH];

      const response = await httpClient.post<AuthResponse['data']>(
        endpoint as string,
        {
          ...oauthData,
          device_info: deviceInfo,
        }
      );

      if (response.success && response.data) {
        await saveTokens(response.data.tokens);

        // Handle MFA if required
        if (response.data.requires_mfa && response.data.mfa_session_token) {
          await saveMFASessionToken(response.data.mfa_session_token);
        }

        return {
          success: true,
          data: response.data,
        };
      }

      return response as ApiResponse<AuthResponse>;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      return {
        success: false,
        error: {
          message: `${provider} login failed`,
          code: 'OAUTH_LOGIN_ERROR',
        },
      };
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<ApiResponse<void>> {
    try {
      await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      await removeTokens();
      await removeMFASessionToken();

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local tokens even if API call fails
      await removeTokens();
      await removeMFASessionToken();

      return { success: true };
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<Tokens>> {
    try {
      const tokens = await getTokens();

      if (!tokens?.refresh_token) {
        return {
          success: false,
          error: {
            message: 'No refresh token available',
            code: 'NO_REFRESH_TOKEN',
          },
        };
      }

      const response = await httpClient.post<{ tokens: Tokens }>(
        API_ENDPOINTS.AUTH.REFRESH,
        {
          refresh_token: tokens.refresh_token,
        }
      );

      if (response.success && response.data?.tokens) {
        await saveTokens(response.data.tokens);

        return {
          success: true,
          data: response.data.tokens,
        };
      }

      return response as ApiResponse<Tokens>;
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        error: {
          message: 'Token refresh failed',
          code: 'TOKEN_REFRESH_ERROR',
        },
      };
    }
  }

  /**
   * Setup MFA for current user
   */
  async setupMFA(): Promise<ApiResponse<MFASetupData>> {
    try {
      const response = await httpClient.post<MFASetupData>(
        API_ENDPOINTS.AUTH.MFA_SETUP
      );

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }

      return response as ApiResponse<MFASetupData>;
    } catch (error) {
      console.error('MFA setup error:', error);
      return {
        success: false,
        error: {
          message: 'MFA setup failed',
          code: 'MFA_SETUP_ERROR',
        },
      };
    }
  }

  /**
   * Verify MFA code (during login)
   */
  async verifyMFA(code: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const mfaSessionToken = await getMFASessionToken();

      const response = await httpClient.post<AuthResponse['data']>(
        API_ENDPOINTS.AUTH.MFA_VERIFY,
        {
          code,
          mfa_session_token: mfaSessionToken,
        }
      );

      if (response.success && response.data) {
        await saveTokens(response.data.tokens);
        await removeMFASessionToken();

        return {
          success: true,
          data: response.data,
        };
      }

      return response as ApiResponse<AuthResponse>;
    } catch (error) {
      console.error('MFA verify error:', error);
      return {
        success: false,
        error: {
          message: 'MFA verification failed',
          code: 'MFA_VERIFY_ERROR',
        },
      };
    }
  }

  /**
   * Enable MFA (after setup verification)
   */
  async enableMFA(code: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>(
        API_ENDPOINTS.AUTH.MFA_ENABLE,
        { code }
      );

      return response;
    } catch (error) {
      console.error('MFA enable error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to enable MFA',
          code: 'MFA_ENABLE_ERROR',
        },
      };
    }
  }

  /**
   * Disable MFA
   */
  async disableMFA(password: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>(
        API_ENDPOINTS.AUTH.MFA_DISABLE,
        { password }
      );

      return response;
    } catch (error) {
      console.error('MFA disable error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to disable MFA',
          code: 'MFA_DISABLE_ERROR',
        },
      };
    }
  }

  /**
   * Request password reset email
   */
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );

      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to send password reset email',
          code: 'FORGOT_PASSWORD_ERROR',
        },
      };
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(
    token: string,
    password: string,
    passwordConfirmation: string
  ): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        {
          token,
          password,
          password_confirmation: passwordConfirmation,
        }
      );

      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to reset password',
          code: 'RESET_PASSWORD_ERROR',
        },
      };
    }
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await httpClient.get<User>(API_ENDPOINTS.USER.ME);

      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to get user info',
          code: 'GET_USER_ERROR',
        },
      };
    }
  }

  /**
   * Check if user is authenticated (has valid tokens)
   */
  async isAuthenticated(): Promise<boolean> {
    const tokens = await getTokens();
    return !!tokens?.access_token;
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const authApi = new AuthApiService();
