import FadeIn from '@/components/ui/FadeIn';
import CircularDragGallery from '@/components/media/CircularDragGallery';
import Section from '@/components/layout/Section';
import { GALLERY_ITEMS } from '@/data/home';
import styles from './Featured.module.css';

export default function Featured() {
  return (
    <Section theme="light" grid={false} className={styles.featured}>
      <div className="pageBound">
        <FadeIn>
          <CircularDragGallery
            items={GALLERY_ITEMS}
            showOverlay={false}
            playVideo="active"
          />
        </FadeIn>
      </div>
    </Section>
  );
}