import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Backdrop, GlassButton } from '@/components/ui';
import { catalog } from '@/design-system/catalog';
import { StateCard } from '@/design-system/Preview';
import { useTheme } from '@/theme';

const HEADER_BUTTON = 38;

export default function ComponentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const entry = catalog.find((e) => e.id === id);

  return (
    <View style={[styles.fill, { backgroundColor: colors.background }]}>
      <Backdrop />

      <View
        style={[styles.headerRow, { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.gutter, gap: spacing.sm }]}
      >
        <GlassButton icon="back" accessibilityLabel="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/design-system'))}
        />
        <AppText variant="bodySmall" style={styles.title}>
          {entry?.name ?? 'Not found'}
        </AppText>
        <View style={{ width: HEADER_BUTTON }} />
      </View>

      <KeyboardAwareScrollView
        bottomOffset={spacing.xl}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: spacing.gutter,
          paddingBottom: insets.bottom + spacing.xl,
          gap: spacing.xl,
        }}
      >
        {entry ? (
          <>
            <View style={{ gap: spacing.xs }}>
              <AppText variant="caption" color="textSecondary">
                {entry.group}
              </AppText>
              <AppText variant="bodySmall">{entry.description}</AppText>
            </View>
            {entry.states.map((state) => (
              <StateCard key={state.label} state={state} />
            ))}
          </>
        ) : (
          <AppText variant="bodySmall" color="textSecondary">
            This component is not in the catalog.
          </AppText>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
