'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../data/navigation';
import styles from './Navbar.module.css';

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
      height={60}
      onError={() => setImgFailed(true)}
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const linkClass = (to: string, end?: boolean) =>
    `${styles.navLink} ${isActive(pathname, to, end) ? styles.active : ''}`;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
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
        <Link href="/contact" className={styles.cta}>
          Contact
        </Link>
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
        <Link href="/contact" className={styles.cta} onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
      </nav>
    </header>
  );
}