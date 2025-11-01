import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  color?: string;
  thickness?: number;
  style?: ViewStyle;
}

/**
 * Divider component for visual separation
 *
 * @example
 * <Divider />
 * <Divider orientation="vertical" spacing="lg" />
 * <Divider variant="dashed" color="#8A9A5B" />
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  color,
  thickness = 1,
  style,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const dividerColor = color ?? theme.colors.text.tertiary;

  const dividerStyles = [
    styles.divider,
    orientation === 'horizontal' ? styles.horizontal : styles.vertical,
    styles[
      `spacing${spacing.charAt(0).toUpperCase()}${spacing.slice(1)}` as keyof typeof styles
    ],
    {
      backgroundColor: variant === 'solid' ? dividerColor : 'transparent',
      borderColor: dividerColor,
      borderStyle: variant === 'solid' ? 'solid' : variant,
      borderWidth: variant !== 'solid' ? thickness : 0,
    },
    orientation === 'horizontal'
      ? { height: variant === 'solid' ? thickness : 0 }
      : { width: variant === 'solid' ? thickness : 0 },
    style,
  ];

  return <View style={dividerStyles} />;
};

const createStyles = ({ tokens }: ReturnType<typeof useThemeTokens>) => {
  return StyleSheet.create({
    divider: {},
    horizontal: {
      width: '100%',
    },
    spacingLg: {
      marginVertical: tokens.spacing.lg,
    },
    spacingMd: {
      marginVertical: tokens.spacing.md,
    },
    spacingNone: {
      marginVertical: 0,
    },
    spacingSm: {
      marginVertical: tokens.spacing.sm,
    },
    vertical: {
      alignSelf: 'stretch',
      height: '100%',
    },
  });
};
