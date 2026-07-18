import Link from 'next/link';
import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonSize = 'md' | 'sm';

interface ButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  href?: string;
  onClick?: () => void;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith('mailto:');

/**
 * Button — polymorphic pill button (Link / a / button).
 * Colors come from CSS vars (--section-fg / --section-bg) so it adapts
 * to whatever Section theme it's inside.
 */
export default function Button({
  href,
  onClick,
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = `${styles.btn} ${styles[size] || ''} ${className}`;

  if (href) {
    if (isExternal(href)) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}