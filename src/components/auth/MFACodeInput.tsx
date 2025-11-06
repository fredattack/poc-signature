/**
 * MFACodeInput Component
 *
 * 6-digit MFA code input with individual digit boxes and auto-focus.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  AUTH_COLORS,
  AUTH_DIMENSIONS,
  AUTH_RADIUS,
  AUTH_SHADOWS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';

export interface MFACodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  autoFocus?: boolean;
}

/**
 * MFACodeInput - 6-digit MFA code input
 *
 * Features:
 * - Auto-focus on mount
 * - Individual digit display boxes
 * - Smooth animations
 * - Auto-submit on complete
 * - Haptic feedback
 * - Error state
 *
 * @example
 * <MFACodeInput
 *   value={code}
 *   onChangeText={setCode}
 *   error={errors.code}
 *   autoFocus
 * />
 */
export const MFACodeInput: React.FC<MFACodeInputProps> = ({
  value,
  onChangeText,
  error,
  autoFocus = true,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const shakeTranslateX = useSharedValue(0);

  const digits = value.padEnd(6, ' ').split('').slice(0, 6);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Error shake animation
  useEffect(() => {
    if (error) {
      const shakeSequence = async () => {
        shakeTranslateX.value = withSpring(-10, { damping: 10 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        shakeTranslateX.value = withSpring(10, { damping: 10 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        shakeTranslateX.value = withSpring(-10, { damping: 10 });
        await new Promise((resolve) => setTimeout(resolve, 100));
        shakeTranslateX.value = withSpring(0, { damping: 10 });
      };

      void shakeSequence();
      void Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
    }
  }, [error, shakeTranslateX]);

  // Haptic feedback on digit input
  useEffect(() => {
    if (value.length > 0 && value.length <= 6) {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Haptic feedback on complete
    if (value.length === 6) {
      void Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }
  }, [value.length]);

  const handleChangeText = (text: string) => {
    // Only allow digits
    const cleanedText = text.replace(/[^0-9]/g, '');
    onChangeText(cleanedText);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeTranslateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.digitsContainer, animatedContainerStyle]}>
        {digits.map((digit, index) => {
          const isActive = index === value.length;
          const isFilled = digit !== ' ';

          return (
            <View
              key={index}
              style={[
                styles.digitBox,
                isActive && isFocused && styles.digitBoxActive,
                error && styles.digitBoxError,
              ]}
            >
              <Text
                style={[
                  styles.digitText,
                  !isFilled && styles.digitTextEmpty,
                ]}
              >
                {isFilled ? digit : ''}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Hidden Input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus={autoFocus}
        style={styles.hiddenInput}
        accessible
        accessibilityLabel="MFA code"
        accessibilityHint="Enter your 6-digit authentication code"
      />

      {/* Error Message */}
      {error && (
        <Text
          style={styles.errorText}
          accessible
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: AUTH_SPACING.md,
  },
  digitBox: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.surface,
    borderColor: AUTH_COLORS.border.light,
    borderRadius: AUTH_RADIUS.regular,
    borderWidth: 2,
    height: AUTH_DIMENSIONS.mfaCodeDigitSize,
    justifyContent: 'center',
    width: AUTH_DIMENSIONS.mfaCodeDigitSize,
    ...AUTH_SHADOWS.level1,
  },
  digitBoxActive: {
    borderColor: AUTH_COLORS.primary.base,
    ...AUTH_SHADOWS.level2,
  },
  digitBoxError: {
    borderColor: AUTH_COLORS.system.error,
  },
  digitText: {
    color: AUTH_COLORS.text.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  digitTextEmpty: {
    color: AUTH_COLORS.text.tertiary,
  },
  digitsContainer: {
    flexDirection: 'row',
    gap: AUTH_DIMENSIONS.mfaCodeDigitSpacing,
  },
  errorText: {
    color: AUTH_COLORS.system.error,
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.caption.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.caption.lineHeight,
    marginTop: AUTH_SPACING.sm,
    textAlign: 'center',
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
});
