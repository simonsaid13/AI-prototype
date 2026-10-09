import { View } from 'react-native';

import { AppText } from '@/components/ui';
import { useTheme } from '@/theme';

type UserMessageProps = {
  text: string;
  time: string;
};

export function UserMessage({ text, time }: UserMessageProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={{ paddingHorizontal: spacing.gutter, paddingBottom: spacing.md, gap: spacing.xs }}>
      <View
        style={{
          alignSelf: 'flex-end',
          maxWidth: '85%',
          experimental_backgroundImage: colors.primaryGradient,
          borderRadius: radius.md,
          borderTopRightRadius: radius.xs,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
        }}
      >
        <AppText variant="bodySmall" color="textOnPrimary" selectable>
          {text}
        </AppText>
      </View>
      <AppText variant="caption" color="textSecondary" style={{ textAlign: 'right' }}>
        {`You · ${time}`}
      </AppText>
    </View>
  );
}
