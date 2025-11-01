// Gallery screen with 2-column grid, sorting, and management

import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { SignatureCard } from '@/components/signature/SignatureCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Header } from '@/components/shared/Header';
import { useSignaturesStore } from '@/store/signatures-store';
import { useAnalytics } from '@/hooks/useAnalytics';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';
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
  const loadSignatures = useSignaturesStore((state) => state.loadSignatures);
  const getSortedSignatures = useSignaturesStore(
    (state) => state.getSortedSignatures
  );
  const getActiveSignatures = useSignaturesStore(
    (state) => state.getActiveSignatures
  );

  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    screen('Gallery');
    loadSignatures();
  }, [screen, loadSignatures]);

  const signatures: Signature[] = getSortedSignatures(sortBy);
  const activeCount = getActiveSignatures().length;

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowSortMenu(false);
    track(ANALYTICS_EVENTS.GALLERY_SORTED, {
      sort_by: option,
      signature_count: signatures.length,
    });
  };

  const handleSignaturePress = (signatureId: string) => {
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
            Sort: {currentOption?.label || 'Recent'}
          </Text>
          <Text style={styles.sortIcon}>{showSortMenu ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showSortMenu && (
          <View style={styles.sortMenu}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
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
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
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
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  checkmark: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  emptyIcon: {
    fontSize: 64,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  sortButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  sortButtonText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  sortContainer: {
    position: 'relative',
  },
  sortIcon: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  sortMenu: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 5,
    minWidth: 120,
    position: 'absolute',
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 40,
    zIndex: 1000,
  },
  sortMenuItem: {
    alignItems: 'center',
    borderBottomColor: colors.borderLight,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sortMenuItemActive: {
    backgroundColor: colors.primaryLight,
  },
  sortMenuItemText: {
    ...typography.body,
    color: colors.text,
  },
  sortMenuItemTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
