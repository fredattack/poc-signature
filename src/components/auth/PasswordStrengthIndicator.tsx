/**
 * PasswordStrengthIndicator Component
 *
 * Visual indicator of password strength with animated progress bar.
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PasswordStrength } from '@/types/auth.types';
import { calculatePasswordStrength } from '@/utils/validation';
import {
  AUTH_COLORS,
  AUTH_RADIUS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';

export interface PasswordStrengthIndicatorProps {
  password: string;
  showFeedback?: boolean;
}

const STRENGTH_CONFIG: Record<
  PasswordStrength,
  { color: string; label: string; progress: number }
> = {
  weak: {
    color: AUTH_COLORS.system.error,
    label: 'Faible',
    progress: 0.25,
  },
  medium: {
    color: AUTH_COLORS.system.warning,
    label: 'Moyen',
    progress: 0.5,
  },
  strong: {
    color: AUTH_COLORS.primary.base,
    label: 'Fort',
    progress: 0.75,
  },
  'very-strong': {
    color: AUTH_COLORS.system.success,
    label: 'Très Fort',
    progress: 1,
  },
};

/**
 * PasswordStrengthIndicator - Visual password strength meter
 *
 * Features:
 * - Animated progress bar
 * - Color-coded strength levels
 * - Optional feedback messages
 * - Real-time updates
 *
 * @example
 * <PasswordStrengthIndicator
 *   password={password}
 *   showFeedback
 * />
 */
export const PasswordStrengthIndicator: React.FC<
  PasswordStrengthIndicatorProps
> = ({ password, showFeedback = true }) => {
  const result = calculatePasswordStrength(password);
  const config = STRENGTH_CONFIG[result.strength];

  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: config.color,
  }));

  useEffect(() => {
    progress.value = withSpring(config.progress, {
      damping: 20,
      stiffness: 200,
    });
  }, [config.progress, progress]);

  if (!password) return null;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>

      {/* Strength Label */}
      <Text style={[styles.strengthLabel, { color: config.color }]}>
        {config.label}
      </Text>

      {/* Feedback */}
      {showFeedback && result.feedback.length > 0 && (
        <View style={styles.feedbackContainer}>
          {result.feedback.map((item, index) => (
            <Text key={index} style={styles.feedbackText}>
              • {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: AUTH_SPACING.xs,
  },
  feedbackContainer: {
    marginTop: AUTH_SPACING.xs,
  },
  feedbackText: {
    color: AUTH_COLORS.text.tertiary,
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    lineHeight: AUTH_TYPOGRAPHY.caption.lineHeight,
    marginTop: AUTH_SPACING.xs / 2,
  },
  progressBar: {
    borderRadius: AUTH_RADIUS.subtle,
    height: '100%',
  },
  progressBarContainer: {
    backgroundColor: AUTH_COLORS.pearl.light,
    borderRadius: AUTH_RADIUS.subtle,
    height: 4,
    overflow: 'hidden',
    width: '100%',
  },
  strengthLabel: {
    fontSize: AUTH_TYPOGRAPHY.caption.fontSize,
    fontWeight: '600',
    lineHeight: AUTH_TYPOGRAPHY.caption.lineHeight,
    marginTop: AUTH_SPACING.xs / 2,
  },
});
