import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useTheme } from '@/theme';

import { Glass } from './Glass';
import { Icon, type IconName } from './Icon';
import { PressScale } from './PressScale';

const SIZE = 38;
const iconIn = FadeIn.duration(180);
const iconOut = FadeOut.duration(120);

type GlassButtonProps = {
  icon: IconName;
  iconColor?: string;
  accessibilityLabel: string;
  onPress?: () => void;
};

// Round glass button from the Figma navbar. The glass stays put; only the icon crossfades when it changes.
// Without onPress it is shown but not tappable yet.
export function GlassButton({ icon, iconColor, accessibilityLabel, onPress }: GlassButtonProps) {
  const { colors } = useTheme();

  const body = (
    <Glass interactive={!!onPress} style={styles.glass}>
      <View style={styles.iconBox}>
        <Animated.View key={icon} entering={iconIn} exiting={iconOut} style={StyleSheet.absoluteFill}>
          <View style={styles.center}>
            <Icon name={icon} color={iconColor ?? colors.textPrimary} />
          </View>
        </Animated.View>
      </View>
    </Glass>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={accessibilityLabel} accessibilityState={{ disabled: true }}>
        {body}
      </View>
    );
  }

  return (
    <PressScale accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress}>
      {body}
    </PressScale>
  );
}

const styles = StyleSheet.create({
  glass: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 24,
    height: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
