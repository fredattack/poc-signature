/**
 * AuthButton Component
 *
 * Specialized button for authentication screens with gradient backgrounds,
 * animations, and enhanced accessibility.
 */

import React, { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import type { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
// import { LinearGradient } from 'expo-linear-gradient'; // Install with: npm install expo-linear-gradient
import {
  AUTH_COLORS,
  AUTH_DIMENSIONS,
  AUTH_RADIUS,
  AUTH_SHADOWS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';

export type AuthButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: AuthButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  haptic?: boolean;
  style?: ViewStyle;
}

/**
 * AuthButton - Enhanced button for authentication
 *
 * Variants:
 * - PRIMARY: Gradient background, white text, level3 shadow
 * - SECONDARY: Surface background, border, primary text
 * - GHOST: Transparent, primary text
 *
 * Features:
 * - Scale animation on press (0.95)
 * - Haptic feedback
 * - Loading state with spinner
 * - Full accessibility support
 *
 * @example
 * <AuthButton
 *   title="Sign In"
 *   onPress={handleLogin}
 *   variant="primary"
 *   loading={isLoading}
 * />
 */
export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  haptic = true,
  style,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 250,
    });

    if (haptic) {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 250,
    });
  };

  const handlePress = () => {
    if (haptic && variant === 'primary') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const buttonHeight =
    variant === 'primary'
      ? AUTH_DIMENSIONS.buttonHeight.large
      : variant === 'secondary'
        ? AUTH_DIMENSIONS.buttonHeight.medium
        : AUTH_DIMENSIONS.buttonHeight.small;

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={
            variant === 'primary'
              ? AUTH_COLORS.text.inverse
              : AUTH_COLORS.primary.base
          }
        />
      );
    }

    return (
      <>
        {leftIcon && <>{leftIcon}</>}
        <Text
          style={[
            styles.buttonText,
            variant === 'primary' && styles.primaryText,
            variant === 'secondary' && styles.secondaryText,
            variant === 'ghost' && styles.ghostText,
          ]}
        >
          {title}
        </Text>
        {rightIcon && <>{rightIcon}</>}
      </>
    );
  };

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessible
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{
          disabled: disabled || loading,
          busy: loading,
        }}
      >
        <Animated.View
          style={[
            styles.primaryButton,
            animatedStyle,
            { height: buttonHeight },
            disabled && styles.disabled,
            style,
          ]}
        >
          {/* TODO: Uncomment when expo-linear-gradient is installed
          <LinearGradient
            colors={[AUTH_COLORS.primary.base, AUTH_COLORS.accent.base]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.primaryButton, { height: buttonHeight }]}
          >
            {renderContent()}
          </LinearGradient>
          */}
          {renderContent()}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
    >
      <Animated.View
        style={[
          styles.button,
          { height: buttonHeight },
          variant === 'secondary' && styles.secondaryButton,
          variant === 'ghost' && styles.ghostButton,
          animatedStyle,
          disabled && styles.disabled,
          style,
        ]}
      >
        {renderContent()}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: AUTH_SPACING.md,
  },
  buttonText: {
    fontSize: AUTH_TYPOGRAPHY.button.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.button.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.button.lineHeight,
  },
  disabled: {
    opacity: 0.6,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderRadius: AUTH_RADIUS.mild,
  },
  ghostText: {
    color: AUTH_COLORS.primary.base,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.primary.base, // Solid color until gradient is installed
    borderRadius: AUTH_RADIUS.generous,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: AUTH_SPACING.md,
    ...AUTH_SHADOWS.level3,
  },
  primaryText: {
    color: AUTH_COLORS.text.inverse,
  },
  secondaryButton: {
    backgroundColor: AUTH_COLORS.background.surface,
    borderColor: AUTH_COLORS.border.light,
    borderRadius: AUTH_RADIUS.regular,
    borderWidth: 1,
  },
  secondaryText: {
    color: AUTH_COLORS.primary.base,
  },
});
