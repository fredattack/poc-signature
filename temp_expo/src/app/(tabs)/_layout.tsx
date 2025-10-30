// Tab navigator configuration

import React from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            // Using emoji as icon for MVP
            return <Text style={{ fontSize: size }}>🏠</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            // Using emoji as icon for MVP
            return <Text style={{ fontSize: size }}>📚</Text>;
          },
        }}
      />
    </Tabs>
  );
}
