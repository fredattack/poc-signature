import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing, borderRadius, layout } from '@/constants/spacing';

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: spacing.sm,
  },
  paddingMedium: {
    padding: layout.cardPadding,
  },
  paddingLarge: {
    padding: spacing.lg,
  },
});
