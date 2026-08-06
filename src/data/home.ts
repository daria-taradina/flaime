import { CLOUD_NAME, cloudinaryUrl } from '@/utils/constants';
import type { GalleryItem } from '@/components/media/DragGallery';

/**
 * Home page content — all copy, media refs, and structured data.
 */

// ── Hero ────────────────────────────────────────────────────
export const HERO = {
  videoPublicId: 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg',
  posterPublicId: 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer',
  overlayOpacity: 0.45,
  headline: 'Transforming\nbrands into visual\nexperiences.',
  description:
    'We shape how your brand is seen and perceived, helping people understand its value, connect with its story, and choose it with confidence.',
  cta: { label: "Let's Connect ↗", to: '/contact' },
};

// ── Intro ───────────────────────────────────────────────────
export const INTRO = {
  text: 'Flaime Studio is a creative agency helping product-based brands communicate their value through design and creative direction. Every project is built on a deep understanding of the brand, allowing us to create solutions that address specific business challenges.',
  cta: { label: 'See More Work', to: '/work' },
  cards: [
  {
    id: 1,
    slug: 'loam-blends',
    title: 'Loam Blends',
    subtitle: 'Social Media Experience',
    bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto:good/f_auto'),
    video: cloudinaryUrl('video', 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg', 'q_auto/f_auto'),
  },
  {
    id: 2,
    slug: 'milave-haircare',
    title: 'Milave Haircare',
    subtitle: 'Social Media & Website Experience',
    bg: cloudinaryUrl('image', 'hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl', 'q_auto:good/f_auto'),
  },
  {
    id: 3,
    slug: 'jlux-label',
    title: 'JLux Label',
    subtitle: 'Fashion AI Photography',
    bg: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx', 'q_auto:eco/f_auto'),
  },
],
};

// ── Intro 2 ───────────────────────────────────────────────────
export const INTRO_FEATURED = {
  text: 'Flaime Studio is a creative agency helping product-based brands communicate their value through design and creative direction. Every project is built on a deep understanding of the brand, allowing us to create solutions that address specific business challenges.',
  cta: { label: 'See More Work', to: '/work' },
  cards: [
    {
      id: 1,
      slug: 'loam-blends',
      title: 'Loam Blends',
      services: ['Social Media Design', 'AI Photography'],
      bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto:good/f_auto'),
      video: cloudinaryUrl('video', 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg', 'q_auto/f_auto'),
    },
    {
      id: 2,
      slug: 'milave-haircare',
      title: 'Milave Haircare',
      services: ['Social Media Design', 'Website Experience'],
      bg: cloudinaryUrl('image', 'hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl', 'q_auto:good/f_auto'),
    },
    {
      id: 3,
      slug: 'jlux-label',
      title: 'JLux Label',
      services: ['Fashion AI Photography'],
      bg: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx', 'q_auto:eco/f_auto'),
    },
    {
      id: 4,
      slug: 'loam-blends',
      title: 'Loam Blends',
      services: ['Social Media Design', 'AI Photography'],
      bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto:good/f_auto'),
      video: cloudinaryUrl('video', 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg', 'q_auto/f_auto'),
    },
    {
      id: 5,
      slug: 'milave-haircare',
      title: 'Milave Haircare',
      services: ['Social Media Design', 'Website Experience'],
      bg: cloudinaryUrl('image', 'hf_20260403_215802_26dda678-2f90-4fe0-b5d7-39a55f0f377b_1_jgsrxl', 'q_auto:good/f_auto'),
    },
    {
      id: 6,
      slug: 'jlux-label',
      title: 'JLux Label',
      services: ['Fashion AI Photography'],
      bg: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx', 'q_auto:eco/f_auto'),
    },
  ],
};

// ── Gallery (Selected Works slider) ─────────────────────────
// Explicitly typed as GalleryItem[] — without this, TS infers `type` as
// plain `string` from the object literals below, which is too wide for
// DragGallery's `'video' | 'image'` union and fails at the call site.
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, type: 'video', src: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v1781227448/hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg.mp4` },
  { id: 2, type: 'image', bg: cloudinaryUrl('image', '4f_feyshi', 'q_auto/f_auto') },
  { id: 3, type: 'image', bg: cloudinaryUrl('image', 'd-9_jrekkm', 'q_auto/f_auto') },
  { id: 4, type: 'image', bg: cloudinaryUrl('image', 'F-3_uunmgt', 'q_auto/f_auto') },
  { id: 5, type: 'image', bg: cloudinaryUrl('image', 'd-10_geiek8', 'q_auto/f_auto') },
  { id: 6, type: 'image', bg: cloudinaryUrl('image', 'a06b97ea_nano_2K_xy3svv', 'q_auto/f_auto') },
  { id: 7, type: 'image', bg: cloudinaryUrl('image', '6db9025c_nano_2K_f9vofx', 'q_auto/f_auto') },
];

export const SERVICES_BLURB =
  "We create complete visual systems where every element works together to support the same brand experience. " +
  "From branding identity to social media content, every piece is designed to fit into the bigger picture.  " +
  "With a blend of creativity, strategy, and design skills, we help ideas come to life. " +
  "We treat our clients like partners and our work like craft. ";

/**
 * Services — canonical list used by Home services section and Contact form chips.
 */
export const SERVICES = [
  'Web Design',
  'Visual Identity',
  'Packaging Design',
  'Social Media Assets',
  'AI-Generated Content',
  'Motion Design',
];

/**
 * Services (alt layout) — numbered row list, used by ServicesAlt.
 * Combines Visual Identity + Packaging into one category, and
 * relabels Web Design to reflect that build/dev is part of the offer.
 */
export const SERVICES_ALT = [
  {
    title: 'Web Design & Dev',
    description:
      'We design websites that give your products the space they deserve. ' + 
      'Every project is tailored to your business, with a strong focus on usability, ' + 
      'responsive layouts, and a visual style that feels consistent from the first page to the last.',
  },
  {
    title: 'Visual Identity',
    description:
      'We create visual identity systems that define how your brand ' + 
      'looks across every touchpoint. A consistent identity helps your ' +
      'business become more recognizable and ensures every piece of ' +
      'communication feels connected.',
  },
  {
    title: 'Social Media',
    description:
      'We design social media content that matches the rest of your ' +
      'brand and fits naturally into your marketing. ' +
      'Consistent visuals help your products feel more recognizable ' +
      'and make your content easier to maintain over time.',
  },
  {
    title: 'AI-Generated Content',
    description:
      'We create AI-generated visuals tailored to your products ' +
      'and creative direction. This gives you high-quality imagery ' +
      'for your website, advertising, and campaigns without the cost ' +
      'and limitations of traditional photography.',
  },
  {
    title: 'Motion Design',
    description:
      'We create motion graphics that bring movement to your digital ' +
      'content and brand assets. Animation helps capture attention, ' +
      'highlight important details, and make your visual content feel ' +
      'more dynamic.',
  },
];

// ── Process ─────────────────────────────────────────────────
export const PROCESS = {
  tagline: 'Turning creative ideas into\nmemorable brand experiences.',
  steps: [
    { title: 'Define Your Goals', body: "We start with a short creative briefing to understand your product, brand philosophy, visual goals, tone of voice, and aesthetic direction. We look at your existing content, your competitors, and your ideal positioning. This helps us build a clear, brand-aligned direction." },
    { title: 'Concept Creation', body: 'Based on your goals and brand identity, we develop concepts that match the business goals and brand story you want to communicate. You’ll receive several creative directions showing how your product could look across platforms — all aligned with your brand personality.' },
    { title: 'Review & Refine', body: 'If you want any adjustments, this is the step where we make revisions. Your feedback helps shape the final outcome through focused refinements until every detail feels right.' },
    { title: 'Work Delivered', body: 'You receive polished, consistent files in ready-to-use formats for ads, social media, websites, and product pages. Every file is optimized to support your brand identity and help you present your products with confidence.' },
  ],
};

// ── CTA (reused on Work page too) ───────────────────────────
interface CTAData {
  image: string;
  video?: { publicId: string; posterPublicId?: string }; // optional — swap image for video without touching the component
  headline: string;
  body: string;
  button: { label: string; to: string };
}
 
export const CTA: CTAData = {
  image: cloudinaryUrl('image', 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer'),
  headline: 'Have a Project in Mind?\nGet in Touch!',
  body: "Driven by curiosity and built on purpose, this is where bold thinking meets thoughtful execution. " +
   "Let’s create something meaningful together. ",
  button: { label: "Let's Connect ↗", to: '/contact' },
};