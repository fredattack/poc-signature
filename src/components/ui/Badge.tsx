import React, { useMemo } from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

export type BadgeVariant = 'solid' | 'outlined' | 'subtle';
export type BadgeColor =
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

/**
 * Badge component for displaying status, labels, or counts
 *
 * @example
 * <Badge label="New" color="primary" variant="solid" />
 * <Badge label="3" color="error" variant="outlined" size="sm" />
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const containerStyles = [
    styles.container,
    styles[`${variant}Container` as keyof typeof styles],
    styles[
      `${variant}${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof styles
    ],
    styles[`${size}Container` as keyof typeof styles],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text` as keyof typeof styles],
    styles[
      `${variant}${color.charAt(0).toUpperCase()}${color.slice(1)}Text` as keyof typeof styles
    ],
    styles[`${size}Text` as keyof typeof styles],
    textStyle,
  ];

  return (
    <View
      style={containerStyles}
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={textStyles}>{label}</Text>
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const captionTypography = {
    fontSize: tokens.typography.caption.fontSize,
    lineHeight: tokens.typography.caption.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.caption.letterSpacing,
  };

  const legalTypography = {
    fontSize: tokens.typography.legal.fontSize,
    lineHeight: tokens.typography.legal.lineHeight,
    fontWeight: '600' as const,
    letterSpacing: tokens.typography.legal.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: tokens.radii.full,
      flexDirection: 'row',
    },
    icon: {
      marginRight: tokens.spacing.micro,
    },
    mdContainer: {
      paddingHorizontal: tokens.spacing.xs,
      paddingVertical: tokens.spacing.micro,
    },
    mdText: captionTypography,

    // Outlined variant (alphabetically after md, before sm and solid)
    outlinedContainer: {
      backgroundColor: colors.surface.card,
      borderWidth: 1,
    },
    outlinedError: {
      borderColor: colors.feedback.critical,
    },
    outlinedErrorText: {
      color: colors.feedback.critical,
    },
    outlinedInfo: {
      borderColor: colors.feedback.info,
    },
    outlinedInfoText: {
      color: colors.feedback.info,
    },
    outlinedNeutral: {
      borderColor: colors.text.secondary,
    },
    outlinedNeutralText: {
      color: colors.text.secondary,
    },
    outlinedPrimary: {
      borderColor: colors.brand.primary,
    },
    outlinedPrimaryText: {
      color: colors.brand.primary,
    },
    outlinedSuccess: {
      borderColor: colors.feedback.success,
    },
    outlinedSuccessText: {
      color: colors.feedback.success,
    },
    outlinedText: {},
    outlinedWarning: {
      borderColor: colors.feedback.warning,
    },
    outlinedWarningText: {
      color: colors.feedback.warning,
    },

    // Size variants (sm)
    smContainer: {
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    smText: legalTypography,

    // Solid variant
    solidContainer: {},
    solidError: {
      backgroundColor: colors.feedback.critical,
    },
    solidErrorText: {
      color: colors.text.inverse,
    },
    solidInfo: {
      backgroundColor: colors.feedback.info,
    },
    solidInfoText: {
      color: colors.text.inverse,
    },
    solidNeutral: {
      backgroundColor: colors.text.secondary,
    },
    solidNeutralText: {
      color: colors.text.inverse,
    },
    solidPrimary: {
      backgroundColor: colors.brand.primary,
    },
    solidPrimaryText: {
      color: colors.text.inverse,
    },
    solidSuccess: {
      backgroundColor: colors.feedback.success,
    },
    solidSuccessText: {
      color: colors.text.inverse,
    },
    solidText: {},
    solidWarning: {
      backgroundColor: colors.feedback.warning,
    },
    solidWarningText: {
      color: colors.text.inverse,
    },

    // Subtle variant
    subtleContainer: {},
    subtleError: {
      backgroundColor: `${colors.feedback.critical}20`,
    },
    subtleErrorText: {
      color: colors.feedback.critical,
    },
    subtleInfo: {
      backgroundColor: `${colors.feedback.info}20`,
    },
    subtleInfoText: {
      color: colors.feedback.info,
    },
    subtleNeutral: {
      backgroundColor: `${colors.text.secondary}20`,
    },
    subtleNeutralText: {
      color: colors.text.secondary,
    },
    subtlePrimary: {
      backgroundColor: `${colors.brand.primary}20`,
    },
    subtlePrimaryText: {
      color: colors.brand.primary,
    },
    subtleSuccess: {
      backgroundColor: `${colors.feedback.success}20`,
    },
    subtleSuccessText: {
      color: colors.feedback.success,
    },
    subtleText: {},
    subtleWarning: {
      backgroundColor: `${colors.feedback.warning}20`,
    },
    subtleWarningText: {
      color: colors.feedback.warning,
    },

    text: {},
  });
};
