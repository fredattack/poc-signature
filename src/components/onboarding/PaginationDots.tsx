// Pagination dots indicator for onboarding carousel

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { useThemeTokens } from '@/theme';

export interface PaginationDotsProps {
  slides: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  slides,
  scrollX,
  slideWidth,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {Array.from({ length: slides }).map((_, index) => {
        return (
          <Dot
            key={index}
            index={index}
            scrollX={scrollX}
            slideWidth={slideWidth}
          />
        );
      })}
    </View>
  );
};

interface DotProps {
  index: number;
  scrollX: SharedValue<number>;
  slideWidth: number;
}

const Dot: React.FC<DotProps> = ({ index, scrollX, slideWidth }) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createDotStyles(theme), [theme]);

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * slideWidth,
      index * slideWidth,
      (index + 1) * slideWidth,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1.3, 0.8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const createStyles = ({
  tokens,
}: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.xs,
      marginBottom: tokens.spacing.xl,
    },
  });

const createDotStyles = ({
  colors,
}: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.brand.primary,
    },
  });
