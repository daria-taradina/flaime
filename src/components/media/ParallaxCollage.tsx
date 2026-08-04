// components/media/ParallaxCollage.tsx
'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isColor } from '@/utils/media';
import type { ParallaxCollageItem } from './ParallaxCollage.types';
import styles from './ParallaxCollage.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxCollageProps {
  items: ParallaxCollageItem[];
  text: React.ReactNode;
  className?: string;
}

const DEFAULT_SPEED = { front: 110, back: 45 };

// real <img>/<video> tags so a failed load can actually fire onError —
// a CSS background-image url() has no equivalent failure event
function CollageMedia({ item }: { item: ParallaxCollageItem }) {
  const [failed, setFailed] = useState(false);
  const showFallback = isColor(item.src) || failed;

  if (showFallback) {
    return (
      <div
        className={styles.media}
        style={{ backgroundColor: isColor(item.src) ? item.src : 'var(--section-card-bg)' }}
        role="img"
        aria-label={item.alt || ''}
      />
    );
  }

  return item.isVideo ? (
    <video
      className={styles.media}
      src={item.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    />
  ) : (
    <img
      className={styles.media}
      src={item.src}
      alt={item.alt || ''}
      onError={() => setFailed(true)}
    />
  );
}

export default function ParallaxCollage({ items, text, className = '' }: ParallaxCollageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const item = items[i];
        const speed = item.speed ?? DEFAULT_SPEED[item.layer];

        gsap.fromTo(
          el,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={containerRef} className={`${styles.collage} ${className}`.trim()}>
      <div className={styles.desktopLayer}>
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`${styles.card} ${item.layer === 'front' ? styles.cardFront : styles.cardBack}`}
            style={{ top: item.top, left: item.left, right: item.right, width: item.width }}
          >
            <CollageMedia item={item} />
          </div>
        ))}
      </div>

      <div className={styles.text}>{text}</div>

      <div className={styles.mobileGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.mobileCard}>
            <CollageMedia item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}