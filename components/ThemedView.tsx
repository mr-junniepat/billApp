import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  variant?: 'default' | 'card' | 'surface' | 'primary' | 'secondary';
};

export function ThemedView({ style, variant = 'default', ...rest }: ThemedViewProps) {
  const { colors } = useTheme();

  const getVariantStyle = () => {
    switch (variant) {
      case 'card':
        return {
          backgroundColor: colors.card,
          borderRadius: 24,
          padding: 10,
        };
      case 'surface':
        return {
          backgroundColor: colors.background === '#000000' ? '#1a1a1a' : '#f5f5f5', // Dark gray for dark mode, light gray for light mode
          borderRadius: 16,
          padding: 10,
        };
      case 'primary':
        return {
          backgroundColor: '#10b981',
          borderRadius: 16,
          padding: 10,
        };
      case 'secondary':
        return {
          backgroundColor: colors.background === '#000000' ? '#2a2a2a' : '#e5e5e5', // Slightly different shade than surface
          borderRadius: 16,
          padding: 6,
        };
      default:
        return {
          backgroundColor: 'transparent',
        };
    }
  };

  return (
    <View
      style={[
        getVariantStyle(),
        style,
      ]}
      {...rest}
    />
  );
}