// components/case-study/blocks/Masonry.tsx
import Section from '@/components/layout/Section';
import MasonryGallery from '@/components/media/MasonryGallery';
import type { MasonryProps } from '../types';
import styles from './Masonry.module.css';

export default function Masonry({ items }: MasonryProps) {
  return (
    <Section theme="dark" grid={false}>
      <div className={styles.masonry}>
        <MasonryGallery items={items} />
      </div>
    </Section>
  );
}