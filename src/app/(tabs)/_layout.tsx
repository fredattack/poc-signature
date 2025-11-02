// Tab navigator configuration with theme tokens

import React from 'react';
import { Tabs } from 'expo-router';
import { useThemeTokens } from '@/theme';
import { Icon } from '@/components/ui/Icon';

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
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 0,
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
          tabBarIcon: ({ color, size }) => (
            <Icon name="house" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }) => (
            <Icon name="books" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
