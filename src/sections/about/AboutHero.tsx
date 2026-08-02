'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cloudinaryUrl, MOBILE_QUERY, BP_MOBILE } from '@/utils/constants';
import styles from './AboutHero.module.css';

gsap.registerPlugin(ScrollTrigger);

// inlined here for now since this is a test hero on /about, not shared with home —
// move into a content file later if it sticks
const HERO = {
  videoPublicId: 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg',
  posterPublicId: 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer',
  overlayOpacity: 0.45,
  headline: 'Transforming\nbrands into visual\nexperiences.',
};

// desktop keeps the deliberate 3-line break; mobile goes one word per line
// (reads more balanced centered on a narrow column)
const DESKTOP_LINES = HERO.headline.split('\n');
const MOBILE_LINES = HERO.headline.replace(/\n/g, ' ').split(' ').filter(Boolean);
const LINE_GAP_PERCENT = 12;

export function AboutHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const overlayRectRef = useRef<SVGRectElement>(null);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const lines = isMobile ? MOBILE_LINES : DESKTOP_LINES;

  // sync with the same breakpoint the rest of the site uses; starts false
  // to match server render, corrects on mount (avoids hydration mismatch)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BP_MOBILE}px)`);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const group = groupRef.current;
    const overlay = overlayRectRef.current;
    const video = videoRef.current;
    const texts = textRefs.current.filter(Boolean) as SVGTextElement[];

    if (!stage || !svg || !group || !overlay || texts.length === 0) return;

    // let the video just play, always — never driven by scroll
    video?.play().catch(() => {
      /* autoplay may be blocked until first interaction on some mobile browsers; ignore */
    });

    // ── measurement + layout, re-run on every resize ──────────────────
    const layout = () => {
      const { width, height } = stage.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

      // clear any previous fit-to-width override so we measure against
      // the real design-token size (var(--fs-h1)) each time
      texts.forEach((t) => t.style.removeProperty('font-size'));

      // same containment values the footer's wordmark uses
      const cs = getComputedStyle(stage);
      const gridMax = parseFloat(cs.getPropertyValue('--grid-max-width')) || width;
      const padX = parseFloat(cs.getPropertyValue('--pad-x')) || 0;
      const maxTextWidth = Math.min(width, gridMax) - padX * 2;

      const naturalWidths = texts.map((t) => t.getBBox().width);
      const naturalMax = Math.max(...naturalWidths, 1);

      if (naturalMax > maxTextWidth) {
        const baseSize = parseFloat(getComputedStyle(texts[0]).fontSize);
        const fitSize = baseSize * (maxTextWidth / naturalMax);
        texts.forEach((t) => {
          t.style.fontSize = `${fitSize}px`;
        });
      }

      // scale from true screen center, not each glyph's own bounding box —
      // this is what was sending the reveal off-center
      gsap.set(group, { svgOrigin: `${width / 2} ${height / 2}` });
    };

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      ScrollTrigger.refresh();
    });
    ro.observe(stage);

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        normal: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          gsap.set(overlay, { opacity: 1 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: '+=60%',
              scrub: true,
            },
          });
          tl.to(overlay, { opacity: 0, duration: 1, ease: 'none' });
          return () => tl.scrollTrigger?.kill();
        }

        gsap.set(group, { scale: 1 });
        gsap.set(overlay, { opacity: 1 });

        // total scroll distance = reveal phase + hold phase, so the video
        // sits fully visible and centered for a beat before the pin
        // releases, instead of the page immediately moving past it
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        // letters grow — visual lead-in for the "stepping into it" feel.
        // occupies the first ~65% of the reveal's scroll range
        tl.to(
          group,
          {
            scale: 30,
            ease: 'none',
            duration: 1,
          },
          0
        );

        // the actual guarantee of "no black left" — overlay opacity fades
        // to 0 independent of mask shape, finishing well before the hold
        tl.to(
          overlay,
          {
            opacity: 0,
            ease: 'none',
            duration: 0.4,
          },
          0.6
        );

        // hold — nothing animates here, video just stays fully visible
        // while the pin keeps it locked in place for this stretch of scroll
        tl.to({}, { duration: 0.65 });

        return () => {
          tl.scrollTrigger?.kill();
        };
      }
    );

    // if Lenis (or anything) computed page height before this pinned
    // section mounted, its cached scroll height won't include the extra
    // space GSAP just added for the pin — refresh so it's reachable.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ro.disconnect();
      mm.revert();
    };
  }, [isMobile]);

  return (
    <section className={styles.section} data-theme="dark">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.videoWrap}>
          <video
            ref={videoRef}
            className={styles.video}
            muted
            loop
            playsInline
            autoPlay
            poster={cloudinaryUrl('image', HERO.posterPublicId, 'w_1920,q_auto,f_auto')}
          >
            <source
              media={MOBILE_QUERY}
              src={cloudinaryUrl('video', HERO.videoPublicId, 'w_828,q_auto,f_auto')}
              type="video/mp4"
            />
            <source
              src={cloudinaryUrl('video', HERO.videoPublicId, 'w_1920,q_auto,f_auto')}
              type="video/mp4"
            />
          </video>
        </div>

        <svg ref={svgRef} className={styles.maskSvg}>
          <defs>
            <mask
              id="headline-mask"
              maskUnits="objectBoundingBox"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <rect x="-100%" y="-100%" width="300%" height="300%" fill="white" />
              <g ref={groupRef}>
                {lines.map((line, i) => {
                  const startY = 50 - ((lines.length - 1) * LINE_GAP_PERCENT) / 2;
                  return (
                    <text
                      key={line}
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                      x="50%"
                      y={`${startY + i * LINE_GAP_PERCENT}%`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={styles.maskText}
                      fill="black"
                    >
                      {line}
                    </text>
                  );
                })}
              </g>
            </mask>
          </defs>

          <rect
            ref={overlayRectRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="black"
            fillOpacity={HERO.overlayOpacity + 0.55}
            mask="url(#headline-mask)"
          />
        </svg>
      </div>
    </section>
  );
}