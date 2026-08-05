// components/layout/NavbarGlass.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../data/navigation';
import styles from './NavbarGlass.module.css';

function isActive(pathname: string, to: string, end?: boolean) {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

function Logo() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <span className={styles.logoFallback}>
        fl<em>ai</em>me studio
      </span>
    );
  }

  return (
    <img
      src="/logo-light.svg"
      alt="Flaime Studio"
      className={styles.logoImg}
      height={40}
      onError={() => setImgFailed(true)}
    />
  );
}

export default function NavbarGlass() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollYRef = useRef(0);

  // iOS-safe scroll lock, same as before
  useEffect(() => {
    if (menuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo({ top: scrollYRef.current, left: 0, behavior: 'instant' });
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  const linkClass = (to: string, end?: boolean) =>
    `${styles.navLink} ${isActive(pathname, to, end) ? styles.active : ''}`;

  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.glass}>
        <Link href="/" className={styles.logo} aria-label="Flaime Studio home" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} href={item.to} className={linkClass(item.to, item.end)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={styles.mobileNav} aria-hidden={!menuOpen}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={linkClass(item.to, item.end)}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}