import {
    AlertCircle,
    CheckCircle,
    Clock,
    Copy,
    QrCode,
    RefreshCw,
    Share2,
    Shield
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Share, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const CodeGenerationScreen = () => {
  const [securityCode, setSecurityCode] = useState('');
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate random 6-digit security code
  const generateSecurityCode = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 30); // 30 minutes validity
      
      setSecurityCode(code);
      setExpiryTime(expiry);
      setIsActive(true);
      setIsGenerating(false);
    }, 1500); // Simulate generation delay
  };

  // Calculate time remaining
  useEffect(() => {
    if (!expiryTime || !isActive) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = expiryTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expired');
        setIsActive(false);
        clearInterval(timer);
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, isActive]);

  const copyToClipboard = async () => {
    if (!securityCode) return;
    
    try {
      await Share.share({
        message: `Security Code: ${securityCode}\nValid until: ${expiryTime?.toLocaleTimeString()}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share code');
    }
  };

  const shareCode = async () => {
    if (!securityCode) return;

    try {
      await Share.share({
        message: `My estate access code: ${securityCode}\nValid until: ${expiryTime?.toLocaleTimeString()}\n\nGenerated via Hoabill Security`,
        title: 'Estate Access Code'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share code');
    }
  };

  const handleQRCode = () => {
    if (!securityCode) {
      Alert.alert('No Code', 'Generate a security code first');
      return;
    }
    Alert.alert('QR Code', 'QR Code feature coming soon!');
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={tw`px-6 pt-12 pb-6`}>
        <View style={tw`flex-row items-center mb-4`}>
          <Shield size={24} color="#10b981" style={tw`mr-3`} />
          <Text style={tw`text-white text-2xl font-bold`}>Security Access</Text>
        </View>
        <Text style={tw`text-gray-400 text-base`}>
          Generate a secure code for estate gate access
        </Text>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 px-6`}>
        {/* Code Display Card */}
        <View style={tw`bg-gray-900 rounded-3xl p-8 mb-6 border border-gray-800`}>
          <View style={tw`items-center`}>
            {/* Status Indicator */}
            <View style={tw`flex-row items-center mb-6`}>
              {isActive ? (
                <>
                  <CheckCircle size={20} color="#10b981" style={tw`mr-2`} />
                  <Text style={tw`text-green-400 font-semibold`}>Active Code</Text>
                </>
              ) : (
                <>
                  <AlertCircle size={20} color="#6b7280" style={tw`mr-2`} />
                  <Text style={tw`text-gray-400 font-semibold`}>No Active Code</Text>
                </>
              )}
            </View>

            {/* Security Code */}
            {securityCode ? (
              <View style={tw`items-center mb-6`}>
                <Text style={tw`text-6xl font-mono font-bold text-white tracking-wider mb-2`}>
                  {securityCode}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <Clock size={16} color="#6b7280" style={tw`mr-2`} />
                  <Text style={tw`text-gray-400 text-sm`}>
                    {isActive ? `Expires in ${timeRemaining}` : 'Code expired'}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={tw`items-center mb-6 py-8`}>
                <Shield size={48} color="#374151" style={tw`mb-4`} />
                <Text style={tw`text-gray-500 text-lg text-center`}>
                  No security code generated
                </Text>
                <Text style={tw`text-gray-600 text-sm text-center mt-2`}>
                  Tap "Generate Code" to create a new access code
                </Text>
              </View>
            )}

            {/* Action Buttons Row */}
            {securityCode && isActive && (
              <View style={tw`flex-row justify-center w-full`}>
                <TouchableOpacity
                  style={tw`bg-gray-800 rounded-2xl p-4 mr-3 flex-1 items-center`}
                  onPress={copyToClipboard}
                >
                  <Copy size={20} color="#6b7280" style={tw`mb-1`} />
                  <Text style={tw`text-gray-400 text-xs`}>Copy</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={tw`bg-gray-800 rounded-2xl p-4 mr-3 flex-1 items-center`}
                  onPress={shareCode}
                >
                  <Share2 size={20} color="#6b7280" style={tw`mb-1`} />
                  <Text style={tw`text-gray-400 text-xs`}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`bg-gray-800 rounded-2xl p-4 flex-1 items-center`}
                  onPress={handleQRCode}
                >
                  <QrCode size={20} color="#6b7280" style={tw`mb-1`} />
                  <Text style={tw`text-gray-400 text-xs`}>QR Code</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Generate/Refresh Button */}
        <TouchableOpacity
          style={tw`bg-green-500 rounded-2xl py-4 px-6 flex-row items-center justify-center mb-6 ${isGenerating ? 'opacity-70' : ''}`}
          onPress={generateSecurityCode}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <RefreshCw size={24} color="#ffffff" style={tw`mr-3 animate-spin`} />
          ) : (
            <Shield size={24} color="#ffffff" style={tw`mr-3`} />
          )}
          <Text style={tw`text-white text-lg font-semibold`}>
            {isGenerating ? 'Generating...' : securityCode ? 'Generate New Code' : 'Generate Code'}
          </Text>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={tw`bg-blue-900 bg-opacity-30 rounded-2xl p-4 border border-blue-800`}>
          <Text style={tw`text-blue-300 font-semibold mb-2`}>How it works:</Text>
          <Text style={tw`text-blue-200 text-sm leading-5`}>
            • Show this code to the security guard at the gate{'\n'}
            • Code is valid for 30 minutes from generation{'\n'}
            • Generate a new code if the current one expires{'\n'}
            • Each code can only be used once for security
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CodeGenerationScreen;