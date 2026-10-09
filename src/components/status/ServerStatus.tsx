import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { fetchHealth } from '@/api/health';
import { AppText, Button } from '@/components/ui';
import { config } from '@/config';
import { useTheme, type ColorTokens } from '@/theme';

type Status = 'checking' | 'connected' | 'noKey' | 'offline';

const statusLabel: Record<Status, string> = {
  checking: 'Server: checking...',
  connected: 'Server: connected',
  noKey: 'Server: connected, OpenAI key missing',
  offline: 'Server: not connected',
};

const statusColor: Record<Status, keyof ColorTokens> = {
  checking: 'textSecondary',
  connected: 'success',
  noKey: 'warning',
  offline: 'danger',
};

export function ServerStatus() {
  const { colors, spacing, radius } = useTheme();
  const [status, setStatus] = useState<Status>('checking');

  const check = useCallback(async () => {
    setStatus('checking');
    try {
      const health = await fetchHealth();
      setStatus(health.openaiKeyConfigured ? 'connected' : 'noKey');
    } catch {
      setStatus('offline');
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, gap: spacing.md },
      ]}
    >
      <View style={[styles.row, { gap: spacing.sm }]}>
        <View style={[styles.dot, { backgroundColor: colors[statusColor[status]] }]} />
        <AppText variant="bodyStrong">{statusLabel[status]}</AppText>
      </View>
      <AppText variant="caption" color="textSecondary">
        {config.serverUrl}
      </AppText>
      <Button label="Check again" variant="secondary" onPress={check} loading={status === 'checking'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
