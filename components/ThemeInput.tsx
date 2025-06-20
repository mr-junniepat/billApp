import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import tw from 'twrnc';

export type ThemedInputProps = TextInputProps & {
  icon?: React.ReactNode;
  error?: boolean;
};

export function ThemedInput({ 
  style, 
  icon, 
  error = false,
  ...rest 
}: ThemedInputProps) {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.card,
    borderColor: error ? '#ef4444' : 'transparent',
    borderWidth: error ? 1 : 0,
  };

  if (icon) {
    return (
      <View style={[tw`flex-row items-center rounded-2xl px-4 py-4`, containerStyle]}>
        <View style={tw`mr-3`}>{icon}</View>
        <TextInput
          style={[
            tw`flex-1 text-base`,
            { color: colors.text },
            style,
          ]}
          placeholderTextColor={colors.text + '60'}
          {...rest}
        />
      </View>
    );
  }

  return (
    <TextInput
      style={[
        tw`rounded-2xl px-4 py-4 text-base`,
        containerStyle,
        { color: colors.text },
        style,
      ]}
      placeholderTextColor={colors.text + '60'}
      {...rest}
    />
  );
}