import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@/theme';

const pulse = {
  '0%': { opacity: 0.25, transform: [{ translateY: 0 }] },
  '30%': { opacity: 1, transform: [{ translateY: -3 }] },
  '60%, 100%': { opacity: 0.25, transform: [{ translateY: 0 }] },
};

export function TypingDots() {
  const { colors } = useTheme();

  return (
    <View accessibilityLabel="AI is typing" style={styles.row}>
      {[0, 1, 2].map((i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: colors.textSecondary,
              animationName: pulse,
              animationDuration: 1000,
              animationDelay: i * 150,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 5,
    height: 20,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
