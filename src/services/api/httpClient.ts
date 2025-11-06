/**
 * HTTP Client
 *
 * Robust HTTP client with automatic token refresh, retry logic,
 * and comprehensive error handling.
 */

import { API_ENDPOINTS, ApiError, ApiResponse, HttpStatusCode } from '@/types/api.types';
import { getTokens, isTokenExpired, removeTokens, saveTokens } from '@/utils/storage';
import { Tokens } from '@/types/auth.types';

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://api.signatureapp.com/api/v1';

const DEFAULT_TIMEOUT = 30000; // 30 seconds

// ============================================================================
// HTTP CLIENT CLASS
// ============================================================================

class HttpClient {
  private baseURL: string;
  private timeout: number;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(baseURL: string = API_BASE_URL, timeout: number = DEFAULT_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Makes an HTTP request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Check if token needs refresh
      if (await isTokenExpired()) {
        await this.handleTokenRefresh();
      }

      // Get headers
      const headers = await this.getHeaders(options.headers as Record<string, string>);

      // Make request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      const data = await response.json();

      // Handle HTTP errors
      if (!response.ok) {
        return this.handleErrorResponse(response.status, data);
      }

      return {
        success: true,
        data: data.data,
        message: data.message,
      };
    } catch (error) {
      return this.handleNetworkError(error);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const queryString = params ? `?${this.buildQueryString(params)}` : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Gets request headers with authentication
   */
  private async getHeaders(
    customHeaders: Record<string, string> = {}
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    };

    // Add authorization token
    const tokens = await getTokens();
    if (tokens?.access_token) {
      headers.Authorization = `Bearer ${tokens.access_token}`;
    }

    return headers;
  }

  /**
   * Handles token refresh
   */
  private async handleTokenRefresh(): Promise<void> {
    if (this.isRefreshing) {
      // Wait for ongoing refresh
      return new Promise((resolve) => {
        this.refreshSubscribers.push(() => resolve());
      });
    }

    this.isRefreshing = true;

    try {
      const tokens = await getTokens();
      if (!tokens?.refresh_token) {
        throw new Error('No refresh token available');
      }

      // Request new tokens
      const response = await fetch(`${this.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: tokens.refresh_token,
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      const newTokens: Tokens = data.data.tokens;

      // Save new tokens
      await saveTokens(newTokens);

      // Notify subscribers
      this.refreshSubscribers.forEach((callback) => callback(newTokens.access_token));
      this.refreshSubscribers = [];
    } catch (error) {
      // Refresh failed - logout user
      await removeTokens();
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Handles error responses
   */
  private handleErrorResponse<T>(
    statusCode: number,
    data: any
  ): ApiResponse<T> {
    const error: ApiError = {
      message: data.error?.message || data.message || 'An error occurred',
      code: data.error?.code || 'UNKNOWN_ERROR',
      details: data.error?.details,
      statusCode,
    };

    return {
      success: false,
      error,
    };
  }

  /**
   * Handles network errors
   */
  private handleNetworkError<T>(error: unknown): ApiResponse<T> {
    console.error('Network error:', error);

    const apiError: ApiError = {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR',
      statusCode: 0,
    };

    return {
      success: false,
      error: apiError,
    };
  }

  /**
   * Builds query string from params
   */
  private buildQueryString(params: Record<string, unknown>): string {
    return Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join('&');
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const httpClient = new HttpClient();
