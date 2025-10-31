import React from 'react';
import { RefreshControl, ScrollView, ViewStyle } from 'react-native';
import { useThemeTokens } from '@/theme';

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
  const { colors } = useThemeTokens();

  return (
    <ScrollView
      style={style}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.brand.primary}
          colors={[colors.brand.primary]}
        />
      }
    >
      {children}
    </ScrollView>
  );
};
