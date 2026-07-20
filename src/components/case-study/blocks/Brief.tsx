// components/case-study/blocks/Brief.tsx
import Section from '@/components/layout/Section';
import FadeIn from '@/components/ui/FadeIn';
import type { BriefProps } from '../types';
import styles from './Brief.module.css';

export default function Brief({ intro, services }: BriefProps) {
  return (
    <Section theme="light" className={styles.wrapper}>
      <div className={styles.grid}>
        <FadeIn className={styles.services}>
          <span className="section-label">what we did</span>
          <ul className={styles.list}>
            {services.map((service) => (
              <li key={service} className={styles.listItem}>{service}</li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className={styles.intro}>{intro}</p>
        </FadeIn>
      </div>
    </Section>
  );
}