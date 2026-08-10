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

    {
      type: 'beforeAfter',
      props: {
        before: cloudinaryUrl('image', 'd-10_geiek8', 'f_auto,q_auto'),
        after: cloudinaryUrl('image', 'F-3_uunmgt', 'f_auto,q_auto'),
        beforeAlt: 'Milave Haircare packaging before rebrand',
        afterAlt: 'Milave Haircare packaging after rebrand',
        beforeLabel: 'Before',
        afterLabel: 'After',
        caption: 'Packaging Redesign',
      },
    },

    {
      type: 'marquee',
      props: {
        items: [
          { type: 'placeholder', color: '#EDE3D3', width: 1600, height: 2000, alt: 'Placeholder 1' },
          { type: 'placeholder', color: '#C9D6C0', width: 1920, height: 1080, alt: 'Placeholder 2' },
          { type: 'placeholder', color: '#D8C9E0', width: 1200, height: 1200, alt: 'Placeholder 3' },
          { type: 'placeholder', color: '#E0CFC2', width: 1600, height: 1067, alt: 'Placeholder 4' },
          { type: 'placeholder', color: '#C2D3E0', width: 1400, height: 1866, alt: 'Placeholder 5' },
        ],
        duration: 45,
      },
    },

    {
      type: 'masonry',
      props: {
        items: [
          { type: 'placeholder', color: '#EDE3D3', width: 1600, height: 2000, alt: 'Placeholder 1' },
          { type: 'placeholder', color: '#C9D6C0', width: 1920, height: 1080, alt: 'Placeholder 2' },
          { type: 'placeholder', color: '#D8C9E0', width: 1200, height: 1200, alt: 'Placeholder 3' },
          { type: 'placeholder', color: '#E0CFC2', width: 1600, height: 1067, alt: 'Placeholder 4' },
          { type: 'placeholder', color: '#C2D3E0', width: 1400, height: 1866, alt: 'Placeholder 5' },
          { type: 'placeholder', color: '#D3C2D8', width: 1600, height: 900, alt: 'Placeholder 6' },
          { type: 'placeholder', color: '#C9CFE0', width: 1080, height: 1350, alt: 'Placeholder 7' },
        ],
      },
    },
  ],
};