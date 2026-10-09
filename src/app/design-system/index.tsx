import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Backdrop, GlassButton, PressScale, TextField } from '@/components/ui';
import { groups, searchCatalog, type CatalogEntry } from '@/design-system/catalog';
import { Thumbnail } from '@/design-system/Preview';
import { useTheme } from '@/theme';

const HEADER_BUTTON = 38;

export default function DesignSystemScreen() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const sections = useMemo(() => {
    const found = searchCatalog(query);
    return groups
      .map((group) => ({ title: group, data: found.filter((entry) => entry.group === group) }))
      .filter((section) => section.data.length > 0);
  }, [query]);

  return (
    <View style={[styles.fill, { backgroundColor: colors.background }]}>
      <Backdrop />

      <View style={{ paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.gutter, gap: spacing.md }}>
        <View style={[styles.headerRow, { gap: spacing.sm }]}>
          <GlassButton icon="back" accessibilityLabel="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/menu'))} />
          <AppText variant="bodySmall" style={styles.title}>
            Design System
          </AppText>
          <View style={{ width: HEADER_BUTTON }} />
        </View>

        <TextField
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name, description or use"
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(entry) => entry.id}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xl }}
        renderSectionHeader={({ section }) => (
          <AppText
            variant="bodyStrong"
            style={{ paddingHorizontal: spacing.gutter, paddingTop: spacing.lg, paddingBottom: spacing.sm }}
          >
            {section.title}
          </AppText>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          <AppText variant="bodySmall" color="textSecondary" style={{ padding: spacing.gutter }}>
            No components match your search
          </AppText>
        }
        renderItem={({ item }) => <ComponentRow entry={item} />}
      />
    </View>
  );
}

function ComponentRow({ entry }: { entry: CatalogEntry }) {
  const { spacing } = useTheme();

  return (
    <PressScale
      accessibilityRole="button"
      accessibilityLabel={`Open ${entry.name}`}
      onPress={() => router.push({ pathname: '/design-system/[id]', params: { id: entry.id } })}
      style={[styles.row, { paddingHorizontal: spacing.gutter, gap: spacing.md }]}
    >
      <Thumbnail state={entry.states[0]} />
      <View style={styles.rowText}>
        <AppText variant="body">{entry.name}</AppText>
        <AppText variant="bodySmall" color="textSecondary" numberOfLines={2}>
          {entry.description}
        </AppText>
      </View>
    </PressScale>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
  },
});
