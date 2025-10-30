// Signatures API service for cloud sync (mock implementation for POC)

import { apiClient, ApiResponse } from './client';
import { Signature } from '@/types/signature.types';

export interface SyncResponse {
  synced: string[]; // IDs of successfully synced signatures
  failed: string[]; // IDs of failed signatures
}

/**
 * Signatures API service for cloud sync
 * Mock implementation for POC - replace with actual backend
 */
class SignaturesApiService {
  /**
   * Get all signatures from cloud
   * TODO: Replace with actual API call
   */
  async getAll(): Promise<ApiResponse<Signature[]>> {
    // Mock implementation - simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return empty array for mock
    return {
      data: [],
      status: 200,
    };

    // Real implementation:
    // return apiClient.get<Signature[]>('/signatures');
  }

  /**
   * Create signature in cloud
   * TODO: Replace with actual API call
   */
  async create(signature: Signature): Promise<ApiResponse<Signature>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      data: {
        ...signature,
        cloudImageUrl: `https://cdn.signature-app.com/${signature.id}.png`,
      },
      status: 201,
    };

    // Real implementation:
    // return apiClient.post<Signature>('/signatures', signature);
  }

  /**
   * Update signature in cloud
   * TODO: Replace with actual API call
   */
  async update(id: string, updates: Partial<Signature>): Promise<ApiResponse<Signature>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      data: { id, ...updates } as Signature,
      status: 200,
    };

    // Real implementation:
    // return apiClient.put<Signature>(`/signatures/${id}`, updates);
  }

  /**
   * Delete signature from cloud
   * TODO: Replace with actual API call
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      status: 204,
    };

    // Real implementation:
    // return apiClient.delete<void>(`/signatures/${id}`);
  }

  /**
   * Batch sync multiple signatures
   * TODO: Replace with actual API call
   */
  async batchSync(signatures: Signature[]): Promise<ApiResponse<SyncResponse>> {
    // Mock implementation - simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate 90% success rate
    const synced: string[] = [];
    const failed: string[] = [];

    signatures.forEach(sig => {
      if (Math.random() > 0.1) {
        synced.push(sig.id);
      } else {
        failed.push(sig.id);
      }
    });

    return {
      data: { synced, failed },
      status: 200,
    };

    // Real implementation:
    // return apiClient.post<SyncResponse>('/signatures/batch-sync', { signatures });
  }
}

export const signaturesApi = new SignaturesApiService();
