/**
 * API Services Index
 *
 * Central export for all API services.
 */

// HTTP Client
export { httpClient } from './httpClient';

// Auth API (already complete)
export { authApi } from './authApi';

// New Laravel Backend APIs
export { signaturesApi } from './signaturesApi';
export { wallpapersApi } from './wallpapersApi';
export { wallpaperTemplatesApi } from './wallpaperTemplatesApi';
export { subscriptionsApi } from './subscriptionsApi';
export { analyticsApi } from './analyticsApi';
export { feedbackApi } from './feedbackApi';

// Types
export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api.types';

export type {
  BackendUser,
  BackendSignature,
  BackendWallpaper,
  BackendWallpaperTemplate,
  BackendSubscription,
  BackendFeedback,
  AuthTokens,
  AuthResponse,
} from '@/types/backend.types';
