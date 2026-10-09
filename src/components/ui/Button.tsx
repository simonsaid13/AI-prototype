import { ActivityIndicator, Pressable, StyleSheet, type PressableProps } from 'react-native';

import { useTheme } from '@/theme';

import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({ label, variant = 'primary', loading = false, disabled, style, ...rest }: ButtonProps) {
  const { colors, spacing, radius } = useTheme();
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={(state) => [
        styles.base,
        {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          borderRadius: radius.pill,
          backgroundColor: isPrimary
            ? state.pressed
              ? colors.primaryPressed
              : colors.primary
            : colors.surfaceMuted,
          opacity: isDisabled ? 0.5 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.textOnPrimary : colors.textPrimary} />
      ) : (
        <AppText variant="bodyStrong" color={isPrimary ? 'textOnPrimary' : 'textPrimary'}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
