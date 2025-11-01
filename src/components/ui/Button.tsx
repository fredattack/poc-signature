import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
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
}

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
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
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

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
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
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icon: {
      marginRight: tokens.spacing.xs,
    },
    fullWidth: {
      width: '100%',
    },
    disabled: {
      opacity: 0.48,
    },
    // Variants
    primaryButton: {
      backgroundColor: colors.brand.primary,
    },
    secondaryButton: {
      backgroundColor: colors.surface.card,
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.16)'
          : 'rgba(35, 35, 35, 0.12)',
      borderWidth: 1,
    },
    ghostButton: {
      backgroundColor: 'transparent',
    },

    // Sizes
    smallButton: {
      height: tokens.layout.buttonHeightSmall,
      paddingHorizontal: tokens.spacing.sm,
    },
    mediumButton: {
      height: tokens.layout.buttonHeight,
      paddingHorizontal: tokens.spacing.md,
    },
    largeButton: {
      height: tokens.layout.buttonHeight,
      paddingHorizontal: tokens.spacing.lg,
    },

    // Text
    buttonText: baseTypography,
    primaryText: {
      color: colors.text.inverse,
    },
    secondaryText: {
      color: colors.text.primary,
    },
    ghostText: {
      color: colors.brand.primary,
    },
    smallText: captionTypography,
    mediumText: baseTypography,
    largeText: largeTypography,
  });
};
