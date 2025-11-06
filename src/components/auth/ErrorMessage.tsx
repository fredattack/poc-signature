/**
 * ErrorMessage Component
 *
 * Toast-style error message with auto-dismiss and swipe gesture.
 */

import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  SlideInUp,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { AUTH_COLORS, AUTH_RADIUS, AUTH_SPACING, AUTH_TYPOGRAPHY } from '@/constants/auth-design';
import { Icon } from '@/components/ui/Icon';

export interface ErrorMessageProps {
  message: string;
  visible: boolean;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

/**
 * ErrorMessage - Toast-style error notification
 *
 * Features:
 * - Slide in from top
 * - Auto-dismiss after 5s
 * - Swipe to dismiss
 * - Haptic feedback
 * - Tap to dismiss
 *
 * @example
 * <ErrorMessage
 *   message="Invalid email or password"
 *   visible={!!error}
 *   onDismiss={() => setError(null)}
 * />
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  visible,
  onDismiss,
  autoHideDuration = 5000,
}) => {
  const translateY = useSharedValue(0);

  // Auto-dismiss timer
  useEffect(() => {
    if (visible && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [visible, autoHideDuration, onDismiss]);

  // Haptic feedback on show
  useEffect(() => {
    if (visible) {
      void Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
    }
  }, [visible]);

  // Swipe gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY < -50) {
        // Swipe up threshold
        onDismiss?.();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.duration(300)}
      exiting={SlideOutUp.duration(300)}
    >
      <GestureDetector gesture={panGesture}>
        <Pressable
          onPress={onDismiss}
          accessible
          accessibilityRole="alert"
          accessibilityLabel={message}
        >
          <Animated.View style={[styles.errorBanner, animatedStyle]}>
            <Icon
              name="warning"
              size={20}
              color={AUTH_COLORS.text.inverse}
            />
            <Text style={styles.message} numberOfLines={2}>
              {message}
            </Text>
            <Pressable
              onPress={onDismiss}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Dismiss error"
            >
              <Icon
                name="x"
                size={20}
                color={AUTH_COLORS.text.inverse}
              />
            </Pressable>
          </Animated.View>
        </Pressable>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  container: {
    left: AUTH_SPACING.sm,
    position: 'absolute',
    right: AUTH_SPACING.sm,
    top: AUTH_SPACING.lg,
    zIndex: 9999,
  },
  errorBanner: {
    alignItems: 'center',
    backgroundColor: AUTH_COLORS.system.error,
    borderRadius: AUTH_RADIUS.regular,
    flexDirection: 'row',
    padding: AUTH_SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  message: {
    color: AUTH_COLORS.text.inverse,
    flex: 1,
    fontSize: AUTH_TYPOGRAPHY.bodySmall.fontSize,
    fontWeight: '500',
    lineHeight: AUTH_TYPOGRAPHY.bodySmall.lineHeight,
    marginLeft: AUTH_SPACING.sm,
    marginRight: AUTH_SPACING.xs,
  },
});
