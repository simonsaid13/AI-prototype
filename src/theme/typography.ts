import type { TextStyle } from 'react-native';

// undefined = system font (San Francisco on iOS, Roboto on Android).
// Swap to a custom font name here once it is loaded with expo-font.
export const fontFamily = {
  regular: undefined,
  medium: undefined,
  bold: undefined,
} as const;

export const typography = {
  title: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  heading: { fontFamily: fontFamily.bold, fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22, fontWeight: '600' },
  caption: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18, fontWeight: '400' },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
