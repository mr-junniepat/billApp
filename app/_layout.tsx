import { XludeDarkTheme, XludeLightTheme } from '@/constants/Themes';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider, useThemeContext } from '@/contexts/ThemeContext';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

function RootLayoutNav() {
  const { isDark } = useThemeContext();
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const theme = isDark ? XludeDarkTheme : XludeLightTheme;

  useEffect(() => {
    const inAuthGroup = segments[0] === 'screens' && segments[1] === '(auth)';

    if (isLoading) return; // Still checking auth status

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth if not authenticated
      router.replace('/screens/(auth)/signin');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    // Show loading screen while checking auth
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationThemeProvider value={theme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="screens"
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="+not-found" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}