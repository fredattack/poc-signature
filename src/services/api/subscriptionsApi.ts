/**
 * Subscriptions API Service
 *
 * Real implementation for Laravel backend with Stripe integration.
 */

import { httpClient } from './httpClient';
import { ApiResponse } from '@/types/api.types';
import { BackendSubscription, SubscriptionPlan } from '@/types/backend.types';

// ============================================================================
// SUBSCRIPTIONS API SERVICE
// ============================================================================

class SubscriptionsApiService {
  /**
   * Get all available subscription plans
   */
  async getPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    try {
      const response = await httpClient.get<SubscriptionPlan[]>(
        '/subscriptions/plans'
      );

      return response;
    } catch (error) {
      console.error('Get subscription plans error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch subscription plans',
          code: 'FETCH_PLANS_ERROR',
        },
      };
    }
  }

  /**
   * Get current user subscription status
   */
  async getStatus(): Promise<ApiResponse<BackendSubscription | null>> {
    try {
      const response = await httpClient.get<BackendSubscription | null>(
        '/subscriptions/status'
      );

      return response;
    } catch (error) {
      console.error('Get subscription status error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch subscription status',
          code: 'FETCH_STATUS_ERROR',
        },
      };
    }
  }

  /**
   * Create Stripe checkout session
   */
  async createCheckoutSession(planId: string): Promise<
    ApiResponse<{
      session_id: string;
      checkout_url: string;
    }>
  > {
    try {
      const response = await httpClient.post<{
        session_id: string;
        checkout_url: string;
      }>('/subscriptions/checkout', {
        plan_id: planId,
      });

      return response;
    } catch (error) {
      console.error('Create checkout session error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to create checkout session',
          code: 'CREATE_CHECKOUT_ERROR',
        },
      };
    }
  }

  /**
   * Cancel subscription (will cancel at period end)
   */
  async cancel(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        '/subscriptions/cancel',
        {}
      );

      return response;
    } catch (error) {
      console.error('Cancel subscription error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to cancel subscription',
          code: 'CANCEL_SUBSCRIPTION_ERROR',
        },
      };
    }
  }

  /**
   * Check if user has premium access
   */
  async hasPremiumAccess(): Promise<boolean> {
    try {
      const response = await this.getStatus();

      if (!response.success || !response.data) {
        return false;
      }

      const subscription = response.data;

      // Check if subscription is active or trialing
      if (
        subscription.status !== 'active' &&
        subscription.status !== 'trialing'
      ) {
        return false;
      }

      // Check if subscription is not expired
      const currentPeriodEnd = new Date(subscription.current_period_end);
      const now = new Date();

      return currentPeriodEnd > now;
    } catch (error) {
      console.error('Check premium access error:', error);
      return false;
    }
  }

  /**
   * Get premium features list
   */
  getPremiumFeatures(): string[] {
    return [
      'Unlimited signatures',
      'HD & UHD wallpaper resolutions',
      'Premium wallpaper templates',
      'Custom backgrounds',
      'Priority support',
      'Ad-free experience',
      'Cloud sync & backup',
      'Export in multiple formats',
    ];
  }

  /**
   * Helper: Get monthly plan
   */
  async getMonthlyPlan(): Promise<ApiResponse<SubscriptionPlan | null>> {
    try {
      const response = await this.getPlans();

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error,
        };
      }

      const monthlyPlan = response.data.find(
        (plan) => plan.billing_period === 'monthly'
      );

      return {
        success: true,
        data: monthlyPlan ?? null,
      };
    } catch (error) {
      console.error('Get monthly plan error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch monthly plan',
          code: 'FETCH_PLAN_ERROR',
        },
      };
    }
  }

  /**
   * Helper: Get annual plan
   */
  async getAnnualPlan(): Promise<ApiResponse<SubscriptionPlan | null>> {
    try {
      const response = await this.getPlans();

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error,
        };
      }

      const annualPlan = response.data.find(
        (plan) => plan.billing_period === 'annual'
      );

      return {
        success: true,
        data: annualPlan ?? null,
      };
    } catch (error) {
      console.error('Get annual plan error:', error);
      return {
        success: false,
        error: {
          message: 'Failed to fetch annual plan',
          code: 'FETCH_PLAN_ERROR',
        },
      };
    }
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const subscriptionsApi = new SubscriptionsApiService();
