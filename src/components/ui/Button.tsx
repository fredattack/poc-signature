import React, { useMemo, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useThemeTokens } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

/**
 * Button component with animations and accessibility
 *
 * Features:
 * - Scale animation on press (0.98)
 * - Loading state with spinner
 * - Three variants: primary, secondary, ghost
 * - Full accessibility support
 *
 * @example
 * <Button
 *   title="Save"
 *   onPress={handleSave}
 *   variant="primary"
 *   loading={isSaving}
 * />
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const indicatorColor =
    variant === 'primary'
      ? theme.colors.text.inverse
      : theme.colors.brand.primary;

  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.buttonText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
    >
      <Animated.View
        style={[
          buttonStyles,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={indicatorColor} />
        ) : (
          <Animated.View style={styles.content}>
            {icon && <Animated.View style={styles.icon}>{icon}</Animated.View>}
            <Text style={textStyles}>{title}</Text>
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) => {
  const baseTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  const largeTypography = {
    fontSize: tokens.typography.bodyL.fontSize,
    lineHeight: tokens.typography.bodyL.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.bodyL.letterSpacing,
  };

  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  return StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: tokens.radii.mild,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: baseTypography,
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    disabled: {
      opacity: 0.48,
    },
    fullWidth: {
      width: '100%',
    },
    ghostButton: {
      backgroundColor: 'transparent',
    },
    ghostText: {
      color: colors.brand.primary,
    },
    icon: {
      marginRight: tokens.spacing.xs,
    },
    largeButton: {
      height: tokens.layout.buttonHeight,
      paddingHorizontal: tokens.spacing.lg,
    },
    largeText: largeTypography,
    mediumButton: {
      height: tokens.layout.buttonHeight,
      paddingHorizontal: tokens.spacing.md,
    },
    mediumText: baseTypography,
    primaryButton: {
      backgroundColor: colors.brand.primary,
    },
    primaryText: {
      color: colors.text.inverse,
    },
    secondaryButton: {
      backgroundColor: colors.surface.card,
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.16)'
          : 'rgba(35, 35, 35, 0.12)',
      borderWidth: 1,
    },
    secondaryText: {
      color: colors.text.primary,
    },
    smallButton: {
      height: tokens.layout.buttonHeightSmall,
      paddingHorizontal: tokens.spacing.sm,
    },
    smallText: captionTypography,
  });
};
