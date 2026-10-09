import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { useTheme } from '@/theme';

export const TextField = forwardRef<TextInput, TextInputProps>(function TextField({ style, ...rest }, ref) {
  const { colors, typography, spacing, radius } = useTheme();

  return (
    <TextInput
      ref={ref}
      placeholderTextColor={colors.textSecondary}
      style={[
        typography.body,
        {
          color: colors.textPrimary,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        },
        style,
      ]}
      {...rest}
    />
  );
});
