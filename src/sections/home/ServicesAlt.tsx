'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import styles from './ServicesAlt.module.css';
import { SERVICES_ALT, SERVICES_BLURB } from '@/data/home';

export default function ServicesAlt() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <Section theme="dark" className={styles.servicesAlt}>
      <FadeIn className={styles.label}>
        <span className="section-label">What We Do</span>
      </FadeIn>

      <FadeIn className={styles.blurb}>{SERVICES_BLURB}</FadeIn>

      <FadeIn delay={0.05} className={styles.list}>
        <ul>
          {SERVICES_ALT.map((service, i) => {
            const isOpen = openIndices.has(i);
            return (
              <li key={service.title} className={styles.row}>
                <span className={`${styles.number} section-label`}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className={styles.titleCol}>
                  <button
                    type="button"
                    className={styles.titleHeader}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.title}>{service.title}</span>
                    <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                      ↓
                    </span>
                  </button>

                  <div className={styles.pillsBody} data-open={isOpen}>
                    <div className={styles.pillsInner}>
                      <div className={styles.pillsList}>
                        {service.pills.map((pill) => (
                          <span key={pill} className={styles.servicePill}>
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className={styles.description}>{service.description}</p>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </Section>
  );
}