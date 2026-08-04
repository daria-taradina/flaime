// utils/media.ts
export function isColor(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('#');
}

export function backgroundStyle(
  value?: string
): { backgroundColor: string } | { backgroundImage: string } {
  if (!value) return { backgroundColor: 'var(--section-card-bg)' };
  return isColor(value)
    ? { backgroundColor: value }
    : { backgroundImage: `url(${value})` };
}