// components/media/ParallaxCollage.types.ts

export interface CollageColumnImage {
  src: string;
  alt?: string;
  isVideo?: boolean;
}

export interface CollageColumn {
  id: number | string;
  direction: 'down' | 'up';
  images: CollageColumnImage[];
}