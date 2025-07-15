import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemeInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Copy,
  History,
  RefreshCw,
  Share2,
  Shield,
  User
} from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Share, StatusBar } from 'react-native';
import tw from 'twrnc';

const CodeGenerationScreen = () => {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  
  const [securityCode, setSecurityCode] = useState('');
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form state for code creation
  const [recipientName, setRecipientName] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(30); // minutes
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [codeFor, setCodeFor] = useState('');
  const [useSpecificDateTime, setUseSpecificDateTime] = useState(false);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);
  
  // Simple date/time input states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Code history state
  const [codeHistory, setCodeHistory] = useState([
    {
      id: 1,
      code: '456789',
      recipientName: 'John Smith',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      duration: 60,
      isActive: false,
      isUsed: true
    },
    {
      id: 2,
      code: '123456',
      recipientName: 'Sarah Johnson',
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      expiresAt: new Date(Date.now() + 90 * 60 * 1000),
      duration: 120,
      isActive: true,
      isUsed: false
    },
    {
      id: 3,
      code: '789012',
      recipientName: 'Mike Wilson',
      createdAt: new Date(Date.now() - 10 * 60 * 1000),
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
      duration: 30,
      isActive: true,
      isUsed: false
    }
  ]);
  const [showHistory, setShowHistory] = useState(false);

  // Simplified duration options - only preset durations + specific time
  const durationOptions = [
    { label: '30 minutes', value: 30 },
    { label: '1 hour', value: 60 },
    { label: '2 hours', value: 120 },
    { label: '4 hours', value: 240 },
    { label: '8 hours', value: 480 },
    { label: '12 hours', value: 720 },
    { label: '24 hours', value: 1440 },
    { label: 'Set specific time', value: 'datetime' }
  ];

  // Generate random 6-digit security code
  const generateSecurityCode = () => {
    if (!recipientName.trim()) {
      Alert.alert('Error', 'Please enter the recipient\'s name');
      return;
    }

    let expiryDate;
    
    try {
      if (useSpecificDateTime) {
        // Parse manual date/time input
        if (!selectedDate || !selectedTime) {
          Alert.alert('Error', 'Please enter both date and time');
          return;
        }
        
        const dateTimeString = `${selectedDate}T${selectedTime}:00`;
        expiryDate = new Date(dateTimeString);
        
        if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
          Alert.alert('Error', 'Please enter a valid future date and time');
          return;
        }
      } else {
        // Use preset duration
        expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + selectedDuration);
      }
    } catch (error) {
      console.error('Error calculating expiry date:', error);
      Alert.alert('Error', 'Failed to calculate expiry time. Please check your settings.');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const createdAt = new Date();
      
      // Add to history
      const newCode = {
        id: Date.now(),
        code: code,
        recipientName: recipientName,
        createdAt: createdAt,
        expiresAt: expiryDate,
        duration: useSpecificDateTime ? 'specific' : selectedDuration,
        isActive: true,
        isUsed: false
      };
      
      setCodeHistory(prev => [newCode, ...prev]);
      
      setSecurityCode(code);
      setExpiryTime(expiryDate);
      setCodeFor(recipientName);
      setIsActive(true);
      setIsGenerating(false);
    }, 1500);
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

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, isActive]);

  const copyToClipboard = async () => {
    if (!securityCode) return;
    
    try {
      await Share.share({
        message: `Security Code for ${codeFor}: ${securityCode}\nValid until: ${expiryTime?.toLocaleString()}\n\nGenerated via Hoabill Security`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share code');
    }
  };

  const shareCode = async () => {
    if (!securityCode) return;

    try {
      await Share.share({
        message: `Estate Access Code for ${codeFor}\n\nCode: ${securityCode}\nValid until: ${expiryTime?.toLocaleString()}\n\nGenerated via Hoabill Security`,
        title: 'Estate Access Code'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share code');
    }
  };

  const resetForm = () => {
    setSecurityCode('');
    setExpiryTime(null);
    setTimeRemaining('');
    setIsActive(false);
    setCodeFor('');
    setRecipientName('');
    setSelectedDuration(30);
    setUseSpecificDateTime(false);
    setShowCustomTimeInput(false);
    setSelectedDate('');
    setSelectedTime('');
  };

  const selectDuration = (duration) => {
    if (duration === 'datetime') {
      setUseSpecificDateTime(true);
      setShowCustomTimeInput(true);
      // Set default date/time values
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
      setSelectedTime('12:00');
    } else {
      setUseSpecificDateTime(false);
      setShowCustomTimeInput(false);
      setSelectedDuration(duration);
    }
    setShowDurationDropdown(false);
  };

  const getDurationLabel = () => {
    if (useSpecificDateTime) {
      if (selectedDate && selectedTime) {
        const date = new Date(`${selectedDate}T${selectedTime}`);
        return `Until ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      return 'Set specific date & time';
    }
    const option = durationOptions.find(opt => opt.value === selectedDuration);
    return option ? option.label : '30 minutes';
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.abs(now - date);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  const getCodeStatus = (codeItem) => {
    const now = new Date();
    if (codeItem.isUsed) return { status: 'Used', color: themeColors.textMuted };
    if (now > codeItem.expiresAt) return { status: 'Expired', color: themeColors.error };
    return { status: 'Active', color: themeColors.success };
  };

  const shareHistoryCode = async (codeItem) => {
    try {
      await Share.share({
        message: `Estate Access Code for ${codeItem.recipientName}\n\nCode: ${codeItem.code}\nValid until: ${codeItem.expiresAt.toLocaleString()}\n\nGenerated via Hoabill Security`,
        title: 'Estate Access Code'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share code');
    }
  };

  const markCodeAsUsed = (codeId) => {
    Alert.alert(
      'Mark as Used',
      'Has this code been used by the visitor?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mark Used', 
          onPress: () => {
            setCodeHistory(prev => prev.map(code => 
              code.id === codeId ? { ...code, isUsed: true } : code
            ));
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={tw`flex-1`}>
      <StatusBar 
        barStyle={colors.background === '#000000' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={tw`px-6 pt-12 pb-6`}>
          <ThemedView style={tw`flex-row items-center justify-between mb-4`}>
            <ThemedView style={tw`flex-row items-center`}>
              <Shield size={24} color={themeColors.success} style={tw`mr-3`} />
              <ThemedText type="title">Security Access</ThemedText>
            </ThemedView>
            <ThemedButton 
              variant="ghost" 
              onPress={() => setShowHistory(!showHistory)}
              style={tw`flex-row items-center`}
            >
              <History size={20} color={themeColors.primary} style={tw`mr-2`} />
              <ThemedText type="link">{showHistory ? 'Hide' : 'History'}</ThemedText>
            </ThemedButton>
          </ThemedView>
          <ThemedText type="caption" style={tw`text-base`}>
            Generate a secure code for estate gate access
          </ThemedText>
        </ThemedView>

        <ThemedView style={tw`px-6`}>
          {/* Code History Section */}
          {showHistory && (
            <ThemedView variant="card" style={[tw`p-6 mb-6 border`, { borderColor: colors.border }]}>
              <ThemedView style={tw`flex-row items-center justify-between mb-4`}>
                <ThemedText type="subtitle">Recent Access Codes</ThemedText>
                <ThemedText type="caption">{codeHistory.length} total</ThemedText>
              </ThemedView>

              {codeHistory.length === 0 ? (
                <ThemedView style={tw`items-center py-8`}>
                  <History size={48} color={themeColors.textMuted} style={tw`mb-4`} />
                  <ThemedText type="caption" style={tw`text-center`}>
                    No codes generated yet{'\n'}Create your first access code below
                  </ThemedText>
                </ThemedView>
              ) : (
                <ThemedView style={tw`space-y-4`}>
                  {codeHistory.slice(0, 5).map((codeItem, index) => {
                    const status = getCodeStatus(codeItem);
                    const isExpired = new Date() > codeItem.expiresAt;
                    
                    return (
                      <ThemedView 
                        key={codeItem.id}
                        style={[tw`p-4 rounded-2xl border-b`, 
                               index < Math.min(codeHistory.length, 5) - 1 && { borderBottomColor: colors.border },
                               index === Math.min(codeHistory.length, 5) - 1 && tw`border-b-0`]}
                      >
                        <ThemedView style={tw`flex-row items-center justify-between mb-2`}>
                          <ThemedView style={tw`flex-1`}>
                            <ThemedText style={tw`font-semibold mb-1`}>{codeItem.recipientName}</ThemedText>
                            <ThemedView style={tw`flex-row items-center`}>
                              <ThemedText style={tw`font-mono text-lg mr-4`}>{codeItem.code}</ThemedText>
                              <ThemedText style={[tw`text-xs px-2 py-1 rounded-full`, 
                                                { backgroundColor: status.color + '20', color: status.color }]}>
                                {status.status}
                              </ThemedText>
                            </ThemedView>
                          </ThemedView>
                          
                          <ThemedView style={tw`flex-row items-center`}>
                            {!codeItem.isUsed && !isExpired && (
                              <ThemedButton 
                                variant="ghost" 
                                style={tw`p-2`}
                                onPress={() => shareHistoryCode(codeItem)}
                              >
                                <Share2 size={16} color={themeColors.textMuted} />
                              </ThemedButton>
                            )}
                            
                            {!codeItem.isUsed && !isExpired && (
                              <ThemedButton 
                                variant="ghost" 
                                style={tw`p-2 ml-2`}
                                onPress={() => markCodeAsUsed(codeItem.id)}
                              >
                                <CheckCircle size={16} color={themeColors.success} />
                              </ThemedButton>
                            )}
                          </ThemedView>
                        </ThemedView>
                        
                        <ThemedView style={tw`flex-row items-center justify-between`}>
                          <ThemedText type="caption" style={tw`text-xs`}>
                            Created {getRelativeTime(codeItem.createdAt)}
                          </ThemedText>
                          <ThemedText type="caption" style={tw`text-xs`}>
                            {isExpired || codeItem.isUsed ? 
                              `Expired ${getRelativeTime(codeItem.expiresAt)}` : 
                              getTimeRemaining(codeItem.expiresAt)
                            }
                          </ThemedText>
                        </ThemedView>
                      </ThemedView>
                    );
                  })}
                  
                  {codeHistory.length > 5 && (
                    <ThemedButton variant="ghost" style={tw`py-2`}>
                      <ThemedText type="link">View All ({codeHistory.length - 5} more)</ThemedText>
                    </ThemedButton>
                  )}
                </ThemedView>
              )}
            </ThemedView>
          )}
          
          {!securityCode ? (
            /* Code Creation Form */
            <ThemedView variant="card" style={[tw`p-6 mb-6 border`, { borderColor: colors.border }]}>
              <ThemedText type="subtitle" style={tw`mb-6`}>Create New Access Code</ThemedText>

              {/* Recipient Name */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Recipient Name</ThemedText>
                <ThemedInput
                  icon={<User size={20} color={themeColors.textMuted} />}
                  value={recipientName}
                  onChangeText={setRecipientName}
                  placeholder="Enter visitor's full name"
                />
              </ThemedView>

              {/* Duration Selection */}
              <ThemedView style={tw`mb-6`}>
                <ThemedText type="caption" style={tw`text-sm mb-2`}>Code Duration</ThemedText>
                <ThemedButton
                  variant="ghost"
                  style={[tw`flex-row items-center justify-between p-4 rounded-2xl`, 
                         { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
                  onPress={() => setShowDurationDropdown(!showDurationDropdown)}
                >
                  <ThemedView style={tw`flex-row items-center`}>
                    <Calendar size={20} color={themeColors.textMuted} style={tw`mr-3`} />
                    <ThemedText>{getDurationLabel()}</ThemedText>
                  </ThemedView>
                  <ChevronDown 
                    size={20} 
                    color={themeColors.textMuted}
                    style={[tw`transform`, showDurationDropdown && tw`rotate-180`]} 
                  />
                </ThemedButton>

                {showDurationDropdown && (
                  <ThemedView style={[tw`mt-2 rounded-2xl border`, 
                                    { backgroundColor: colors.card, borderColor: colors.border }]}>
                    {durationOptions.map((option, index) => (
                      <ThemedButton
                        key={option.value}
                        variant="ghost"
                        style={[tw`p-4 border-b`, 
                               index < durationOptions.length - 1 && { borderBottomColor: colors.border },
                               index === durationOptions.length - 1 && tw`border-b-0`]}
                        onPress={() => selectDuration(option.value)}
                      >
                        <ThemedText style={tw`text-left w-full`}>{option.label}</ThemedText>
                      </ThemedButton>
                    ))}
                  </ThemedView>
                )}

                {/* Specific Date & Time Input */}
                {showCustomTimeInput && useSpecificDateTime && (
                  <ThemedView style={tw`mt-4`}>
                    <ThemedText type="caption" style={tw`text-sm mb-2`}>Set Expiry Date & Time</ThemedText>
                    
                    <ThemedView style={tw`flex-row space-x-4 mb-4`}>
                      <ThemedView style={tw`flex-1`}>
                        <ThemedText type="caption" style={tw`text-xs mb-2`}>Date (YYYY-MM-DD)</ThemedText>
                        <ThemedInput
                          icon={<Calendar size={20} color={themeColors.textMuted} />}
                          value={selectedDate}
                          onChangeText={setSelectedDate}
                          placeholder="2024-12-25"
                        />
                      </ThemedView>
                      
                      <ThemedView style={tw`flex-1`}>
                        <ThemedText type="caption" style={tw`text-xs mb-2`}>Time (HH:MM)</ThemedText>
                        <ThemedInput
                          icon={<Clock size={20} color={themeColors.textMuted} />}
                          value={selectedTime}
                          onChangeText={setSelectedTime}
                          placeholder="14:30"
                        />
                      </ThemedView>
                    </ThemedView>
                    
                    {selectedDate && selectedTime && (
                      <ThemedView style={[tw`p-3 rounded-lg`, 
                                        { backgroundColor: (() => {
                                          try {
                                            const testDate = new Date(`${selectedDate}T${selectedTime}`);
                                            return testDate <= new Date() ? themeColors.error + '20' : themeColors.success + '20';
                                          } catch {
                                            return themeColors.error + '20';
                                          }
                                        })() }]}>
                        <ThemedText style={[tw`text-sm`, 
                                          { color: (() => {
                                            try {
                                              const testDate = new Date(`${selectedDate}T${selectedTime}`);
                                              return testDate <= new Date() ? themeColors.error : themeColors.success;
                                            } catch {
                                              return themeColors.error;
                                            }
                                          })() }]}>
                          {(() => {
                            try {
                              const testDate = new Date(`${selectedDate}T${selectedTime}`);
                              if (isNaN(testDate.getTime())) return '✗ Invalid date/time format';
                              if (testDate <= new Date()) return '✗ Please select a future date and time';
                              return `✓ Code expires: ${testDate.toLocaleString()}`;
                            } catch {
                              return '✗ Invalid date/time format';
                            }
                          })()}
                        </ThemedText>
                      </ThemedView>
                    )}
                  </ThemedView>
                )}
              </ThemedView>

              {/* Generate Button */}
              <ThemedButton
                variant="primary"
                style={[tw`py-2 px-6 flex-row items-center justify-center`, 
                       isGenerating && tw`opacity-70`]}
                onPress={generateSecurityCode}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={24} color="#ffffff" style={tw`mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Generating...</ThemedText>
                  </>
                ) : (
                  <>
                    <Shield size={24} color="#ffffff" style={tw`mr-3`} />
                    <ThemedText style={tw`text-white text-lg font-semibold`}>Generate Code</ThemedText>
                  </>
                )}
              </ThemedButton>
            </ThemedView>
          ) : (
            /* Generated Code Display */
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
                      <AlertCircle size={20} color={themeColors.error} style={tw`mr-2`} />
                      <ThemedText type="error" style={tw`font-semibold`}>Code Expired</ThemedText>
                    </>
                  )}
                </ThemedView>

                {/* Recipient Info */}
                <ThemedView style={tw`items-center mb-6`}>
                  <ThemedText type="caption" style={tw`text-sm mb-1`}>Access Code for</ThemedText>
                  <ThemedText type="subtitle" style={tw`mb-4`}>{codeFor}</ThemedText>
                  
                  {/* Security Code */}
                  <ThemedText style={tw`text-6xl font-mono font-bold tracking-wider mb-2`}>
                    {securityCode}
                  </ThemedText>
                  
                  {/* Timer */}
                  <ThemedView style={tw`flex-row items-center`}>
                    <Clock size={16} color={themeColors.textMuted} style={tw`mr-2`} />
                    <ThemedText type="caption" style={tw`text-sm`}>
                      {isActive ? `Expires in ${timeRemaining}` : 'Code expired'}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* Action Buttons Row */}
                {isActive && (
                  <ThemedView style={tw`flex-row justify-center w-full mb-6`}>
                    <ThemedButton
                      variant="secondary"
                      style={tw`p-4 mr-6 flex-1 items-center`}
                      onPress={copyToClipboard}
                    >
                      <Copy size={20} color={themeColors.textMuted} style={tw`mb-1`} />
                      <ThemedText type="caption" style={tw`text-xs`}>Copy</ThemedText>
                    </ThemedButton>
                    
                    <ThemedButton
                      variant="secondary"
                      style={tw`p-4 flex-1 items-center`}
                      onPress={shareCode}
                    >
                      <Share2 size={20} color={themeColors.textMuted} style={tw`mb-1`} />
                      <ThemedText type="caption" style={tw`text-xs`}>Share</ThemedText>
                    </ThemedButton>
                  </ThemedView>
                )}

                {/* Generate New Code Button */}
                <ThemedButton
                  variant="outline"
                  style={tw`py-3 px-6 w-full`}
                  onPress={resetForm}
                >
                  <ThemedText style={tw`font-semibold`}>Generate New Code</ThemedText>
                </ThemedButton>
              </ThemedView>
            </ThemedView>
          )}

          {/* Info Section */}
          <ThemedView style={[tw`rounded-2xl p-4 border mb-8`, 
                              { backgroundColor: themeColors.info + '20', borderColor: themeColors.info + '40' }]}>
            <ThemedText style={[tw`font-semibold mb-2`, { color: themeColors.info }]}>
              How it works:
            </ThemedText>
            <ThemedText style={[tw`text-sm leading-5`, { color: themeColors.info + 'CC' }]}>
              • Enter visitor's name and select duration{'\n'}
              • Share the generated code with your visitor{'\n'}
              • Visitor shows code to security at the gate{'\n'}
              • Code automatically expires after set duration{'\n'}
              • Each code can only be used once for security
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default CodeGenerationScreen;