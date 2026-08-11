// components/case-study/blocks/index.tsx
import type { ComponentType } from 'react';
import HeroParallax from './HeroParallax';
import HeroStatic from './HeroStatic';
import Breakdown from './Breakdown';
import Gallery from './Gallery';
import FeatureMedia from './FeatureMedia';
import Brief from './Brief';
import type { Block } from '../types';
import BeforeAfter from './BeforeAfter';
import Marquee from './Marquee';
import Masonry from './Masonry';

export const blockRegistry: Record<Block['type'], ComponentType<any>> = {
  heroParallax: HeroParallax,
  heroStatic: HeroStatic,
  brief: Brief,
  breakdown: Breakdown,
  gallery: Gallery,
  featureMedia: FeatureMedia,
  beforeAfter: BeforeAfter,
  marquee: Marquee,
  masonry: Masonry,
};