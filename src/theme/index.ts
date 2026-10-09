import { useColorScheme } from 'react-native';

import { darkColors, lightColors } from './colors';
import { radius, spacing } from './spacing';
import { typography } from './typography';

export function useTheme() {
  const scheme = useColorScheme();
  return {
    colors: scheme === 'dark' ? darkColors : lightColors,
    typography,
    spacing,
    radius,
  };
}

export type Theme = ReturnType<typeof useTheme>;
export type { ColorTokens } from './colors';
export type { TypographyVariant } from './typography';
