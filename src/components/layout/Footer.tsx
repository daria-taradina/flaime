'use client';

import Link from 'next/link';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { FOOTER_LINK_COLUMNS } from '@/data/navigation';
import { CONTACT_INFO } from '@/data/contact';
import styles from './Footer.module.css';

const REFERENCE_FONT_SIZE = 200;

// useLayoutEffect warns ("does nothing on the server") when it runs during
// SSR — Next renders client components server-side too. Falls back to
// useEffect there; the real layout-fitting logic only ever needs to run
// client-side anyway.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Footer() {
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(REFERENCE_FONT_SIZE);
  const [imgFailed, setImgFailed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (!imgFailed) return; // real SVG scales to width:100% on its own — no JS needed unless it's missing
    const fit = () => {
      const row = rowRef.current;
      const measure = measureRef.current;
      if (!row || !measure) return;
      const availableWidth = row.clientWidth;
      const textWidth = measure.scrollWidth;
      if (!textWidth) return;
      setFontSize(REFERENCE_FONT_SIZE * (availableWidth / textWidth));
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (rowRef.current) ro.observe(rowRef.current);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, [imgFailed]);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.location}>
          Based in {CONTACT_INFO.location}. {CONTACT_INFO.locationNote}.
        </p>
        <div className={styles.links}>
          {FOOTER_LINK_COLUMNS.map((column, i) => (
            <div key={i} className={styles.col}>
              {column.map((item) =>
                item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
        <span className={styles.copyright}>© {new Date().getFullYear()} Flaime Studio</span>
      </div>
      <div className={styles.bigLogoRow} ref={rowRef}>
        {imgFailed ? (
          <span className={styles.bigLogo} style={{ fontSize: `${fontSize}px` }}>
            fl<em>ai</em>me studio
          </span>
        ) : (
          <img
            src="/logo-light.svg"
            alt="Flaime Studio"
            className={styles.bigLogoImg}
            onError={() => setImgFailed(true)}
          />
        )}
        <span className={styles.bigLogoMark} aria-hidden="true" />
      </div>
      <span
        ref={measureRef}
        className={styles.bigLogo}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          top: '-9999px',
          left: '-9999px',
          display: 'inline-block',
          width: 'auto',
          whiteSpace: 'nowrap',
          fontSize: `${REFERENCE_FONT_SIZE}px`,
        }}
      >
        fl<em>ai</em>me studio
      </span>
    </footer>
  );
}