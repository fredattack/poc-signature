import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing, layout } from '@/constants/spacing';

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

const styles = StyleSheet.create({
  container: {
    height: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
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
    ...typography.h3,
  },
  action: {
    padding: spacing.xs,
  },
});
