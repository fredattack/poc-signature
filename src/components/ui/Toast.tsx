import React, { useEffect, useMemo, useRef } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { useThemeTokens } from '@/theme';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  visible,
  duration = 3000,
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
          onHide?.();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, fadeAnim, translateY, onHide]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`${variant}Container`],
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{message}</Text>
    </Animated.View>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const bodyTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 50,
      left: tokens.spacing.sm,
      right: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radii.regular,
      ...tokens.elevation.level2,
      zIndex: 1000,
      backgroundColor: colors.surface.card,
    },
    text: {
      ...bodyTypography,
      textAlign: 'center',
      color: colors.text.inverse,
    },
    successContainer: {
      backgroundColor: colors.feedback.success,
    },
    errorContainer: {
      backgroundColor: colors.feedback.critical,
    },
    infoContainer: {
      backgroundColor: colors.feedback.info,
    },
    successText: {
      color: colors.text.inverse,
    },
    errorText: {
      color: colors.text.inverse,
    },
    infoText: {
      color: colors.text.inverse,
    },
  });
};
