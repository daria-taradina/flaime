// sections/about/AboutFounder.tsx
'use client';

import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import styles from './AboutFounder.module.css';
import { ABOUT_MARGO } from '@/data/about';

export default function AboutFounder() {
  const { name, role, paragraphs, image, imageAlt } = ABOUT_MARGO;

  return (
    <Section theme="dark" className={styles.aboutFounder}>
      <FadeIn className={styles.intro}>
        <h1 className={styles.name}>Hi, I&apos;m {name}</h1>
        <p className={styles.role}>{role}</p>
      </FadeIn>

      <FadeIn delay={0.05} className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={imageAlt} />
      </FadeIn>

      <FadeIn delay={0.1} className={styles.paragraphs}>
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`${styles.paragraph} ${p.includes('\n') ? styles.preLine : ''}`}
          >
            {p}
          </p>
        ))}
      </FadeIn>
    </Section>
  );
}