// data/projects/loam-blends.ts
import type { CaseStudyData } from '@/components/case-study/types';
import { cloudinaryUrl } from '@/utils/constants';

export const loamBlends: CaseStudyData = {
  slug: 'loam-blends',
  blocks: [
    {
      type: 'heroParallax',
      props: {
        title: 'Loam Blends',
        tagline:
          'Designed to earn trust, not just attention',
        image: cloudinaryUrl(
          'image',
          'F-3_uunmgt',
          'q_auto:good/f_auto'
        ),
        imageAlt: 'Loam Blends supplement packet',
      },
    },

    {
  type: 'brief',
    props: {
      services: [
        'Brand Strategy',
        'Creative Direction',
        'Concept Development',
        'AI-Generated Product Imagery',
        'Campaign Imagery',
      ],
      intro:
        'Loam Blends is a wellness supplement brand focused on organic mushroom extracts designed to support everyday health. The project centered on creating a visual identity and content system that could communicate product benefits more clearly, strengthen customer trust, and help the brand stand out in an increasingly competitive supplement market.',
    },
  },
  ],
};