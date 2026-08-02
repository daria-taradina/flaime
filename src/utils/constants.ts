/**
 * Shared constants — animation, breakpoints, Cloudinary config.
 * Import from here instead of hardcoding magic values across components.
 */

// ── Cloudinary ──────────────────────────────────────────────
export const CLOUD_NAME = 'dgad4xyuc';

export const cloudinaryUrl = (
  type: string,
  publicId: string,
  transforms: string = ''
): string =>
  `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${transforms ? transforms + '/' : ''}${publicId}`;

// ── Animation ───────────────────────────────────────────────
// Typed as a fixed 4-tuple, not number[] — framer-motion's `ease` prop
// expects exactly this shape for a cubic-bezier easing curve; a plain
// number[] wouldn't satisfy its type and would error where you use it.
export const EASE_DEFAULT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const DURATION_DEFAULT = 0.6;
export const DURATION_SLOW = 0.8;
export const STAGGER_DELAY = 0.12;

// ── Breakpoints (matches globals.scss media queries) ─────────
export const BP_MOBILE = 1024;
export const MOBILE_QUERY = `(max-width: ${BP_MOBILE}px)`;