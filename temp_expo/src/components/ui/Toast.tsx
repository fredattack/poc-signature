import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, borderRadius } from '@/constants/spacing';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastVariant;
  variant?: ToastVariant;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
  onDismiss?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  variant,
  visible,
  duration = 3000,
  onHide,
  onDismiss,
}) => {
  const toastVariant = type || variant || 'info';
  const handleHide = onDismiss || onHide;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Slide in and fade in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          handleHide?.();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, fadeAnim, translateY, handleHide]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`${toastVariant}Container`],
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, styles[`${toastVariant}Text`]]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: spacing.md,
    right: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  text: {
    ...typography.body,
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: colors.success,
  },
  errorContainer: {
    backgroundColor: colors.error,
  },
  infoContainer: {
    backgroundColor: colors.info,
  },
  successText: {
    color: colors.textInverse,
  },
  errorText: {
    color: colors.textInverse,
  },
  infoText: {
    color: colors.textInverse,
  },
});
