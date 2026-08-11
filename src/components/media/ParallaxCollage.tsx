// components/media/ParallaxCollage.tsx
'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ParallaxCollage.module.css';
import type { ParallaxCollageItem } from './ParallaxCollage.types';
import { DESKTOP_CANVAS, MOBILE_CANVAS } from './ParallaxCollage.types';
import { isColor } from '@/utils/media';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_QUERY = '(max-width: 767px)';

interface Props {
  items: ParallaxCollageItem[];
  text: string;
  text2?: string;
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
        style={{ background: isColor(item.src) ? item.src : 'var(--section-card-bg)' }}
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

export default function ParallaxCollage({ items, text, text2, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string | number, HTMLDivElement>>(new Map());

  const [isMobile, setIsMobile] = useState(false);
  const [activeText, setActiveText] = useState(0);

  useLayoutEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, []);

  const canvasSize = isMobile ? MOBILE_CANVAS : DESKTOP_CANVAS;
  const resolved = items.map(item => resolveItem(item, isMobile));

  // Scale the fixed canvas to always cover the stage — like background-size:
  // cover — so relative card positions stay identical on every screen size.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const updateScale = () => {
      const { width: cw, height: ch } = stage.getBoundingClientRect();
      const scale = Math.max(cw / canvasSize.width, ch / canvasSize.height);
      canvas.style.setProperty('--canvas-scale', String(scale));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [canvasSize.width, canvasSize.height]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        resolved.forEach(item => {
          const el = cardRefs.current.get(item.id);
          if (!el) return;

          gsap.fromTo(
            el,
            { y: (item.travel ?? 900) / 2 },
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
      }

      // Swap the paragraph roughly halfway through the pinned scroll.
      if (text2) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            setActiveText(self.progress > 0.5 ? 1 : 0);
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, items, text2]);

  const back = resolved.filter(x => x.layer === 'back');
  const front = resolved.filter(x => x.layer === 'front');

  const setCardRef = (id: string | number) => (el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  };

  return (
    <div ref={containerRef} className={`${styles.collage} ${className}`}>
      <div ref={stageRef} className={styles.stage}>
        <div
          ref={canvasRef}
          className={styles.canvas}
          style={{ width: canvasSize.width, height: canvasSize.height }}
        >
          <div className={styles.backLayer}>
            {back.map(item => (
              <div
                key={item.id}
                ref={setCardRef(item.id)}
                className={styles.card}
                style={{ left: item.x, top: item.y, width: item.width }}
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
                style={{ left: item.x, top: item.y, width: item.width }}
              >
                <CollageMedia item={item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.glass}>
            <p className={`${styles.paragraph} ${activeText === 0 ? styles.paragraphActive : ''}`}>
              {text}
            </p>
            {text2 && (
              <p className={`${styles.paragraph} ${activeText === 1 ? styles.paragraphActive : ''}`}>
                {text2}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}