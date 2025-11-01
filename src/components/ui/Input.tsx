import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeTokens } from '@/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const placeholderColor = theme.colors.text.tertiary;

  const inputStyles = [
    styles.input,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    style,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={inputStyles}
        placeholderTextColor={placeholderColor}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
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
      borderColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.16)'
          : 'rgba(35, 35, 35, 0.12)',
      borderRadius: tokens.radii.mild,
      borderWidth: 1,
      height: tokens.layout.inputHeight,
      paddingHorizontal: tokens.spacing.md,
      ...bodyTypography,
      backgroundColor: colors.surface.card,
      color: colors.text.primary,
    },
    inputError: {
      borderColor: colors.feedback.critical,
    },
    inputFocused: {
      borderColor: colors.brand.primary,
      elevation: 2,
      shadowColor: colors.brand.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    label: {
      ...labelTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.xs,
    },
  });
};
