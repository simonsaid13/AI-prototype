import { appendFile } from 'node:fs/promises';

import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, pipeUIMessageStreamToResponse, streamText, toUIMessageStream, type UIMessage } from 'ai';
import express from 'express';

import { CHAT_INSTRUCTIONS, CHAT_MODEL } from './config.ts';

const PORT = Number(process.env.PORT ?? 8787);
const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);
const FEEDBACK_FILE = new URL('./feedback.jsonl', import.meta.url);

if (!hasOpenAIKey) {
  console.warn('[server] OPENAI_API_KEY is missing. Copy server/.env.example to server/.env and add the key.');
}

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, openaiKeyConfigured: hasOpenAIKey });
});

app.post('/chat', async (req, res) => {
  if (!hasOpenAIKey) {
    res.status(503).send('The AI server has no OpenAI key yet. Add OPENAI_API_KEY to server/.env and restart it.');
    return;
  }

  const { messages } = req.body as { messages: UIMessage[] };
  const abort = new AbortController();
  res.on('close', () => abort.abort());

  const result = streamText({
    model: openai(CHAT_MODEL),
    instructions: CHAT_INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
    abortSignal: abort.signal,
  });

  await pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({
      stream: result.stream,
      messageMetadata: ({ part }) => (part.type === 'start' ? { createdAt: Date.now() } : undefined),
      onError: (error) => {
        console.error('[server] chat error:', error);
        return 'The AI could not answer right now. Please try again.';
      },
    }),
  });
});

app.post('/feedback', async (req, res) => {
  const { chatId, messageId, rating, question, answer } = req.body ?? {};
  if (rating !== 'up' && rating !== 'down' && rating !== null) {
    res.status(400).json({ ok: false });
    return;
  }
  const entry = { at: new Date().toISOString(), chatId, messageId, rating, question, answer };
  await appendFile(FEEDBACK_FILE, JSON.stringify(entry) + '\n');
  console.log(`[server] feedback ${rating ?? 'removed'} for message ${messageId}`);
  res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] listening on port ${PORT}`);
});
