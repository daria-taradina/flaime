'use client';

import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import styles from './ServicesAlt.module.css';
import { SERVICES_ALT, SERVICES_BLURB } from '@/data/home';

export default function ServicesAlt() {
  return (
    <Section theme="dark" className={styles.servicesAlt}>
      <FadeIn className={styles.label}>
        <span className="section-label">What We Do</span>
      </FadeIn>

      <FadeIn className={styles.blurb}>
        {SERVICES_BLURB}
      </FadeIn>

      <FadeIn delay={0.05} className={styles.list}>
        <ul>
          {SERVICES_ALT.map((service, i) => (
            <li key={service.title} className={styles.row}>
              <span className={`${styles.number} section-label`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.title}>{service.title}</span>
              <p className={styles.description}>{service.description}</p>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}