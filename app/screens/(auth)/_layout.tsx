import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="signin" options={{ 
            headerShown: false 
          }} 
      />
      <Stack.Screen name="signup" options={{ 
            headerShown: false 
          }} 
      />
      <Stack.Screen name="forgotpassword"
        options={{ 
            headerShown: false 
        }}  
      />
      <Stack.Screen name="onboarding"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}