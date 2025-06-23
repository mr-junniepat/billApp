import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import tw from 'twrnc';

export type ThemedButtonProps = TouchableOpacityProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'small' | 'medium' | 'large';
};

export function ThemedButton({ 
  style, 
  variant = 'primary', 
  size = 'medium',
  children,
  ...rest 
}: ThemedButtonProps) {
  const { colors } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return tw`px-3 rounded-lg`;
      case 'large':
        return tw`px-5 rounded-xl`;
      default:
        return tw`px-4 rounded-lg`;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#10b981',
        };
      case 'secondary':
        return {
          backgroundColor: colors.border,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'destructive':
        return {
          backgroundColor: '#ef4444',
        };
      default:
        return {
          backgroundColor: '#10b981',
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        tw`items-center justify-center flex-row`,
        getSizeStyles(),
        getVariantStyle(),
        { height: 50 },
        style,
      ]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}