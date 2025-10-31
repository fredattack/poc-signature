// Paywall modal for premium subscription

import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePremium } from '@/hooks/usePremium';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SubscriptionPlan } from '@/services/api/subscriptions';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE, TRIAL_DURATION_DAYS } from '@/utils/constants';
import { useThemeTokens } from '@/theme';

export interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  feature?: string;
}

const benefits = [
  'Unlimited signature storage',
  '15+ premium wallpaper templates',
  'HD & UHD wallpaper export',
  'Priority customer support',
  'Early access to new features',
  'Ad-free experience',
];

export const PaywallModal: React.FC<PaywallModalProps> = ({
  visible,
  onClose,
  onSuccess,
  feature,
}) => {
  const { activatePremium, isLoading } = usePremium();
  const { track } = useAnalytics();
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SubscriptionPlan.Annual);

  React.useEffect(() => {
    if (visible) {
      track(ANALYTICS_EVENTS.PAYWALL_VIEWED, {
        feature,
      });
    }
  }, [visible, feature, track]);

  const handleSubscribe = async () => {
    track(ANALYTICS_EVENTS.SUBSCRIPTION_STARTED, {
      plan_type: selectedPlan,
      price: selectedPlan === SubscriptionPlan.Annual ? PREMIUM_ANNUAL_PRICE : PREMIUM_MONTHLY_PRICE,
    });

    // Mock subscription activation
    const success = await activatePremium(selectedPlan);

    if (success) {
      track(ANALYTICS_EVENTS.SUBSCRIPTION_COMPLETED, {
        plan_type: selectedPlan,
        is_trial: true,
      });

      onSuccess?.();
      onClose();
    }
  };

  const annualSavings = ((PREMIUM_MONTHLY_PRICE * 12 - PREMIUM_ANNUAL_PRICE) / (PREMIUM_MONTHLY_PRICE * 12) * 100).toFixed(0);

  return (
    <Modal visible={visible} onClose={onClose} title="Upgrade to Premium">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Start your {TRIAL_DURATION_DAYS}-day free trial and unlock all premium features
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        {/* Pricing Options */}
        <View style={styles.pricingContainer}>
          {/* Annual Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === SubscriptionPlan.Annual && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan(SubscriptionPlan.Annual)}
            activeOpacity={0.7}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Annual</Text>
              {annualSavings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>Save {annualSavings}%</Text>
                </View>
              )}
            </View>
            <Text style={styles.planPrice}>${PREMIUM_ANNUAL_PRICE}/year</Text>
            <Text style={styles.planDetails}>
              ${(PREMIUM_ANNUAL_PRICE / 12).toFixed(2)}/month
            </Text>
          </TouchableOpacity>

          {/* Monthly Plan */}
          <TouchableOpacity
            style={[
              styles.planCard,
              selectedPlan === SubscriptionPlan.Monthly && styles.planCardSelected,
            ]}
            onPress={() => setSelectedPlan(SubscriptionPlan.Monthly)}
            activeOpacity={0.7}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>Monthly</Text>
            </View>
            <Text style={styles.planPrice}>${PREMIUM_MONTHLY_PRICE}/month</Text>
            <Text style={styles.planDetails}>Billed monthly</Text>
          </TouchableOpacity>
        </View>

        {/* Subscribe Button */}
        <Button
          title={`Start ${TRIAL_DURATION_DAYS}-Day Free Trial`}
          onPress={handleSubscribe}
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        />

        {/* Fine Print */}
        <Text style={styles.finePrint}>
          Cancel anytime during trial. ${selectedPlan === SubscriptionPlan.Annual ? PREMIUM_ANNUAL_PRICE : PREMIUM_MONTHLY_PRICE} will be charged after trial ends.
        </Text>
      </ScrollView>
    </Modal>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

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

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: tokens.typography.caption.fontWeight,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const captionBoldTypography = {
    ...captionTypography,
    fontWeight: '600' as const,
  };

  const selectedBackground =
    mode === 'dark'
      ? 'rgba(129, 144, 85, 0.18)'
      : 'rgba(138, 154, 91, 0.08)';

  return StyleSheet.create({
    subtitle: {
      ...bodyTypography,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: tokens.spacing.md,
    },
    benefitsContainer: {
      marginBottom: tokens.spacing.lg,
    },
    benefitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: tokens.spacing.sm,
    },
    checkmark: {
      ...headingTypography,
      color: colors.feedback.success,
      marginRight: tokens.spacing.sm,
    },
    benefitText: {
      ...bodyTypography,
      color: colors.text.primary,
      flex: 1,
    },
    pricingContainer: {
      marginBottom: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    planCard: {
      padding: tokens.spacing.md,
      borderRadius: tokens.radii.regular,
      borderWidth: 2,
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.16)'
          : 'rgba(35, 35, 35, 0.12)',
      backgroundColor: colors.surface.card,
    },
    planCardSelected: {
      borderColor: colors.brand.primary,
      backgroundColor: selectedBackground,
    },
    planHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.xs,
    },
    planName: {
      ...headingTypography,
      color: colors.text.primary,
    },
    savingsBadge: {
      backgroundColor: colors.brand.accent,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.micro,
      borderRadius: tokens.radii.mild,
    },
    savingsText: {
      ...captionBoldTypography,
      color: colors.text.inverse,
    },
    planPrice: {
      ...priceTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.micro,
    },
    planDetails: {
      ...captionTypography,
      color: colors.text.secondary,
    },
    finePrint: {
      ...captionTypography,
      color: colors.text.secondary,
      textAlign: 'center',
      marginTop: tokens.spacing.md,
    },
  });
};
