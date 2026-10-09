import { TextDecoderStream, TextEncoderStream } from '@stardazed/streams-text-encoding';
import structuredClone from '@ungap/structured-clone';
import { Platform } from 'react-native';

// The AI SDK chat hook needs these; Hermes may not ship them.
if (Platform.OS !== 'web') {
  const g = globalThis as Record<string, unknown>;
  g.structuredClone ??= structuredClone;
  g.TextEncoderStream ??= TextEncoderStream;
  g.TextDecoderStream ??= TextDecoderStream;
}
