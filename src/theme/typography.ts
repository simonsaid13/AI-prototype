import type { TextStyle } from 'react-native';

// Names match the keys loaded with useFonts in src/app/_layout.tsx.
// Each weight is its own family, so no fontWeight is set (Android ignores the family otherwise).
export const fontFamily = {
  regular: 'LotaGrotesque-Regular',
  bold: 'LotaGrotesque-Bold',
} as const;

export const fontFiles = {
  [fontFamily.regular]: require('../../assets/fonts/LotaGrotesque-Regular.ttf'),
  [fontFamily.bold]: require('../../assets/fonts/LotaGrotesque-Bold.ttf'),
};

export const typography = {
  title: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34 },
  heading: { fontFamily: fontFamily.regular, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: fontFamily.bold, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
