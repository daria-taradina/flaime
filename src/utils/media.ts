/** True if value looks like a hex color ('#12181a') rather than a URL/path. */
export function isColor(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('#');
}

/**
 * Returns the right inline style for a "bg" field that can be either a
 * placeholder color or a real image URL — used by any card-style component
 * (DragGallery, VideoSlider, SelectedWorkCard) so they all follow the same
 * rule instead of each rolling its own url-vs-color check.
 */
export function backgroundStyle(
  value?: string,
  fallback: string = '#1a1a1a'
): { backgroundColor: string } | { backgroundImage: string } {
  if (!value) return { backgroundColor: fallback };
  return isColor(value)
    ? { backgroundColor: value }
    : { backgroundImage: `url(${value})` };
}