import { config } from '@/config';

export type HealthResponse = {
  ok: boolean;
  openaiKeyConfigured: boolean;
};

export async function fetchHealth(timeoutMs = 4000): Promise<HealthResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${config.serverUrl}/health`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    return (await res.json()) as HealthResponse;
  } finally {
    clearTimeout(timer);
  }
}
