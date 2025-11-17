/**
 * Wallpapers API Service
 *
 * Real implementation for Laravel backend.
 */

import { httpClient } from './httpClient';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api.types';
import {
  BackendWallpaper,
  GenerateWallpaperRequest,
} from '@/types/backend.types';

// ============================================================================
// WALLPAPERS API SERVICE
// ============================================================================

class WallpapersApiService {
  /**
   * Get all wallpapers (paginated)
   */
  async getAll(
    params?: PaginationParams & {
      signature_id?: string;
      template_id?: string;
    }
  ): Promise<ApiResponse<PaginatedResponse<BackendWallpaper>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendWallpaper>
      >('/wallpapers', params);

      return response;
    } catch (error) {
      console.error('Get wallpapers error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch wallpapers',
          code: 'FETCH_WALLPAPERS_ERROR',
        },
      };
    }
  }

  /**
   * Get single wallpaper by ID
   */
  async getById(id: string): Promise<ApiResponse<BackendWallpaper>> {
    try {
      const response = await httpClient.get<BackendWallpaper>(
        `/wallpapers/${id}`
      );

      return response;
    } catch (error) {
      console.error('Get wallpaper error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch wallpaper',
          code: 'FETCH_WALLPAPER_ERROR',
        },
      };
    }
  }

  /**
   * Generate new wallpaper from signature and template
   */
  async generate(
    data: GenerateWallpaperRequest
  ): Promise<ApiResponse<BackendWallpaper>> {
    try {
      const response = await httpClient.post<BackendWallpaper>(
        '/wallpapers',
        data
      );

      // Check for premium requirement error
      if (!response.success && response.error?.code === 'PREMIUM_REQUIRED') {
        return {
          success: false,
          error: {
            message: 'This template requires a premium subscription.',
            code: 'PREMIUM_REQUIRED',
            statusCode: 403,
          },
        };
      }

      return response;
    } catch (error) {
      console.error('Generate wallpaper error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to generate wallpaper',
          code: 'GENERATE_WALLPAPER_ERROR',
        },
      };
    }
  }

  /**
   * Delete wallpaper
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.delete<void>(`/wallpapers/${id}`);

      return response;
    } catch (error) {
      console.error('Delete wallpaper error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to delete wallpaper',
          code: 'DELETE_WALLPAPER_ERROR',
        },
      };
    }
  }

  /**
   * Check generation status (for async wallpaper generation)
   */
  async checkGenerationStatus(
    id: string
  ): Promise<ApiResponse<BackendWallpaper>> {
    try {
      const response = await httpClient.get<BackendWallpaper>(
        `/wallpapers/${id}`
      );

      if (response.success && response.data) {
        const status = response.data.generation_status;

        if (status === 'failed') {
          return {
            success: false,
            error: {
              message: 'Wallpaper generation failed',
              code: 'GENERATION_FAILED',
            },
          };
        }
      }

      return response;
    } catch (error) {
      console.error('Check generation status error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to check generation status',
          code: 'STATUS_CHECK_ERROR',
        },
      };
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const wallpapersApi = new WallpapersApiService();
