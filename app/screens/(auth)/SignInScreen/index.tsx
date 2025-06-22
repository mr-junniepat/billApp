import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

export default function SignInScreen() {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)');
    }, 2000);
  };

  const navigateToSignUp = () => {
    router.push('/(auth)/signup');
  };

  const navigateToForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={tw`flex-1`}>
        <StatusBar 
          barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
          backgroundColor={colors.background} 
        />
        
        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          <ThemedView style={tw`px-6 pt-16 pb-8`}>
            {/* Header */}
            <ThemedView style={tw`mb-12`}>
              <ThemedText style={tw`text-4xl font-bold mb-2`}>Welcome Back</ThemedText>
              <ThemedText type="caption" style={tw`text-lg`}>
                Sign in to access your account
              </ThemedText>
            </ThemedView>

            {/* Form */}
            <ThemedView style={tw`mb-8`}>
              {/* Email Input */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Email Address</ThemedText>
                <ThemedInput
                  icon={<Mail size={20} color={themeColors.textMuted} />}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </ThemedView>

              {/* Password Input */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Password</ThemedText>
                <ThemedInput
                  icon={<Lock size={20} color={themeColors.textMuted} />}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  rightIcon={
                    <ThemedButton 
                      variant="ghost" 
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 
                        <EyeOff size={20} color={themeColors.textMuted} /> : 
                        <Eye size={20} color={themeColors.textMuted} />
                      }
                    </ThemedButton>
                  }
                />
              </ThemedView>

              {/* Forgot Password */}
              <ThemedView style={tw`items-end mb-8`}>
                <ThemedButton variant="ghost" onPress={navigateToForgotPassword}>
                  <ThemedText type="link">Forgot Password?</ThemedText>
                </ThemedButton>
              </ThemedView>

              {/* Sign In Button */}
              <ThemedButton
                variant="primary"
                style={[tw`py-4 flex-row items-center justify-center mb-6`, 
                       isLoading && tw`opacity-70`]}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ThemedView style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Signing In...</ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText style={tw`text-white text-lg font-semibold mr-3`}>Sign In</ThemedText>
                    <ArrowRight size={20} color="#ffffff" />
                  </>
                )}
              </ThemedButton>
            </ThemedView>

            {/* Sign Up Link */}
            <ThemedView style={tw`flex-row items-center justify-center`}>
              <ThemedText type="caption" style={tw`mr-2`}>Don't have an account?</ThemedText>
              <ThemedButton variant="ghost" onPress={navigateToSignUp}>
                <ThemedText type="link" style={tw`font-semibold`}>Sign Up</ThemedText>
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}