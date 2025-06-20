import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, View } from 'react-native';
import tw from 'twrnc';

const TabBarBackground = () => {
  if (Platform.OS === 'ios') {
    // Use blur effect on iOS for a modern glassmorphism look
    return (
      <BlurView
        intensity={80}
        tint="dark"
        style={tw`absolute inset-0`}
      >
        <View style={tw`absolute inset-0 bg-black bg-opacity-20`} />
      </BlurView>
    );
  }

  // Fallback for Android - solid background with opacity
  return (
    <View style={tw`absolute inset-0 bg-gray-900 bg-opacity-95 border-t border-gray-800`} />
  );
};

export default TabBarBackground;