// components/case-study/blocks/Brief.tsx
import Section from '@/components/layout/Section';
import FadeIn from '@/components/ui/FadeIn';
import type { BriefProps } from '../types';
import styles from './Brief.module.css';

export default function Brief({ services, points }: BriefProps) {
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

        <div className={styles.points}>
          {points.map((point, i) => (
            <FadeIn key={point.label} delay={0.1 + i * 0.05} className={styles.point}>
              <span className={styles.pointLabel}>{point.label}</span>
              <p className={styles.pointText}>{point.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}