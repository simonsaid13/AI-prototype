import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import type { ReactNode } from 'react';
import { Platform, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

const hasLiquidGlass = Platform.OS === 'ios' && isLiquidGlassAvailable() && isGlassEffectAPIAvailable();

type GlassProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  fallbackColor?: string;
  interactive?: boolean;
};

// Liquid glass on iOS 26+. Elsewhere the Figma fallback: translucent white with a soft shadow.
// Never fade this view or its parents with opacity: iOS stops rendering the glass.
export function Glass({ children, style, fallbackColor, interactive = false }: GlassProps) {
  const { colors } = useTheme();

  if (hasLiquidGlass) {
    return (
      <GlassView isInteractive={interactive} colorScheme="light" style={style}>
        {children}
      </GlassView>
    );
  }

  return (
    <GlassView
      style={[{ backgroundColor: fallbackColor ?? colors.glass, boxShadow: `0 0 2.4px ${colors.shadow}` }, style]}
    >
      {children}
    </GlassView>
  );
}
