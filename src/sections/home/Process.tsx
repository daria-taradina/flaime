'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import { PROCESS } from '@/data/home';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  useEffect(() => {
    if (!listRef.current) return;

    const rows = listRef.current.querySelectorAll<HTMLDivElement>(`.${styles.processRow}`);

    gsap.set(rows, { opacity: 0, y: 24 });

    const tween = gsap.to(rows, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 80%',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Section theme="dark" containerClassName={styles.process}>
      <span className="section-label">Our Process</span>
      <div className={styles.processList} ref={listRef}>
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