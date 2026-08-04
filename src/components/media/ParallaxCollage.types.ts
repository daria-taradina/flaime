// components/media/ParallaxCollage.types.ts
export interface ParallaxCollageItem {
  id: string | number;
  src: string; // image/video URL, or hex color as a placeholder
  isVideo?: boolean;
  alt?: string;
  layer: 'front' | 'back';
  top: string;
  left?: string;
  right?: string;
  width: string;
  speed?: number;
}