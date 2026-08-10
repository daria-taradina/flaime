// components/media/MasonryGallery.tsx
'use client';

import { useState } from 'react';
import MarqueeItem from './MarqueeItem';
import VideoLightbox from './VideoLightbox';
import type { MarqueeMediaItem } from './MarqueeGallery';
import styles from './MasonryGallery.module.css';

interface MasonryGalleryProps {
  items: MarqueeMediaItem[];
}

export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const [active, setActive] = useState<MarqueeMediaItem | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <div key={i} className={styles.cell}>
            <MarqueeItem item={item} onPlay={setActive} />
          </div>
        ))}
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