import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ServerStatus } from '@/components/status/ServerStatus';
import { AppText, Button, IconButton, Screen, TextField } from '@/components/ui';
import { useTheme } from '@/theme';

export default function TestScreen() {
  const { spacing } = useTheme();
  const [text, setText] = useState('');
  const [taps, setTaps] = useState(0);

  return (
    <Screen>
      <View style={[styles.content, { gap: spacing.xl }]}>
        <View style={{ gap: spacing.xs }}>
          <AppText variant="title">AI Prototype</AppText>
          <AppText color="textSecondary">Setup test screen</AppText>
        </View>

        <ServerStatus />

        <View style={{ gap: spacing.md }}>
          <AppText variant="heading">Components</AppText>
          <TextField placeholder="Type something..." value={text} onChangeText={setText} />
          <View style={[styles.row, { gap: spacing.sm }]}>
            <Button label={`Tapped ${taps}`} onPress={() => setTaps((n) => n + 1)} style={styles.grow} />
            <IconButton icon="mic" variant="filled" accessibilityLabel="Microphone" />
            <IconButton icon="arrow-up" accessibilityLabel="Send" disabled={!text} />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grow: {
    flex: 1,
  },
});
