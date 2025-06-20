import { ArrowLeft, ExternalLink, FileText, Mail, MessageCircle, Phone } from 'lucide-react-native';
import React from 'react';
import { Alert, Linking, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const HelpScreen = ({ onBack }) => {
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

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={tw`flex-row items-center px-6 pt-12 pb-6`}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-medium ml-4`}>Need a Help</Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6`}>
          {/* Welcome Message */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-white text-2xl font-bold mb-2`}>How can we help you?</Text>
            <Text style={tw`text-gray-400 text-base leading-6`}>
              Our support team is here to assist you 24/7. Choose the best way to reach us.
            </Text>
          </View>

          {/* Contact Options */}
          <View style={tw`bg-gray-900 rounded-3xl p-6 mb-6`}>
            {contactOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={tw`flex-row items-center py-4 ${index < contactOptions.length - 1 ? 'border-b border-gray-800' : ''}`}
                  onPress={option.onPress}
                >
                  <View style={tw`w-12 h-12 bg-gray-800 rounded-2xl items-center justify-center mr-4`}>
                    <IconComponent size={20} color="#10b981" />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white font-medium text-base mb-1`}>{option.title}</Text>
                    <Text style={tw`text-gray-400 text-sm`}>{option.subtitle}</Text>
                  </View>
                  <ExternalLink size={16} color="#6b7280" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quick Help Topics */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-4`}>Quick Help Topics</Text>
            <View style={tw`bg-gray-900 rounded-3xl p-6`}>
              {[
                'How to generate security codes',
                'Payment and billing issues',
                'Account security settings',
                'Forgot password',
                'App troubleshooting'
              ].map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`py-3 ${index < 4 ? 'border-b border-gray-800' : ''}`}
                >
                  <Text style={tw`text-white text-base`}>{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Operating Hours */}
          <View style={tw`bg-blue-900 bg-opacity-30 rounded-2xl p-4 border border-blue-800`}>
            <Text style={tw`text-blue-300 font-semibold mb-2`}>Support Hours:</Text>
            <Text style={tw`text-blue-200 text-sm leading-5`}>
              • Live Chat: 24/7 Available{'\n'}
              • Phone Support: Mon-Fri 8AM-6PM{'\n'}
              • Email: Response within 24 hours{'\n'}
              • Emergency: 24/7 for security issues
            </Text>
          </View>
        </View>

        <View style={tw`h-32`} />
      </ScrollView>
    </View>
  );
};

export default HelpScreen;