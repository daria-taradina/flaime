// components/case-study/types.ts

import type { ComponentProps } from 'react';
import type BeforeAfterCard from '@/components/media/BeforeAfterCard';

export type BeforeAfterProps = ComponentProps<typeof BeforeAfterCard>;

export interface HeroParallaxProps {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export interface HeroStaticProps {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  video?: string;
}

export type BriefPoint = {
  label: string;
  text: string;
};

export interface BriefProps {
  services: string[];
  points: BriefPoint[];
}

export interface BreakdownProps {
  heading: string;
  steps: { label: string; title: string; body: string }[];
}

export interface GalleryProps {
  images: { src: string; alt: string }[];
}

export interface FeatureMediaProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

export type Block =
  | { type: 'heroParallax'; props: HeroParallaxProps }
  | { type: 'heroStatic'; props: HeroStaticProps }
  | { type: 'brief'; props: BriefProps }
  | { type: 'breakdown'; props: BreakdownProps }
  | { type: 'gallery'; props: GalleryProps }
  | { type: 'featureMedia'; props: FeatureMediaProps }
  | { type: 'beforeAfter'; props: BeforeAfterProps };

export interface CaseStudyData {
  slug: string;
  blocks: Block[];
}