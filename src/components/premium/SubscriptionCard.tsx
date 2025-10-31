// Subscription details card

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Subscription, SubscriptionStatus, SubscriptionPlan } from '@/services/api/subscriptions';
import { usePremium } from '@/hooks/usePremium';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE } from '@/utils/constants';
import { useThemeTokens } from '@/theme';

export interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const { cancelSubscription, isLoading } = usePremium();
  const { track } = useAnalytics();
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
        return theme.colors.feedback.success;
      case SubscriptionStatus.Trialing:
        return theme.colors.feedback.info;
      case SubscriptionStatus.Canceled:
        return theme.colors.text.secondary;
      case SubscriptionStatus.PastDue:
      case SubscriptionStatus.Unpaid:
        return theme.colors.feedback.critical;
      default:
        return theme.colors.text.secondary;
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

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const headingTypography = {
    fontSize: tokens.typography.headingM.fontSize,
    lineHeight: tokens.typography.headingM.lineHeight,
    fontWeight: tokens.typography.headingM.fontWeight,
    letterSpacing: tokens.typography.headingM.letterSpacing,
  };

  const priceTypography = {
    fontSize: tokens.typography.headingL.fontSize,
    lineHeight: tokens.typography.headingL.lineHeight,
    fontWeight: tokens.typography.headingL.fontWeight,
    letterSpacing: tokens.typography.headingL.letterSpacing,
  };

  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.sm,
    },
    planName: {
      ...headingTypography,
      color: colors.text.primary,
    },
    statusBadge: {
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.micro,
      borderRadius: tokens.radii.mild,
    },
    statusText: {
      ...captionTypography,
      color: colors.text.inverse,
    },
    price: {
      ...priceTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.md,
    },
    detailsContainer: {
      marginBottom: tokens.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.xs,
    },
    detailLabel: {
      ...bodyTypography,
      color: colors.text.secondary,
    },
    detailValue: {
      ...bodyTypography,
      color: colors.text.primary,
      fontWeight: '500',
    },
    canceledText: {
      ...bodyTypography,
      color: colors.feedback.critical,
      textAlign: 'center',
    },
  });
};
