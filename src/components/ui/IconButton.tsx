import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

import { useTheme } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type IconButtonVariant = 'filled' | 'ghost';

type IconButtonProps = Omit<PressableProps, 'children'> & {
  icon: IconName;
  accessibilityLabel: string;
  variant?: IconButtonVariant;
  size?: number;
};

export function IconButton({ icon, variant = 'ghost', size = 44, disabled, style, ...rest }: IconButtonProps) {
  const { colors } = useTheme();
  const isFilled = variant === 'filled';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={8}
      style={(state) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isFilled
            ? state.pressed
              ? colors.primaryPressed
              : colors.primary
            : state.pressed
              ? colors.surfaceMuted
              : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <Ionicons name={icon} size={size * 0.5} color={isFilled ? colors.textOnPrimary : colors.textPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
