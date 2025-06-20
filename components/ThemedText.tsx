import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextProps } from 'react-native';
import tw from 'twrnc';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle' | 'link' | 'caption' | 'error' | 'success';
};

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  const { colors } = useTheme();

  const getTypeStyles = () => {
    switch (type) {
      case 'title':
        return tw`text-2xl font-bold`;
      case 'subtitle':
        return tw`text-lg font-semibold`;
      case 'link':
        return tw`text-base font-medium`;
      case 'caption':
        return tw`text-sm`;
      case 'error':
        return tw`text-base`;
      case 'success':
        return tw`text-base`;
      default:
        return tw`text-base`;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'link':
        return '#10b981'; // Green
      case 'caption':
        return colors.text + '80'; // 50% opacity
      case 'error':
        return '#ef4444'; // Red
      case 'success':
        return '#10b981'; // Green
      default:
        return colors.text;
    }
  };

  return (
    <Text
      style={[
        getTypeStyles(),
        { color: getTypeColor() },
        style,
      ]}
      {...rest}
    />
  );
}