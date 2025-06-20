
import { useThemeContext } from '@/contexts/ThemeContext';

export function useColorScheme() {
  const { isDark } = useThemeContext();
  return isDark ? 'dark' : 'light';
}