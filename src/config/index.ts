import Constants from 'expo-constants';

const SERVER_PORT = 8787;

// In Expo Go, hostUri is the dev machine's address (e.g. "192.168.1.20:8081"),
// so the phone reaches the local server on the same machine.
function resolveServerUrl() {
  if (process.env.EXPO_PUBLIC_SERVER_URL) return process.env.EXPO_PUBLIC_SERVER_URL;
  const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
  return `http://${host}:${SERVER_PORT}`;
}

export const config = {
  serverUrl: resolveServerUrl(),
};
