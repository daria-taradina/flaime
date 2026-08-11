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

const MOBILE_QUERY = '(max-width: 767px)';

interface Props {
  items: ParallaxCollageItem[];
  text: React.ReactNode;
  className?: string;
}

function resolveItem(item: ParallaxCollageItem, isMobile: boolean): ParallaxCollageItem {
  if (!isMobile || !item.mobile) return item;
  return { ...item, ...item.mobile };
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
  const cardRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  const resolved = items.map(item => resolveItem(item, isMobile));

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      resolved.forEach(item => {
        const el = cardRefs.current.get(item.id);
        if (!el) return;

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
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, items]);

  const back = resolved.filter(x => x.layer === 'back');
  const front = resolved.filter(x => x.layer === 'front');

  const setCardRef = (id: string | number) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.collage} ${className}`}
    >

      <div className={styles.stage}>

        <div className={styles.backLayer}>
          {back.map(item => (
            <div
              key={item.id}
              ref={setCardRef(item.id)}
              className={styles.card}
              style={{
                bottom: item.bottom,
                left: item.left,
                right: item.right,
                width: item.width,
              }}
            >
              <CollageMedia item={item} />
            </div>
          ))}
        </div>

        <div className={styles.frontLayer}>
          {front.map(item => (
            <div
              key={item.id}
              ref={setCardRef(item.id)}
              className={`${styles.card} ${styles.frontCard}`}
              style={{
                bottom: item.bottom,
                left: item.left,
                right: item.right,
                width: item.width,
              }}
            >
              <CollageMedia item={item} />
            </div>
          ))}
        </div>

        <div className={styles.text}>
          <div className={styles.title}>
            {text}
          </div>
        </div>

      </div>

    </div>
  );
}