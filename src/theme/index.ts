import { lightColors } from './colors';
import { radius, spacing } from './spacing';
import { typography } from './typography';

const theme = {
  colors: lightColors,
  typography,
  spacing,
  radius,
};

export function useTheme() {
  return theme;
}

export type Theme = typeof theme;
export type { ColorTokens } from './colors';
export type { TypographyVariant } from './typography';
