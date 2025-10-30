import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { layout } from '@/constants/spacing';

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = colors.primary,
  fullScreen = false,
  style,
}) => {
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return 'small' as const;
      case 'large':
        return 'large' as const;
      default:
        return undefined;
    }
  };

  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size={getSizeValue()} color={color} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={getSizeValue()} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layout.componentGap,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
