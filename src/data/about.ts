// data/about.ts

import type { CollageColumn } from '@/components/media/ParallaxCollage.types';
import { cloudinaryUrl } from '@/utils/constants';

// 7 real images, cycled to fill 15 slots across the columns
const COLLAGE_IMAGES = [
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/d-9_jrekkm.jpg',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/6db9025c_nano_2K_f9vofx.jpg',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229102/d-10_geiek8.jpg',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228733/hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl.png',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228731/4f_feyshi.png',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781228730/f-2_uvhneb.jpg',
  'https://res.cloudinary.com/dgad4xyuc/image/upload/v1781229106/a06b97ea_nano_2K_xy3svv.jpg',
];

const PALETTE = Array.from(
  { length: 15 },
  (_, i) => COLLAGE_IMAGES[i % COLLAGE_IMAGES.length]
);

function columnsFromPalette(colCount: number, directions: ('down' | 'up')[]): CollageColumn[] {
  return Array.from({ length: colCount }, (_, i) => ({
    id: i,
    direction: directions[i],
    images: PALETTE.filter((_, idx) => idx % colCount === i).map(src => ({ src })),
  }));
}

export const ABOUT_INTRO = {
  text:
    "In today's world, people have about five seconds to decide whether your brand is right for them. " +
    "You don't get a second chance to make a first impression." + 
    "That's why we help you make the most of that opportunity by creating a brand experience that " +
    "communicates your value from the very first moment and gives people a reason to stay, explore, " +
    "and remember who you are.",    

  text2:
    "We help create content that goes beyond looking beautiful by expressing who you are and what your " +
    "brand stands for — because people don't simply buy products anymore, they want to feel something " +
    "that fits into their lives and gives them a reason to choose you over everything else.",

  columns: columnsFromPalette(5, ['down', 'up', 'down', 'up', 'down']),
  mobileColumns: columnsFromPalette(3, ['down', 'up', 'down']),
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