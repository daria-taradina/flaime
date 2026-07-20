// components/media/CardGrid.tsx
import Link from 'next/link';
import { backgroundStyle } from '@/utils/media';
import styles from './CardGrid.module.css';

export interface CardGridItem {
  id: string | number;
  title: string;
  subtitle?: string;
  bg?: string; // hex color OR a Cloudinary URL built via cloudinaryUrl()
  alt?: string;
  slug?: string;
}

interface CardGridProps {
  items?: CardGridItem[];
  className?: string;
}

export default function CardGrid({ items = [], className = '' }: CardGridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => {
        const content = (
          <>
            <div
              className={styles.thumb}
              style={backgroundStyle(item.bg)}
              role="img"
              aria-label={item.alt || item.title}
            />
            <div className={styles.label}>
              <span className={styles.title}>{item.title}</span>
              {item.subtitle && <span className={styles.subtitle}>{item.subtitle}</span>}
            </div>
          </>
        );

        return item.slug ? (
          <Link key={item.id} href={`/work/${item.slug}`} className={styles.card}>
            {content}
          </Link>
        ) : (
          <div key={item.id} className={styles.card}>
            {content}
          </div>
        );
      })}
    </div>
  );
}