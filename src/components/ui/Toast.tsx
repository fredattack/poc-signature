import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useThemeTokens } from '@/theme';
import { Icon, IconName } from '@/components/ui/Icon';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
  showIcon?: boolean;
}

/**
 * Toast notification component with animations
 *
 * Features:
 * - Slide in from top with fade animation
 * - Auto-dismiss after configurable duration
 * - Four variants: success, error, warning, info
 * - Optional icons for each variant
 *
 * @example
 * <Toast
 *   message="Settings saved successfully"
 *   variant="success"
 *   visible={showToast}
 *   onHide={() => setShowToast(false)}
 * />
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  visible,
  duration = 3000,
  onHide,
  showIcon = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-100)).current;
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // Icon mapping for each variant
  const getIconName = (): IconName | null => {
    if (!showIcon) {
      return null;
    }

    const iconMap: Record<ToastVariant, IconName> = {
      success: 'check-circle',
      error: 'x-circle',
      warning: 'warning',
      info: 'info',
    };

    return iconMap[variant];
  };

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

    return undefined;
  }, [visible, duration, fadeAnim, translateY, onHide]);

  if (!visible) {
    return null;
  }

  const iconName = getIconName();

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
      accessible
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {iconName && (
        <View style={styles.iconContainer}>
          <Icon
            name={iconName}
            size={20}
            color={theme.colors.text.inverse}
            weight="fill"
          />
        </View>
      )}
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
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderRadius: tokens.radii.regular,
      flexDirection: 'row',
      justifyContent: 'center',
      left: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      position: 'absolute',
      right: tokens.spacing.sm,
      top: 50,
      zIndex: 1000,
      ...tokens.elevation.level2,
    },
    errorContainer: {
      backgroundColor: colors.feedback.critical,
    },
    errorText: {
      color: colors.text.inverse,
    },
    iconContainer: {
      marginRight: tokens.spacing.xs,
    },
    infoContainer: {
      backgroundColor: colors.feedback.info,
    },
    infoText: {
      color: colors.text.inverse,
    },
    successContainer: {
      backgroundColor: colors.feedback.success,
    },
    successText: {
      color: colors.text.inverse,
    },
    text: {
      ...bodyTypography,
      color: colors.text.inverse,
      flex: 1,
      textAlign: 'center',
    },
    warningContainer: {
      backgroundColor: colors.feedback.warning,
    },
    warningText: {
      color: colors.text.inverse,
    },
  });
};
