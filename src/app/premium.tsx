// Premium subscription screen

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/shared/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SubscriptionCard } from '@/components/premium/SubscriptionCard';
import { PaywallModal } from '@/components/premium/PaywallModal';
import { usePremium } from '@/hooks/usePremium';
import { useAnalytics } from '@/hooks/useAnalytics';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

const premiumFeatures = [
  {
    icon: '🎨',
    title: 'Premium Templates',
    description: '15+ exclusive wallpaper designs',
  },
  {
    icon: '🖼️',
    title: 'HD & UHD Export',
    description: 'Crystal clear wallpapers up to 4K',
  },
  {
    icon: '📱',
    title: 'Unlimited Storage',
    description: 'Save as many signatures as you want',
  },
  {
    icon: '⚡',
    title: 'Priority Support',
    description: 'Get help when you need it',
  },
  {
    icon: '🚀',
    title: 'Early Access',
    description: 'Try new features first',
  },
  {
    icon: '🎯',
    title: 'Ad-Free',
    description: 'Enjoy uninterrupted experience',
  },
];

export default function PremiumScreen() {
  const router = useRouter();
  const { isPremium, subscription, checkPremiumStatus } = usePremium();
  const { screen } = useAnalytics();

  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    screen('Premium');
    void checkPremiumStatus();
  }, [screen, checkPremiumStatus]);

  return (
    <View style={styles.container}>
      <Header
        title="Premium"
        leftAction={<Text style={styles.backText}>Back</Text>}
        onLeftPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isPremium && subscription ? (
          // Premium user - show subscription details
          <>
            <Text style={styles.statusTitle}>You&apos;re Premium! 🎉</Text>
            <Text style={styles.statusSubtitle}>
              Enjoy all premium features and support the app
            </Text>

            <SubscriptionCard subscription={subscription} />
          </>
        ) : (
          // Free user - show upgrade prompt
          <>
            <Text style={styles.title}>Unlock Premium Features</Text>
            <Text style={styles.subtitle}>
              Get access to exclusive templates, HD export, and unlimited
              storage
            </Text>

            {/* Features Grid */}
            <View style={styles.featuresGrid}>
              {premiumFeatures.map((feature, index) => (
                <Card key={index} style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </Card>
              ))}
            </View>

            {/* Upgrade Button */}
            <Button
              title="Upgrade to Premium"
              onPress={() => setShowPaywall(true)}
              variant="primary"
              fullWidth
            />
          </>
        )}
      </ScrollView>

      {/* Paywall Modal */}
      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
        onSuccess={() => {
          // Refresh premium status
          void checkPremiumStatus();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backText: {
    ...typography.body,
    color: colors.primary,
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  featureCard: {
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
  },
  featureDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  statusSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  statusTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
});
