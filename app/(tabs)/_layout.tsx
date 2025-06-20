import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Home, LockIcon, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const { colors } = useTheme();
  const themeColors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textMuted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          borderTopColor: colors.border,
          borderTopWidth: 1,
          ...Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: 'transparent',
            },
            default: {
              backgroundColor: colors.card,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={28} 
              color={focused ? themeColors.primary : themeColors.textMuted} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="codegen"
        options={{
          title: 'Code Gen',
          tabBarIcon: ({ color, focused }) => (
            <LockIcon 
              size={28} 
              color={focused ? themeColors.primary : themeColors.textMuted} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Settings 
              size={28} 
              color={focused ? themeColors.primary : themeColors.textMuted} 
            />
          ),
        }}
      />
    </Tabs>
  );
}