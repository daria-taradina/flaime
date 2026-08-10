// components/case-study/blocks/Marquee.tsx
import Section from '@/components/layout/Section';
import MarqueeGallery from '@/components/media/MarqueeGallery';
import type { MarqueeProps } from '../types';

export default function Marquee({ items, duration }: MarqueeProps) {
  return (
    <Section theme="dark" grid={false} padY={false}>
      <MarqueeGallery items={items} duration={duration} />
    </Section>
  );
}