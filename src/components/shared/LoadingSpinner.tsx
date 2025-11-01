import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color,
  fullScreen = false,
  style,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const spinnerColor = color ?? theme.colors.brand.primary;

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
        <ActivityIndicator size={getSizeValue()} color={spinnerColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={getSizeValue()} color={spinnerColor} />
    </View>
  );
};

const createStyles = ({ colors, tokens }: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: tokens.spacing.sm,
    },
    fullScreenContainer: {
      alignItems: 'center',
      backgroundColor: colors.surface.background,
      flex: 1,
      justifyContent: 'center',
    },
  });
