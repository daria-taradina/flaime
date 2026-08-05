// components/media/CardGlass.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { backgroundStyle } from '@/utils/media';
import type { CardGridItem } from './CardGrid';
import styles from './CardGlass.module.css';

interface CardGlassProps {
  item: CardGridItem;
}

export default function CardGlass({ item }: CardGlassProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [canHover, setCanHover] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  // Detect hover-capable devices
  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  // Mobile/tablet: reveal + play when card reaches viewport center.
  // No longer gated on item.video — text/services need this too.
  useEffect(() => {
    if (canHover || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [canHover]);

  // Single source of truth for "revealed" state — drives scrim, zoom,
  // title/services fade, and video swap alike.
  const showContent = canHover ? hovered : inView;
  const videoActive = showContent && !!item.video;

// Video control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (videoActive) {
      video.play().catch(() => {});
    } else {
      video.pause();

      // Defer the seek so it doesn't block the leave transition's first frame
      const resetTimeout = setTimeout(() => {
        video.currentTime = 0;
      }, 300);

      return () => clearTimeout(resetTimeout);
    }
  }, [videoActive]);

  // Cursor label follows pointer inside card
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

    positionLabel(e);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canHover) return;

    setHovered(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.card} ${
        canHover && hovered ? styles.cardHovered : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={positionLabel}
    >
      <Link
        href={item.slug ? `/work/${item.slug}` : '#'}
        className={styles.link}
      >
        <div className={styles.thumb}>
          <div
            className={`${styles.thumbBg} ${
              showContent ? styles.mediaZoomed : ''
            } ${videoActive ? styles.thumbBgHidden : ''}`}
            style={backgroundStyle(item.bg)}
            role="img"
            aria-label={item.alt || item.title}
          />

          {item.video && (
            <video
              ref={videoRef}
              className={`${styles.thumbVideo} ${
                showContent ? styles.mediaZoomed : ''
              } ${videoActive ? styles.thumbVideoActive : ''}`}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}

          <div
            className={`${styles.scrim} ${
              showContent ? styles.scrimActive : ''
            }`}
          />

          {item.services && item.services.length > 0 && (
            <div
              className={`${styles.services} ${
                showContent ? styles.revealActive : ''
              }`}
            >
              {item.services.map((service) => (
                <span key={service} className={styles.servicePill}>
                  {service}
                </span>
              ))}
            </div>
          )}

          <div
            className={`${styles.titleWrap} ${
              showContent ? styles.revealActive : ''
            }`}
          >
            <span className={styles.title}>{item.title}</span>
          </div>
        </div>
      </Link>

      {canHover && (
        <div
          ref={labelRef}
          className={`${styles.cursorLabel} ${
            hovered ? styles.cursorLabelVisible : ''
          }`}
        >
          Learn more
        </div>
      )}
    </div>
  );
}