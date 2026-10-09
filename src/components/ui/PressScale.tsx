import { useState, type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

type PressScaleProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// Shrinks to 0.97 on touch-down so the press is felt before the finger lifts.
export function PressScale({ children, style, onPressIn, onPressOut, ...rest }: PressScaleProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      hitSlop={6}
      pressRetentionOffset={12}
      onPressIn={(e) => {
        setPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        onPressOut?.(e);
      }}
      {...rest}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale: pressed ? 0.97 : 1 }],
            transitionProperty: 'transform',
            transitionDuration: 120,
            transitionTimingFunction: 'ease-out',
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
