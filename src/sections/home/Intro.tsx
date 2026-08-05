import FadeIn from '../../components/ui/FadeIn';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import CardGrid from '@/components/media/CardGrid';
import { INTRO_FEATURED } from '@/data/home';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <Section theme="light" className={styles.introSection}>
      <FadeIn className={styles.text}>
        {INTRO_FEATURED.text}
      </FadeIn>
      {/*<FadeIn delay={0.05} className={styles.cta}>
        <Button href={INTRO_FEATURED.cta.to} size="md">
          {INTRO_FEATURED.cta.label}
        </Button>
      </FadeIn>*/}
      <FadeIn delay={0.1} className={styles.cards}>
        <CardGrid items={INTRO_FEATURED.cards} />
      </FadeIn>
    </Section>
  );
}