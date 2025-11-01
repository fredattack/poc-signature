import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Button } from '@/components/ui/Button';
import { useThemeTokens } from '@/theme';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  ctaLabel,
  onCtaPress,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Entrance animation
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = withSpring(1, {
      damping: 18,
      stiffness: 200,
    });
    scale.value = withSpring(1, {
      damping: 18,
      stiffness: 200,
    });
  }, [opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {ctaLabel && onCtaPress && (
        <View style={styles.ctaContainer}>
          <Button title={ctaLabel} onPress={onCtaPress} variant="primary" />
        </View>
      )}
    </Animated.View>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const titleTypography = {
    fontSize: tokens.typography.headingL.fontSize,
    lineHeight: tokens.typography.headingL.lineHeight,
    fontWeight: tokens.typography.headingL.fontWeight,
    letterSpacing: tokens.typography.headingL.letterSpacing,
  };

  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: tokens.spacing.lg,
    },
    ctaContainer: {
      marginTop: tokens.spacing.sm,
      minWidth: 200,
    },
    description: {
      ...bodyTypography,
      color: colors.text.secondary,
      marginBottom: tokens.spacing.md,
      textAlign: 'center',
    },
    iconContainer: {
      marginBottom: tokens.spacing.md,
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
      textAlign: 'center',
    },
  });
};
