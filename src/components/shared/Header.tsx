import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
