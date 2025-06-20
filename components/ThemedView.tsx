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
          padding: 24,
        };
      case 'surface':
        return {
          backgroundColor: colors.border,
          borderRadius: 16,
          padding: 16,
        };
      case 'primary':
        return {
          backgroundColor: '#10b981',
          borderRadius: 16,
          padding: 16,
        };
      case 'secondary':
        return {
          backgroundColor: colors.border,
          borderRadius: 16,
          padding: 12,
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
