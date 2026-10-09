import { StyleSheet, View } from 'react-native';

import { AppText, Backdrop } from '@/components/ui';
import { useTheme } from '@/theme';

import type { CatalogState } from './catalog';

const THUMB = 64;
const CANVAS = 200;

// A live, shrunk copy of the component's first state. Touches are off, so it behaves like a picture.
export function Thumbnail({ state }: { state: CatalogState }) {
  const { colors, radius } = useTheme();

  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{
        width: THUMB,
        height: THUMB,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
        overflow: 'hidden',
      }}
    >
      {state.backdrop ? (
          <View style={StyleSheet.absoluteFill}>
            <Backdrop />
          </View>
        ) : null}
      <View
        style={{
          position: 'absolute',
          width: CANVAS,
          height: CANVAS,
          left: (THUMB - CANVAS) / 2,
          top: (THUMB - CANVAS) / 2,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ scale: THUMB / CANVAS }],
        }}
      >
        {state.render()}
      </View>
    </View>
  );
}

export function StateCard({ state }: { state: CatalogState }) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      <AppText variant="caption" color="textSecondary">
        {state.label}
      </AppText>
      <View
        style={{
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          paddingVertical: spacing.lg,
          paddingHorizontal: state.edgeToEdge ? 0 : spacing.lg,
          overflow: 'hidden',
        }}
      >
        {state.backdrop ? (
          <View style={StyleSheet.absoluteFill}>
            <Backdrop />
          </View>
        ) : null}
        {state.render()}
      </View>
    </View>
  );
}
