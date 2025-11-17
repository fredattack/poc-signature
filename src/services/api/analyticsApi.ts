/**
 * Analytics API Service
 *
 * Real implementation for Laravel backend.
 */

import { httpClient } from './httpClient';
import { ApiResponse } from '@/types/api.types';
import { AnalyticsEvent, AnalyticsStats } from '@/types/backend.types';

// ============================================================================
// ANALYTICS API SERVICE
// ============================================================================

class AnalyticsApiService {
  /**
   * Track an analytics event
   */
  async trackEvent(event: AnalyticsEvent): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>('/analytics/events', event);

      return response;
    } catch (error) {
      // Don't block the user if analytics fail - just log
      console.warn('Analytics event tracking failed (non-blocking):', error);
      return {
        success: false,
        error: {
          message: 'Failed to track analytics event',
          code: 'ANALYTICS_TRACK_ERROR',
        },
      };
    }
  }

  /**
   * Track multiple events in batch (for performance)
   */
  async trackEventsBatch(events: AnalyticsEvent[]): Promise<ApiResponse<void>> {
    try {
      const response = await httpClient.post<void>('/analytics/events/batch', {
        events,
      });

      return response;
    } catch (error) {
      console.warn('Analytics batch tracking failed (non-blocking):', error);
      return {
        success: false,
        error: {
          message: 'Failed to track analytics events',
          code: 'ANALYTICS_BATCH_ERROR',
        },
      };
    }
  }

  /**
   * Get user analytics stats
   */
  async getStats(): Promise<ApiResponse<AnalyticsStats>> {
    try {
      const response = await httpClient.get<AnalyticsStats>('/analytics/stats');

      return response;
    } catch (error) {
      console.error('Get analytics stats error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch analytics stats',
          code: 'ANALYTICS_STATS_ERROR',
        },
      };
    }
  }

  /**
   * Helper: Track signature created
   */
  async trackSignatureCreated(signatureId: string): Promise<void> {
    await this.trackEvent({
      event_type: 'signature_created',
      event_data: {
        signature_id: signatureId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Track wallpaper generated
   */
  async trackWallpaperGenerated(
    wallpaperId: string,
    templateId: string
  ): Promise<void> {
    await this.trackEvent({
      event_type: 'wallpaper_generated',
      event_data: {
        wallpaper_id: wallpaperId,
        template_id: templateId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Track wallpaper shared
   */
  async trackWallpaperShared(
    wallpaperId: string,
    platform: string
  ): Promise<void> {
    await this.trackEvent({
      event_type: 'wallpaper_shared',
      event_data: {
        wallpaper_id: wallpaperId,
        platform,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Track premium upgrade
   */
  async trackPremiumUpgrade(plan: string): Promise<void> {
    await this.trackEvent({
      event_type: 'premium_upgrade',
      event_data: {
        plan,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Helper: Track screen view
   */
  async trackScreenView(screenName: string): Promise<void> {
    await this.trackEvent({
      event_type: 'screen_view',
      event_data: {
        screen_name: screenName,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const analyticsApi = new AnalyticsApiService();
