// components/media/ParallaxCollage.types.ts

interface CanvasPosition {
  x: number; // px from canvas left
  y: number; // px from canvas top
  width: number; // px
}

export interface ParallaxCollageItem extends CanvasPosition {
  id: number | string;

  src: string;
  alt?: string;
  isVideo?: boolean;

  layer: 'front' | 'back';

  /**
   * Total vertical travel distance in canvas px.
   * Scales automatically along with the canvas, so relative
   * motion stays consistent across screens.
   */
  travel?: number;

  mobile?: Partial<CanvasPosition> & { travel?: number };
}

// Fixed design canvases — every card is positioned against these,
// then the whole canvas is scaled to cover the actual viewport.
export const DESKTOP_CANVAS = { width: 1600, height: 1000 };
export const MOBILE_CANVAS = { width: 420, height: 760 };