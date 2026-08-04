// data/about.ts
import type { ParallaxCollageItem } from '@/components/media/ParallaxCollage.types';

export const ABOUT_INTRO = {
  text: 'We build brands\nthat mean something.',
  cards: [
    { id: 1, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'back',  top: '2%',  left: '4%',   width: '13%' },
    { id: 2, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'front', top: '8%',  right: '6%',  width: '15%', speed: 130 },
    { id: 3, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'back', top: '48%', left: '8%', width: '15%', speed: 40 },
    { id: 4, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'front', top: '52%', right: '10%', width: '13%', speed: 140 },
    { id: 5, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'back',  top: '68%', left: '26%',  width: '12%', speed: 50 },
    { id: 6, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'front', top: '4%',  left: '30%',  width: '10%', speed: 120 },
    { id: 7, src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg', layer: 'back',  top: '30%', right: '28%', width: '11%', speed: 45 },
  ] satisfies ParallaxCollageItem[],
};