import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { ArrowLeft, ExternalLink, FileText, Mail, MessageCircle, Phone } from 'lucide-react-native';
import React from 'react';
import { Alert, Linking, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

const HelpScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleLiveChat = () => {
    Alert.alert('Live Chat', 'Opening live chat support...');
  };

  const handlePhoneCall = () => {
    Linking.openURL('tel:+2348031234567').catch(() => {
      Alert.alert('Error', 'Could not open phone dialer');
    });
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@Hoabill.com?subject=Support Request').catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  const handleFAQ = () => {
    Alert.alert('FAQ', 'Opening frequently asked questions...');
  };

  const contactOptions = [
    {
      id: 1,
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      onPress: handleLiveChat,
      available: true
    },
    {
      id: 2,
      icon: Phone,
      title: 'Call Us',
      subtitle: '+234 803 123 4567',
      onPress: handlePhoneCall,
      available: true
    },
    {
      id: 3,
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@Hoabill.com',
      onPress: handleEmail,
      available: true
    },
    {
      id: 4,
      icon: FileText,
      title: 'FAQ',
      subtitle: 'Frequently asked questions',
      onPress: handleFAQ,
      available: true
    }
  ];

  const helpTopics = [
    'How to generate security codes',
    'Payment and billing issues',
    'Account security settings',
    'Forgot password',
    'App troubleshooting'
  ];

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
        <ThemedText type="title" style={tw`text-xl ml-4`}>Need a Help</ThemedText>
      </ThemedView>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <ThemedView style={tw`px-6`}>
          {/* Welcome Message */}
          <ThemedView style={tw`mb-8`}>
            <ThemedText type="title" style={tw`mb-2`}>How can we help you?</ThemedText>
            <ThemedText type="caption" style={tw`text-base leading-6`}>
              Our support team is here to assist you 24/7. Choose the best way to reach us.
            </ThemedText>
          </ThemedView>

          {/* Contact Options */}
          <ThemedView variant="card" style={tw`p-2 mb-6`}>
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <ThemedButton
                  key={option.id}
                  variant="ghost"
                  style={[tw`flex-row items-center py-4 border-b`, 
                         index < contactOptions.length - 1 && { borderBottomColor: colors.border },
                         index === contactOptions.length - 1 && tw`border-b-0`]}
                  onPress={option.onPress}
                >
                  <ThemedView variant="surface" style={tw`w-12 h-12 rounded-2xl items-center justify-center mr-4`}>
                    <IconComponent size={20} color={themeColors.primary} />
                  </ThemedView>
                  <ThemedView style={tw`flex-1`}>
                    <ThemedText style={tw`font-medium text-base mb-1`}>{option.title}</ThemedText>
                    <ThemedText type="caption" style={tw`text-sm`}>{option.subtitle}</ThemedText>
                  </ThemedView>
                  <ExternalLink size={16} color={themeColors.textMuted} />
                </ThemedButton>
              );
            })}
          </ThemedView>

          {/* Quick Help Topics */}
          <ThemedView style={tw`mb-6`}>
            <ThemedText type="subtitle" style={tw`mb-4`}>Quick Help Topics</ThemedText>
            <ThemedView variant="card" style={tw`p-6`}>
              {helpTopics.map((topic, index) => (
                <ThemedButton
                  key={index}
                  variant="ghost"
                  style={[tw`py-3 border-b`, 
                         index < helpTopics.length - 1 && { borderBottomColor: colors.border },
                         index === helpTopics.length - 1 && tw`border-b-0`]}
                >
                  <ThemedText style={tw`text-base text-left w-full`}>{topic}</ThemedText>
                </ThemedButton>
              ))}
            </ThemedView>
          </ThemedView>

          {/* Operating Hours */}
          <ThemedView style={[tw`rounded-2xl p-4 border`, 
                            { backgroundColor: themeColors.info + '20', borderColor: themeColors.info + '40' }]}>
            <ThemedText style={[tw`font-semibold mb-2`, { color: themeColors.info }]}>
              Support Hours:
            </ThemedText>
            <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.info + 'CC' }]}>
              • Live Chat: 24/7 Available{'\n'}
              • Phone Support: Mon-Fri 8AM-6PM{'\n'}
              • Email: Response within 24 hours{'\n'}
              • Emergency: 24/7 for security issues
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={tw`h-32`} />
      </ScrollView>
    </ThemedView>
  );
};

export default HelpScreen;