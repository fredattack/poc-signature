// Premium lock badge for premium-only features

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeTokens } from '@/theme';

export interface PremiumBadgeProps {
  size?: 'small' | 'medium' | 'large';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ size = 'medium' }) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const iconSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;
  const containerSize = size === 'small' ? 32 : size === 'large' ? 56 : 40;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <Text style={[styles.lockIcon, { fontSize: iconSize }]}>🔒</Text>
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.brand.accent,
      borderRadius: tokens.radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      ...tokens.elevation.level2,
    },
    lockIcon: {
      color: colors.text.inverse,
    },
  });
