/**
 * Feedback API Service
 *
 * Real implementation for Laravel backend.
 */

import { httpClient } from './httpClient';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types/api.types';
import { BackendFeedback, CreateFeedbackRequest } from '@/types/backend.types';

// ============================================================================
// FEEDBACK API SERVICE
// ============================================================================

class FeedbackApiService {
  /**
   * Get all user feedback (paginated)
   */
  async getAll(
    params?: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<BackendFeedback>>> {
    try {
      const response = await httpClient.get<PaginatedResponse<BackendFeedback>>(
        '/feedback',
        params
      );

      return response;
    } catch (error) {
      console.error('Get feedback error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch feedback',
          code: 'FETCH_FEEDBACK_ERROR',
        },
      };
    }
  }

  /**
   * Get single feedback by ID
   */
  async getById(id: string): Promise<ApiResponse<BackendFeedback>> {
    try {
      const response = await httpClient.get<BackendFeedback>(`/feedback/${id}`);

      return response;
    } catch (error) {
      console.error('Get feedback error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch feedback',
          code: 'FETCH_FEEDBACK_ERROR',
        },
      };
    }
  }

  /**
   * Submit new feedback
   */
  async create(
    data: CreateFeedbackRequest
  ): Promise<ApiResponse<BackendFeedback>> {
    try {
      const response = await httpClient.post<BackendFeedback>(
        '/feedback',
        data
      );

      return response;
    } catch (error) {
      console.error('Create feedback error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to submit feedback',
          code: 'CREATE_FEEDBACK_ERROR',
        },
      };
    }
  }

  /**
   * Delete feedback
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.delete<void>(`/feedback/${id}`);

      return response;
    } catch (error) {
      console.error('Delete feedback error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to delete feedback',
          code: 'DELETE_FEEDBACK_ERROR',
        },
      };
    }
  }

  /**
   * Helper: Submit bug report
   */
  async submitBugReport(
    message: string
  ): Promise<ApiResponse<BackendFeedback>> {
    return this.create({
      category: 'bug',
      message,
    });
  }

  /**
   * Helper: Submit feature request
   */
  async submitFeatureRequest(
    message: string
  ): Promise<ApiResponse<BackendFeedback>> {
    return this.create({
      category: 'feature',
      message,
    });
  }

  /**
   * Helper: Submit general feedback
   */
  async submitGeneralFeedback(
    message: string
  ): Promise<ApiResponse<BackendFeedback>> {
    return this.create({
      category: 'general',
      message,
    });
  }

  /**
   * Helper: Submit complaint
   */
  async submitComplaint(
    message: string
  ): Promise<ApiResponse<BackendFeedback>> {
    return this.create({
      category: 'complaint',
      message,
    });
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const feedbackApi = new FeedbackApiService();
