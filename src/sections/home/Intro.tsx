import FadeIn from '../../components/ui/FadeIn';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import CardGrid from '@/components/media/CardGrid';
import { INTRO } from '@/data/home';
import styles from './Intro.module.css';

export default function Intro() {
  return (
    <Section theme="light" className={styles.introSection} containerClassName={styles.intro}>
      <FadeIn className={styles.text}>
        <p>{INTRO.text}</p>
      </FadeIn>
      <FadeIn delay={0.05} className={styles.cta}>
        <Button href={INTRO.cta.to} size="md">
          {INTRO.cta.label}
        </Button>
      </FadeIn>
      <FadeIn delay={0.1} className={styles.cards}>
        <CardGrid items={INTRO.cards} />
      </FadeIn>
    </Section>
  );
}