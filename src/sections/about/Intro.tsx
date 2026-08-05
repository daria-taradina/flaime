// sections/about/Intro.tsx
import Section from '@/components/layout/Section';
import ParallaxCollage from '@/components/media/ParallaxCollage';
import { ABOUT_INTRO } from '@/data/about';
import { Fragment } from 'react';

export default function AboutIntro() {
  return (
    <Section
      theme="dark"
      grid={false}
      padY={false}
    >
      <ParallaxCollage
        items={ABOUT_INTRO.cards}
        text={
          <h1 className="h1">
            {ABOUT_INTRO.text.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
        }
      />
    </Section>
  );
}