// components/media/MarqueeItem.tsx
'use client';

import { backgroundStyle } from '@/utils/media';
import type { MarqueeMediaItem } from './MarqueeGallery';
import styles from './MarqueeItem.module.css';

interface MarqueeItemProps {
  item: MarqueeMediaItem;
  onPlay: (item: MarqueeMediaItem) => void;
}

export default function MarqueeItem({ item, onPlay }: MarqueeItemProps) {
  const isVideo = item.type === 'video';
  const isPlaceholder = item.type === 'placeholder';
  const ratio = item.width / item.height;

  return (
    <div
      className={styles.item}
      style={{ aspectRatio: ratio }}
      onClick={isVideo ? () => onPlay(item) : undefined}
      role={isVideo ? 'button' : undefined}
      aria-label={isVideo ? `Play ${item.alt || 'video'}` : undefined}
    >
      {isPlaceholder ? (
        <div
          className={styles.placeholder}
          style={{ background: item.color ?? 'var(--section-card-bg)' }}
          role="img"
          aria-label={item.alt}
        />
      ) : (
        <div
          className={styles.media}
          style={backgroundStyle(isVideo ? item.poster ?? item.src : item.src)}
          role="img"
          aria-label={item.alt}
        />
      )}

      {isVideo && (
        <div className={styles.playBtn} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M8 5.5V18.5L19 12L8 5.5Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}