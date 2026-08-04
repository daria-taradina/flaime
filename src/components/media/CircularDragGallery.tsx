'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { backgroundStyle } from '@/utils/media';
import styles from './CircularDragGallery.module.css';

export interface CircularGalleryItem {
  id: string | number;
  type: 'image' | 'video';
  src?: string;
  poster?: string;
  bg?: string;
  title?: string;
  category?: string;
}

interface CircularDragGalleryProps {
  items?: CircularGalleryItem[];
  showOverlay?: boolean;
  playVideo?: 'active' | 'hover' | 'none';
}

export default function CircularDragGallery({
  items = [],
  showOverlay = true,
  playVideo = 'active',
}: CircularDragGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const dragOffset = useRef(0);
  const currentOffset = useRef(0);
  const hasMoved = useRef(false);

  const itemCount = items.length;

  const getRelativePosition = useCallback(
    (index: number) => {
      if (!itemCount) return 0;

      let position = index - activeIndex;

      // Wrap around to the shortest path.
      if (position > itemCount / 2) {
        position -= itemCount;
      }

      if (position < -itemCount / 2) {
        position += itemCount;
      }

      return position;
    },
    [activeIndex, itemCount]
  );

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (!itemCount) return;

      setActiveIndex((current) => {
        return (current + direction + itemCount) % itemCount;
      });
    },
    [itemCount]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!itemCount) return;

    startX.current = e.clientX;
    dragOffset.current = 0;
    currentOffset.current = 0;
    hasMoved.current = false;

    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dx = e.clientX - startX.current;

    if (Math.abs(dx) > 5) {
      hasMoved.current = true;
    }

    dragOffset.current = dx;
    currentOffset.current = dx;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const dx = currentOffset.current;

    setDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    // Swipe threshold.
    if (Math.abs(dx) > 60) {
      // Dragging left -> next item.
      goTo(dx < 0 ? 1 : -1);
    }

    dragOffset.current = 0;
    currentOffset.current = 0;
  };

  const handlePointerCancel = () => {
    setDragging(false);
    dragOffset.current = 0;
    currentOffset.current = 0;
  };

  // Keyboard navigation.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goTo]);

  if (!items.length) return null;

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={() => goTo(-1)}
        aria-label="Previous project"
      >
        ←
      </button>

      <div
        className={`${styles.stage} ${dragging ? styles.isDragging : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {items.map((item, index) => {
          const position = getRelativePosition(index);

          // Don't render cards that are too far away.
          if (Math.abs(position) > 3) return null;

          return (
            <CircularGalleryCard
              key={item.id}
              item={item}
              position={position}
              dragOffset={dragOffset}
              showOverlay={showOverlay}
              playVideo={playVideo}
            />
          );
        })}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={() => goTo(1)}
        aria-label="Next project"
      >
        →
      </button>
    </div>
  );
}

interface CircularGalleryCardProps {
  item: CircularGalleryItem;
  position: number;
  dragOffset: React.RefObject<number>;
  showOverlay: boolean;
  playVideo: 'active' | 'hover' | 'none';
}

function CircularGalleryCard({
  item,
  position,
  dragOffset,
  showOverlay,
  playVideo,
}: CircularGalleryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const isActive = position === 0;
  const shouldPlay =
    item.type === 'video' &&
    ((playVideo === 'active' && isActive) ||
      (playVideo === 'hover' && hovered));

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [shouldPlay]);

  const absPosition = Math.abs(position);

  // Position cards along a shallow 3D arc.
  const translateX = position * 55;
  const translateZ = -absPosition * 180;
  const rotateY = position * -12;
  const scale = 1 - absPosition * 0.08;
  const blur = absPosition * 1.5;

  const style = {
    '--x': `${translateX}%`,
    '--z': `${translateZ}px`,
    '--rotate': `${rotateY}deg`,
    '--scale': scale,
    '--drag-x': `${dragOffset.current}px`,
    '--blur': blur,
    zIndex: 10 - absPosition,
  } as React.CSSProperties;

  return (
    <article
      className={`${styles.card} ${
        isActive ? styles.cardActive : ''
      } ${absPosition > 2 ? styles.cardFar : ''}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={styles.media}
        style={
          item.type === 'image'
            ? backgroundStyle(item.bg)
            : undefined
        }
      >
        {item.type === 'video' && (
          <video
            ref={videoRef}
            className={styles.video}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {showOverlay && (item.title || item.category) && (
          <div className={styles.overlay}>
            {item.category && (
              <span className={styles.category}>
                {item.category}
              </span>
            )}

            {item.title && (
              <span className={styles.title}>
                {item.title}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}