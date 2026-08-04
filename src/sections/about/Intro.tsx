// sections/about/Intro.tsx
import Section from '@/components/layout/Section';
import ParallaxCollage from '@/components/media/ParallaxCollage';
import { ABOUT_INTRO } from '@/data/about';

export default function AboutIntro() {
  return (
    <Section theme="dark" grid={false}>
      <div className="pageBound">
        <ParallaxCollage items={ABOUT_INTRO.cards} text={<h1 className="h1">{ABOUT_INTRO.text}</h1>} />
      </div>
    </Section>
  );
}