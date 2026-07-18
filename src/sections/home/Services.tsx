'use client';

import { useState, useEffect, useRef } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import { SERVICES } from '@/data/services';
import { MOBILE_QUERY } from '@/utils/constants';
import styles from './Services.module.css';
import { SERVICES_BLURB } from '@/data/home';

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false); // SSR-safe default — window isn't available on the server
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mq.matches); // sync real value once mounted client-side
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Section theme="dark" className={styles.services}>
      <FadeIn className={styles.servicesText}>
        <p>{SERVICES_BLURB}</p>
      </FadeIn>
      <div className={styles.servicesInner}>
        <FadeIn className={styles.servicesLabelCol}>
          <span className="section-label">What We Do</span>
        </FadeIn>
        <FadeIn delay={0.05} className={styles.servicesList}>
          <ul>
            {SERVICES.map((title, i) => (
              <li
                key={title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={`${styles.serviceItem} ${isMobile && active === i ? styles.isNear : ''}`}
                onMouseEnter={() => {
                  if (!isMobile) setActive(i);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setActive(null);
                }}
              >
                <span className={styles.serviceTitle}>{title}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </Section>
  );
}