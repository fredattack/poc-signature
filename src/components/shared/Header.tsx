import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const createStyles = ({
  colors,
  tokens,
  mode,
}: ReturnType<typeof useThemeTokens>) =>
  StyleSheet.create({
    container: {
      height: tokens.layout.headerHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: tokens.spacing.md,
      backgroundColor: colors.surface.background,
      borderBottomWidth: 1,
      borderBottomColor:
        mode === 'dark'
          ? 'rgba(244, 244, 244, 0.12)'
          : 'rgba(35, 35, 35, 0.08)',
    },
    leftSlot: {
      width: 60,
      alignItems: 'flex-start',
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    rightSlot: {
      width: 60,
      alignItems: 'flex-end',
    },
    title: {
      fontSize: tokens.typography.headingM.fontSize,
      lineHeight: tokens.typography.headingM.lineHeight,
      fontWeight: tokens.typography.headingM.fontWeight,
      letterSpacing: tokens.typography.headingM.letterSpacing,
      color: colors.text.primary,
    },
    action: {
      padding: tokens.spacing.xs,
    },
  });
