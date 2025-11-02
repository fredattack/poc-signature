// Home screen with "New Signature" CTA

import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatRelativeTime } from '@/utils/formatters';
import { useThemeTokens } from '@/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { screen } = useAnalytics();
  const {
    signatures: _signatures,
    loadSignatures,
    getActiveSignatures,
  } = useSignaturesStore();
  const theme = useThemeTokens();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(theme, insets.top),
    [theme, insets.top]
  );

  useEffect(() => {
    screen('Home');
    void loadSignatures();
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
          title="New Signature"
          onPress={handleNewSignature}
          variant="primary"
          fullWidth
          style={styles.ctaButton}
          icon={
            <Icon
              name="pencil-line"
              size="sm"
              color={theme.colors.text.inverse}
            />
          }
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
              <Text style={styles.signatureName}>
                {signature.celebrityName}
              </Text>
              <Text style={styles.signatureDate}>
                {formatRelativeTime(signature.capturedAt)}
              </Text>
              {signature.location && (
                <View style={styles.signatureLocationContainer}>
                  <Icon
                    name="map-pin"
                    size="xs"
                    color={theme.colors.text.tertiary}
                  />
                  <Text style={styles.signatureLocation}>
                    {signature.location.city}, {signature.location.country}
                  </Text>
                </View>
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

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <Button
            title="Capture Signature"
            onPress={handleNewSignature}
            variant="secondary"
            fullWidth
            icon={
              <Icon name="camera" size="sm" color={theme.colors.text.primary} />
            }
          />
          <Button
            title="View Gallery"
            onPress={handleViewAll}
            variant="secondary"
            fullWidth
            style={styles.galleryButton}
            icon={
              <Icon name="books" size="sm" color={theme.colors.text.primary} />
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (
  { colors, tokens }: ReturnType<typeof useThemeTokens>,
  topInset: number
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface.background,
      flex: 1,
    },
    content: {
      paddingBottom: tokens.spacing.xl,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: topInset + tokens.spacing.md,
    },
    ctaButton: {
      marginTop: tokens.spacing.md,
    },
    emptyCard: {
      alignItems: 'center',
      marginBottom: tokens.spacing.lg,
    },
    emptyText: {
      color: colors.text.secondary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
      letterSpacing: tokens.typography.body.letterSpacing,
      lineHeight: tokens.typography.body.lineHeight,
      textAlign: 'center',
    },
    emptyTitle: {
      color: colors.text.primary,
      fontSize: tokens.typography.headingS.fontSize,
      fontWeight: tokens.typography.headingS.fontWeight,
      letterSpacing: tokens.typography.headingS.letterSpacing,
      lineHeight: tokens.typography.headingS.lineHeight,
      marginBottom: tokens.spacing.xs,
    },
    galleryButton: {
      marginTop: tokens.spacing.sm,
    },
    hero: {
      marginBottom: tokens.spacing.lg,
    },
    quickActions: {
      gap: tokens.spacing.sm,
    },
    section: {
      marginBottom: tokens.spacing.lg,
    },
    sectionHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: tokens.spacing.md,
    },
    sectionTitle: {
      color: colors.text.primary,
      fontSize: tokens.typography.headingM.fontSize,
      fontWeight: tokens.typography.headingM.fontWeight,
      letterSpacing: tokens.typography.headingM.letterSpacing,
      lineHeight: tokens.typography.headingM.lineHeight,
    },
    signatureCard: {
      marginBottom: tokens.spacing.sm,
    },
    signatureDate: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
    },
    signatureLocation: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
      marginLeft: tokens.spacing.xs,
    },
    signatureLocationContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: tokens.spacing.xs,
    },
    signatureName: {
      color: colors.text.primary,
      fontSize: tokens.typography.headingS.fontSize,
      fontWeight: tokens.typography.headingS.fontWeight,
      letterSpacing: tokens.typography.headingS.letterSpacing,
      lineHeight: tokens.typography.headingS.lineHeight,
    },
    stat: {
      alignItems: 'center',
      flex: 1,
    },
    statDivider: {
      backgroundColor: colors.overlay.light,
      height: 40,
      width: 1,
    },
    statLabel: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: tokens.typography.caption.fontWeight,
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
    },
    statValue: {
      color: colors.brand.primary,
      fontSize: tokens.typography.headingL.fontSize,
      fontWeight: tokens.typography.headingL.fontWeight,
      letterSpacing: tokens.typography.headingL.letterSpacing,
      lineHeight: tokens.typography.headingL.lineHeight,
      marginBottom: tokens.spacing.xs,
    },
    statsCard: {
      marginBottom: tokens.spacing.lg,
    },
    statsRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    subtitle: {
      color: colors.text.secondary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: tokens.typography.body.fontWeight,
      letterSpacing: tokens.typography.body.letterSpacing,
      lineHeight: tokens.typography.body.lineHeight,
      marginBottom: tokens.spacing.lg,
      textAlign: 'center',
    },
    title: {
      color: colors.text.primary,
      fontSize: tokens.typography.displayM.fontSize,
      fontWeight: tokens.typography.displayM.fontWeight,
      letterSpacing: tokens.typography.displayM.letterSpacing,
      lineHeight: tokens.typography.displayM.lineHeight,
      marginBottom: tokens.spacing.xs,
      textAlign: 'center',
    },
  });
