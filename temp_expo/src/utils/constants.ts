// App-wide constants

// Signature limits
export const MAX_FREE_SIGNATURES = 10;
export const UNLIMITED_SIGNATURES = -1; // For premium users

// Wallpaper generation
export const WALLPAPER_GENERATION_TIMEOUT = 3000; // 3 seconds
export const WALLPAPER_STANDARD_RESOLUTION = { width: 1080, height: 1920 };
export const WALLPAPER_HD_RESOLUTION = { width: 1440, height: 2560 };
export const WALLPAPER_UHD_RESOLUTION = { width: 2160, height: 3840 };

// Canvas
export const CANVAS_WIDTH = 375; // Adjusts to device width
export const CANVAS_HEIGHT = 500;
export const CANVAS_TARGET_FPS = 60;
export const CANVAS_STROKE_WIDTH = 3;

// Performance
export const APP_LAUNCH_TARGET_TIME = 2000; // 2 seconds
export const SIGNATURE_CAPTURE_TARGET_TIME = 30000; // 30 seconds

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@signature_app/auth_token',
  REFRESH_TOKEN: '@signature_app/refresh_token',
  USER_DATA: '@signature_app/user_data',
  ONBOARDING_COMPLETED: '@signature_app/onboarding_completed',
  SIGNATURES: '@signature_app/signatures',
  SYNC_QUEUE: '@signature_app/sync_queue',
  ANALYTICS_CONSENT: '@signature_app/analytics_consent',
  LAST_SYNC: '@signature_app/last_sync',
} as const;

// API
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Subscription
export const TRIAL_DURATION_DAYS = 7;
export const PREMIUM_MONTHLY_PRICE = 4.99;
export const PREMIUM_ANNUAL_PRICE = 39.99;

// Data retention
export const SOFT_DELETE_RETENTION_DAYS = 365; // 1 year

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const GALLERY_PAGE_SIZE = 20;

// Image quality
export const IMAGE_QUALITY = 0.9; // 0-1 scale for JPEG quality
export const IMAGE_FORMAT = 'png';

// Analytics
export const ANALYTICS_BATCH_SIZE = 10;
export const ANALYTICS_FLUSH_INTERVAL = 30000; // 30 seconds
