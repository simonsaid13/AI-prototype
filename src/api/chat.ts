import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';

import { config } from '@/config';
import type { ChatMessage } from '@/store/chats';

// expo/fetch is required: the built-in React Native fetch cannot stream the reply.
export const chatTransport = new DefaultChatTransport<ChatMessage>({
  api: `${config.serverUrl}/chat`,
  fetch: expoFetch as unknown as typeof globalThis.fetch,
});

export function messageText(message: ChatMessage) {
  return message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
}
