import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
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
import { Alert, Share, StatusBar } from 'react-native';
import tw from 'twrnc';

const CodeGenerationScreen = () => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  
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
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header */}
      <ThemedView style={tw`px-6 pt-12 pb-6`}>
        <ThemedView style={tw`flex-row items-center mb-4`}>
          <Shield size={24} color={themeColors.success} style={tw`mr-3`} />
          <ThemedText type="title">Security Access</ThemedText>
        </ThemedView>
        <ThemedText type="caption" style={tw`text-base`}>
          Generate a secure code for estate gate access
        </ThemedText>
      </ThemedView>

      {/* Main Content */}
      <ThemedView style={tw`flex-1 px-6`}>
        {/* Code Display Card */}
        <ThemedView variant="card" style={[tw`p-8 mb-6 border`, { borderColor: colors.border }]}>
          <ThemedView style={tw`items-center`}>
            {/* Status Indicator */}
            <ThemedView style={tw`flex-row items-center mb-6`}>
              {isActive ? (
                <>
                  <CheckCircle size={20} color={themeColors.success} style={tw`mr-2`} />
                  <ThemedText type="success" style={tw`font-semibold`}>Active Code</ThemedText>
                </>
              ) : (
                <>
                  <AlertCircle size={20} color={themeColors.textMuted} style={tw`mr-2`} />
                  <ThemedText type="caption" style={tw`font-semibold`}>No Active Code</ThemedText>
                </>
              )}
            </ThemedView>

            {/* Security Code */}
            {securityCode ? (
              <ThemedView style={tw`items-center mb-6`}>
                <ThemedText style={tw`text-6xl font-mono font-bold tracking-wider mb-2`}>
                  {securityCode}
                </ThemedText>
                <ThemedView style={tw`flex-row items-center`}>
                  <Clock size={16} color={themeColors.textMuted} style={tw`mr-2`} />
                  <ThemedText type="caption" style={tw`text-sm`}>
                    {isActive ? `Expires in ${timeRemaining}` : 'Code expired'}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            ) : (
              <ThemedView style={tw`items-center mb-6 py-8`}>
                <Shield size={48} color={themeColors.textMuted} style={tw`mb-4`} />
                <ThemedText style={tw`text-lg text-center mb-2`} type="caption">
                  No security code generated
                </ThemedText>
                <ThemedText type="caption" style={tw`text-sm text-center`}>
                  Tap "Generate Code" to create a new access code
                </ThemedText>
              </ThemedView>
            )}

            {/* Action Buttons Row */}
            {securityCode && isActive && (
              <ThemedView style={tw`flex-row justify-center w-full`}>
                <ThemedButton
                  variant="secondary"
                  style={tw`p-4 mr-3 flex-1 items-center`}
                  onPress={copyToClipboard}
                >
                  <Copy size={20} color={themeColors.textMuted} style={tw`mb-1`} />
                  <ThemedText type="caption" style={tw`text-xs`}>Copy</ThemedText>
                </ThemedButton>
                
                <ThemedButton
                  variant="secondary"
                  style={tw`p-4 mr-3 flex-1 items-center`}
                  onPress={shareCode}
                >
                  <Share2 size={20} color={themeColors.textMuted} style={tw`mb-1`} />
                  <ThemedText type="caption" style={tw`text-xs`}>Share</ThemedText>
                </ThemedButton>

                <ThemedButton
                  variant="secondary"
                  style={tw`p-4 flex-1 items-center`}
                  onPress={handleQRCode}
                >
                  <QrCode size={20} color={themeColors.textMuted} style={tw`mb-1`} />
                  <ThemedText type="caption" style={tw`text-xs`}>QR Code</ThemedText>
                </ThemedButton>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>

        {/* Generate/Refresh Button */}
        <ThemedButton
          variant="primary"
          style={[tw`py-4 px-6 flex-row items-center justify-center mb-6`, 
                 isGenerating && tw`opacity-70`]}
          onPress={generateSecurityCode}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <RefreshCw size={24} color="#ffffff" style={tw`mr-3`} />
          ) : (
            <Shield size={24} color="#ffffff" style={tw`mr-3`} />
          )}
          <ThemedText style={tw`text-white text-lg font-semibold`}>
            {isGenerating ? 'Generating...' : securityCode ? 'Generate New Code' : 'Generate Code'}
          </ThemedText>
        </ThemedButton>

        {/* Info Section */}
        <ThemedView style={[tw`rounded-2xl p-4 border`, 
                            { backgroundColor: themeColors.info + '20', borderColor: themeColors.info + '40' }]}>
          <ThemedText style={[tw`font-semibold mb-2`, { color: themeColors.info }]}>
            How it works:
          </ThemedText>
          <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.info + 'CC' }]}>
            • Show this code to the security guard at the gate{'\n'}
            • Code is valid for 30 minutes from generation{'\n'}
            • Generate a new code if the current one expires{'\n'}
            • Each code can only be used once for security
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default CodeGenerationScreen;