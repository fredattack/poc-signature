// Reusable onboarding slide component

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

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

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
