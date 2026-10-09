const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Matches the Figma labels: "now", "5 min. ago", "3 h. ago", "12 d. ago".
export function timeAgo(timestamp: number, now = Date.now()) {
  const diff = Math.max(0, now - timestamp);
  if (diff < MINUTE) return 'now';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)} min. ago`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)} h. ago`;
  return `${Math.floor(diff / DAY)} d. ago`;
}
