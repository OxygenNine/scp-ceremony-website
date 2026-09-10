/** 展示用格式化工具。 */

/** 秒 → 5:45 / 3:59:11 */
export function duration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** 播放量 → 24.3 万 / 9,558 */
export function views(n: number): string {
  if (n >= 100000) return `${(n / 10000).toFixed(1)} 万`;
  return n.toLocaleString('zh-CN');
}

/** 秒 → 「3 小时 59 分」 */
export function durationText(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (h === 0) return `${m} 分钟`;
  return `${h} 小时 ${m} 分`;
}

/** 2026-02-16 → 2026.02.16 */
export function dotDate(iso: string): string {
  return iso.replace(/-/g, '.');
}
