import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

export default function SignUpScreen() {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(auth)/signin') }
      ]);
    }, 2000);
  };

  const navigateToSignIn = () => {
    router.push('/(auth)/signin');
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
            <ThemedView style={tw`mb-8`}>
              <ThemedText style={tw`text-4xl font-bold mb-2`}>Create Account</ThemedText>
              <ThemedText type="caption" style={tw`text-lg`}>
                Join us to get started
              </ThemedText>
            </ThemedView>

            {/* Form */}
            <ThemedView style={tw`mb-8`}>
              {/* Name Fields */}
              <ThemedView style={tw`flex-row mb-6`}>
                <ThemedView style={tw`flex-1 mr-3`}>
                  <ThemedText type="caption" style={tw`text-sm mb-2`}>First Name</ThemedText>
                  <ThemedInput
                    icon={<User size={20} color={themeColors.textMuted} />}
                    value={formData.firstName}
                    onChangeText={(text) => updateField('firstName', text)}
                    placeholder="First name"
                  />
                </ThemedView>
                <ThemedView style={tw`flex-1 ml-3`}>
                  <ThemedText type="caption" style={tw`text-sm mb-2`}>Last Name</ThemedText>
                  <ThemedInput
                    icon={<User size={20} color={themeColors.textMuted} />}
                    value={formData.lastName}
                    onChangeText={(text) => updateField('lastName', text)}
                    placeholder="Last name"
                  />
                </ThemedView>
              </ThemedView>

              {/* Email */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Email Address</ThemedText>
                <ThemedInput
                  icon={<Mail size={20} color={themeColors.textMuted} />}
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </ThemedView>

              {/* Phone */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Phone Number (Optional)</ThemedText>
                <ThemedInput
                  icon={<Phone size={20} color={themeColors.textMuted} />}
                  value={formData.phone}
                  onChangeText={(text) => updateField('phone', text)}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </ThemedView>

              {/* Password */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Password</ThemedText>
                <ThemedInput
                  icon={<Lock size={20} color={themeColors.textMuted} />}
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
                  placeholder="Create a password"
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

              {/* Confirm Password */}
              <ThemedView style={tw`mb-8`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Confirm Password</ThemedText>
                <ThemedInput
                  icon={<Lock size={20} color={themeColors.textMuted} />}
                  value={formData.confirmPassword}
                  onChangeText={(text) => updateField('confirmPassword', text)}
                  placeholder="Confirm your password"
                  secureTextEntry={!showConfirmPassword}
                  rightIcon={
                    <ThemedButton 
                      variant="ghost" 
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 
                        <EyeOff size={20} color={themeColors.textMuted} /> : 
                        <Eye size={20} color={themeColors.textMuted} />
                      }
                    </ThemedButton>
                  }
                />
              </ThemedView>

              {/* Sign Up Button */}
              <ThemedButton
                variant="primary"
                style={[tw`py-4 flex-row items-center justify-center mb-6`, 
                       isLoading && tw`opacity-70`]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ThemedView style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Creating Account...</ThemedText>
                  </>
                ) : (
                  <>
                    <ThemedText style={tw`text-white text-lg font-semibold mr-3`}>Create Account</ThemedText>
                    <ArrowRight size={20} color="#ffffff" />
                  </>
                )}
              </ThemedButton>
            </ThemedView>

            {/* Sign In Link */}
            <ThemedView style={tw`flex-row items-center justify-center`}>
              <ThemedText type="caption" style={tw`mr-2`}>Already have an account?</ThemedText>
              <ThemedButton variant="ghost" onPress={navigateToSignIn}>
                <ThemedText type="link" style={tw`font-semibold`}>Sign In</ThemedText>
              </ThemedButton>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}