// Pagination dots indicator for onboarding carousel

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
