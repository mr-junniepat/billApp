import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import {
  AlertTriangle,
  ChevronRight,
  HelpCircle,
  LogOut,
  Moon,
  Settings as SettingsIcon,
  Smartphone,
  Star,
  Sun,
  Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, Linking, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import ReferFriendScreen from '../screens/ReferFriendScreen';
import ReportScamScreen from '../screens/ReportScamScreen';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const colorScheme = useColorScheme();
  
  const [currentScreen, setCurrentScreen] = useState('settings');
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  
  const userEmail = "olagoladams@gmail.com";
  const userName = "Afolabi Segun Ojo";

  const handleAccountSettings = () => {
    setCurrentScreen('account');
  };

  const handleNeedHelp = () => {
    setCurrentScreen('help');
  };

  const handleReferFriend = () => {
    setCurrentScreen('refer');
  };

  const handleReportScam = () => {
    setCurrentScreen('report');
  };

  const handleThemeChange = () => {
    Alert.alert(
      'Choose Theme',
      'Select your preferred theme',
      [
        {
          text: 'Light',
          onPress: () => {
            setThemeMode('light');
            // Here you would implement actual theme switching logic
            Alert.alert('Theme Changed', 'Light theme selected');
          }
        },
        {
          text: 'Dark',
          onPress: () => {
            setThemeMode('dark');
            // Here you would implement actual theme switching logic
            Alert.alert('Theme Changed', 'Dark theme selected');
          }
        },
        {
          text: 'System',
          onPress: () => {
            setThemeMode('system');
            // Here you would implement actual theme switching logic
            Alert.alert('Theme Changed', 'System theme selected');
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleRateUs = () => {
    const storeUrl = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/app/id123456789' 
      : 'https://play.google.com/store/apps/details?id=com.Hoabill.app';
    
    Linking.openURL(storeUrl).catch(() => {
      Alert.alert('Error', 'Could not open app store');
    });
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            console.log('User signed out');
            Alert.alert('Signed Out', 'You have been signed out successfully');
          },
        },
      ]
    );
  };

  const handleBack = () => {
    setCurrentScreen('settings');
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun size={18} color={themeColors.warning} />;
      case 'dark':
        return <Moon size={18} color={colors.text} />;
      default:
        return <Smartphone size={18} color={colors.text} />;
    }
  };

  const getThemeDescription = () => {
    switch (themeMode) {
      case 'light':
        return 'Light theme is active';
      case 'dark':
        return 'Dark theme is active';
      default:
        return 'Following system preference';
    }
  };

  // Render different screens based on current screen
  if (currentScreen === 'account') {
    return <AccountSettingsScreen onBack={handleBack} />;
  }
  
  if (currentScreen === 'help') {
    return <HelpScreen onBack={handleBack} />;
  }
  
  if (currentScreen === 'refer') {
    return <ReferFriendScreen onBack={handleBack} />;
  }
  
  if (currentScreen === 'report') {
    return <ReportScamScreen onBack={handleBack} />;
  }

  return (
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={tw`px-6 pt-12 pb-8`}>
          <ThemedText type="title" style={tw`text-xl`}>Settings</ThemedText>
        </ThemedView>

        {/* User Profile Section */}
        <ThemedView style={tw`px-6 mb-8`}>
          <ThemedButton 
            variant="ghost"
            style={tw`flex-row items-center justify-between p-0`}
            onPress={handleAccountSettings}
          >
            <ThemedView style={tw`flex-row items-center flex-1`}>
              <ThemedView style={tw`w-12 h-12 rounded-full mr-4 overflow-hidden`}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                  style={tw`w-full h-full`}
                />
              </ThemedView>
              <ThemedView style={tw`flex-1`}>
                <ThemedText type="caption">{userEmail}</ThemedText>
                <ThemedText type="subtitle">{userName}</ThemedText>
              </ThemedView>
            </ThemedView>
            <ChevronRight size={20} color={colors.text} />
          </ThemedButton>
        </ThemedView>

        {/* Settings List */}
        <ThemedView style={tw`px-2 mx-6 rounded-3xl`} variant="card">
          {/* Account Settings */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center border-b`, { borderBottomColor: colors.border }]}
            onPress={handleAccountSettings}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <SettingsIcon size={18} color={colors.text} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Account Settings</ThemedText>
              <ThemedText type="caption">Manage your account and security preferences.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={colors.text} />
          </ThemedButton>

          {/* Theme Switcher */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-5 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleThemeChange}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              {getThemeIcon()}
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Appearance</ThemedText>
              <ThemedText type="caption">{getThemeDescription()}</ThemedText>
            </ThemedView>
            <ThemedView style={tw`flex-row items-center`}>
              <ThemedText type="caption" style={tw`mr-2 capitalize`}>{themeMode}</ThemedText>
              <ChevronRight size={18} color={colors.text} />
            </ThemedView>
          </ThemedButton>

          {/* Need a Help */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-5 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleNeedHelp}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <HelpCircle size={18} color={colors.text} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Need a Help</ThemedText>
              <ThemedText type="caption">Talk to our customer service.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={colors.text} />
          </ThemedButton>

          {/* Refer a Friend */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-5 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleReferFriend}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <Users size={18} color={colors.text} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Refer a Friend</ThemedText>
              <ThemedText type="caption">Tell a friend or family about us.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={colors.text} />
          </ThemedButton>

          {/* Report a Scam */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-5 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleReportScam}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <AlertTriangle size={18} color={themeColors.error} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Report a Scam</ThemedText>
              <ThemedText type="caption">Report or log form of fraudulent activity.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={colors.text} />
          </ThemedButton>

          {/* Rate Us */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-5 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleRateUs}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <Star size={18} color={themeColors.warning} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-medium text-base mb-1`}>Rate Us</ThemedText>
              <ThemedText type="caption">Give us a rating on the app store.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={colors.text} />
          </ThemedButton>

          {/* Sign Out */}
          <ThemedButton
            variant="ghost"
            style={tw`flex-row items-center py-5`}
            onPress={handleSignOut}
          >
            <ThemedView variant="surface" style={tw`w-10 h-10 rounded-xl items-center justify-center mr-4`}>
              <LogOut size={18} color={themeColors.error} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText type="error" style={tw`font-medium text-base mb-1`}>Sign Out</ThemedText>
              <ThemedText type="caption">Logout of your account.</ThemedText>
            </ThemedView>
            <ChevronRight size={18} color={themeColors.error} />
          </ThemedButton>
        </ThemedView>

        {/* Bottom Spacing */}
        <ThemedView style={tw`h-32`} />
      </ScrollView>
    </ThemedView>
  );
};

export default SettingsScreen;