import { View } from 'react-native';

import { AppText, PressScale } from '@/components/ui';
import { useTheme } from '@/theme';

type SuggestionChipsProps = {
  items: string[];
  onPick: (text: string) => void;
};

export function SuggestionChips({ items, onPick }: SuggestionChipsProps) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View style={{ gap: spacing.sm, paddingHorizontal: spacing.gutter, alignItems: 'flex-start' }}>
      {items.map((item) => (
        <PressScale
          key={item}
          accessibilityRole="button"
          onPress={() => onPick(item)}
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: radius.pill,
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.lg,
          }}
        >
          <AppText variant="bodySmall">{item}</AppText>
        </PressScale>
      ))}
    </View>
  );
}
