'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '@/components/layout/Section';
import { HERO } from '@/data/home';
import { cloudinaryUrl } from '@/utils/constants';
import styles from './Hero.module.css';
import BreathingText from '@/components/ui/BreathingText';
import FallingArrow from '@/components/ui/FallingArrow';

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const lineVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function HeroBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -80], { clamp: true });
  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');

  return (
    <motion.div className={styles.heroBg} style={{ y }} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        // TODO — no `loop` attribute here (matches your original) — confirm
        // that's intentional; otherwise it freezes on the last frame once
        // playback finishes once.
      />
      <div
        className={styles.heroBgOverlay}
        style={{ '--overlay-opacity': HERO.overlayOpacity } as React.CSSProperties}
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <Section theme="dark" container={false} padY={false} className={styles.hero}>
      <HeroBg />
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.heroHeadline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {HERO.headline.split('\n').map((line, i) => (
            <span key={i} className={styles.headlineLine}>
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className={styles.heroDesc}>{HERO.description}</p>
          <div className={styles.scrollIndicator}>
            {/* was: inner span duplicated the outer div's class — fixed */}
            <BreathingText className={styles.scrollIndicator}>
              <span>Scroll to Discover</span>
              <span className={styles.scrollArrow} aria-hidden="true">↓</span>
            </BreathingText>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}