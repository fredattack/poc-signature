/**
 * API Types
 *
 * Core API types for HTTP client, requests, responses, and error handling.
 */

// ============================================================================
// BASE API RESPONSE
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

// ============================================================================
// API ERROR
// ============================================================================

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>; // Validation errors
  statusCode?: number;
}

// ============================================================================
// PAGINATION
// ============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// HTTP CLIENT CONFIG
// ============================================================================

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',

    // OAuth
    GOOGLE: '/auth/google',
    APPLE: '/auth/apple',
    FACEBOOK: '/auth/facebook',
    TWITTER: '/auth/twitter',
    INSTAGRAM: '/auth/instagram',
    TIKTOK: '/auth/tiktok',

    // Password Reset
    FORGOT_PASSWORD: '/auth/password/forgot',
    RESET_PASSWORD: '/auth/password/reset',

    // MFA
    MFA_SETUP: '/auth/mfa/setup',
    MFA_VERIFY: '/auth/mfa/verify',
    MFA_ENABLE: '/auth/mfa/enable',
    MFA_DISABLE: '/auth/mfa/disable',
  },

  // User
  USER: {
    ME: '/user/me',
    UPDATE: '/user/update',
    DELETE: '/user/delete',
  },

  // Signatures
  SIGNATURES: {
    LIST: '/signatures',
    CREATE: '/signatures',
    GET: '/signatures/:id',
    UPDATE: '/signatures/:id',
    DELETE: '/signatures/:id',
  },

  // Wallpapers
  WALLPAPERS: {
    LIST: '/wallpapers',
    CREATE: '/wallpapers',
    GET: '/wallpapers/:id',
    UPDATE: '/wallpapers/:id',
    DELETE: '/wallpapers/:id',
  },

  // Premium
  PREMIUM: {
    SUBSCRIBE: '/premium/subscribe',
    CANCEL: '/premium/cancel',
    RESTORE: '/premium/restore',
  },
} as const;

// ============================================================================
// HTTP STATUS CODES
// ============================================================================

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// ============================================================================
// REQUEST RETRY CONFIG
// ============================================================================

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryOn: HttpStatusCode[];
}

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryOn: [
    HttpStatusCode.TOO_MANY_REQUESTS,
    HttpStatusCode.INTERNAL_SERVER_ERROR,
    HttpStatusCode.SERVICE_UNAVAILABLE,
  ],
};
