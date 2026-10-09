const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F7F7F8',
  gray100: '#ECECF1',
  gray300: '#BCBFC2',
  gray500: '#7C8083',
  gray700: '#333333',
  gray900: '#1E1E1E',
  indigo50: '#F7F9FF',
  indigo100: '#DFE4F9',
  purple: '#7240DC',
  purpleMagenta: '#9030D2',
  red: '#E5484D',
  amber: '#F5A524',
  green: '#10A37F',
} as const;

export type ColorTokens = {
  background: string;
  backgroundTint: string;
  surface: string;
  surfaceMuted: string;
  glass: string;
  border: string;
  shadow: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textPlaceholder: string;
  textOnPrimary: string;
  primary: string;
  primaryPressed: string;
  primaryGradient: string;
  danger: string;
  warning: string;
  success: string;
};

export const lightColors: ColorTokens = {
  background: palette.white,
  backgroundTint: palette.indigo50,
  surface: palette.gray50,
  surfaceMuted: palette.gray100,
  glass: 'rgba(255, 255, 255, 0.45)',
  border: palette.indigo100,
  shadow: 'rgba(0, 0, 0, 0.10)',
  textPrimary: palette.gray900,
  textSecondary: palette.gray500,
  textTertiary: palette.gray300,
  textPlaceholder: palette.gray700,
  textOnPrimary: palette.white,
  primary: palette.purple,
  primaryPressed: palette.purpleMagenta,
  primaryGradient: `linear-gradient(258deg, ${palette.purpleMagenta} 0%, ${palette.purple} 65%)`,
  danger: palette.red,
  warning: palette.amber,
  success: palette.green,
};
