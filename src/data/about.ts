// data/about.ts

import type { ParallaxCollageItem } from '@/components/media/ParallaxCollage.types';

export const ABOUT_INTRO = {
  text: [
    'We build brands',
    'that mean something.',
  ],

  cards: [
    {
      id: 1,
      src: '#F5745D',
      layer: 'back',
      bottom: '-18%',
      left: '3%',
      width: '22%',
      travel: 900,
      
    },

    {
      id: 2,
      src: '#5DEBF5',
      layer: 'front',
      bottom: '-8%',
      right: '4%',
      width: '20%',
      travel: 1200,
    },

    {
      id: 3,
      src: '#E35DF5',
      layer: 'back',
      bottom: '35%',
      left: '10%',
      width: '19%',
      travel: 700,
    },

    {
      id: 4,
      src: '#80F55D',
      layer: 'front',
      bottom: '48%',
      right: '8%',
      width: '22%',
      travel: 1400,
    },

    {
      id: 5,
      src: '#5D6AF5',
      layer: 'back',
      bottom: '72%',
      left: '20%',
      width: '18%',
      travel: 850,
    },

    {
      id: 6,
      src: '#F5F05D',
      layer: 'front',
      bottom: '-20%',
      left: '32%',
      width: '16%',
      travel: 1100,
    },

    {
      id: 7,
      src: '#FF0000',
      layer: 'back',
      bottom: '28%',
      right: '26%',
      width: '17%',
      travel: 600,
    },
  ] satisfies ParallaxCollageItem[],
};