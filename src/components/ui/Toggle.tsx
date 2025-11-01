import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

export interface ToggleProps {
  value: boolean;
  onToggle: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

/**
 * Toggle (Switch) component with smooth animation
 *
 * @example
 * <Toggle
 *   value={isEnabled}
 *   onToggle={setIsEnabled}
 *   label="Enable notifications"
 * />
 */
export const Toggle: React.FC<ToggleProps> = ({
  value,
  onToggle,
  label,
  disabled = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useThemeTokens();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Animate thumb position on value change
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 20 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (disabled) {
      return;
    }

    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(!value);
  };

  const trackStyles = [
    styles.track,
    value && styles.trackActive,
    disabled && styles.trackDisabled,
  ];

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessible
      accessibilityRole="switch"
      accessibilityState={{
        checked: value,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {label && <Text style={styles.label}>{label}</Text>}

      <Animated.View
        style={[
          trackStyles,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
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
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: tokens.layout.touchTarget,
    },
    label: {
      ...labelTypography,
      color: colors.text.primary,
      flex: 1,
      marginRight: tokens.spacing.md,
    },
    thumb: {
      backgroundColor: colors.surface.card,
      borderRadius: 10,
      height: 20,
      width: 20,
      ...tokens.elevation.level1,
    },
    track: {
      backgroundColor: colors.text.tertiary,
      borderRadius: 12,
      height: 24,
      justifyContent: 'center',
      paddingHorizontal: 2,
      width: 44,
    },
    trackActive: {
      backgroundColor: colors.brand.primary,
    },
    trackDisabled: {
      opacity: 0.4,
    },
  });
};
