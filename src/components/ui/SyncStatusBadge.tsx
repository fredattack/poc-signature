import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SyncStatus } from '@/types/sync.types';
import { useThemeTokens } from '@/theme';

export interface SyncStatusBadgeProps {
  status: SyncStatus;
  size?: 'small' | 'medium';
}

export const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({
  status,
  size = 'small',
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getStatusConfig = () => {
    switch (status) {
      case SyncStatus.Pending:
        return {
          label: 'Pending',
          backgroundColor: theme.colors.feedback.warning,
          textColor: theme.colors.text.inverse,
        };
      case SyncStatus.Synced:
        return {
          label: 'Synced',
          backgroundColor: theme.colors.feedback.success,
          textColor: theme.colors.text.inverse,
        };
      case SyncStatus.Failed:
        return {
          label: 'Failed',
          backgroundColor: theme.colors.feedback.critical,
          textColor: theme.colors.text.inverse,
        };
      default:
        return {
          label: 'Unknown',
          backgroundColor:
            theme.mode === 'dark'
              ? 'rgba(244, 244, 244, 0.12)'
              : 'rgba(35, 35, 35, 0.12)',
          textColor: theme.colors.text.primary,
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

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      borderRadius: tokens.radii.mild,
      paddingHorizontal: tokens.spacing.xs,
      paddingVertical: tokens.spacing.xs / 2,
    },
    badgeMedium: {
      paddingHorizontal: tokens.spacing.xs,
      paddingVertical: tokens.spacing.micro,
    },
    badgeSmall: {
      paddingHorizontal: tokens.spacing.micro,
      paddingVertical: 2,
    },
    text: {
      ...captionTypography,
      color: colors.text.inverse,
    },
    textMedium: {
      fontSize: 13,
    },
    textSmall: {
      fontSize: 11,
    },
  });
};
