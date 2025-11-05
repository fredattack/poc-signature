// Home screen with "New Signature" CTA

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
import { formatRelativeTime } from '@/utils/formatters';

export default function HomeScreen() {
  const router = useRouter();
  const { screen } = useAnalytics();
  const { signatures, loadSignatures, getActiveSignatures } = useSignaturesStore();

  useEffect(() => {
    screen('Home');
    loadSignatures();
  }, [screen, loadSignatures]);

  const activeSignatures = getActiveSignatures();
  const recentSignatures = activeSignatures.slice(0, 3);

  const handleNewSignature = () => {
    router.push('/signature-canvas');
  };

  const handleViewAll = () => {
    router.push('/(tabs)/gallery');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.title}>Digital Autographs</Text>
        <Text style={styles.subtitle}>
          Capture and preserve celebrity signatures digitally
        </Text>

        <Button
          title="✍️ New Signature"
          onPress={handleNewSignature}
          variant="primary"
          fullWidth
          style={styles.ctaButton}
        />
      </View>

      {/* Stats Card */}
      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{activeSignatures.length}</Text>
            <Text style={styles.statLabel}>Signatures</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {recentSignatures.length > 0 ? 'Recent' : 'None'}
            </Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>
      </Card>

      {/* Recent Signatures */}
      {recentSignatures.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Signatures</Text>
            <Button
              title="View All"
              onPress={handleViewAll}
              variant="ghost"
              size="small"
            />
          </View>

          {recentSignatures.map((signature) => (
            <Card key={signature.id} style={styles.signatureCard}>
              <Text style={styles.signatureName}>{signature.celebrityName}</Text>
              <Text style={styles.signatureDate}>
                {formatRelativeTime(signature.capturedAt)}
              </Text>
              {signature.location && (
                <Text style={styles.signatureLocation}>
                  📍 {signature.location.city}, {signature.location.country}
                </Text>
              )}
            </Card>
          ))}
        </View>
      )}

      {/* Empty State */}
      {activeSignatures.length === 0 && (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No signatures yet</Text>
          <Text style={styles.emptyText}>
            Start your collection by capturing your first celebrity signature!
          </Text>
        </Card>
      )}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  hero: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ctaButton: {
    marginTop: spacing.md,
  },
  statsCard: {
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  signatureCard: {
    marginBottom: spacing.sm,
  },
  signatureName: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  signatureDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  signatureLocation: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  emptyCard: {
    alignItems: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    marginTop: spacing.md,
  },
});
