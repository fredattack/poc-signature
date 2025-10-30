// Paywall modal for premium subscription

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePremium } from '@/hooks/usePremium';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SubscriptionPlan } from '@/services/api/subscriptions';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { PREMIUM_MONTHLY_PRICE, PREMIUM_ANNUAL_PRICE, TRIAL_DURATION_DAYS } from '@/utils/constants';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

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

const styles = StyleSheet.create({
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  benefitsContainer: {
    marginBottom: spacing.xl,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkmark: {
    ...typography.h3,
    color: colors.success,
    marginRight: spacing.sm,
  },
  benefitText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  pricingContainer: {
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  planCard: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '10',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  planName: {
    ...typography.h3,
    color: colors.text,
  },
  savingsBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 4,
  },
  savingsText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '600',
  },
  planPrice: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs / 2,
  },
  planDetails: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  finePrint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
