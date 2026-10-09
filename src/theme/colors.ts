const palette = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F7F7F8',
  gray100: '#ECECF1',
  gray300: '#C5C5D2',
  gray500: '#8E8EA0',
  gray700: '#40414F',
  gray800: '#343541',
  gray900: '#202123',
  brand: '#10A37F',
  brandDark: '#0E8F6F',
  red: '#E5484D',
  amber: '#F5A524',
} as const;

export type ColorTokens = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textOnPrimary: string;
  primary: string;
  primaryPressed: string;
  danger: string;
  warning: string;
  success: string;
};

export const lightColors: ColorTokens = {
  background: palette.white,
  surface: palette.gray50,
  surfaceMuted: palette.gray100,
  border: palette.gray300,
  textPrimary: palette.gray900,
  textSecondary: palette.gray500,
  textOnPrimary: palette.white,
  primary: palette.brand,
  primaryPressed: palette.brandDark,
  danger: palette.red,
  warning: palette.amber,
  success: palette.brand,
};

export const darkColors: ColorTokens = {
  background: palette.gray800,
  surface: palette.gray700,
  surfaceMuted: palette.gray900,
  border: palette.gray500,
  textPrimary: palette.gray50,
  textSecondary: palette.gray300,
  textOnPrimary: palette.white,
  primary: palette.brand,
  primaryPressed: palette.brandDark,
  danger: palette.red,
  warning: palette.amber,
  success: palette.brand,
};
