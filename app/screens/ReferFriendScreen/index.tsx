import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { ArrowLeft, Copy, Gift, Mail, Share2, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Share, StatusBar } from 'react-native';
import tw from 'twrnc';

const ReferFriendScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  
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
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header */}
      <ThemedView style={tw`flex-row items-center px-6 pt-12 pb-6`}>
        <ThemedButton variant="ghost" onPress={handleBack}>
          <ArrowLeft size={24} color={colors.text} />
        </ThemedButton>
        <ThemedText type="title" style={tw`text-xl ml-4`}>Refer a Friend</ThemedText>
      </ThemedView>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <ThemedView style={tw`px-6`}>
          {/* Welcome Message */}
          <ThemedView style={tw`items-center mb-8`}>
            <ThemedView style={[tw`w-20 h-20 rounded-full items-center justify-center mb-4`, 
                                { backgroundColor: themeColors.primary }]}>
              <Users size={32} color="#ffffff" />
            </ThemedView>
            <ThemedText type="title" style={tw`mb-2 text-center`}>Invite Friends & Earn</ThemedText>
            <ThemedText type="caption" style={tw`text-base text-center leading-6`}>
              Share Hoabill with your friends and family. You both get ₦500 when they join!
            </ThemedText>
          </ThemedView>

          {/* Referral Code Section */}
          <ThemedView variant="card" style={tw`p-6 mb-6`}>
            <ThemedText type="subtitle" style={tw`mb-4`}>Your Referral Code</ThemedText>
            <ThemedView variant="surface" style={tw`rounded-2xl p-4 mb-4`}>
              <ThemedView style={tw`flex-row items-center justify-between`}>
                <ThemedText style={[tw`text-2xl font-mono font-bold`, { color: themeColors.primary }]}>
                  {referralCode}
                </ThemedText>
                <ThemedButton variant="ghost" onPress={handleCopyCode}>
                  <Copy size={20} color={themeColors.primary} />
                </ThemedButton>
              </ThemedView>
            </ThemedView>
            <ThemedButton
              variant="primary"
              style={tw`py-3 flex-row items-center justify-center`}
              onPress={handleShareCode}
            >
              <Share2 size={20} color="#ffffff" style={tw`mr-2`} />
              <ThemedText style={tw`text-white font-semibold`}>Share Code</ThemedText>
            </ThemedButton>
          </ThemedView>

          {/* Invite by Email */}
          <ThemedView variant="card" style={tw`p-6 mb-6`}>
            <ThemedText type="subtitle" style={tw`mb-4`}>Invite by Email</ThemedText>
            <ThemedView style={tw`mb-4`}>
              <ThemedInput
                icon={<Mail size={20} color={themeColors.textMuted} />}
                value={friendEmail}
                onChangeText={setFriendEmail}
                placeholder="Enter friend's email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </ThemedView>
            <ThemedButton
              style={[tw`py-3 flex-row items-center justify-center`, 
                     { backgroundColor: themeColors.secondary }]}
              onPress={handleInviteByEmail}
            >
              <Mail size={20} color="#ffffff" style={tw`mr-2`} />
              <ThemedText style={tw`text-white font-semibold`}>Send Invitation</ThemedText>
            </ThemedButton>
          </ThemedView>

          {/* Rewards Info */}
          <ThemedView style={[tw`rounded-2xl p-4 border`, 
                            { backgroundColor: themeColors.success + '20', borderColor: themeColors.success + '40' }]}>
            <ThemedView style={tw`flex-row items-center mb-2`}>
              <Gift size={20} color={themeColors.success} style={tw`mr-2`} />
              <ThemedText style={[tw`font-semibold`, { color: themeColors.success }]}>
                How it Works:
              </ThemedText>
            </ThemedView>
            <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.success + 'CC' }]}>
              • Share your referral code with friends{'\n'}
              • They sign up and verify their account{'\n'}
              • You both receive ₦500 bonus credit{'\n'}
              • No limit on referrals - invite more, earn more!
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={tw`h-32`} />
      </ScrollView>
    </ThemedView>
  );
};

export default ReferFriendScreen;