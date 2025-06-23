import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Lock, Mail, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

export default function SignInScreen() {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const router = useRouter();
  const { login } = useAuth();
  
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

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user data and token
      const userData = {
        id: '1',
        email: email,
        name: 'User Name'
      };
      const token = 'mock-auth-token';
      
      await login(userData, token);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    router.push('/screens/(auth)/signup');
  };

  const navigateToForgotPassword = () => {
    router.push('/screens/(auth)/forgotpassword');
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
            {/* Logo Section */}
            <ThemedView style={tw`items-center mb-8`}>
              <ThemedView style={[tw`w-24 h-24 rounded-full items-center justify-center mb-4`, 
                { backgroundColor: themeColors.primary + '20' }]}>
                <Zap size={48} color={themeColors.primary} />
              </ThemedView>
              
              <ThemedText style={tw`text-2xl font-bold`}>Bill App</ThemedText>
            </ThemedView>

            {/* Header */}
            <ThemedView style={tw`mb-6`}>
              <ThemedText style={tw`text-3xl font-bold mb-2 text-center`}>Welcome Back</ThemedText>
              <ThemedText type="caption" style={tw`text-base text-center`}>
                Sign in to access your account
              </ThemedText>
            </ThemedView>

            {/* Form */}
            <ThemedView style={tw`mb-6`}>
              {/* Email Input */}
              <ThemedView style={tw`mb-4`}>
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
              <ThemedView style={tw`mb-4`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Password</ThemedText>
                <ThemedInput
                  icon={<Lock size={20} color={themeColors.textMuted} />}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  rightIcon={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? 
                        <EyeOff size={20} color={themeColors.textMuted} /> : 
                        <Eye size={20} color={themeColors.textMuted} />
                      }
                    </Pressable>
                  }
                />
              </ThemedView>

              {/* Forgot Password */}
              <ThemedView style={tw`items-end mb-4`}>
                <ThemedButton variant="ghost" onPress={navigateToForgotPassword}>
                  <ThemedText type="link">Forgot Password?</ThemedText>
                </ThemedButton>
              </ThemedView>

              {/* Sign In Button */}
              <ThemedButton
                variant="primary"
                style={[tw`flex-row items-center justify-center mb-6`, 
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