import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { CheckCircle, Mail, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
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
      setEmailSent(true);
    }, 2000);
  };

  const navigateToSignIn = () => {
    router.push('/screens/(auth)/signin');
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
              {/* Option 1: Icon-based logo */}
              <ThemedView style={[tw`w-24 h-24 rounded-full items-center justify-center mb-4`, 
                { backgroundColor: themeColors.primary + '20' }]}>
                <Zap size={48} color={themeColors.primary} />
              </ThemedView>
              
              {/* Option 2: Image logo (uncomment to use) */}
              {/* <Image 
                source={require('@/assets/images/logo.png')} 
                style={tw`w-32 h-32 mb-4`}
                resizeMode="contain"
              /> */}
              
              {/* App Name */}
              <ThemedText style={tw`text-2xl font-bold`}>Bill App</ThemedText>
            </ThemedView>

            {/* Header */}
            <ThemedView style={tw`mb-8`}>
              <ThemedText style={tw`text-3xl font-bold mb-2 text-center`}>Forgot Password?</ThemedText>
              <ThemedText type="caption" style={tw`text-base text-center`}>
                {emailSent ? 
                  'Check your email for reset instructions' : 
                  'Enter your email to reset your password'
                }
              </ThemedText>
            </ThemedView>

            {emailSent ? (
              /* Success State */
              <ThemedView style={tw`items-center mb-8`}>
                <ThemedView style={[tw`w-20 h-20 rounded-full items-center justify-center mb-6`, 
                                  { backgroundColor: themeColors.success + '20' }]}>
                  <CheckCircle size={40} color={themeColors.success} />
                </ThemedView>
                <ThemedText style={tw`text-2xl font-bold mb-4 text-center`}>Email Sent!</ThemedText>
                <ThemedText type="caption" style={tw`text-center leading-6 mb-8`}>
                  We've sent password reset instructions to{'\n'}
                  <ThemedText style={tw`font-semibold`}>{email}</ThemedText>
                  {'\n\n'}Please check your inbox and follow the link to reset your password.
                </ThemedText>
                
                <ThemedView style={tw`w-full`}>
                  <ThemedButton
                    variant="primary"
                    style={tw`py-4 mb-4`}
                    onPress={navigateToSignIn}
                  >
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Back to Sign In</ThemedText>
                  </ThemedButton>
                  
                  <ThemedButton
                    variant="outline"
                    style={tw`py-4`}
                    onPress={() => setEmailSent(false)}
                  >
                    <ThemedText style={tw`text-lg font-semibold`}>Try Different Email</ThemedText>
                  </ThemedButton>
                </ThemedView>
              </ThemedView>
            ) : (
              /* Form State */
              <ThemedView style={tw`mb-8`}>
                {/* Email Input */}
                <ThemedView style={tw`mb-8`}>
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

                {/* Reset Button */}
                <ThemedButton
                  variant="primary"
                  style={[tw`py-2 flex-row items-center justify-center mb-6`, 
                         isLoading && tw`opacity-70`]}
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <ThemedView style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3`} />
                      <ThemedText style={tw`text-white text-lg font-semibold`}>Sending...</ThemedText>
                    </>
                  ) : (
                    <>
                      <ThemedText style={tw`text-white text-lg font-semibold mr-3`}>Send Reset Link</ThemedText>
                    </>
                  )}
                </ThemedButton>

                {/* Back to Sign In */}
                <ThemedView style={tw`flex-row items-center justify-center`}>
                  <ThemedText type="caption" style={tw`mr-2`}>Remember your password?</ThemedText>
                  <ThemedButton variant="ghost" onPress={navigateToSignIn}>
                    <ThemedText type="link" style={tw`font-semibold`}>Sign In</ThemedText>
                  </ThemedButton>
                </ThemedView>
              </ThemedView>
            )}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}