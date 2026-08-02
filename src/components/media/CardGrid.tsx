// components/media/CardGrid.tsx
import Card from './Card';
import styles from './CardGrid.module.css';

export interface CardGridItem {
  id: string | number;
  title: string;
  subtitle?: string;
  bg?: string; // hex color OR a Cloudinary URL built via cloudinaryUrl()
  video?: string; // optional — plays on hover (desktop) or in-viewport (touch)
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
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}