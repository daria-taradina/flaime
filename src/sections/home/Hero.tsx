'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import { HERO } from '@/data/home';
import { cloudinaryUrl } from '@/utils/constants';
import styles from './Hero.module.css';
import BreathingText from '@/components/ui/BreathingText';

function HeroBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');

  return (
    <div className={styles.heroBg} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <div
        className={styles.heroBgOverlay}
        style={{ '--overlay-opacity': HERO.overlayOpacity } as React.CSSProperties}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <Section theme="dark" padY={false} grid={false} className={styles.hero}>
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
          <BreathingText className={styles.scrollIndicator}>
            <span>Scroll to Discover</span>
            <span className={styles.scrollArrow} aria-hidden="true">↓</span>
          </BreathingText>
        </motion.div>
      </div>
    </Section>
  );
}