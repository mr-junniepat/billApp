import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import { AlertTriangle, ArrowLeft, ChevronDown, Send, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

const ReportScamScreen = ({ onBack }) => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const scamTypes = [
    'Phishing Email/SMS',
    'Fake Security Code Request',
    'Unauthorized Transaction',
    'Identity Theft',
    'Fake Support Call',
    'Social Engineering',
    'Other'
  ];

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleSubmitReport = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a scam type');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description of the incident');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted',
        'Thank you for reporting this incident. Our security team will investigate and take appropriate action.',
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedType('');
              setDescription('');
              handleBack();
            }
          }
        ]
      );
    }, 2000);
  };

  const selectScamType = (type) => {
    setSelectedType(type);
    setShowTypeDropdown(false);
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
        <ThemedText type="title" style={tw`text-xl ml-4`}>Report a Scam</ThemedText>
      </ThemedView>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <ThemedView style={tw`px-6`}>
          {/* Warning Section */}
          <ThemedView style={[tw`rounded-2xl p-4 mb-6 border`, 
                            { backgroundColor: themeColors.error + '20', borderColor: themeColors.error + '40' }]}>
            <ThemedView style={tw`flex-row items-center mb-2`}>
              <AlertTriangle size={20} color={themeColors.error} style={tw`mr-2`} />
              <ThemedText style={[tw`font-semibold`, { color: themeColors.error }]}>
                Security Alert
              </ThemedText>
            </ThemedView>
            <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.error + 'CC' }]}>
              Help us keep the community safe by reporting fraudulent activities. Your report helps protect other users.
            </ThemedText>
          </ThemedView>

          {/* Report Form */}
          <ThemedView variant="card" style={tw`p-6 mb-6`}>
            <ThemedText type="subtitle" style={tw`mb-6`}>Incident Details</ThemedText>

            {/* Scam Type Dropdown */}
            <ThemedView style={tw`mb-6`}>
              <ThemedText type="caption" style={tw`text-sm mb-2`}>Type of Scam/Fraud</ThemedText>
              <ThemedButton
                variant="ghost"
                style={[tw`rounded-2xl px-4 py-4 flex-row items-center justify-between`, 
                       { backgroundColor: colors.card }]}
                onPress={() => setShowTypeDropdown(!showTypeDropdown)}
              >
                <ThemedText style={[tw`text-base`, selectedType ? {} : { color: themeColors.textMuted }]}>
                  {selectedType || 'Select scam type'}
                </ThemedText>
                <ChevronDown 
                  size={20} 
                  color={themeColors.textMuted}
                  style={[tw`transform`, showTypeDropdown && tw`rotate-180`]} 
                />
              </ThemedButton>

              {showTypeDropdown && (
                <ThemedView style={[tw`rounded-2xl mt-2 border`, 
                                  { backgroundColor: colors.card, borderColor: colors.border }]}>
                  {scamTypes.map((type, index) => (
                    <ThemedButton
                      key={index}
                      variant="ghost"
                      style={[tw`px-4 py-3 border-b`, 
                             index < scamTypes.length - 1 && { borderBottomColor: colors.border },
                             index === scamTypes.length - 1 && tw`border-b-0`]}
                      onPress={() => selectScamType(type)}
                    >
                      <ThemedText style={tw`text-base text-left w-full`}>{type}</ThemedText>
                    </ThemedButton>
                  ))}
                </ThemedView>
              )}
            </ThemedView>

            {/* Description */}
            <ThemedView style={tw`mb-6`}>
              <ThemedText type="caption" style={tw`text-sm mb-2`}>Description</ThemedText>
              <ThemedView style={[tw`rounded-2xl px-4 py-4`, { backgroundColor: colors.card }]}>
                <ThemedInput
                  style={tw`text-base min-h-24`}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Please provide details about the scam or fraudulent activity..."
                  multiline
                />
              </ThemedView>
              <ThemedText type="caption" style={tw`text-xs mt-1`}>
                Include as much detail as possible (phone numbers, emails, amounts, etc.)
              </ThemedText>
            </ThemedView>

            {/* Submit Button */}
            <ThemedButton
              style={[tw`py-4 flex-row items-center justify-center rounded-2xl`, 
                     { backgroundColor: themeColors.error },
                     isSubmitting && tw`opacity-70`]}
              onPress={handleSubmitReport}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <ThemedView style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3`} />
                  <ThemedText style={tw`text-white text-lg font-semibold`}>Submitting...</ThemedText>
                </>
              ) : (
                <>
                  <Send size={20} color="#ffffff" style={tw`mr-3`} />
                  <ThemedText style={tw`text-white text-lg font-semibold`}>Submit Report</ThemedText>
                </>
              )}
            </ThemedButton>
          </ThemedView>

          {/* Security Tips */}
          <ThemedView style={[tw`rounded-2xl p-4 border`, 
                            { backgroundColor: themeColors.info + '20', borderColor: themeColors.info + '40' }]}>
            <ThemedView style={tw`flex-row items-center mb-2`}>
              <Shield size={20} color={themeColors.info} style={tw`mr-2`} />
              <ThemedText style={[tw`font-semibold`, { color: themeColors.info }]}>
                Security Tips:
              </ThemedText>
            </ThemedView>
            <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.info + 'CC' }]}>
              • Never share your security codes with anyone{'\n'}
              • Hoabill will never ask for codes via phone/email{'\n'}
              • Always verify requests through official channels{'\n'}
              • Report suspicious activities immediately
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={tw`h-32`} />
      </ScrollView>
    </ThemedView>
  );
};

export default ReportScamScreen;