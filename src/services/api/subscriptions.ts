// Subscription API service (mock Stripe integration for POC)

import { apiClient, ApiResponse } from './client';

export enum SubscriptionStatus {
  Active = 'active',
  Trialing = 'trialing',
  Canceled = 'canceled',
  PastDue = 'past_due',
  Unpaid = 'unpaid',
}

export enum SubscriptionPlan {
  Monthly = 'monthly',
  Annual = 'annual',
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
}

export interface CreateCheckoutSessionRequest {
  plan: SubscriptionPlan;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

/**
 * Subscription service for Stripe integration
 * Mock implementation for POC - replace with actual Stripe API
 */
class SubscriptionService {
  /**
   * Create Stripe checkout session
   * TODO: Replace with actual Stripe API call
   */
  async createCheckoutSession(
    request: CreateCheckoutSessionRequest
  ): Promise<ApiResponse<CheckoutSession>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const session: CheckoutSession = {
      sessionId: `cs_test_${Date.now()}`,
      url: `https://checkout.stripe.com/pay/${Date.now()}`,
    };

    return {
      data: session,
      status: 200,
    };

    // Real implementation:
    // return apiClient.post<CheckoutSession>('/subscriptions/checkout', request);
  }

  /**
   * Get current subscription status
   * TODO: Replace with actual API call
   */
  async getSubscriptionStatus(): Promise<ApiResponse<Subscription | null>> {
    // Mock implementation - simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return null for free users (no subscription)
    return {
      data: null,
      status: 200,
    };

    // Real implementation:
    // return apiClient.get<Subscription | null>('/subscriptions/status');
  }

  /**
   * Cancel subscription
   * TODO: Replace with actual API call
   */
  async cancelSubscription(): Promise<ApiResponse<{ message: string }>> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      data: { message: 'Subscription will be canceled at the end of the billing period' },
      status: 200,
    };

    // Real implementation:
    // return apiClient.post<{ message: string }>('/subscriptions/cancel', {});
  }

  /**
   * Check if user has premium access (active subscription or trial)
   * TODO: Replace with actual API call
   */
  async checkPremiumStatus(): Promise<boolean> {
    try {
      const response = await this.getSubscriptionStatus();

      if (response.error || !response.data) {
        return false;
      }

      const subscription = response.data;

      return (
        subscription.status === SubscriptionStatus.Active ||
        subscription.status === SubscriptionStatus.Trialing
      );
    } catch (error) {
      console.error('Failed to check premium status:', error);
      return false;
    }
  }

  /**
   * Mock: Activate premium (for testing)
   * This simulates a successful subscription purchase
   */
  async mockActivatePremium(): Promise<ApiResponse<Subscription>> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 7); // 7-day trial

    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1); // 1 month

    const subscription: Subscription = {
      id: `sub_${Date.now()}`,
      userId: `user_${Date.now()}`,
      plan: SubscriptionPlan.Monthly,
      status: SubscriptionStatus.Trialing,
      currentPeriodEnd,
      cancelAtPeriodEnd: false,
      trialEnd,
    };

    return {
      data: subscription,
      status: 200,
    };
  }
}

export const subscriptionService = new SubscriptionService();
