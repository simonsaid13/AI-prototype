import { Text, type TextProps } from 'react-native';

import { useTheme, type ColorTokens, type TypographyVariant } from '@/theme';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: keyof ColorTokens;
};

export function AppText({ variant = 'body', color = 'textPrimary', style, ...rest }: AppTextProps) {
  const { colors, typography } = useTheme();
  return <Text style={[typography[variant], { color: colors[color] }, style]} {...rest} />;
}
