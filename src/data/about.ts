// data/about.ts

import type { ParallaxCollageItem } from '@/components/media/ParallaxCollage.types';
import { cloudinaryUrl } from '@/utils/constants';

export const ABOUT_INTRO = {
  text:
    "In today's world, people have about five seconds to decide whether your brand is right for them. " +
    "You don't get a second chance to make a first impression. That's why we help you make the most of " +
    "that opportunity by creating a brand experience that communicates your value from the very first " +
    "moment and gives people a reason to stay, explore, and remember who you are.",

  text2:
    "We help create content that goes beyond looking beautiful by expressing who you are and what your " +
    "brand stands for. Because people don't simply buy products anymore, they want to feel something. " +
    "They want to believe that what you're offering fits into their lives and gives them a reason to " +
    "choose you over everything else.",

  // Coordinates sit on a fixed 1600×1000 design canvas (DESKTOP_CANVAS in
  // ParallaxCollage.types.ts) that scales to cover the viewport — these
  // stay proportionally identical on every screen. The old %-based
  // bottom/left/right numbers don't map 1:1, so these are a fresh starting
  // layout to recalibrate visually against the new system.
  cards: [
    {
      id: 1,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg',
      layer: 'front',
      x: 200,
      y: 620,
      width: 340,
      travel: 600,
      mobile: { x: 10, y: 520, width: 160, travel: 500 },
    },
    {
      id: 2,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/6db9025c_nano_2K_f9vofx.jpg',
      layer: 'front',
      x: 1040,
      y: 40,
      width: 340,
      travel: 600,
      mobile: { x: 250, y: 60, width: 150, travel: 700 },
    },
    {
      id: 3,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229102/d-10_geiek8.jpg',
      layer: 'back',
      x: 80,
      y: 220,
      width: 300,
      travel: 400,
      mobile: { x: 60, y: 160, width: 130, travel: 420 },
    },
    {
      id: 4,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png',
      layer: 'back',
      x: 1200,
      y: 380,
      width: 320,
      travel: 600,
      mobile: { x: 240, y: 300, width: 150, travel: 800 },
    },
    {
      id: 5,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228731/4f_feyshi.png',
      layer: 'back',
      x: 300,
      y: 5,
      width: 280,
      travel: 550,
      mobile: { x: 20, y: 400, width: 120, travel: 600 },
    },
    {
      id: 6,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228730/f-2_uvhneb.jpg',
      layer: 'front',
      x: 450,
      y: 900,
      width: 370,
      travel: 600,
      mobile: { x: 150, y: 600, width: 110, travel: 650 },
    },
    {
      id: 8,
      src: 'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/a06b97ea_nano_2K_xy3svv.jpg',
      layer: 'front',
      x: 1000,
      y: 650,
      width: 280,
      travel: 500,
      mobile: { x: 240, y: 560, width: 150, travel: 650 },
    },
  ] satisfies ParallaxCollageItem[],
};

export const ABOUT_MARGO = {
  name: 'Margo',
  role: 'founder of Flaime Studio',
  paragraphs: [
    "I'm a graphic designer, and over the past few years I've completed more than 200 projects across beauty, wellness, fashion, and lifestyle brands. Working with so many businesses taught me that great creative work doesn't start with colors, typography, or beautiful images. It starts with understanding what a brand wants people to feel the moment they come across it.",
    'That idea eventually became Flaime Studio.',
    "Today I work with brands that care about how they're perceived and understand that every interaction shapes that perception. My role is to help turn ideas into something people can experience, whether they're visiting a website, discovering a product for the first time, or deciding whether your brand is the one they want to come back to.",
    'Every project is built around one question:\nWhat should someone feel the moment they discover your brand?',
  ],
  image: cloudinaryUrl('image', 'margo_ho6ogk', 'f_auto,q_auto,w_1400'),
  imageAlt: 'Margo, founder of Flaime Studio',
};