/**
 * Signatures API Service
 *
 * Real implementation for Laravel backend with multipart file upload support.
 */

import { httpClient } from './httpClient';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api.types';
import {
  BackendSignature,
  CreateSignatureRequest,
  UpdateSignatureRequest,
} from '@/types/backend.types';

// ============================================================================
// SIGNATURES API SERVICE
// ============================================================================

class SignaturesApiService {
  /**
   * Get all signatures (paginated)
   */
  async getAll(
    params?: PaginationParams & { search?: string }
  ): Promise<ApiResponse<PaginatedResponse<BackendSignature>>> {
    try {
      const response = await httpClient.get<
        PaginatedResponse<BackendSignature>
      >('/signatures', params);

      return response;
    } catch (error) {
      console.error('Get signatures error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch signatures',
          code: 'FETCH_SIGNATURES_ERROR',
        },
      };
    }
  }

  /**
   * Get single signature by ID
   */
  async getById(id: string): Promise<ApiResponse<BackendSignature>> {
    try {
      const response = await httpClient.get<BackendSignature>(
        `/signatures/${id}`
      );

      return response;
    } catch (error) {
      console.error('Get signature error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch signature',
          code: 'FETCH_SIGNATURE_ERROR',
        },
      };
    }
  }

  /**
   * Create signature with multipart file upload
   */
  async create(
    data: Omit<CreateSignatureRequest, 'user_id'>,
    userId: string
  ): Promise<ApiResponse<BackendSignature>> {
    try {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('name', data.name);

      if (data.description) {
        formData.append('description', data.description);
      }

      // Append image file
      // React Native uses a special format for file uploads
      const imageFile = data.image as unknown as {
        uri: string;
        type: string;
        name: string;
      };

      formData.append('image', {
        uri: imageFile.uri,
        type: imageFile.type,
        name: imageFile.name,
      } as unknown as Blob);

      // Make request with multipart/form-data
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'}/signatures`,
        {
          method: 'POST',
          body: formData,
          headers: {
            // Don't set Content-Type - let the browser set it with boundary
            // 'Content-Type': 'multipart/form-data', // ❌ Don't do this!
          },
        }
      );

      const responseData = (await response.json()) as {
        data?: BackendSignature;
        message?: string;
        error?: {
          message: string;
          code: string;
        };
      };

      if (!response.ok) {
        return {
          success: false,
          error: {
            message:
              responseData.error?.message ?? 'Failed to create signature',
            code: responseData.error?.code ?? 'CREATE_SIGNATURE_ERROR',
            statusCode: response.status,
          },
        };
      }

      return {
        success: true,
        data: responseData.data,
      };
    } catch (error) {
      console.error('Create signature error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to create signature',
          code: 'CREATE_SIGNATURE_ERROR',
        },
      };
    }
  }

  /**
   * Update signature metadata (name, description)
   */
  async update(
    id: string,
    data: UpdateSignatureRequest
  ): Promise<ApiResponse<BackendSignature>> {
    try {
      const response = await httpClient.put<BackendSignature>(
        `/signatures/${id}`,
        data
      );

      return response;
    } catch (error) {
      console.error('Update signature error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to update signature',
          code: 'UPDATE_SIGNATURE_ERROR',
        },
      };
    }
  }

  /**
   * Delete signature
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.delete<void>(`/signatures/${id}`);

      return response;
    } catch (error) {
      console.error('Delete signature error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to delete signature',
          code: 'DELETE_SIGNATURE_ERROR',
        },
      };
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const signaturesApi = new SignaturesApiService();
