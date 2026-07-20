// components/case-study/blocks/HeroParallax.tsx
import Image from 'next/image';
import type { HeroParallaxProps } from '../types';
import styles from './HeroParallax.module.css';
import FadeIn from '@/components/ui/FadeIn';

export default function HeroParallax({ title, tagline, image, imageAlt }: HeroParallaxProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.sticky}>
          <FadeIn delay={0.5}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.tagline}>{tagline}</p>
        </FadeIn>
        </div>
      </div>
      <div className={styles.frame}>
        <Image src={image} alt={imageAlt} fill priority sizes="50vw" className={styles.image} />
      </div>
    </section>
  );
}