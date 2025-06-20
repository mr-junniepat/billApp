import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import {
  ArrowLeft,
  Camera,
  Check,
  Edit3,
  Mail,
  Phone,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import tw from 'twrnc';

const AccountSettingsScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: 'Afolabi',
    lastName: 'Segun Ojo', 
    email: 'olagoladams@gmail.com',
    phone: '+234 803 123 4567'
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      Alert.alert('Back', 'Navigate back to settings');
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - restore original data
      setFormData({ ...originalData });
      setIsEditing(false);
    } else {
      // Start editing
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    // Validate fields
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setOriginalData({ ...formData });
      setIsEditing(false);
      setIsSaving(false);
      Alert.alert('Success', 'Profile updated successfully!');
    }, 1500);
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') }
      ]
    );
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
        
        {/* Header */}
        <ThemedView style={tw`flex-row items-center justify-between px-6 pt-12 pb-6`}>
          <ThemedButton variant="ghost" onPress={handleBack}>
            <ArrowLeft size={24} color={colors.text} />
          </ThemedButton>
          <ThemedText type="title" style={tw`text-xl`}>Account Settings</ThemedText>
          <ThemedButton variant="ghost" onPress={handleEditToggle}>
            {isEditing ? (
              <ThemedText type="caption" style={tw`text-base`}>Cancel</ThemedText>
            ) : (
              <Edit3 size={20} color={themeColors.primary} />
            )}
          </ThemedButton>
        </ThemedView>

        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          {/* Profile Photo Section */}
          <ThemedView style={tw`items-center mb-8`}>
            <ThemedView style={tw`relative`}>
              <ThemedView style={[tw`w-24 h-24 rounded-full overflow-hidden border-2`, { borderColor: colors.border }]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' }}
                  style={tw`w-full h-full`}
                />
              </ThemedView>
              {isEditing && (
                <ThemedButton 
                  variant="primary"
                  style={tw`absolute -bottom-1 -right-1 w-8 h-8 rounded-full items-center justify-center p-0`}
                  onPress={handleImagePicker}
                >
                  <Camera size={16} color="#ffffff" />
                </ThemedButton>
              )}
            </ThemedView>
            <ThemedText type="subtitle" style={tw`mt-3`}>
              {formData.firstName} {formData.lastName}
            </ThemedText>
            <ThemedText type="caption">{formData.email}</ThemedText>
          </ThemedView>

          {/* Form Fields */}
          <ThemedView style={tw`px-6`}>
            <ThemedView variant="card" style={tw`p-6`}>
              {/* First Name */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>First Name</ThemedText>
                <ThemedView variant="surface" style={tw`flex-row items-center px-4 py-4 rounded-2xl`}>
                  <User size={20} color={themeColors.textMuted} style={tw`mr-3`} />
                  {isEditing ? (
                    <ThemedInput
                      style={tw`flex-1 text-base`}
                      value={formData.firstName}
                      onChangeText={(text) => updateField('firstName', text)}
                      placeholder="Enter first name"
                    />
                  ) : (
                    <ThemedText style={tw`flex-1 text-base`}>{formData.firstName}</ThemedText>
                  )}
                </ThemedView>
              </ThemedView>

              {/* Last Name */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Last Name</ThemedText>
                <ThemedView variant="surface" style={tw`flex-row items-center px-4 py-4 rounded-2xl`}>
                  <User size={20} color={themeColors.textMuted} style={tw`mr-3`} />
                  {isEditing ? (
                    <ThemedInput
                      style={tw`flex-1 text-base`}
                      value={formData.lastName}
                      onChangeText={(text) => updateField('lastName', text)}
                      placeholder="Enter last name"
                    />
                  ) : (
                    <ThemedText style={tw`flex-1 text-base`}>{formData.lastName}</ThemedText>
                  )}
                </ThemedView>
              </ThemedView>

              {/* Email */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Email Address</ThemedText>
                <ThemedView variant="surface" style={tw`flex-row items-center px-4 py-4 rounded-2xl`}>
                  <Mail size={20} color={themeColors.textMuted} style={tw`mr-3`} />
                  {isEditing ? (
                    <ThemedInput
                      style={tw`flex-1 text-base`}
                      value={formData.email}
                      onChangeText={(text) => updateField('email', text)}
                      placeholder="Enter email address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  ) : (
                    <ThemedText style={tw`flex-1 text-base`}>{formData.email}</ThemedText>
                  )}
                </ThemedView>
              </ThemedView>

              {/* Phone */}
              <ThemedView style={tw`mb-0`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Phone Number</ThemedText>
                <ThemedView variant="surface" style={tw`flex-row items-center px-4 py-4 rounded-2xl`}>
                  <Phone size={20} color={themeColors.textMuted} style={tw`mr-3`} />
                  {isEditing ? (
                    <ThemedInput
                      style={tw`flex-1 text-base`}
                      value={formData.phone}
                      onChangeText={(text) => updateField('phone', text)}
                      placeholder="Enter phone number"
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <ThemedText style={tw`flex-1 text-base`}>{formData.phone}</ThemedText>
                  )}
                </ThemedView>
              </ThemedView>
            </ThemedView>

            {/* Save Button */}
            {isEditing && (
              <ThemedButton
                variant="primary"
                style={[tw`py-4 px-6 flex-row items-center justify-center mt-6`, 
                       isSaving && tw`opacity-70`]}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <ThemedView style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Saving...</ThemedText>
                  </>
                ) : (
                  <>
                    <Check size={20} color="#ffffff" style={tw`mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Save Changes</ThemedText>
                  </>
                )}
              </ThemedButton>
            )}

            {/* Info Section */}
            <ThemedView style={[tw`rounded-2xl p-4 mt-6 border`, 
                              { backgroundColor: themeColors.info + '20', borderColor: themeColors.info + '40' }]}>
              <ThemedText style={[tw`font-semibold mb-2`, { color: themeColors.info }]}>
                Account Information:
              </ThemedText>
              <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.info + 'CC' }]}>
                • Your email address is used for account verification{'\n'}
                • Phone number is used for security notifications{'\n'}
                • Profile changes may take a few minutes to reflect{'\n'}
                • Contact support if you need to change sensitive information
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {/* Bottom Spacing */}
          <ThemedView style={tw`h-32`} />
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default AccountSettingsScreen;