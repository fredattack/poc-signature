// Tab navigator configuration with theme tokens

import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useThemeTokens } from '@/theme';

export default function TabsLayout() {
  const { colors, tokens } = useThemeTokens();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface.card,
          borderTopColor: colors.overlay.light,
          borderTopWidth: 1,
          height: tokens.layout.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: tokens.typography.caption.fontSize,
          fontWeight: '600',
          letterSpacing: tokens.typography.caption.letterSpacing,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size }} accessible={false}>
              🏠
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ size }) => (
            <Text style={{ fontSize: size }} accessible={false}>
              📚
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
