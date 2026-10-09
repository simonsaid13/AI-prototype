import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { create } from 'zustand';

import { useTheme } from '@/theme';

import { AppText } from './AppText';

const VISIBLE_MS = 2400;

type ToastState = {
  message: string | null;
  key: number;
};

const useToastStore = create<ToastState>(() => ({ message: null, key: 0 }));
let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string) {
  clearTimeout(hideTimer);
  useToastStore.setState((s) => ({ message, key: s.key + 1 }));
  hideTimer = setTimeout(() => useToastStore.setState({ message: null }), VISIBLE_MS);
}

const enter = FadeInUp.duration(220);
const exit = FadeOutUp.duration(160);

export function Toaster() {
  const { colors, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const { message, key } = useToastStore();

  return (
    <View pointerEvents="none" style={[styles.host, { top: insets.top + 56, paddingHorizontal: spacing.gutter }]}>
      {message && (
        <Animated.View
          key={key}
          entering={enter}
          exiting={exit}
          accessibilityLiveRegion="polite"
          style={{
            backgroundColor: colors.textPrimary,
            borderRadius: radius.pill,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
          }}
        >
          <AppText variant="bodySmall" color="textOnPrimary">
            {message}
          </AppText>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
