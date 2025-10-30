// Subscription details card

import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Subscription, SubscriptionStatus, SubscriptionPlan } from '@/services/api/subscriptions';
import { usePremium } from '@/hooks/usePremium';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE } from '@/utils/constants';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

export interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const { cancelSubscription, isLoading } = usePremium();
  const { track } = useAnalytics();

  const handleCancel = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel? You will lose access to premium features at the end of your billing period.',
      [
        {
          text: 'Keep Subscription',
          style: 'cancel',
        },
        {
          text: 'Cancel',
          style: 'destructive',
          onPress: async () => {
            const success = await cancelSubscription();
            if (success) {
              track(ANALYTICS_EVENTS.SUBSCRIPTION_CANCELED, {
                plan_type: subscription.plan,
              });
              Alert.alert(
                'Subscription Canceled',
                'Your subscription will remain active until the end of your billing period.'
              );
            }
          },
        },
      ]
    );
  };

  const getStatusBadgeColor = () => {
    switch (subscription.status) {
      case SubscriptionStatus.Active:
        return colors.success;
      case SubscriptionStatus.Trialing:
        return colors.info;
      case SubscriptionStatus.Canceled:
        return colors.textSecondary;
      case SubscriptionStatus.PastDue:
      case SubscriptionStatus.Unpaid:
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = () => {
    switch (subscription.status) {
      case SubscriptionStatus.Active:
        return 'Active';
      case SubscriptionStatus.Trialing:
        return 'Free Trial';
      case SubscriptionStatus.Canceled:
        return 'Canceled';
      case SubscriptionStatus.PastDue:
        return 'Past Due';
      case SubscriptionStatus.Unpaid:
        return 'Unpaid';
      default:
        return 'Unknown';
    }
  };

  const getPlanPrice = () => {
    return subscription.plan === SubscriptionPlan.Annual
      ? `$${PREMIUM_ANNUAL_PRICE}/year`
      : `$${PREMIUM_MONTHLY_PRICE}/month`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.planName}>
          {subscription.plan === SubscriptionPlan.Annual ? 'Annual' : 'Monthly'} Plan
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeColor() }]}>
          <Text style={styles.statusText}>{getStatusLabel()}</Text>
        </View>
      </View>

      <Text style={styles.price}>{getPlanPrice()}</Text>

      <View style={styles.detailsContainer}>
        {subscription.trialEnd && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Trial ends:</Text>
            <Text style={styles.detailValue}>{formatDate(subscription.trialEnd)}</Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            {subscription.cancelAtPeriodEnd ? 'Access until:' : 'Renews on:'}
          </Text>
          <Text style={styles.detailValue}>{formatDate(subscription.currentPeriodEnd)}</Text>
        </View>
      </View>

      {subscription.cancelAtPeriodEnd ? (
        <Text style={styles.canceledText}>
          Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
        </Text>
      ) : (
        <Button
          title="Cancel Subscription"
          onPress={handleCancel}
          variant="secondary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  planName: {
    ...typography.h3,
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
  },
  statusText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '600',
  },
  price: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  detailsContainer: {
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500',
  },
  canceledText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
});
