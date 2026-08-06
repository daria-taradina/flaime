// components/media/ParallaxCollage.tsx

'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ParallaxCollage.module.css';
import type { ParallaxCollageItem } from './ParallaxCollage.types';
import { isColor } from '@/utils/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  items: ParallaxCollageItem[];
  text: React.ReactNode;
  className?: string;
}

function CollageMedia({ item }: { item: ParallaxCollageItem }) {
  const [failed, setFailed] = useState(false);

  const showFallback = isColor(item.src) || failed;

  if (showFallback) {
    return (
      <div
        className={styles.media}
        style={{
          background: isColor(item.src)
            ? item.src
            : 'var(--section-card-bg)',
        }}
      />
    );
  }

  if (item.isVideo) {
    return (
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
    );
  }

  return (
    <img
      className={styles.media}
      src={item.src}
      alt={item.alt ?? ''}
      onError={() => setFailed(true)}
    />
  );
}

export default function ParallaxCollage({
  items,
  text,
  className = '',
}: Props) {

  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      refs.current.forEach((el, index) => {
        if (!el) return;

        const item = items[index];

        gsap.fromTo(
          el,
          {
            y: (item.travel ?? 900) / 2,
          },
          {
            y: -(item.travel ?? 900) / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();

  }, [items]);


  const back = items.filter(x => x.layer === 'back');
  const front = items.filter(x => x.layer === 'front');

  let refIndex = 0;

  return (
    <div
      ref={containerRef}
      className={`${styles.collage} ${className}`}
    >

      <div className={styles.stage}>

        <div className={styles.backLayer}>
          {back.map(item => {
            const index = refIndex++;

            return (
              <div
                key={item.id}
                ref={el => {
                  refs.current[index] = el;
                }}
                className={styles.card}
                style={{
                  bottom: item.bottom,
                  left: item.left,
                  right: item.right,
                  width: item.width,
                }}
              >
                <CollageMedia item={item}/>
              </div>
            );
          })}
        </div>


        <div className={styles.text}>
          <div className={styles.title}>
            {text}
          </div>
        </div>


        <div className={styles.frontLayer}>
          {front.map(item => {
            const index = refIndex++;

            return (
              <div
                key={item.id}
                ref={el => {
                  refs.current[index] = el;
                }}
                className={`${styles.card} ${styles.frontCard}`}
                style={{
                  bottom: item.bottom,
                  left: item.left,
                  right: item.right,
                  width: item.width,
                }}
              >
                <CollageMedia item={item}/>
              </div>
            );
          })}
        </div>

      </div>

      <div className={styles.mobileGrid}>
        {items.map(item => (
          <div key={item.id} className={styles.mobileCard}>
            <CollageMedia item={item}/>
          </div>
        ))}
      </div>

    </div>
  );
}