// components/case-study/blocks/BeforeAfter.tsx
import Section from '@/components/layout/Section';
import BeforeAfterCard from '@/components/media/BeforeAfterCard';
import type { BeforeAfterProps } from '../types';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter({
  before,
  after,
  beforeVideo,
  afterVideo,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  caption,
}: BeforeAfterProps) {
  return (
    <Section theme="dark" className={styles.beforeAfter}>
      <div className={styles.inner}>
        <BeforeAfterCard
          before={before}
          after={after}
          beforeVideo={beforeVideo}
          afterVideo={afterVideo}
          beforeAlt={beforeAlt}
          afterAlt={afterAlt}
          beforeLabel={beforeLabel}
          afterLabel={afterLabel}
          caption={caption}
        />
      </div>
    </Section>
  );
}