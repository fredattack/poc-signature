import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeTokens } from '@/theme';
import { useHaptics } from '@/hooks/useHaptics';

export interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

/**
 * Checkbox component with animations and accessibility
 *
 * @example
 * <Checkbox
 *   checked={agreed}
 *   onToggle={setAgreed}
 *   label="I agree to the terms"
 * />
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onToggle,
  label,
  disabled = false,
  indeterminate = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const haptics = useHaptics();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  // Animate checkmark on state change
  useEffect(() => {
    Animated.spring(checkAnim, {
      toValue: checked || indeterminate ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [checked, indeterminate, checkAnim]);

  const handlePress = () => {
    if (disabled) {
      return;
    }

    // Haptic feedback on check/uncheck
    haptics.triggerSelection();

    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(!checked);
  };

  const boxStyles = [
    styles.checkboxBox,
    (checked || indeterminate) && styles.checkboxBoxChecked,
    disabled && styles.checkboxBoxDisabled,
  ];

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessible
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : checked,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Animated.View
        style={[
          boxStyles,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Checkmark */}
        {(checked || indeterminate) && (
          <Animated.View
            style={[
              styles.checkmark,
              {
                opacity: checkAnim,
                transform: [
                  {
                    scale: checkAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.checkmarkIcon}>
              {indeterminate ? (
                <View style={styles.indeterminateLine} />
              ) : (
                <View style={styles.checkIcon} />
              )}
            </View>
          </Animated.View>
        )}
      </Animated.View>

      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
};

const createStyles = ({
  colors,
  tokens,
}: ReturnType<typeof useThemeTokens>) => {
  const labelTypography = {
    fontSize: tokens.typography.body.fontSize,
    lineHeight: tokens.typography.body.lineHeight,
    fontWeight: tokens.typography.body.fontWeight,
    letterSpacing: tokens.typography.body.letterSpacing,
  };

  return StyleSheet.create({
    checkIcon: {
      backgroundColor: 'transparent',
      borderBottomColor: colors.text.inverse,
      borderBottomWidth: 2,
      borderRightColor: colors.text.inverse,
      borderRightWidth: 2,
      height: 10,
      transform: [{ rotate: '45deg' }],
      width: 6,
    },
    checkboxBox: {
      alignItems: 'center',
      backgroundColor: colors.surface.card,
      borderColor: colors.text.tertiary,
      borderRadius: tokens.radii.subtle,
      borderWidth: 2,
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    checkboxBoxChecked: {
      backgroundColor: colors.brand.primary,
      borderColor: colors.brand.primary,
    },
    checkboxBoxDisabled: {
      opacity: 0.4,
    },
    checkmark: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmarkIcon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: tokens.layout.touchTarget,
    },
    indeterminateLine: {
      backgroundColor: colors.text.inverse,
      height: 2,
      width: 12,
    },
    label: {
      ...labelTypography,
      color: colors.text.primary,
      marginLeft: tokens.spacing.xs,
    },
  });
};
