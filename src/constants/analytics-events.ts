// Analytics event name constants

export const ANALYTICS_EVENTS = {
  // Signature events
  SIGNATURE_STARTED: 'signature_started',
  SIGNATURE_SAVED: 'signature_saved',
  SIGNATURE_CLEARED: 'signature_cleared',
  SIGNATURE_VIEWED: 'signature_viewed',
  SIGNATURE_DELETED: 'signature_deleted',

  // Wallpaper events
  TEMPLATE_SELECTED: 'template_selected',
  COLOR_CHANGED: 'color_changed',
  WALLPAPER_SAVED: 'wallpaper_saved',
  WALLPAPER_SET: 'wallpaper_set',

  // Gallery events
  GALLERY_SORTED: 'gallery_sorted',
  GALLERY_REFRESHED: 'gallery_refreshed',

  // Onboarding events
  ONBOARDING_SLIDE_VIEWED: 'onboarding_slide_viewed',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  ONBOARDING_SKIPPED: 'onboarding_skipped',

  // Share events
  SHARE_OPENED: 'share_opened',
  SHARE_COMPLETED: 'share_completed',
  SHARE_PLATFORM_SELECTED: 'share_platform_selected',

  // Auth events
  SIGNUP_COMPLETED: 'signup_completed',
  LOGIN_COMPLETED: 'login_completed',
  SYNC_TRIGGERED: 'sync_triggered',
  SYNC_COMPLETED: 'sync_completed',
  SYNC_FAILED: 'sync_failed',

  // Premium events
  PAYWALL_VIEWED: 'paywall_viewed',
  SUBSCRIPTION_STARTED: 'subscription_started',
  SUBSCRIPTION_COMPLETED: 'subscription_completed',
  SUBSCRIPTION_CANCELED: 'subscription_canceled',

  // Performance events
  APP_LAUNCHED: 'app_launched',
  CANVAS_FPS_MEASURED: 'canvas_fps_measured',
  WALLPAPER_GENERATION_TIME: 'wallpaper_generation_time',

  // Error events
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
  PERMISSION_DENIED: 'permission_denied',
} as const;

export type AnalyticsEventKey = keyof typeof ANALYTICS_EVENTS;

// Event property keys for type safety
export const EVENT_PROPERTIES = {
  // Common
  SCREEN_NAME: 'screen_name',
  USER_ID: 'user_id',
  IS_PREMIUM: 'is_premium',
  TIMESTAMP: 'timestamp',

  // Signature
  CELEBRITY_NAME: 'celebrity_name',
  SIGNATURE_COLOR: 'signature_color',
  HAS_LOCATION: 'has_location',
  SIGNATURE_ID: 'signature_id',

  // Wallpaper
  TEMPLATE_ID: 'template_id',
  TEMPLATE_NAME: 'template_name',
  IS_PREMIUM_TEMPLATE: 'is_premium_template',
  RESOLUTION: 'resolution',
  HAS_DATE: 'has_date',
  HAS_LOCATION_ON_WALLPAPER: 'has_location_on_wallpaper',

  // Gallery
  SORT_BY: 'sort_by',
  SIGNATURE_COUNT: 'signature_count',

  // Onboarding
  SLIDE_NUMBER: 'slide_number',
  SLIDE_NAME: 'slide_name',

  // Share
  PLATFORM: 'platform',
  CONTENT_TYPE: 'content_type',

  // Auth
  AUTH_METHOD: 'auth_method',
  SYNC_ITEM_COUNT: 'sync_item_count',
  SYNC_FAILED_COUNT: 'sync_failed_count',

  // Premium
  PLAN_TYPE: 'plan_type',
  PRICE: 'price',
  CURRENCY: 'currency',
  IS_TRIAL: 'is_trial',

  // Performance
  FPS: 'fps',
  DURATION_MS: 'duration_ms',
  APP_LAUNCH_TIME_MS: 'app_launch_time_ms',

  // Error
  ERROR_MESSAGE: 'error_message',
  ERROR_CODE: 'error_code',
  ERROR_STACK: 'error_stack',
} as const;
