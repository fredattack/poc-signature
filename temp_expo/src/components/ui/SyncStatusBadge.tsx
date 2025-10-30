import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SyncStatus } from '@/types/sync.types';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, borderRadius } from '@/constants/spacing';

export interface SyncStatusBadgeProps {
  status: SyncStatus;
  size?: 'small' | 'medium';
}

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({
  status,
  size = 'small',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case SyncStatus.Pending:
        return {
          label: 'Pending',
          backgroundColor: colors.warning,
          textColor: colors.textInverse,
        };
      case SyncStatus.Synced:
        return {
          label: 'Synced',
          backgroundColor: colors.success,
          textColor: colors.textInverse,
        };
      case SyncStatus.Failed:
        return {
          label: 'Failed',
          backgroundColor: colors.error,
          textColor: colors.textInverse,
        };
      default:
        return {
          label: 'Unknown',
          backgroundColor: colors.border,
          textColor: colors.text,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={[
        styles.badge,
        size === 'small' && styles.badgeSmall,
        size === 'medium' && styles.badgeMedium,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'small' && styles.textSmall,
          size === 'medium' && styles.textMedium,
          { color: config.textColor },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingVertical: 2,
    paddingHorizontal: spacing.xs,
  },
  badgeMedium: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 10,
  },
  textMedium: {
    fontSize: 12,
  },
});
