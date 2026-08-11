// components/media/ParallaxCollage.tsx
'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ParallaxCollage.module.css';
import type { CollageColumn, CollageColumnImage } from './ParallaxCollage.types';
import { isColor } from '@/utils/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_QUERY = '(max-width: 767px)';

interface Props {
  columns: CollageColumn[];
  mobileColumns?: CollageColumn[];
  text: string;
  text2?: string;
  text3?: string;
  travel?: number;
  className?: string;
}

function ColumnMedia({ image }: { image: CollageColumnImage }) {
  const [failed, setFailed] = useState(false);
  const showFallback = isColor(image.src) || failed;

  if (showFallback) {
    return (
      <div
        className={styles.media}
        style={{ background: isColor(image.src) ? image.src : 'var(--section-card-bg)' }}
      />
    );
  }

  if (image.isVideo) {
    return (
      <video
        className={styles.media}
        src={image.src}
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
      src={image.src}
      alt={image.alt ?? ''}
      onError={() => setFailed(true)}
    />
  );
}

export default function ParallaxCollage({
  columns,
  mobileColumns,
  text,
  text2,
  text3,
  travel = 150,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());
  const trackRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const activeColumns = isMobile && mobileColumns ? mobileColumns : columns;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      activeColumns.forEach(column => {
        const track = trackRefs.current.get(column.id);
        const columnEl = columnRefs.current.get(column.id);
        if (!track || !columnEl) return;

        // Center the (taller, duplicated) track inside the shorter
        // column at rest, then swing it by ±travel/2 on scroll — folded
        // into one y value since GSAP overwrites any CSS transform.
        const baseOffset = -(track.scrollHeight - columnEl.clientHeight) / 2;

        const from = column.direction === 'down' ? baseOffset - travel / 2 : baseOffset + travel / 2;
        const to = column.direction === 'down' ? baseOffset + travel / 2 : baseOffset - travel / 2;

        gsap.fromTo(
          track,
          { y: from },
          {
            y: to,
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
  }, [activeColumns, travel]);

  const setColumnRef = (id: string | number) => (el: HTMLDivElement | null) => {
    if (el) columnRefs.current.set(id, el);
    else columnRefs.current.delete(id);
  };

  const setTrackRef = (id: string | number) => (el: HTMLDivElement | null) => {
    if (el) trackRefs.current.set(id, el);
    else trackRefs.current.delete(id);
  };

  return (
    <div ref={containerRef} className={`${styles.collage} ${className}`}>
      <div className={styles.stage}>
        <div className={styles.columns}>
          {activeColumns.map(column => (
            <div key={column.id} ref={setColumnRef(column.id)} className={styles.column}>
              <div ref={setTrackRef(column.id)} className={styles.track}>
                {[...column.images, ...column.images].map((image, i) => (
                  <div key={i} className={styles.thumb}>
                    <ColumnMedia image={image} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.text}>
          <div className={styles.glass}>
            <p className={styles.paragraph}>{text}</p>
            {text2 && <p className={styles.paragraph}>{text2}</p>}
            {text3 && <p className={styles.paragraph}>{text3}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}