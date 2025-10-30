// Subscription types

export enum SubscriptionPlan {
  Free = 'free',
  Monthly = 'monthly',
  Annual = 'annual',
}

export enum SubscriptionStatus {
  None = 'none',
  Trialing = 'trialing',
  Active = 'active',
  Expired = 'expired',
  Canceled = 'canceled',
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  trialEndDate?: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  price: number;
  currency: string;
}

export interface SubscriptionCheckoutParams {
  plan: SubscriptionPlan;
  successUrl: string;
  cancelUrl: string;
}

export interface SubscriptionCheckoutResult {
  sessionId: string;
  url: string;
}

export interface PremiumFeatures {
  unlimitedSignatures: boolean;
  premiumTemplates: boolean;
  hdExport: boolean;
  prioritySupport: boolean;
}
