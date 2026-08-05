'use client';

import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroScrubFrameUrl } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 91;
const DESKTOP_WIDTH = 1920;
const MOBILE_WIDTH = 800;
const MOBILE_BREAKPOINT = 1024;
const PRELOAD_COUNT = 15;

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) {
  const ir = img.width / img.height;
  const cr = cw / ch;
  let dw = cw, dh = ch, dx = 0, dy = 0;

  if (ir > cr) {
    dh = ch;
    dw = ch * ir;
    dx = (cw - dw) / 2;
  } else {
    dw = cw;
    dh = cw / ir;
    dy = (ch - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

interface HeroScrubCanvasProps {
  triggerRef: RefObject<HTMLElement | null>;
  className?: string;
}

export default function HeroScrubCanvas({ triggerRef, className }: HeroScrubCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    const width = isMobile ? MOBILE_WIDTH : DESKTOP_WIDTH;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const img = framesRef.current[currentFrameRef.current];
      if (img?.complete) drawCover(ctx, img, clientWidth, clientHeight);
    };

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = images;

    const render = (index: number) => {
      const img = images[index];
      if (!img?.complete) return;
      currentFrameRef.current = index;
      drawCover(ctx, img, canvas.clientWidth, canvas.clientHeight);
    };

    for (let i = 0; i < PRELOAD_COUNT; i++) {
      const img = new Image();
      img.src = heroScrubFrameUrl(i, width);
      if (i === 0) img.onload = () => render(0);
      images[i] = img;
    }

    const loadRest = () => {
      for (let i = PRELOAD_COUNT; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = heroScrubFrameUrl(i, width);
        images[i] = img;
      }
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadRest);
    } else {
      setTimeout(loadRest, 300);
    }

    window.addEventListener('resize', resize);
    resize();

    const st = ScrollTrigger.create({
      trigger,
      start: 'top top',
      end: 'bottom top', //'+=150%'
      scrub: true, // 1
      pin: true,
      pinType: document.documentElement.style.transform !== undefined ? 'transform' : 'fixed',
      anticipatePin: 1,
      onUpdate: (self) => {
        const frame = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
        render(frame);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resize);
    };
  }, [triggerRef]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}