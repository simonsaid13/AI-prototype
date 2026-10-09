import { useEffect, useState } from 'react';

// Current time that refreshes on an interval, so "5 min. ago" labels stay correct.
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
