import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText, Backdrop, Button, GlassButton, PressScale } from '@/components/ui';
import { useNow } from '@/hooks/useNow';
import { useChats, type Chat } from '@/store/chats';
import { useTheme } from '@/theme';
import { timeAgo } from '@/utils/time';

const FAB_HEIGHT = 48;

export default function MenuScreen() {
  const { colors, typography, spacing, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const chats = useChats((s) => s.chats);
  const [query, setQuery] = useState('');
  const now = useNow();
  const fabBottom = Math.max(insets.bottom, spacing.lg);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.values(chats)
      .filter((c) => c.messages.length > 0 && (!q || c.title.toLowerCase().includes(q)))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [chats, query]);

  const open = (id: string | null) => {
    useChats.getState().selectChat(id);
    router.back();
  };

  return (
    <View style={[styles.fill, { backgroundColor: colors.background }]}>
      <Backdrop />

      <View style={{ paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.gutter, gap: spacing.md }}>
        <View style={[styles.headerRow, { gap: spacing.sm }]}>
          <GlassButton icon="plus" iconColor={colors.primary} accessibilityLabel="New chat" onPress={() => open(null)} />
          <AppText variant="bodySmall" style={styles.title}>
            My chats
          </AppText>
          <GlassButton icon="close" accessibilityLabel="Close menu" onPress={() => router.back()} />
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search for chats"
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.primary}
          returnKeyType="search"
          clearButtonMode="while-editing"
          style={[
            typography.bodySmall,
            {
              color: colors.textPrimary,
              backgroundColor: colors.background,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: radius.pill,
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
            },
          ]}
        />
      </View>

      <FlatList
        data={list}
        keyExtractor={(c) => c.id}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: spacing.lg, paddingBottom: fabBottom + FAB_HEIGHT + spacing.lg, gap: spacing.sm }}
        ListHeaderComponent={
          <AppText variant="bodyStrong" style={{ paddingHorizontal: spacing.gutter, paddingVertical: spacing.sm }}>
            Recent conversations
          </AppText>
        }
        ListEmptyComponent={
          <AppText variant="bodySmall" color="textSecondary" style={{ paddingHorizontal: spacing.gutter }}>
            {query ? 'No chats match your search' : 'Your chats will appear here'}
          </AppText>
        }
        renderItem={({ item }) => <ConversationRow chat={item} now={now} onPress={() => open(item.id)} />}
      />

      <View pointerEvents="box-none" style={[styles.fab, { bottom: fabBottom }]}>
        <Button
          label="Open Design System"
          onPress={() => router.push('/design-system')}
          style={{ boxShadow: `0 4px 12px ${colors.shadow}` }}
        />
      </View>
    </View>
  );
}

function ConversationRow({ chat, now, onPress }: { chat: Chat; now: number; onPress: () => void }) {
  const { spacing } = useTheme();

  return (
    <PressScale
      accessibilityRole="button"
      accessibilityLabel={`Open chat: ${chat.title}`}
      onPress={onPress}
      style={{ paddingHorizontal: spacing.gutter, gap: 2 }}
    >
      <AppText variant="body" numberOfLines={1}>
        {chat.title}
      </AppText>
      <View style={styles.metaRow}>
        <AppText variant="bodySmall" color="textSecondary">{`#${chat.number}`}</AppText>
        <AppText variant="caption" color="textSecondary">
          {timeAgo(chat.updatedAt, now)}
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
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
