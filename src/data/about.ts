// data/about.ts

import type { ParallaxCollageItem } from '@/components/media/ParallaxCollage.types';

export const ABOUT_INTRO = {
  text:
    "In today's world, people have about five seconds to decide whether " +
    "your brand is right for them. You don't get a second chance to make a first " +
    "impression.  That's why we help you make the most of that opportunity by creating " + 
    "a brand experience that communicates your value from the very first moment " +
    "and gives people a reason to stay, explore, and remember who you are.",

  cards: [
    {
      id: 1,
      src: '#F5745D',
      layer: 'front',
      bottom: '-18%',
      left: '8%',
      width: '23%',
      travel: 900,
      mobile: { left: '2%', width: '38%', bottom: '-16%', travel: 500 },
    },

    {
      id: 2,
      src: '#5DEBF5',
      layer: 'front',
      bottom: '8%',
      right: '2%',
      width: '23%',
      travel: 1000,
      mobile: { right: '4%', width: '34%', bottom: '5%', travel: 700 },
    },

    {
      id: 3,
      src: '#E35DF5',
      layer: 'back',
      bottom: '30%',
      left: '5%',
      width: '20%',
      travel: 700,
      mobile: { left: '15%', width: '30%', bottom: '30%', travel: 420 },
    },

    {
      id: 4,
      src: '#80F55D',
      layer: 'back',
      bottom: '45%',
      right: '8%',
      width: '22%',
      travel: 600,
      mobile: { right: '6%', width: '34%', bottom: '45%', travel: 800 },
    },

    {
      id: 5,
      src: '#5D6AF5',
      layer: 'back',
      bottom: '72%',
      left: '13%',
      width: '16%',
      travel: 850,
      mobile: { left: '3%', width: '28%', bottom: '53%', travel: 600 },
    },

    {
      id: 6,
      src: '#F5F05D',
      layer: 'front',
      bottom: '-42%',
      left: '26%',
      width: '16%',
      travel: 1100,
      mobile: { left: '30%', width: '26%', bottom: '-38%', travel: 650 },
    },

    /*{
      id: 7,
      src: '#FF0000',
      layer: 'back',
      bottom: '30%',
      right: '25%',
      width: '18%',
      travel: 800,
      mobile: { right: '20%', width: '26%', bottom: '15%', travel: 360 },
    },*/

    /*{
      id: 8,
      src: '#f5bd5d',
      layer: 'front',
      bottom: '20%',
      left: '28%',
      width: '17%',
      travel: 1100,
      mobile: { left: '30%', width: '26%', bottom: '-35%', travel: 650 },
    },*/

    {
      id: 8,
      src: '#f55dcf',
      layer: 'front',
      bottom: '-32%',
      right: '12%',
      width: '19%',
      travel: 1100,
      mobile: { right: '5%', width: '35%', bottom: '-29%', travel: 650 },
    },

  ] satisfies ParallaxCollageItem[],
};