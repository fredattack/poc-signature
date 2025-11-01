import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
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
  const styles = useMemo(() => createStyles(theme), [theme]);

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
      <Animated.View style={styles.leftSlot}>
        {leftAction && onLeftPress ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.action}>
            {leftAction}
          </TouchableOpacity>
        ) : (
          leftAction
        )}
      </Animated.View>
      <Animated.View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </Animated.View>
      <Animated.View style={styles.rightSlot}>
        {rightAction && onRightPress ? (
          <TouchableOpacity onPress={onRightPress} style={styles.action}>
            {rightAction}
          </TouchableOpacity>
        ) : (
          rightAction
        )}
      </Animated.View>
    </Animated.View>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) =>
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
      height: tokens.layout.headerHeight,
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
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
