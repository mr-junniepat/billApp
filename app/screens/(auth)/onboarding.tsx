import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import tw from 'twrnc';

// Define Flat type
interface Flat {
  id: number;
  name: string;
}

const FLATS: Flat[] = [
  { id: 1, name: 'Flat 1A' },
  { id: 2, name: 'Flat 2B' },
  { id: 3, name: 'Flat 3C' },
  { id: 4, name: 'Flat 4D' },
  { id: 5, name: 'Flat 5E' },
];

interface OnboardingScreenProps {
  navigation?: any;
}

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const { colors } = useTheme();
  const themeColors = useThemeColors();
  const [selectedFlat, setSelectedFlat] = useState<Flat | null>(null);
  const [meterCount, setMeterCount] = useState<number>(1);
  const [step, setStep] = useState<number>(1);

  const handleFlatSelect = (flat: Flat) => {
    setSelectedFlat(flat);
    setStep(2);
  };

  const handleMeterChange = (change: number) => {
    setMeterCount((prev) => Math.max(1, prev + change));
  };

  const handleContinue = () => {
    // Save selections and proceed (e.g., navigate to next onboarding or dashboard)
    // navigation.replace('...');
    if (selectedFlat) {
      alert(`Flat: ${selectedFlat.name}, Meters: ${meterCount}`);
    }
  };

  return (
    <ThemedView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`flex-1 justify-center px-8`}>
        {step === 1 && (
          <>
            <ThemedText style={tw`text-2xl font-bold mb-6 text-center`}>Select Your Flat</ThemedText>
            {FLATS.map(flat => (
              <ThemedButton
                key={flat.id}
                variant={selectedFlat?.id === flat.id ? 'primary' : 'outline'}
                style={tw`mb-4`}
                onPress={() => handleFlatSelect(flat)}
              >
                <ThemedText style={tw`${selectedFlat?.id === flat.id ? 'text-white' : 'text-black'} text-lg`}>{flat.name}</ThemedText>
              </ThemedButton>
            ))}
          </>
        )}
        {step === 2 && selectedFlat && (
          <>
            <ThemedText style={tw`text-2xl font-bold mb-6 text-center`}>How many meters for {selectedFlat.name}?</ThemedText>
            <ThemedView style={tw`flex-row items-center justify-center mb-8`}>
              <ThemedButton variant="outline" style={tw`px-4 py-2 mr-4`} onPress={() => handleMeterChange(-1)}>
                <ThemedText style={tw`text-2xl`}>-</ThemedText>
              </ThemedButton>
              <ThemedText style={tw`text-3xl font-bold mx-4`}>{meterCount}</ThemedText>
              <ThemedButton variant="outline" style={tw`px-4 py-2 ml-4`} onPress={() => handleMeterChange(1)}>
                <ThemedText style={tw`text-2xl`}>+</ThemedText>
              </ThemedButton>
            </ThemedView>
            <ThemedButton variant="primary" style={tw`mt-4`} onPress={handleContinue}>
              <ThemedText style={tw`text-white text-lg font-semibold`}>Continue</ThemedText>
            </ThemedButton>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
} 