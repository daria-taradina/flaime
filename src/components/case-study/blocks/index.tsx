// components/case-study/blocks/index.tsx
import type { ComponentType } from 'react';
import HeroParallax from './HeroParallax';
import HeroStatic from './HeroStatic';
import Breakdown from './Breakdown';
import Gallery from './Gallery';
import FeatureMedia from './FeatureMedia';
import Brief from './Brief';
import type { Block } from '../types';

export const blockRegistry: Record<Block['type'], ComponentType<any>> = {
  heroParallax: HeroParallax,
  heroStatic: HeroStatic,
  brief: Brief,
  breakdown: Breakdown,
  gallery: Gallery,
  featureMedia: FeatureMedia,
};