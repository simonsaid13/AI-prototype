import * as Haptics from 'expo-haptics';
import { StyleSheet, TextInput, View, type LayoutChangeEvent } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { Glass, Icon, PressScale, type IconName } from '@/components/ui';
import { useTheme } from '@/theme';

const MAX_LINES = 6;
const actionIn = ZoomIn.duration(160);
const actionOut = ZoomOut.duration(120);

type ChatInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onStop: () => void;
  busy: boolean;
  onLayout?: (e: LayoutChangeEvent) => void;
};

export function ChatInput({ value, onChangeText, onSend, onStop, busy, onLayout }: ChatInputProps) {
  const { colors, typography, spacing, radius } = useTheme();
  const hasText = value.trim().length > 0;
  const action: IconName = busy ? 'stop' : hasText ? 'send' : 'voice';

  const onAction = () => {
    if (action === 'send') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onSend();
    } else if (action === 'stop') {
      onStop();
    }
  };

  return (
    <View onLayout={onLayout} style={[styles.row, { gap: spacing.sm, paddingHorizontal: spacing.gutter }]}>
      <Glass style={[styles.field, { borderRadius: radius.xl, padding: spacing.lg, gap: spacing.lg }]}>
        <View accessible accessibilityLabel="Attach" accessibilityState={{ disabled: true }}>
          <Icon name="plus" color={colors.textPrimary} />
        </View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask me anything"
          placeholderTextColor={colors.textPlaceholder}
          multiline
          textAlignVertical="center"
          selectionColor={colors.primary}
          style={[
            typography.bodySmall,
            styles.input,
            { color: colors.textPrimary, maxHeight: typography.bodySmall.lineHeight * MAX_LINES + 4 },
          ]}
        />
        <View accessible accessibilityLabel="Dictate" accessibilityState={{ disabled: true }}>
          <Icon name="mic" color={colors.textPrimary} />
        </View>
      </Glass>

      <PressScale
        accessibilityRole="button"
        accessibilityLabel={action === 'send' ? 'Send' : action === 'stop' ? 'Stop answer' : 'Voice mode'}
        accessibilityState={{ disabled: action === 'voice' }}
        disabled={action === 'voice'}
        onPress={onAction}
        style={[styles.action, { backgroundColor: colors.primary }]}
      >
        <Animated.View key={action} entering={actionIn} exiting={actionOut} style={styles.actionIcon}>
          <Icon name={action} color={colors.textOnPrimary} />
        </Animated.View>
      </PressScale>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: 56,
  },
  input: {
    flex: 1,
    minHeight: 24,
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 0,
  },
  action: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  actionIcon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
