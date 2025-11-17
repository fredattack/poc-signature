/**
 * Wallpaper Templates API Service
 *
 * Real implementation for Laravel backend.
 */

import { httpClient } from './httpClient';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api.types';
import { BackendWallpaperTemplate } from '@/types/backend.types';

// ============================================================================
// WALLPAPER TEMPLATES API SERVICE
// ============================================================================

class WallpaperTemplatesApiService {
  /**
   * Get all wallpaper templates (paginated)
   */
  async getAll(
    params?: PaginationParams & {
      category?: string;
      is_premium?: boolean;
    }
  ): Promise<ApiResponse<PaginatedResponse<BackendWallpaperTemplate>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendWallpaperTemplate>
      >('/wallpaper-templates', params);

      return response;
    } catch (error) {
      console.error('Get templates error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch wallpaper templates',
          code: 'FETCH_TEMPLATES_ERROR',
        },
      };
    }
  }

  /**
   * Get single template by ID
   */
  async getById(id: string): Promise<ApiResponse<BackendWallpaperTemplate>> {
    try {
      const response = await httpClient.get<BackendWallpaperTemplate>(
        `/wallpaper-templates/${id}`
      );

      return response;
    } catch (error) {
      console.error('Get template error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch wallpaper template',
          code: 'FETCH_TEMPLATE_ERROR',
        },
      };
    }
  }

  /**
   * Get templates by category
   */
  async getByCategory(
    category: string,
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<BackendWallpaperTemplate>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendWallpaperTemplate>
      >('/wallpaper-templates', {
        ...params,
        category,
      });

      return response;
    } catch (error) {
      console.error('Get templates by category error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch wallpaper templates',
          code: 'FETCH_TEMPLATES_ERROR',
        },
      };
    }
  }

  /**
   * Get free templates only
   */
  async getFreeTemplates(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<BackendWallpaperTemplate>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendWallpaperTemplate>
      >('/wallpaper-templates', {
        ...params,
        is_premium: false,
      });

      return response;
    } catch (error) {
      console.error('Get free templates error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch free wallpaper templates',
          code: 'FETCH_TEMPLATES_ERROR',
        },
      };
    }
  }

  /**
   * Get premium templates only
   */
  async getPremiumTemplates(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<BackendWallpaperTemplate>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendWallpaperTemplate>
      >('/wallpaper-templates', {
        ...params,
        is_premium: true,
      });

      return response;
    } catch (error) {
      console.error('Get premium templates error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch premium wallpaper templates',
          code: 'FETCH_TEMPLATES_ERROR',
        },
      };
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const wallpaperTemplatesApi = new WallpaperTemplatesApiService();
