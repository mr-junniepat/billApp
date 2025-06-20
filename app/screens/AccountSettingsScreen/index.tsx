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
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import tw from 'twrnc';

const AccountSettingsScreen = ({ onBack }) => {
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
      style={tw`flex-1 bg-black`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-6 pt-12 pb-6`}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-medium`}>Account Settings</Text>
        <TouchableOpacity onPress={handleEditToggle}>
          {isEditing ? (
            <Text style={tw`text-gray-400 text-base`}>Cancel</Text>
          ) : (
            <Edit3 size={20} color="#10b981" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={tw`items-center mb-8`}>
          <View style={tw`relative`}>
            <View style={tw`w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700`}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' }}
                style={tw`w-full h-full`}
              />
            </View>
            {isEditing && (
              <TouchableOpacity 
                style={tw`absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full items-center justify-center`}
                onPress={handleImagePicker}
              >
                <Camera size={16} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={tw`text-white text-lg font-medium mt-3`}>
            {formData.firstName} {formData.lastName}
          </Text>
          <Text style={tw`text-gray-400 text-sm`}>{formData.email}</Text>
        </View>

        {/* Form Fields */}
        <View style={tw`px-6`}>
          <View style={tw`bg-gray-900 rounded-3xl p-6`}>
            {/* First Name */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>First Name</Text>
              <View style={tw`flex-row items-center bg-gray-800 rounded-2xl px-4 py-4`}>
                <User size={20} color="#6b7280" style={tw`mr-3`} />
                {isEditing ? (
                  <TextInput
                    style={tw`flex-1 text-white text-base`}
                    value={formData.firstName}
                    onChangeText={(text) => updateField('firstName', text)}
                    placeholder="Enter first name"
                    placeholderTextColor="#6b7280"
                  />
                ) : (
                  <Text style={tw`flex-1 text-white text-base`}>{formData.firstName}</Text>
                )}
              </View>
            </View>

            {/* Last Name */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>Last Name</Text>
              <View style={tw`flex-row items-center bg-gray-800 rounded-2xl px-4 py-4`}>
                <User size={20} color="#6b7280" style={tw`mr-3`} />
                {isEditing ? (
                  <TextInput
                    style={tw`flex-1 text-white text-base`}
                    value={formData.lastName}
                    onChangeText={(text) => updateField('lastName', text)}
                    placeholder="Enter last name"
                    placeholderTextColor="#6b7280"
                  />
                ) : (
                  <Text style={tw`flex-1 text-white text-base`}>{formData.lastName}</Text>
                )}
              </View>
            </View>

            {/* Email */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>Email Address</Text>
              <View style={tw`flex-row items-center bg-gray-800 rounded-2xl px-4 py-4`}>
                <Mail size={20} color="#6b7280" style={tw`mr-3`} />
                {isEditing ? (
                  <TextInput
                    style={tw`flex-1 text-white text-base`}
                    value={formData.email}
                    onChangeText={(text) => updateField('email', text)}
                    placeholder="Enter email address"
                    placeholderTextColor="#6b7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                ) : (
                  <Text style={tw`flex-1 text-white text-base`}>{formData.email}</Text>
                )}
              </View>
            </View>

            {/* Phone */}
            <View style={tw`mb-0`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>Phone Number</Text>
              <View style={tw`flex-row items-center bg-gray-800 rounded-2xl px-4 py-4`}>
                <Phone size={20} color="#6b7280" style={tw`mr-3`} />
                {isEditing ? (
                  <TextInput
                    style={tw`flex-1 text-white text-base`}
                    value={formData.phone}
                    onChangeText={(text) => updateField('phone', text)}
                    placeholder="Enter phone number"
                    placeholderTextColor="#6b7280"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={tw`flex-1 text-white text-base`}>{formData.phone}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Save Button */}
          {isEditing && (
            <TouchableOpacity
              style={tw`bg-green-500 rounded-2xl py-4 px-6 flex-row items-center justify-center mt-6 ${isSaving ? 'opacity-70' : ''}`}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <View style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3`} />
                  <Text style={tw`text-white text-lg font-semibold`}>Saving...</Text>
                </>
              ) : (
                <>
                  <Check size={20} color="#ffffff" style={tw`mr-3`} />
                  <Text style={tw`text-white text-lg font-semibold`}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {/* Info Section */}
          <View style={tw`bg-blue-900 bg-opacity-30 rounded-2xl p-4 mt-6 border border-blue-800`}>
            <Text style={tw`text-blue-300 font-semibold mb-2`}>Account Information:</Text>
            <Text style={tw`text-blue-200 text-sm leading-5`}>
              • Your email address is used for account verification{'\n'}
              • Phone number is used for security notifications{'\n'}
              • Profile changes may take a few minutes to reflect{'\n'}
              • Contact support if you need to change sensitive information
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={tw`h-32`} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccountSettingsScreen;