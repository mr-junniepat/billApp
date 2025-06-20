import { AlertTriangle, ArrowLeft, ChevronDown, Send, Shield } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const ReportScamScreen = ({ onBack }) => {
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
    <View style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={tw`flex-row items-center px-6 pt-12 pb-6`}>
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-medium ml-4`}>Report a Scam</Text>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6`}>
          {/* Warning Section */}
          <View style={tw`bg-red-900 bg-opacity-30 rounded-2xl p-4 mb-6 border border-red-800`}>
            <View style={tw`flex-row items-center mb-2`}>
              <AlertTriangle size={20} color="#ef4444" style={tw`mr-2`} />
              <Text style={tw`text-red-300 font-semibold`}>Security Alert</Text>
            </View>
            <Text style={tw`text-red-200 text-sm leading-5`}>
              Help us keep the community safe by reporting fraudulent activities. Your report helps protect other users.
            </Text>
          </View>

          {/* Report Form */}
          <View style={tw`bg-gray-900 rounded-3xl p-6 mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-6`}>Incident Details</Text>

            {/* Scam Type Dropdown */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>Type of Scam/Fraud</Text>
              <TouchableOpacity
                style={tw`bg-gray-800 rounded-2xl px-4 py-4 flex-row items-center justify-between`}
                onPress={() => setShowTypeDropdown(!showTypeDropdown)}
              >
                <Text style={tw`${selectedType ? 'text-white' : 'text-gray-500'} text-base`}>
                  {selectedType || 'Select scam type'}
                </Text>
                <ChevronDown 
                  size={20} 
                  color="#6b7280" 
                  style={tw`transform ${showTypeDropdown ? 'rotate-180' : 'rotate-0'}`} 
                />
              </TouchableOpacity>

              {showTypeDropdown && (
                <View style={tw`bg-gray-800 rounded-2xl mt-2 border border-gray-700`}>
                  {scamTypes.map((type, index) => (
                    <TouchableOpacity
                      key={index}
                      style={tw`px-4 py-3 ${index < scamTypes.length - 1 ? 'border-b border-gray-700' : ''}`}
                      onPress={() => selectScamType(type)}
                    >
                      <Text style={tw`text-white text-base`}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Description */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-gray-400 text-sm mb-2`}>Description</Text>
              <View style={tw`bg-gray-800 rounded-2xl px-4 py-4`}>
                <TextInput
                  style={tw`text-white text-base min-h-24`}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Please provide details about the scam or fraudulent activity..."
                  placeholderTextColor="#6b7280"
                  multiline
                  textAlignVertical="top"
                />
              </View>
              <Text style={tw`text-gray-500 text-xs mt-1`}>
                Include as much detail as possible (phone numbers, emails, amounts, etc.)
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={tw`bg-red-500 rounded-2xl py-4 flex-row items-center justify-center ${isSubmitting ? 'opacity-70' : ''}`}
              onPress={handleSubmitReport}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <View style={tw`w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3`} />
                  <Text style={tw`text-white text-lg font-semibold`}>Submitting...</Text>
                </>
              ) : (
                <>
                  <Send size={20} color="#ffffff" style={tw`mr-3`} />
                  <Text style={tw`text-white text-lg font-semibold`}>Submit Report</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Security Tips */}
          <View style={tw`bg-blue-900 bg-opacity-30 rounded-2xl p-4 border border-blue-800`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Shield size={20} color="#3b82f6" style={tw`mr-2`} />
              <Text style={tw`text-blue-300 font-semibold`}>Security Tips:</Text>
            </View>
            <Text style={tw`text-blue-200 text-sm leading-5`}>
              • Never share your security codes with anyone{'\n'}
              • Hoabill will never ask for codes via phone/email{'\n'}
              • Always verify requests through official channels{'\n'}
              • Report suspicious activities immediately
            </Text>
          </View>
        </View>

        <View style={tw`h-32`} />
      </ScrollView>
    </View>
  );
};

export default ReportScamScreen;