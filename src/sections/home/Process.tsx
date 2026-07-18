'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import { PROCESS } from '@/data/home';
import styles from './Process.module.css';

export default function Process() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0])); // 0 open by default, or new Set() for all closed

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
    <Section theme="dark" containerClassName={styles.process}>
      <span className="section-label">Our Process</span>
      <div className={styles.processList}>
        {PROCESS.steps.map((step, i) => {
          const isOpen = openIndices.has(i);
          return (
            <div key={step.title} className={styles.processRow}>
              <button
                className={styles.processHeader}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>↓</span>
              </button>
              <div className={styles.processBody} data-open={isOpen}>
                <div className={styles.stepBodyInner}>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}