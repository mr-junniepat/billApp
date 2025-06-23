import { useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import tw from 'twrnc';

export type ThemedInputProps = TextInputProps & {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
};

export function ThemedInput({ 
  style, 
  icon, 
  rightIcon,
  error = false,
  ...rest 
}: ThemedInputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const containerStyle = {
    backgroundColor: colors.card,
    borderColor: error ? '#ef4444' : isFocused ? colors.primary : colors.border || '#e5e7eb',
    borderWidth: 1,
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    rest.onBlur?.(e);
  };

  if (icon || rightIcon) {
    return (
      <Pressable 
        onPress={() => inputRef.current?.focus()}
        style={[
          tw`flex-row items-center rounded-lg px-3`,
          containerStyle,
          { height: 44 },
        ]}
      >
        {icon && <View style={tw`mr-2`}>{icon}</View>}
        <TextInput
          ref={inputRef}
          style={[
            tw`flex-1 text-base py-0`,
            { color: colors.text },
            style,
          ]}
          placeholderTextColor={colors.text + '60'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon && <View style={tw`ml-2`}>{rightIcon}</View>}
      </Pressable>
    );
  }

  return (
    <TextInput
      style={[
        tw`rounded-lg px-4 text-base`,
        containerStyle,
        { color: colors.text, height: 44 },
        style,
      ]}
      placeholderTextColor={colors.text + '60'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
}