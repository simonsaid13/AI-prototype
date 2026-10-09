import { config } from '@/config';
import type { Rating } from '@/store/chats';

type Feedback = {
  chatId: string;
  messageId: string;
  rating: Rating | null;
  question: string;
  answer: string;
};

export async function sendFeedback(feedback: Feedback) {
  const res = await fetch(`${config.serverUrl}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!res.ok) throw new Error(`Server responded ${res.status}`);
}
