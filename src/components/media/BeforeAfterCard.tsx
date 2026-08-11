// components/media/BeforeAfterCard.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { backgroundStyle } from '@/utils/media';
import styles from './BeforeAfterCard.module.css';

type MediaSource = Parameters<typeof backgroundStyle>[0];

interface BeforeAfterCardProps {
  before: MediaSource;
  after: MediaSource;
  beforeVideo?: string;
  afterVideo?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export default function BeforeAfterCard({
  before,
  after,
  beforeVideo,
  afterVideo,
  beforeAlt = 'Before',
  afterAlt = 'After',
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: BeforeAfterCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);

  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  // both layers play continuously — the reveal is purely a clip, not a swap
  useEffect(() => {
    beforeVideoRef.current?.play().catch(() => {});
    afterVideoRef.current?.play().catch(() => {});
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setInteracted(true);
    updateFromClientX(e.clientX);
  };

  // window-level listeners so dragging stays smooth even off the card edges
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const handleUp = () => setDragging(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragging, updateFromClientX]);

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
    <div className={styles.wrap}>
      <div
        ref={wrapperRef}
        className={`${styles.card} ${canHover && hovered ? styles.cardHovered : ''}`}
        onPointerDown={handlePointerDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={positionLabel}
      >
        <div className={styles.layer}>
          <div
            className={styles.media}
            style={backgroundStyle(before)}
            role="img"
            aria-label={beforeAlt}
          />
          {beforeVideo && (
            <video
              ref={beforeVideoRef}
              className={styles.mediaVideo}
              src={beforeVideo}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>

        <div className={styles.layer} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
          <div
            className={styles.media}
            style={backgroundStyle(after)}
            role="img"
            aria-label={afterAlt}
          />
          {afterVideo && (
            <video
              ref={afterVideoRef}
              className={styles.mediaVideo}
              src={afterVideo}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>

        <div
          className={`${styles.handleLine} ${!interacted ? styles.handleHint : ''}`}
          style={{ left: `${pct}%` }}
        >
          <div className={styles.handleKnob}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M8 7L3 12L8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 7L21 12L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {canHover && (
          <div
            ref={labelRef}
            className={`${styles.cursorLabel} ${hovered ? styles.cursorLabelVisible : ''}`}
          >
            Drag to reveal
          </div>
        )}
      </div>

      {(beforeLabel || afterLabel || caption) && (
        <div className={styles.captionRow}>
          <span className={styles.captionTag}>{beforeLabel}</span>
          {caption && <span className={styles.captionTitle}>{caption}</span>}
          <span className={styles.captionTag}>{afterLabel}</span>
        </div>
      )}
    </div>
  );
}