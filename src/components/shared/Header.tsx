import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeTokens } from '@/theme';

export interface HeaderProps {
  title: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftAction,
  rightAction,
  onLeftPress,
  onRightPress,
}) => {
  const theme = useThemeTokens();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(theme, insets.top),
    [theme, insets.top]
  );

  // Entrance animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withSpring(1, {
      damping: 18,
      stiffness: 200,
    });
    translateY.value = withSpring(0, {
      damping: 18,
      stiffness: 200,
    });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.leftSlot}>
        {leftAction && onLeftPress ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.action}>
            {leftAction}
          </TouchableOpacity>
        ) : (
          leftAction
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.rightSlot}>
        {rightAction && onRightPress ? (
          <TouchableOpacity onPress={onRightPress} style={styles.action}>
            {rightAction}
          </TouchableOpacity>
        ) : (
          rightAction
        )}
      </View>
    </Animated.View>
  );
};

const createStyles = (
  { colors, tokens, mode }: ReturnType<typeof useThemeTokens>,
  safeAreaTop: number
) =>
  StyleSheet.create({
    action: {
      padding: tokens.spacing.xs,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.surface.background,
      borderBottomColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.12)'
          : 'rgba(35, 35, 35, 0.08)',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: tokens.layout.headerHeight + safeAreaTop,
      paddingHorizontal: tokens.spacing.md,
      paddingTop: safeAreaTop,
    },
    leftSlot: {
      alignItems: 'flex-start',
      width: 60,
    },
    rightSlot: {
      alignItems: 'flex-end',
      width: 60,
    },
    title: {
      color: colors.text.primary,
      fontSize: tokens.typography.headingM.fontSize,
      fontWeight: tokens.typography.headingM.fontWeight,
      letterSpacing: tokens.typography.headingM.letterSpacing,
      lineHeight: tokens.typography.headingM.lineHeight,
    },
    titleContainer: {
      alignItems: 'center',
      flex: 1,
    },
  });
