// Reusable onboarding slide component

import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/theme';

const { width } = Dimensions.get('window');

export interface OnboardingSlideProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  illustration,
  title,
  description,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>{illustration}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const titleTypography = {
    fontSize: tokens.typography.displayM.fontSize,
    lineHeight: tokens.typography.displayM.lineHeight,
    fontWeight: tokens.typography.displayM.fontWeight,
    letterSpacing: tokens.typography.displayM.letterSpacing,
  };

  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: tokens.spacing.lg,
      width,
    },
    description: {
      ...bodyTypography,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    illustrationContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginBottom: tokens.spacing.lg,
    },
    textContainer: {
      alignItems: 'center',
      paddingBottom: tokens.spacing.xl,
    },
    title: {
      ...titleTypography,
      color: colors.text.primary,
      marginBottom: tokens.spacing.md,
      textAlign: 'center',
    },
  });
};
