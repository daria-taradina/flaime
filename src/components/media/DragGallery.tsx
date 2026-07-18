'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { backgroundStyle } from '@/utils/media';
import styles from './DragGallery.module.css';

export interface GalleryItem {
  id: string | number;
  type: 'video' | 'image';
  src?: string;
  poster?: string;
  bg?: string;
  title?: string;
  category?: string;
}

interface DragGalleryProps {
  items?: GalleryItem[];
  ratio?: string;
  showOverlay?: boolean;
}

/**
 * Manual drag/swipe horizontal gallery.
 * Desktop: shows prev/next arrow buttons + drag.
 * Mobile: swipe only (arrows hidden).
 */
export default function DragGallery({ items = [], ratio = '3 / 4', showOverlay = true }: DragGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasMoved = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
    return () => t.removeEventListener('scroll', updateArrows);
  }, [updateArrows]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) hasMoved.current = true;
    trackRef.current.scrollLeft = scrollStart.current - dx * 1.1;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const scrollBy = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const amount = t.clientWidth * 0.8;
    t.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.arrow} ${styles.arrowPrev} ${!canPrev ? styles.arrowHidden : ''}`}
        onClick={() => scrollBy(-1)}
        aria-label="Previous"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className={`${styles.arrow} ${styles.arrowNext} ${!canNext ? styles.arrowHidden : ''}`}
        onClick={() => scrollBy(1)}
        aria-label="Next"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className={styles.track}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className={styles.spacer} aria-hidden="true" />

        {items.map((item) => (
          <GalleryCard key={item.id} item={item} ratio={ratio} showOverlay={showOverlay} />
        ))}

        <div className={styles.spacer} aria-hidden="true" />
      </div>
    </div>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  ratio: string;
  showOverlay: boolean;
}

function GalleryCard({ item, ratio, showOverlay }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = item.type === 'video';

  useEffect(() => {
    if (!isVideo) return;
    const el = cardRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isVideo]);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={{ aspectRatio: ratio, ...(isVideo ? {} : backgroundStyle(item.bg)) }}
    >
      {isVideo && (
        <video
          ref={videoRef}
          className={styles.cardVideo}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {showOverlay && (item.title || item.category) && (
        <div className={styles.cardOverlay}>
          {item.category && <span className={styles.cardCategory}>{item.category}</span>}
          {item.title && <span className={styles.cardTitle}>{item.title}</span>}
        </div>
      )}
    </div>
  );
}