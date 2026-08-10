// components/case-study/blocks/HeroStatic.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Section from '@/components/layout/Section';
import type { HeroStaticProps } from '../types';
import styles from './HeroStatic.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroStatic({ title, image, video }: HeroStaticProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!mediaRef.current) return;

      // Zoom in on load
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 1.6, ease: 'power2.out' }
      );

      // Slight drift up/down on scroll
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          mediaRef.current,
          { yPercent: -16 },
          {
            yPercent: 16,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section theme="dark" padY={false} grid={false} className={styles.heroStatic}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <div ref={mediaRef} className={styles.media} aria-hidden="true">
          {video ? (
            <video
              className={styles.mediaEl}
              src={video}
              poster={image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <img className={styles.mediaEl} src={image} alt="" />
          )}
        </div>
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </Section>
  );
}