import express from 'express';

const PORT = Number(process.env.PORT ?? 8787);
const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);

if (!hasOpenAIKey) {
  console.warn('[server] OPENAI_API_KEY is missing. Copy server/.env.example to server/.env and add the key.');
}

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, openaiKeyConfigured: hasOpenAIKey });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] listening on port ${PORT}`);
});
