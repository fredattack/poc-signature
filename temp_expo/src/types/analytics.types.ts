// Analytics types

export interface AnalyticsEvent {
  name: string;
  properties?: EventProperties;
  timestamp?: Date;
}

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export interface ScreenViewEvent {
  screenName: string;
  screenClass?: string;
  previousScreen?: string;
}

export interface UserIdentity {
  userId: string;
  email?: string;
  isPremium: boolean;
  signatureCount?: number;
}

export interface PerformanceMetric {
  metricName: string;
  value: number;
  unit: 'ms' | 'fps' | 'mb';
}

export enum AnalyticsEventName {
  // Signature events
  SignatureStarted = 'signature_started',
  SignatureSaved = 'signature_saved',
  SignatureCleared = 'signature_cleared',
  SignatureViewed = 'signature_viewed',
  SignatureDeleted = 'signature_deleted',

  // Wallpaper events
  TemplateSelected = 'template_selected',
  ColorChanged = 'color_changed',
  WallpaperSaved = 'wallpaper_saved',
  WallpaperSet = 'wallpaper_set',

  // Gallery events
  GallerySorted = 'gallery_sorted',

  // Onboarding events
  OnboardingSlideViewed = 'onboarding_slide_viewed',
  OnboardingCompleted = 'onboarding_completed',
  OnboardingSkipped = 'onboarding_skipped',

  // Share events
  ShareOpened = 'share_opened',
  ShareCompleted = 'share_completed',
  SharePlatformSelected = 'share_platform_selected',

  // Auth events
  SignupCompleted = 'signup_completed',
  LoginCompleted = 'login_completed',
  SyncTriggered = 'sync_triggered',
  SyncCompleted = 'sync_completed',
  SyncFailed = 'sync_failed',

  // Premium events
  PaywallViewed = 'paywall_viewed',
  SubscriptionStarted = 'subscription_started',
  SubscriptionCompleted = 'subscription_completed',
  SubscriptionCanceled = 'subscription_canceled',
}

export interface AnalyticsConfig {
  enabled: boolean;
  debugMode: boolean;
  userId?: string;
  consentGiven: boolean;
}
