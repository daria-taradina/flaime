'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cloudinaryUrl, MOBILE_QUERY } from '@/utils/constants';
import styles from './AboutHero2.module.css';

gsap.registerPlugin(ScrollTrigger);

// A/B comparison build — scroll scrubs the video's currentTime directly,
// vs AboutHero's mask-reveal approach. The real ceiling on smoothness here
// is the browser only being able to seek cleanly to keyframes; the two
// things below (seek-threshold + fastSeek) squeeze what headroom exists
// within that limit, they don't remove it.
const HERO2 = {
  videoPublicId: 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg',
  posterPublicId: 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer',
  videoDuration: 6, // fallback until real metadata loads
};

// don't fire a seek for sub-frame scroll jitter — most video is ~24-30fps,
// so anything smaller than this is a redundant seek call, pure overhead
const SEEK_THRESHOLD = 1 / 30;

export function AboutHero2() {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(HERO2.videoDuration);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const onLoadedMetadata = () => {
      if (!Number.isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
      }
    };
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    onLoadedMetadata();

    const seekTo = (t: number) => {
      if (Math.abs(video.currentTime - t) < SEEK_THRESHOLD) return;
      // fastSeek trades frame-accuracy for speed where supported
      // (Firefox, Safari) — worth it here since we don't need exact frames,
      // just motion. Chrome doesn't implement it, falls back below.
      if (typeof video.fastSeek === 'function') {
        video.fastSeek(t);
      } else {
        video.currentTime = t;
      }
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        normal: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          video.play().catch(() => {});
          return;
        }

        video.pause();

        const st = ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            seekTo(self.progress * durationRef.current);
          },
        });

        return () => st.kill();
      }
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      mm.revert();
    };
  }, []);

  return (
    <section className={styles.section} data-theme="dark">
      <div ref={stageRef} className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="auto"
          poster={cloudinaryUrl('image', HERO2.posterPublicId, 'w_1920,q_auto,f_auto')}
        >
          <source
            media={MOBILE_QUERY}
            src={cloudinaryUrl('video', HERO2.videoPublicId, 'w_828,q_auto,f_auto')}
            type="video/mp4"
          />
          <source
            src={cloudinaryUrl('video', HERO2.videoPublicId, 'w_1920,q_auto,f_auto')}
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}