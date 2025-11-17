/**
 * AuthInput Component
 *
 * Specialized input component for authentication forms with enhanced
 * validation, animations, and accessibility features.
 */

import React, { ReactNode, useEffect, useState } from 'react';
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
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
import { Icon } from '@/components/ui/Icon';

export interface AuthInputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?: TextInputProps['autoComplete'];
  error?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

/**
 * AuthInput - Enhanced input for authentication
 *
 * Features:
 * - Height: 56pt with 12pt border radius
 * - Smooth animations on focus (200ms)
 * - Error state with shake animation
 * - Password visibility toggle
 * - Full accessibility support (WCAG 3.0 AA/AAA)
 * - Haptic feedback on focus
 *
 * @example
 * <AuthInput
 *   label="Email"
 *   value={email}
 *   onChangeText={setEmail}
 *   keyboardType="email-address"
 *   error={errors.email}
 * />
 */
export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoComplete,
  error,
  disabled = false,
  leftIcon,
  rightIcon,
  helperText,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Animation values
  const borderColor = useSharedValue<string>(AUTH_COLORS.border.light);
  const borderWidth = useSharedValue<number>(AUTH_DIMENSIONS.inputBorderWidth);
  const scale = useSharedValue<number>(1);
  const shakeTranslateX = useSharedValue<number>(0);

  // Animated styles
  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    borderWidth: borderWidth.value,
    transform: [{ scale: scale.value }, { translateX: shakeTranslateX.value }],
  }));

  // Focus animations
  useEffect(() => {
    if (isFocused && !error) {
      borderColor.value = withTiming(AUTH_COLORS.primary.base, {
        duration: 200,
      });
      borderWidth.value = withSpring(AUTH_DIMENSIONS.inputFocusBorderWidth);
      scale.value = withSpring(1.0, {
        damping: 18,
        stiffness: 200,
      });
    } else if (error) {
      borderColor.value = withTiming(AUTH_COLORS.system.error, {
        duration: 200,
      });
      borderWidth.value = withSpring(AUTH_DIMENSIONS.inputFocusBorderWidth);
    } else {
      borderColor.value = withTiming(AUTH_COLORS.border.light, {
        duration: 200,
      });
      borderWidth.value = withSpring(AUTH_DIMENSIONS.inputBorderWidth);
      scale.value = withSpring(1);
    }
  }, [isFocused, error, borderColor, borderWidth, scale]);

  // Error shake animation
  useEffect(() => {
    if (error) {
      // Shake animation: left -> right -> left -> center
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

      // Haptic feedback for error
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, [error, shakeTranslateX]);

  const handleFocus = () => {
    setIsFocused(true);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={[styles.label, error && styles.labelError]}>{label}</Text>

      {/* Input Container */}
      <Animated.View
        style={[
          styles.inputContainer,
          animatedContainerStyle,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon || secureTextEntry ? styles.inputWithRightIcon : null,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={AUTH_COLORS.text.tertiary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize={
            keyboardType === 'email-address' ? 'none' : 'sentences'
          }
          autoCorrect={keyboardType !== 'email-address'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          accessible
          accessibilityLabel={label}
          accessibilityState={{
            disabled,
          }}
          accessibilityLiveRegion={error ? 'polite' : 'none'}
          {...textInputProps}
        />

        {/* Password Toggle or Right Icon */}
        {secureTextEntry ? (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible
                ? 'Masquer le mot de passe'
                : 'Afficher le mot de passe'
            }
          >
            <Icon
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color={AUTH_COLORS.text.tertiary}
            />
          </Pressable>
        ) : (
          rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </Animated.View>

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText} accessible accessibilityRole="alert">
          {error}
        </Text>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: AUTH_SPACING.sm,
  },
  errorText: {
    color: AUTH_COLORS.system.error,
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.caption.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.caption.lineHeight,
    marginTop: AUTH_SPACING.xs / 2,
  },
  helperText: {
    color: AUTH_COLORS.text.tertiary,
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.caption.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.caption.lineHeight,
    marginTop: AUTH_SPACING.xs / 2,
  },
  input: {
    color: AUTH_COLORS.text.primary,
    flex: 1,
    fontSize: AUTH_TYPOGRAPHY.body.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.body.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.body.lineHeight,
    paddingHorizontal: AUTH_SPACING.inputPadding,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.surface,
    borderRadius: AUTH_RADIUS.regular,
    flexDirection: 'row',
    height: AUTH_DIMENSIONS.inputHeight,
    ...AUTH_SHADOWS.level1,
  },
  inputContainerDisabled: {
    opacity: 0.6,
  },
  inputWithLeftIcon: {
    paddingLeft: AUTH_SPACING.xs,
  },
  inputWithRightIcon: {
    paddingRight: AUTH_SPACING.xs,
  },
  label: {
    color: AUTH_COLORS.text.primary,
    fontSize: AUTH_TYPOGRAPHY.bodySmall.fontSize,
    fontWeight: '500',
    lineHeight: AUTH_TYPOGRAPHY.bodySmall.lineHeight,
    marginBottom: AUTH_SPACING.xs,
  },
  labelError: {
    color: AUTH_COLORS.system.error,
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: AUTH_SPACING.inputPadding,
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AUTH_SPACING.inputPadding,
    minHeight: AUTH_DIMENSIONS.minTouchTarget,
    minWidth: AUTH_DIMENSIONS.minTouchTarget,
  },
});
