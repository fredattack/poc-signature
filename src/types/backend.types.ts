/**
 * Backend Types - Laravel API
 *
 * Types that match the Laravel backend API responses exactly.
 * These are the "server-side" types that get transformed to client-side types.
 */

// ============================================================================
// USER
// ============================================================================

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_premium: boolean;
  premium_expires_at: string | null;
  mfa_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// SIGNATURE
// ============================================================================

export interface BackendSignature {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  image_url: string;
  image_path: string;
  image_width: number;
  image_height: number;
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSignatureRequest {
  user_id: string;
  name: string;
  description?: string;
  image: File | Blob; // Multipart file upload
}

export interface UpdateSignatureRequest {
  name?: string;
  description?: string;
}

// ============================================================================
// WALLPAPER
// ============================================================================

export interface BackendWallpaper {
  id: string;
  signature_id: string;
  template_id: string;
  wallpaper_url: string;
  thumbnail_url: string;
  resolution: string; // e.g., "1080x1920"
  file_size: number;
  generation_status: 'pending' | 'processing' | 'completed' | 'failed';
  signature?: BackendSignature;
  template?: BackendWallpaperTemplate;
  created_at: string;
  updated_at: string;
}

export interface GenerateWallpaperRequest {
  signature_id: string;
  template_id: string;
  resolution?: string; // optional, defaults to template resolution
}

// ============================================================================
// WALLPAPER TEMPLATE
// ============================================================================

export interface BackendWallpaperTemplate {
  id: string;
  name: string;
  description: string | null;
  preview_url: string;
  category: string;
  is_premium: boolean;
  is_active: boolean;
  default_resolution: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// SUBSCRIPTION
// ============================================================================

export interface BackendSubscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  plan: 'monthly' | 'annual';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_period: 'monthly' | 'annual';
  stripe_price_id: string;
  features: string[];
  is_active: boolean;
}

// ============================================================================
// ANALYTICS
// ============================================================================

export interface AnalyticsEvent {
  event_type: string;
  event_data: Record<string, unknown>;
  device_info?: {
    platform: string;
    os_version: string;
    app_version: string;
  };
}

export interface AnalyticsStats {
  total_signatures: number;
  total_wallpapers: number;
  total_shares: number;
  most_used_templates: Array<{
    template_id: string;
    template_name: string;
    usage_count: number;
  }>;
}

// ============================================================================
// FEEDBACK
// ============================================================================

export interface BackendFeedback {
  id: string;
  user_id: string;
  category: 'bug' | 'feature' | 'general' | 'complaint';
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  user?: BackendUser;
  created_at: string;
  updated_at: string;
}

export interface CreateFeedbackRequest {
  category: 'bug' | 'feature' | 'general' | 'complaint';
  message: string;
}

// ============================================================================
// AUTH
// ============================================================================

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds (900 = 15 minutes)
}

export interface AuthResponse {
  user: BackendUser;
  tokens: AuthTokens;
  requires_mfa?: boolean;
  mfa_session_token?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_info?: {
    device_name?: string;
    platform?: string;
    os_version?: string;
    app_version?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  device_info?: {
    device_name?: string;
    platform?: string;
    os_version?: string;
    app_version?: string;
  };
}

export interface MFASetupResponse {
  secret: string;
  qr_code_url: string;
  backup_codes: string[];
}

// ============================================================================
// ERROR RESPONSES
// ============================================================================

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>; // field => error messages
}

export interface ErrorResponse {
  message: string;
  error?: string; // error code like "PREMIUM_REQUIRED"
  [key: string]: unknown; // additional error context
}
