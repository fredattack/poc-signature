import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {ctaLabel && onCtaPress && (
        <View style={styles.ctaContainer}>
          <Button title={ctaLabel} onPress={onCtaPress} variant="primary" />
        </View>
      )}
    </View>
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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: tokens.spacing.lg,
    },
    iconContainer: {
      marginBottom: tokens.spacing.md,
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: tokens.spacing.xs,
    },
    description: {
      ...bodyTypography,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: tokens.spacing.md,
    },
    ctaContainer: {
      marginTop: tokens.spacing.sm,
      minWidth: 200,
    },
  });
};
