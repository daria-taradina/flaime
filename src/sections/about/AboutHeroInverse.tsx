'use client';

import { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cloudinaryUrl, MOBILE_QUERY, BP_MOBILE } from '@/utils/constants';
import BreathingText from '@/components/ui/BreathingText';
import styles from './AboutHeroInverse.module.css';

gsap.registerPlugin(ScrollTrigger);

const HERO = {
  videoPublicId: 'hf_20260611_231757_26018a0c-efd2-4af3-a5a5-1c4fe405b2dd_efvzeg',
  posterPublicId: 'hf_20260611_231223_d542720e-9929-4e9e-985b-b20205b0fcd6_abxyer',
  headline: 'Transforming\nbrands into visual\nexperiences',
};

const DESKTOP_LINES = HERO.headline.split('\n');
const MOBILE_LINES = HERO.headline.replace(/\n/g, ' ').split(' ').filter(Boolean);
const LINE_GAP_PERCENT = 12;

export function AboutHeroInverse() {
  const maskId = useId().replace(/:/g, '');

  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const overlayRectRef = useRef<SVGRectElement>(null);
  const whiteTextGroupRef = useRef<SVGGElement>(null);
  // mask texts define the cutout; white texts are the solid fill layer
  // on top. both get sized identically in layout() so they align.
  const maskTextRefs = useRef<(SVGTextElement | null)[]>([]);
  const whiteTextRefs = useRef<(SVGTextElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const lines = isMobile ? MOBILE_LINES : DESKTOP_LINES;

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${BP_MOBILE}px)`);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // play/pause tied to real viewport visibility, independent of scroll
  // progress through the pin — keeps it simple and stops the video
  // burning bandwidth while the section is off-screen
  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 }
    );

    io.observe(stage);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    const overlay = overlayRectRef.current;
    const whiteTextGroup = whiteTextGroupRef.current;
    const maskTexts = maskTextRefs.current.filter(Boolean) as SVGTextElement[];
    const whiteTexts = whiteTextRefs.current.filter(Boolean) as SVGTextElement[];

    if (!stage || !svg || !overlay || !whiteTextGroup || maskTexts.length === 0) return;

    const layout = () => {
      const { width, height } = stage.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

      maskTexts.forEach((t) => t.style.removeProperty('font-size'));

      const cs = getComputedStyle(stage);
      const gridMax = parseFloat(cs.getPropertyValue('--grid-max-width')) || width;
      const padX = parseFloat(cs.getPropertyValue('--pad-x')) || 0;
      const maxTextWidth = Math.min(width, gridMax) - padX * 2;

      const naturalWidths = maskTexts.map((t) => t.getBBox().width);
      const naturalMax = Math.max(...naturalWidths, 1);

      if (naturalMax > maxTextWidth) {
        const baseSize = parseFloat(getComputedStyle(maskTexts[0]).fontSize);
        const fitSize = baseSize * (maxTextWidth / naturalMax);
        // apply the same computed size to both layers so the white fill
        // lines up exactly with the cutout it's replacing
        [...maskTexts, ...whiteTexts].forEach((t) => {
          t.style.fontSize = `${fitSize}px`;
        });
      }
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

        gsap.set(overlay, { opacity: 1 });
        gsap.set(whiteTextGroup, { opacity: 0 });

        if (reduced) {
          const tl = gsap.timeline();
          tl.to(overlay, { opacity: 0, duration: 1, ease: 'power1.out', delay: 0.3 }, 0);
          tl.to(whiteTextGroup, { opacity: 1, duration: 1, ease: 'power1.out', delay: 0.3 }, 0);
          return;
        }

        // pinned hold, same pattern as the working version — nothing
        // moves or scales. the only change on scroll: overlay fades out
        // (revealing full video) while the white text fades in on top
        // of it, so the cutout gradually turns into solid white letters
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(overlay, { opacity: 0.01, ease: 'none' }, 0);
        tl.to(whiteTextGroup, { opacity: 1, ease: 'none' }, 0);

        return () => {
          tl.scrollTrigger?.kill();
        };
      }
    );

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
              id={maskId}
              maskUnits="objectBoundingBox"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <rect x="-100%" y="-100%" width="300%" height="300%" fill="white" />
              {lines.map((line, i) => {
                const startY = 50 - ((lines.length - 1) * LINE_GAP_PERCENT) / 2;
                return (
                  <text
                    key={line}
                    ref={(el) => {
                      maskTextRefs.current[i] = el;
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
            </mask>
          </defs>

          {/* overlay — black everywhere except the letter-shaped holes,
              where the video shows through. fades out on scroll. */}
          <rect
            ref={overlayRectRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="black"
            mask={`url(#${maskId})`}
          />

          {/* same headline again, solid white, no mask — starts invisible,
              fades in on top as the overlay fades out, so the cutout
              gradually resolves into plain white text */}
          <g ref={whiteTextGroupRef}>
            {lines.map((line, i) => {
              const startY = 50 - ((lines.length - 1) * LINE_GAP_PERCENT) / 2;
              return (
                <text
                  key={line}
                  ref={(el) => {
                    whiteTextRefs.current[i] = el;
                  }}
                  x="50%"
                  y={`${startY + i * LINE_GAP_PERCENT}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={styles.maskText}
                  fill="white"
                >
                  {line}
                </text>
              );
            })}
          </g>
        </svg>

        <div className={styles.scrollIndicator}>
          <BreathingText className={styles.scrollLabel}>
            <span>Scroll to discover ↓</span>
          </BreathingText>
          
        </div>
      </div>
    </section>
  );
}