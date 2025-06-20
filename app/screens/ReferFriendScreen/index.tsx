import { ArrowLeft, Copy, Gift, Mail, MessageSquare, Share2, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Share, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const ReferFriendScreen = ({ onBack }) => {
  const [referralCode] = useState('Hoabill2025');
  const [friendEmail, setFriendEmail] = useState('');

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleCopyCode = async () => {
    try {
      await Share.share({
        message: referralCode,
      });
      Alert.alert('Copied!', 'Referral code copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy referral code');
    }
  };

  const handleShareCode = async () => {
    try {
      await Share.share({
        message: `Join me on Hoabill! Use my referral code: ${referralCode} and get ₦500 bonus when you sign up. Download the app now!`,
        title: 'Join Hoabill App'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share referral code');
    }
  };

  const handleInviteByEmail = () => {
    if (!friendEmail.trim()) {
      Alert.alert('Error', 'Please enter your friend\'s email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(friendEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert('Invitation Sent!', `Invitation sent to ${friendEmail}`);
    setFriendEmail('');
  };

  const handleSocialShare = (platform) => {
    Alert.alert('Share', `Opening ${platform} to share referral code...`);
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={tw`flex-row items-center px-6 pt-12 pb-6`}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-medium ml-4`}>Refer a Friend</Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6`}>
          {/* Welcome Message */}
          <View style={tw`items-center mb-8`}>
            <View style={tw`w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4`}>
              <Users size={32} color="#ffffff" />
            </View>
            <Text style={tw`text-white text-2xl font-bold mb-2 text-center`}>Invite Friends & Earn</Text>
            <Text style={tw`text-gray-400 text-base text-center leading-6`}>
              Share Hoabill with your friends and family. You both get ₦500 when they join!
            </Text>
          </View>

          {/* Referral Code Section */}
          <View style={tw`bg-gray-900 rounded-3xl p-6 mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-4`}>Your Referral Code</Text>
            <View style={tw`bg-gray-800 rounded-2xl p-4 mb-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-green-400 text-2xl font-mono font-bold`}>{referralCode}</Text>
                <TouchableOpacity onPress={handleCopyCode}>
                  <Copy size={20} color="#10b981" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={tw`bg-green-500 rounded-2xl py-3 flex-row items-center justify-center`}
              onPress={handleShareCode}
            >
              <Share2 size={20} color="#ffffff" style={tw`mr-2`} />
              <Text style={tw`text-white font-semibold`}>Share Code</Text>
            </TouchableOpacity>
          </View>

          {/* Invite by Email */}
          <View style={tw`bg-gray-900 rounded-3xl p-6 mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-4`}>Invite by Email</Text>
            <View style={tw`flex-row items-center bg-gray-800 rounded-2xl px-4 py-3 mb-4`}>
              <Mail size={20} color="#6b7280" style={tw`mr-3`} />
              <TextInput
                style={tw`flex-1 text-white text-base`}
                value={friendEmail}
                onChangeText={setFriendEmail}
                placeholder="Enter friend's email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={tw`bg-blue-500 rounded-2xl py-3 flex-row items-center justify-center`}
              onPress={handleInviteByEmail}
            >
              <Mail size={20} color="#ffffff" style={tw`mr-2`} />
              <Text style={tw`text-white font-semibold`}>Send Invitation</Text>
            </TouchableOpacity>
          </View>

          {/* Social Sharing */}
          <View style={tw`bg-gray-900 rounded-3xl p-6 mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-4`}>Share on Social Media</Text>
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-blue-600 rounded-2xl p-4 flex-1 items-center mr-2`}
                onPress={() => handleSocialShare('WhatsApp')}
              >
                <MessageSquare size={24} color="#ffffff" style={tw`mb-2`} />
                <Text style={tw`text-white text-sm font-medium`}>WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-blue-500 rounded-2xl p-4 flex-1 items-center mx-1`}
                onPress={() => handleSocialShare('Facebook')}
              >
                <Share2 size={24} color="#ffffff" style={tw`mb-2`} />
                <Text style={tw`text-white text-sm font-medium`}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-blue-400 rounded-2xl p-4 flex-1 items-center ml-2`}
                onPress={() => handleSocialShare('Twitter')}
              >
                <Share2 size={24} color="#ffffff" style={tw`mb-2`} />
                <Text style={tw`text-white text-sm font-medium`}>Twitter</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rewards Info */}
          <View style={tw`bg-green-900 bg-opacity-30 rounded-2xl p-4 border border-green-800`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Gift size={20} color="#10b981" style={tw`mr-2`} />
              <Text style={tw`text-green-300 font-semibold`}>How it Works:</Text>
            </View>
            <Text style={tw`text-green-200 text-sm leading-5`}>
              • Share your referral code with friends{'\n'}
              • They sign up and verify their account{'\n'}
              • You both receive ₦500 bonus credit{'\n'}
              • No limit on referrals - invite more, earn more!
            </Text>
          </View>
        </View>

        <View style={tw`h-32`} />
      </ScrollView>
    </View>
  );
};

export default ReferFriendScreen;