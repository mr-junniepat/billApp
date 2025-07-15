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
  Sun
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, Linking, Platform, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import HelpScreen from '../screens/HelpScreen';
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
            Alert.alert('Theme Changed', 'Light theme selected');
          }
        },
        {
          text: 'Dark',
          onPress: () => {
            setThemeMode('dark');
            Alert.alert('Theme Changed', 'Dark theme selected');
          }
        },
        {
          text: 'System',
          onPress: () => {
            setThemeMode('system');
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
        return <Sun size={20} color={themeColors.warning} />;
      case 'dark':
        return <Moon size={20} color={colors.text} />;
      default:
        return <Smartphone size={20} color={colors.text} />;
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

  if (currentScreen === 'report') {
    return <ReportScamScreen onBack={handleBack} />;
  }

  return (
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView 
        style={tw`flex-1`} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}
      >
        {/* Header */}
        <ThemedView style={tw`px-6 pt-16 pb-8`}>
          <ThemedText type="title" style={tw`text-3xl font-bold`}>Settings</ThemedText>
        </ThemedView>

        {/* User Profile Section */}
        <ThemedView style={tw`px-6 mb-8`}>
          <ThemedButton 
            variant="ghost"
            style={tw`flex-row items-center justify-between p-0`}
            onPress={handleAccountSettings}
          >
            <ThemedView style={tw`flex-row items-center flex-1`}>
              <ThemedView style={tw`w-16 h-16 rounded-full mr-4 overflow-hidden`}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
                  style={tw`w-full h-full`}
                />
              </ThemedView>
              <ThemedView style={tw`flex-1`}>
                <ThemedText type="caption" style={tw`text-sm mb-1 opacity-60`}>{userEmail}</ThemedText>
                <ThemedText type="subtitle" style={tw`text-xl font-bold`}>{userName}</ThemedText>
              </ThemedView>
            </ThemedView>
            <ChevronRight size={24} color={colors.text} />
          </ThemedButton>
        </ThemedView>

        {/* Settings List */}
        <ThemedView 
          style={[tw`mx-6 rounded-3xl`, { backgroundColor: colors.card }]}
        >
          {/* Account Settings */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-4 px-6 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleAccountSettings}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              <SettingsIcon size={20} color={colors.text} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-semibold text-base mb-1`}>Account Settings</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>Manage your account and security preferences</ThemedText>
            </ThemedView>
            <ChevronRight size={20} color={colors.text} />
          </ThemedButton>

          {/* Theme Switcher */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-4 px-6 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleThemeChange}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              {getThemeIcon()}
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-semibold text-base mb-1`}>Appearance</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>{getThemeDescription()}</ThemedText>
            </ThemedView>
            <ThemedView style={tw`flex-row items-center`}>
              <ThemedText type="caption" style={tw`mr-3 capitalize text-sm font-medium opacity-60`}>{themeMode}</ThemedText>
              <ChevronRight size={20} color={colors.text} />
            </ThemedView>
          </ThemedButton>

          {/* Need Help */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-4 px-6 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleNeedHelp}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              <HelpCircle size={20} color={colors.text} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-semibold text-base mb-1`}>Need Help</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>Talk to our customer service</ThemedText>
            </ThemedView>
            <ChevronRight size={20} color={colors.text} />
          </ThemedButton>

     

          {/* Report a Scam */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-4 px-6 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleReportScam}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              <AlertTriangle size={20} color={themeColors.error} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-semibold text-base mb-1`}>Report a Scam</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>Report fraudulent activity</ThemedText>
            </ThemedView>
            <ChevronRight size={20} color={colors.text} />
          </ThemedButton>

          {/* Rate Us */}
          <ThemedButton
            variant="ghost"
            style={[tw`flex-row items-center py-4 px-6 border-b`, { borderBottomColor: colors.border }]}
            onPress={handleRateUs}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              <Star size={20} color={themeColors.warning} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText style={tw`font-semibold text-base mb-1`}>Rate Us</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>Give us a rating on the app store</ThemedText>
            </ThemedView>
            <ChevronRight size={20} color={colors.text} />
          </ThemedButton>

          {/* Sign Out */}
          <ThemedButton
            variant="ghost"
            style={tw`flex-row items-center py-4 px-6`}
            onPress={handleSignOut}
          >
            <ThemedView variant="surface" style={tw`w-11 h-11 rounded-xl items-center justify-center mr-4 p-0`}>
              <LogOut size={20} color={themeColors.error} />
            </ThemedView>
            <ThemedView style={tw`flex-1`}>
              <ThemedText type="error" style={tw`font-semibold text-base mb-1`}>Sign Out</ThemedText>
              <ThemedText type="caption" style={tw`text-sm opacity-60`}>Logout of your account</ThemedText>
            </ThemedView>
            <ChevronRight size={20} color={themeColors.error} />
          </ThemedButton>
        </ThemedView>

        {/* Bottom Spacing */}
        <ThemedView style={tw`h-24`} />
      </ScrollView>
    </ThemedView>
  );
};

export default SettingsScreen;