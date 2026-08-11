// components/media/VideoLightbox.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './VideoLightbox.module.css';

interface VideoLightboxProps {
  src: string;
  poster?: string;
  onClose: () => void;
}

export default function VideoLightbox({ src, poster, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close video"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        controls
        playsInline
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}