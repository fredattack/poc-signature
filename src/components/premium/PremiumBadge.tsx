// Premium lock badge for premium-only features

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export interface PremiumBadgeProps {
  size?: 'small' | 'medium' | 'large';
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ size = 'medium' }) => {
  const iconSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;
  const containerSize = size === 'small' ? 32 : size === 'large' ? 56 : 40;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <Text style={[styles.lockIcon, { fontSize: iconSize }]}>🔒</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockIcon: {
    color: colors.background,
  },
});
