import { useTheme } from '@react-navigation/native';

export function useThemeColors() {
  const { colors } = useTheme();
  
  return {
    ...colors,
    // Custom colors for your app
    primary: '#10b981',
    secondary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Semantic colors
    textSecondary: colors.text + '80',
    textMuted: colors.text + '60',
    borderLight: colors.border + '40',
    surfaceLight: colors.card + '80',
  };
}