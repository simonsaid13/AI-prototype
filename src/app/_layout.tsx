import '@/polyfills';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useReducedMotion } from 'react-native-reanimated';

import { Toaster } from '@/components/ui';
import { fontFiles } from '@/theme/typography';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontFiles);
  const reduced = useReducedMotion();

  if (!fontsLoaded && !fontError) return null;

  return (
    <KeyboardProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: reduced ? 'fade' : 'default' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" options={{ animation: reduced ? 'fade' : 'slide_from_left', gestureEnabled: false }} />
      </Stack>
      <Toaster />
    </KeyboardProvider>
  );
}
