import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, View } from 'react-native';
import tw from 'twrnc';

const TabBarBackground = () => {
  const { colors, dark } = useTheme();

  if (Platform.OS === 'ios') {
    // Use blur effect on iOS for a modern glassmorphism look
    return (
      <BlurView
        intensity={80}
        tint={dark ? "dark" : "light"}
        style={tw`absolute inset-0`}
      >
        <View style={[tw`absolute inset-0`, { backgroundColor: colors.card + '40' }]} />
      </BlurView>
    );
  }

  // Fallback for Android - solid background with theming
  return (
    <View style={[tw`absolute inset-0 border-t`, 
                  { backgroundColor: colors.card, borderTopColor: colors.border }]} />
  );
};

export default TabBarBackground;