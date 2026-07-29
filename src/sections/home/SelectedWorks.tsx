import FadeIn from '@/components/ui/FadeIn';
import DragGallery from '@/components/media/DragGallery';
import Section from '@/components/layout/Section';
import { GALLERY_ITEMS } from '@/data/home';
import styles from './SelectedWorks.module.css';

export default function SelectedWorks() {
  return (
    <Section theme="light" grid={false} className={styles.works}>
      <FadeIn>
        <DragGallery items={GALLERY_ITEMS} ratio="9 / 16" showOverlay={false} />
      </FadeIn>
    </Section>
  );
}