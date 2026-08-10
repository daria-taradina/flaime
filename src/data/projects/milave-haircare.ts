// data/projects/milave-haircare.ts
import type { CaseStudyData } from '@/components/case-study/types';
import { cloudinaryUrl } from '@/utils/constants';

export const milaveHaircare: CaseStudyData = {
  slug: 'milave-haircare',
  blocks: [
    {
      type: 'heroStatic',
      props: {
        title: 'Milave  Haircare',
        tagline: '',
        image: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto:good/f_auto'),
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
        points: [
          {
            label: 'Overview',
            text: 'Loam Blends creates organic mushroom supplements designed to support everyday wellness. ' + 
            'As the category became increasingly competitive, the brand needed a clearer way to communicate its value and build stronger customer trust.',
          },
          {
            label: 'Brief',
            text: 'Develop a visual identity and content system that would clearly communicate product benefits, ' + 
            'strengthen customer confidence, and differentiate the brand within the wellness space.',
          },
          {
            label: 'Strategy',
            text: 'Instead of leading with the products themselves, we focused on the outcomes they enable. ' + 
            'By combining educational content, ingredient storytelling, and lifestyle imagery, we created a visual ' + 
            'system that made wellness more relatable, memorable, and easier to understand.',
          },
        ],
      },
    },
  ],
};