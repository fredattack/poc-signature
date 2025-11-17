/**
 * LoadingOverlay Component
 *
 * Full-screen loading overlay for authentication processes.
 */

import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  AUTH_COLORS,
  AUTH_SPACING,
  AUTH_TYPOGRAPHY,
} from '@/constants/auth-design';

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

/**
 * LoadingOverlay - Full-screen loading indicator
 *
 * Features:
 * - Fade in/out animation (300ms)
 * - Non-dismissible
 * - Optional message
 * - Centered spinner
 *
 * @example
 * <LoadingOverlay
 *   visible={isLoading}
 *   message="Signing in..."
 * />
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, animatedStyle]}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={AUTH_COLORS.primary.base} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.background.light,
    borderRadius: 16,
    padding: AUTH_SPACING.lg,
  },
  message: {
    color: AUTH_COLORS.text.primary,
    fontSize: AUTH_TYPOGRAPHY.body.fontSize,
    fontWeight: AUTH_TYPOGRAPHY.body.fontWeight,
    lineHeight: AUTH_TYPOGRAPHY.body.lineHeight,
    marginTop: AUTH_SPACING.md,
    textAlign: 'center',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
});
