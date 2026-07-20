// components/case-study/types.ts

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
}

export interface BriefProps {
  intro: string;
  services: string[];
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
  | { type: 'featureMedia'; props: FeatureMediaProps };

export interface CaseStudyData {
  slug: string;
  blocks: Block[];
}