// Gallery screen with 2-column grid

import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { SignatureCard } from '@/components/signature/SignatureCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Header } from '@/components/shared/Header';
import { Icon } from '@/components/ui/Icon';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useHaptics } from '@/hooks/useHaptics';
import { useThemeTokens } from '@/theme';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { Signature } from '@/types/signature.types';

export default function GalleryScreen() {
  const router = useRouter();
  const { screen, track } = useAnalytics();
  const haptics = useHaptics();
  const theme = useThemeTokens();
  const { colors } = theme;
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const loadSignatures = useSignaturesStore(
    (state: { loadSignatures: () => Promise<void> }) => state.loadSignatures
  );
  const getActiveSignatures = useSignaturesStore(
    (state: { getActiveSignatures: () => Signature[] }) =>
      state.getActiveSignatures
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    screen('Gallery');
    void loadSignatures();
  }, [screen, loadSignatures]);

  const signatures: Signature[] = getActiveSignatures();

  const handleSignaturePress = (signatureId: string) => {
    haptics.triggerLight();
    router.push({
      pathname: '/signature-detail',
      params: { signatureId },
    });
  };

  const handleNewSignature = () => {
    router.push('/signature-canvas');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    track(ANALYTICS_EVENTS.GALLERY_REFRESHED, {
      signature_count: signatures.length,
    });
    await loadSignatures();
    setRefreshing(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <Header
        title="Gallery"
        leftAction={
          <View style={styles.backButton}>
            <Icon name="chevron-left" size="sm" color={colors.brand.primary} />
            <Text style={styles.backText}>Back</Text>
          </View>
        }
        onLeftPress={handleBack}
      />

      {signatures.length === 0 ? (
        <EmptyState
          icon={
            <Icon name="books" size={64} color={theme.colors.text.tertiary} />
          }
          title="No signatures yet"
          description="Start your collection by capturing your first celebrity signature!"
          ctaLabel="Create First Signature"
          onCtaPress={handleNewSignature}
        />
      ) : (
        <FlashList<Signature>
          data={signatures}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <SignatureCard
                signature={item}
                onPress={() => handleSignaturePress(item.id)}
              />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => void handleRefresh()}
              tintColor={colors.brand.primary}
              colors={[colors.brand.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    },
    backText: {
      color: colors.brand.primary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: '500',
    },
    cardWrapper: {
      flex: 1,
      paddingHorizontal: tokens.spacing.xs,
    },
    container: {
      backgroundColor: colors.surface.background,
      flex: 1,
    },
    listContent: {
      padding: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
    },
  });
