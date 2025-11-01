import React, { useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useThemeTokens } from '@/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  accessibilityLabel?: string;
}

/**
 * Input component with prefix/suffix icons and accessibility
 *
 * Features:
 * - Focus states with sage green border
 * - Error state with validation message
 * - Helper text for additional context
 * - Prefix/suffix icon support
 * - Full accessibility support
 *
 * @example
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   error={errors.email}
 *   prefixIcon={<EmailIcon />}
 * />
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  prefixIcon,
  suffixIcon,
  accessibilityLabel,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const placeholderColor = theme.colors.text.tertiary;

  // Animated values for focus state
  const scale = useSharedValue(1);
  const labelTranslateY = useSharedValue(0);

  const inputContainerStyles = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
  ];

  const inputStyles = [
    styles.input,
    prefixIcon ? styles.inputWithPrefix : null,
    suffixIcon ? styles.inputWithSuffix : null,
    style,
  ].filter(Boolean);

  const errorId = error ? `${label}-error` : undefined;
  const helperId = helperText ? `${label}-helper` : undefined;

  // Animate container on focus
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Animate label on focus
  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: labelTranslateY.value }],
    opacity: withSpring(isFocused ? 1 : 0.8),
  }));

  useEffect(() => {
    if (isFocused) {
      scale.value = withSpring(1.02, {
        damping: 18,
        stiffness: 200,
      });
      labelTranslateY.value = withSpring(-2, {
        damping: 18,
        stiffness: 200,
      });
    } else {
      scale.value = withSpring(1, {
        damping: 18,
        stiffness: 200,
      });
      labelTranslateY.value = withSpring(0, {
        damping: 18,
        stiffness: 200,
      });
    }
  }, [isFocused, scale, labelTranslateY]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}

      <Animated.View style={[inputContainerStyles, animatedContainerStyle]}>
        {prefixIcon && <View style={styles.prefixIcon}>{prefixIcon}</View>}

        <TextInput
          style={inputStyles}
          placeholderTextColor={placeholderColor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessible
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{
            disabled: textInputProps.editable === false,
          }}
          aria-describedby={errorId ?? helperId}
          {...textInputProps}
        />

        {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
      </Animated.View>

      {error && (
        <Text
          style={styles.errorText}
          accessible
          accessibilityRole="alert"
          nativeID={errorId}
        >
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text style={styles.helperText} nativeID={helperId}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const labelTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '500' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: tokens.typography.caption.fontWeight,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.sm,
    },
    errorText: {
      ...captionTypography,
      color: colors.feedback.critical,
      marginTop: tokens.spacing.xs,
    },
    helperText: {
      ...captionTypography,
      color: colors.text.secondary,
      marginTop: tokens.spacing.xs,
    },
    input: {
      ...bodyTypography,
      backgroundColor: 'transparent',
      color: colors.text.primary,
      flex: 1,
      height: tokens.layout.inputHeight,
      paddingHorizontal: tokens.spacing.md,
    },
    inputContainer: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.16)'
          : 'rgba(35, 35, 35, 0.12)',
      borderRadius: tokens.radii.mild,
      borderWidth: 1,
      flexDirection: 'row',
      height: tokens.layout.inputHeight,
    },
    inputContainerError: {
      borderColor: colors.feedback.critical,
    },
    inputContainerFocused: {
      borderColor: colors.brand.primary,
      ...tokens.elevation.level2,
      shadowColor: colors.brand.primary,
    },
    inputWithPrefix: {
      paddingLeft: tokens.spacing.xs,
    },
    inputWithSuffix: {
      paddingRight: tokens.spacing.xs,
    },
    label: {
      ...labelTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
    },
    prefixIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: tokens.spacing.md,
    },
    suffixIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: tokens.spacing.md,
    },
  });
};
