// Gallery screen with 2-column grid, sorting, and management

import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { SignatureCard } from '@/components/signature/SignatureCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Header } from '@/components/shared/Header';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useHaptics } from '@/hooks/useHaptics';
import { useThemeTokens } from '@/theme';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { Signature } from '@/types/signature.types';

type SortOption = 'recent' | 'oldest' | 'a-z' | 'z-a';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recent', label: 'Recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'A-Z' },
  { value: 'z-a', label: 'Z-A' },
];

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
  const getSortedSignatures = useSignaturesStore(
    (state: {
      getSortedSignatures: (
        sortBy: 'recent' | 'oldest' | 'a-z' | 'z-a'
      ) => Signature[];
    }) => state.getSortedSignatures
  );
  const getActiveSignatures = useSignaturesStore(
    (state: { getActiveSignatures: () => Signature[] }) =>
      state.getActiveSignatures
  );

  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    screen('Gallery');
    void loadSignatures();
  }, [screen, loadSignatures]);

  const signatures: Signature[] = getSortedSignatures(sortBy);
  const activeCount = getActiveSignatures().length;

  const handleSortChange = (option: SortOption) => {
    haptics.triggerSelection();
    setSortBy(option);
    setShowSortMenu(false);
    track(ANALYTICS_EVENTS.GALLERY_SORTED, {
      sort_by: option,
      signature_count: signatures.length,
    });
  };

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

  const renderSortButton = () => {
    const currentOption = sortOptions.find((opt) => opt.value === sortBy);

    return (
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortMenu(!showSortMenu)}
          activeOpacity={0.7}
        >
          <Text style={styles.sortButtonText}>
            Sort: {currentOption?.label ?? 'Recent'}
          </Text>
          <Text style={styles.sortIcon}>{showSortMenu ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showSortMenu && (
          <Animated.View
            entering={FadeIn.duration(200).springify()}
            style={styles.sortMenu}
          >
            {sortOptions.map((option, index) => (
              <Animated.View
                key={option.value}
                entering={SlideInDown.delay(index * 50)
                  .duration(200)
                  .springify()}
              >
                <TouchableOpacity
                  style={[
                    styles.sortMenuItem,
                    sortBy === option.value && styles.sortMenuItemActive,
                  ]}
                  onPress={() => handleSortChange(option.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.sortMenuItemText,
                      sortBy === option.value && styles.sortMenuItemTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {sortBy === option.value && (
                    <Animated.Text
                      entering={FadeIn.duration(150).springify()}
                      style={styles.checkmark}
                    >
                      ✓
                    </Animated.Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Gallery"
        rightAction={activeCount > 0 ? renderSortButton() : undefined}
      />

      {signatures.length === 0 ? (
        <EmptyState
          icon={<Text style={styles.emptyIcon}>📚</Text>}
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
    </View>
  );
}

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    cardWrapper: {
      flex: 1,
      paddingHorizontal: tokens.spacing.xs,
    },
    checkmark: {
      color: colors.brand.primary,
      fontSize: tokens.typography.body.fontSize,
      fontWeight: 'bold',
      lineHeight: tokens.typography.body.lineHeight,
    },
    container: {
      backgroundColor: colors.surface.background,
      flex: 1,
    },
    emptyIcon: {
      fontSize: 64,
    },
    listContent: {
      padding: tokens.spacing.md,
      paddingBottom: tokens.spacing.xl,
    },
    sortButton: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderColor: colors.overlay.light,
      borderRadius: 8,
      borderWidth: 1,
      flexDirection: 'row',
      gap: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xs,
    },
    sortButtonText: {
      color: colors.text.primary,
      fontSize: tokens.typography.caption.fontSize,
      fontWeight: '600',
      letterSpacing: tokens.typography.caption.letterSpacing,
      lineHeight: tokens.typography.caption.lineHeight,
    },
    sortContainer: {
      position: 'relative',
    },
    sortIcon: {
      color: colors.text.secondary,
      fontSize: tokens.typography.caption.fontSize,
      lineHeight: tokens.typography.caption.lineHeight,
    },
    sortMenu: {
      backgroundColor: colors.surface.card,
      borderColor: colors.overlay.light,
      borderRadius: 8,
      borderWidth: 1,
      minWidth: 120,
      position: 'absolute',
      right: 0,
      top: 40,
      zIndex: 1000,
      ...tokens.elevation.level3,
    },
    sortMenuItem: {
      alignItems: 'center',
      borderBottomColor: colors.overlay.light,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
    },
    sortMenuItemActive: {
      backgroundColor: colors.brand.primaryTint,
    },
    sortMenuItemText: {
      color: colors.text.primary,
      fontSize: tokens.typography.body.fontSize,
      lineHeight: tokens.typography.body.lineHeight,
    },
    sortMenuItemTextActive: {
      color: colors.brand.primary,
      fontWeight: '600',
    },
  });
