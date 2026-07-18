'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import { PROCESS } from '@/data/home';
import styles from './Process.module.css';

export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // closed by default; only one open at a time

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <Section theme="dark" containerClassName={styles.process}>
      <span className="section-label">Our Process</span>
      <div className={styles.processList}>
        {PROCESS.steps.map((step, i) => {
          const isOpen = openIndex === i;
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