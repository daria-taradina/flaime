// components/media/MarqueeGallery.tsx
'use client';

import { useState } from 'react';
import MarqueeItem from './MarqueeItem';
import VideoLightbox from './VideoLightbox';
import styles from './MarqueeGallery.module.css';

type BaseMedia = { alt?: string; width: number; height: number };

export type MarqueeMediaItem =
  | (BaseMedia & { type: 'image'; src: string })
  | (BaseMedia & { type: 'video'; src: string; poster?: string })
  | (BaseMedia & { type: 'placeholder'; color?: string });

interface MarqueeGalleryProps {
  items: MarqueeMediaItem[];
  duration?: number; // seconds for one full loop
}

export default function MarqueeGallery({ items, duration = 40 }: MarqueeGalleryProps) {
  const [active, setActive] = useState<MarqueeMediaItem | null>(null);

  // duplicated set gives a seamless loop — translateX(-50%) always
  // shifts by exactly one full set's width, regardless of item sizes
  const loopItems = [...items, ...items];

  return (
    <>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
          {loopItems.map((item, i) => (
            <MarqueeItem key={i} item={item} onPlay={setActive} />
          ))}
        </div>
      </div>

      {active && active.type === 'video' && (
        <VideoLightbox
          src={active.src}
          poster={active.poster}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}