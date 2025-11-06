/**
 * Authentication Types
 *
 * Complete type definitions for the authentication system including
 * user data, tokens, OAuth providers, MFA, and device tracking.
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  is_premium: boolean;
  premium_expires_at: string | null;
  mfa_enabled: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

// ============================================================================
// DEVICE TRACKING
// ============================================================================

export interface DeviceInfo {
  device_id: string;      // UUID v4
  device_name: string;    // "iPhone 14 Pro"
  platform: 'ios' | 'android' | 'web';
  os_version: string;
  app_version?: string;
}

// ============================================================================
// OAUTH PROVIDERS
// ============================================================================

export type OAuthProvider =
  | 'google'
  | 'apple'
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'tiktok';

export interface OAuthProviderConfig {
  id: OAuthProvider;
  name: string;
  enabled: boolean;
  icon: string;
  color: string;
}

// ============================================================================
// REGISTRATION
// ============================================================================

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  accept_terms: boolean;
  device_info: DeviceInfo;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  accept_terms: boolean;
  device_info: DeviceInfo;
}

// ============================================================================
// LOGIN
// ============================================================================

export interface LoginData {
  email: string;
  password: string;
  device_info: DeviceInfo;
}

export interface LoginRequest {
  email: string;
  password: string;
  device_info: DeviceInfo;
}

// ============================================================================
// OAUTH LOGIN
// ============================================================================

export interface OAuthLoginRequest {
  access_token?: string;   // Google, Facebook, Twitter, Instagram, TikTok
  identity_token?: string; // Apple
  id_token?: string;       // Google
  device_info: DeviceInfo;
}

// ============================================================================
// PASSWORD RESET
// ============================================================================

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

// ============================================================================
// MFA (Multi-Factor Authentication)
// ============================================================================

export interface MFASetupData {
  secret: string;
  qr_code_url: string;
  backup_codes: string[];
}

export interface MFAVerifyRequest {
  code: string;
  mfa_session_token?: string;
}

export interface MFAEnableRequest {
  code: string;
}

// ============================================================================
// AUTHENTICATION RESPONSE
// ============================================================================

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    tokens: Tokens;
    requires_mfa?: boolean;
    mfa_session_token?: string;
  };
  error?: string;
}

export interface MFASetupResponse {
  success: boolean;
  data?: MFASetupData;
  error?: string;
}

// ============================================================================
// VALIDATION
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// ============================================================================
// PASSWORD STRENGTH
// ============================================================================

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number; // 0-4
  feedback: string[];
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

// ============================================================================
// AUTH STATE (for Store)
// ============================================================================

export interface AuthState {
  // State
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  requiresMFA: boolean;
  mfaSessionToken: string | null;

  // Actions
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: OAuthProvider, token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setupMFA: () => Promise<MFASetupData>;
  verifyMFA: (code: string) => Promise<void>;
  enableMFA: (code: string) => Promise<void>;
  disableMFA: (password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
}

// ============================================================================
// AUTHENTICATION ERROR CODES
// ============================================================================

export enum AuthErrorCode {
  NETWORK_ERROR = 'network_error',
  UNAUTHORIZED = 'unauthorized',
  EMAIL_TAKEN = 'email_taken',
  INVALID_TOKEN = 'invalid_token',
  MFA_REQUIRED = 'mfa_required',
  MFA_INVALID = 'mfa_invalid',
  SERVER_ERROR = 'server_error',
  VALIDATION_ERROR = 'validation_error',
  PASSWORD_MISMATCH = 'password_mismatch',
  WEAK_PASSWORD = 'weak_password',
  INVALID_EMAIL = 'invalid_email',
  UNKNOWN_ERROR = 'unknown_error',
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, string[]>;
}

// ============================================================================
// DEEP LINK
// ============================================================================

export interface DeepLinkParams {
  token?: string;
  provider?: OAuthProvider;
  code?: string;
  state?: string;
}

// ============================================================================
// BIOMETRIC AUTHENTICATION
// ============================================================================

export interface BiometricConfig {
  enabled: boolean;
  type: 'fingerprint' | 'face' | 'iris' | null;
  lastAuthenticatedAt: string | null;
}
