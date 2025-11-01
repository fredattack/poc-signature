// Premium lock badge for premium-only features

import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/theme';

export interface PremiumBadgeProps {
  size?: 'small' | 'medium' | 'large';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
  size = 'medium',
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  let iconSize = 24;
  if (size === 'small') iconSize = 16;
  else if (size === 'large') iconSize = 32;

  let containerSize = 40;
  if (size === 'small') containerSize = 32;
  else if (size === 'large') containerSize = 56;

  return (
    <View
      style={[
        styles.container,
        { width: containerSize, height: containerSize },
      ]}
    >
      <Text style={[styles.lockIcon, { fontSize: iconSize }]}>🔒</Text>
    </View>
  );
};

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.brand.accent,
      borderRadius: tokens.radii.full,
      justifyContent: 'center',
      ...tokens.elevation.level2,
    },
    lockIcon: {
      color: colors.text.inverse,
    },
  });
