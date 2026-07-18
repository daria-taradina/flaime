import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import Section from '@/components/layout/Section';
import Button from '@/components/ui/Button';
import { CTA as CTA_DATA } from '@/data/home';
import { cloudinaryUrl } from '@/utils/constants';
import styles from './Cta.module.css';

export default function CTA() {
  const hasVideo = Boolean(CTA_DATA.video);

  return (
    <Section theme="dark" container={false} className={styles.cta}>
      <div className={styles.bg} aria-hidden="true">
        {hasVideo ? (
          <video
            className={styles.bgMedia}
            src={cloudinaryUrl('video', CTA_DATA.video!.publicId, 'f_auto,q_auto:good')}
            poster={
              CTA_DATA.video!.posterPublicId
                ? cloudinaryUrl('image', CTA_DATA.video!.posterPublicId, 'f_auto,q_auto,w_1800')
                : undefined
            }
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <Image className={styles.bgMedia} src={CTA_DATA.image} alt="" fill style={{ objectFit: 'cover' }} />
        )}
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <FadeIn>
          <h2 className={styles.headline}>
            {CTA_DATA.headline.split('\n').map((line, i) => (
              <span key={i} className={styles.headlineLine}>
                {line}
              </span>
            ))}
          </h2>
        </FadeIn>
        <FadeIn delay={0.05}>
          <p className={styles.body}>{CTA_DATA.body}</p>
        </FadeIn>
        <FadeIn delay={0.1} className={styles.buttonWrap}>
          <Button href={CTA_DATA.button.to} size="md">
            {CTA_DATA.button.label}
          </Button>
        </FadeIn>
      </div>
    </Section>
  );
}