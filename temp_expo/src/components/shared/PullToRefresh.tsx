import React from 'react';
import { RefreshControl, ScrollView, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

export interface PullToRefreshProps {
  onRefresh: () => void;
  refreshing: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  refreshing,
  children,
  style,
}) => {
  return (
    <ScrollView
      style={style}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      {children}
    </ScrollView>
  );
};
