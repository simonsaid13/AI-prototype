import { Image, Pressable, StyleSheet, View } from 'react-native';

import { AppText, Icon, PressScale, type IconName } from '@/components/ui';
import type { Rating } from '@/store/chats';
import { useTheme } from '@/theme';

import { TypingDots } from './TypingDots';

type AssistantMessageProps = {
  text: string;
  time: string;
  pending: boolean;
  done: boolean;
  rating?: Rating;
  error?: string;
  onRate: (rating: Rating) => void;
  onCopy: () => void;
  onRetry?: () => void;
};

export function AssistantMessage({ text, time, pending, done, rating, error, onRate, onCopy, onRetry }: AssistantMessageProps) {
  const { spacing } = useTheme();

  return (
    <View style={{ paddingHorizontal: spacing.gutter, paddingBottom: spacing.xl, gap: spacing.sm }}>
      <View style={[styles.row, { gap: spacing.md }]}>
        <Image source={require('../../../assets/images/ai-avatar.png')} style={styles.avatar} />
        <AppText variant="bodyStrong">AI Chatbot</AppText>
      </View>

      {pending && !text ? <TypingDots /> : null}
      {text ? (
        <AppText variant="bodySmall" selectable>
          {text}
        </AppText>
      ) : null}

      {error ? (
        <View style={[styles.row, { gap: spacing.sm, flexWrap: 'wrap' }]}>
          <AppText variant="caption" color="danger">
            {error}
          </AppText>
          {onRetry ? (
            <Pressable accessibilityRole="button" onPress={onRetry} hitSlop={8}>
              <AppText variant="caption" color="primary">
                Try again
              </AppText>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {done && text ? (
        <View style={[styles.row, { gap: spacing.md }]}>
          <View style={[styles.row, { gap: spacing.sm }]}>
            <ActionButton
              icon={rating === 'up' ? 'thumbsUpFilled' : 'thumbsUp'}
              label="Good answer"
              selected={rating === 'up'}
              onPress={() => onRate('up')}
            />
            <ActionButton
              icon={rating === 'down' ? 'thumbsDownFilled' : 'thumbsDown'}
              label="Bad answer"
              selected={rating === 'down'}
              onPress={() => onRate('down')}
            />
            <ActionButton icon="sound" label="Read aloud" />
            <ActionButton icon="copy" label="Copy answer" onPress={onCopy} />
          </View>
          <AppText variant="caption" color="textSecondary">
            {`AI Chatbot · ${time}`}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

type ActionButtonProps = {
  icon: IconName;
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

function ActionButton({ icon, label, selected, onPress }: ActionButtonProps) {
  const { colors } = useTheme();
  const body = <Icon name={icon} size={16} color={selected ? colors.primary : colors.textPrimary} />;

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={label} accessibilityState={{ disabled: true }} style={[styles.action, { backgroundColor: colors.background }]}>
        {body}
      </View>
    );
  }

  return (
    <PressScale
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.action, { backgroundColor: colors.background }]}
    >
      {body}
    </PressScale>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  action: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
