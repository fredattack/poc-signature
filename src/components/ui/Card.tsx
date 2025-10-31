import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  elevated = true,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const cardStyles = [
    styles.card,
    elevated && styles.elevated,
    padding === 'none' && styles.paddingNone,
    padding === 'small' && styles.paddingSmall,
    padding === 'medium' && styles.paddingMedium,
    padding === 'large' && styles.paddingLarge,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const elevation = tokens.elevation.level2;

  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.regular,
      borderWidth: 1,
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.12)'
          : 'rgba(35, 35, 35, 0.08)',
    },
    elevated: {
      ...elevation,
    },
    paddingNone: {
      padding: 0,
    },
    paddingSmall: {
      padding: tokens.spacing.xs,
    },
    paddingMedium: {
      padding: tokens.spacing.sm,
    },
    paddingLarge: {
      padding: tokens.spacing.md,
    },
  });
};
