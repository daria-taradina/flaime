// sections/about/Intro.tsx
import Section from '@/components/layout/Section';
import ParallaxCollage from '@/components/media/ParallaxCollage';
import FadeIn from '@/components/ui/FadeIn';
import { ABOUT_INTRO } from '@/data/about';

export default function AboutIntro() {
  return (
    <Section theme="dark" grid={false} padY={false}>
      <FadeIn>
        <ParallaxCollage
          columns={ABOUT_INTRO.columns}
          mobileColumns={ABOUT_INTRO.mobileColumns}
          text={ABOUT_INTRO.text}
          text2={ABOUT_INTRO.text2}
          
        />
      </FadeIn>
    </Section>
  );
}