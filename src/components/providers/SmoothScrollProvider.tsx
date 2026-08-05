// components/providers/SmoothScrollProvider.jsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isBackNav = useRef(false);
  const pathname = usePathname();

  // init once
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,      // sync with native touch instead of overriding it
      syncTouchLerp: 0.1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Detect if this load is a hard reload vs a fresh navigation
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const isReload = navEntry?.type === 'reload';

    if (isReload) {
      const saved = sessionStorage.getItem(`scroll:${pathname}`);
      if (saved) {
        // Wait for layout (images, fonts, ScrollTrigger-affected heights) to settle
        // before restoring — a single RAF isn't enough once content loads async.
        const restore = () => {
          lenis.scrollTo(Number(saved), { immediate: true });
          ScrollTrigger.refresh();
        };
        // Try once after paint, then again after full load (images etc.)
        requestAnimationFrame(restore);
        window.addEventListener('load', restore, { once: true });
      }
    }

    const onPopState = () => {
      isBackNav.current = true;
    };
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // continuously persist scroll position for this pathname (so reload always has a fresh value)
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const onScroll = () => {
      sessionStorage.setItem(`scroll:${pathname}`, String(lenis.scroll));
    };
    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [pathname]);

  // on every route change: restore if back nav, otherwise go to top
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const saved = sessionStorage.getItem(`scroll:${pathname}`);

    if (isBackNav.current && saved) {
      lenis.scrollTo(Number(saved), { immediate: true });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    isBackNav.current = false;

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return children;
}