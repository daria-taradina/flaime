// components/media/ParallaxCollage.types.ts

export interface ParallaxCollageItem {
  id: number | string;

  src: string;
  alt?: string;
  isVideo?: boolean;

  layer: 'front' | 'back';

  bottom: string;
  left?: string;
  right?: string;

  width: string;

  /**
   * Total vertical travel distance.
   * Larger = longer movement through viewport.
   */
  travel?: number;

  /**
   * Overrides applied on mobile viewports.
   * Anything not specified falls back to the desktop value.
   */
  mobile?: Partial<Pick<ParallaxCollageItem, 'bottom' | 'left' | 'right' | 'width' | 'travel'>>;
}