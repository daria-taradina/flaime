import styles from './CardGrid.module.css';
import Image from 'next/image';

export interface CardGridItem {
  id: string | number;
  title: string;
  subtitle?: string;
  src?: string;
  alt?: string;
}

interface CardGridProps {
  items?: CardGridItem[];
  className?: string;
}

/**
 * CardGrid — a row of image/placeholder cards with labels underneath.
 * If `src` is missing the card renders as a plain background placeholder.
 */
export default function CardGrid({ items = [], className = '' }: CardGridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.thumb}>
            {item.src ? (
                <Image src={item.src} alt={item.alt || item.title} fill style={{ objectFit: 'cover' }} />
            ) : null}
            </div>
          <div className={styles.label}>
            <span className={styles.title}>{item.title}</span>
            {item.subtitle && <span className={styles.subtitle}>{item.subtitle}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}