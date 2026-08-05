// components/media/Card.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { backgroundStyle } from '@/utils/media';
import type { CardGridItem } from './CardGrid';
import styles from './Card.module.css';

interface CardProps {
  item: CardGridItem;
}

export default function Card({ item }: CardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [canHover, setCanHover] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  // detect hover-capable device once, client-side only
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  // non-hover devices: play video when card crosses the vertical center of viewport
  useEffect(() => {
    if (canHover || !item.video || !wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [canHover, item.video]);

  const active = canHover ? hovered : inView;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0; // always fall back to the static photo
    }
  }, [active]);

  const positionLabel = (e: React.MouseEvent) => {
    if (!wrapperRef.current || !labelRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    labelRef.current.style.transform =
      `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(-6deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!canHover) return;
    positionLabel(e); // set position immediately, don't wait for the first move
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setHovered(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.card} ${canHover && hovered ? styles.cardHovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={positionLabel}
    >
      <Link href={item.slug ? `/work/${item.slug}` : '#'} className={styles.link}>
        <div className={styles.thumb}>
          <div
            className={styles.thumbBg}
            style={backgroundStyle(item.bg)}
            role="img"
            aria-label={item.alt || item.title}
          />
          {item.video && (
            <video
              ref={videoRef}
              className={styles.thumbVideo}
              style={{ opacity: active ? 1 : 0 }}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>

        <div className={styles.label}>
          <span className={styles.title}>{item.title}</span>
          {/*{item.subtitle && <span className={styles.subtitle}>{item.subtitle}</span>}*/}
        </div>
      </Link>

      {canHover && (
        <div
          ref={labelRef}
          className={`${styles.cursorLabel} ${hovered ? styles.cursorLabelVisible : ''}`}
        >
          Learn more
        </div>
      )}
    </div>
  );
}