'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO } from '@/data/home';
import { cloudinaryUrl } from '@/utils/constants';
import styles from './Hero3D.module.css';

gsap.registerPlugin(ScrollTrigger);

useGLTF.preload('/models/hero-wall.glb');

function Wall({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF('/models/hero-wall.glb');

  // Suspense only lets this render once the model has resolved —
  // so mounting IS the ready signal, no extra loading state needed here
  useEffect(() => {
    onReady();
  }, [onReady]);

  return <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} />;
}

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      }).fromTo(camera.position, { z: 10 }, { z: -2, ease: 'none' });
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [modelReady, setModelReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const ready = modelReady && videoReady;

  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');

  const handleModelReady = useCallback(() => setModelReady(true), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      setVideoReady(true);
      return;
    }

    const onCanPlay = () => setVideoReady(true);
    video.addEventListener('canplay', onCanPlay);
    return () => video.removeEventListener('canplay', onCanPlay);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video || !ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.01 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={heroRef} className={styles.hero}>
      <div className={`${styles.loader} ${ready ? styles.loaderHidden : ''}`} aria-hidden={ready}>
        <span className={styles.loaderMark}>flaime</span>
      </div>

      <div className={`${styles.content} ${ready ? styles.contentVisible : ''}`}>
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="auto"
        />

        <Canvas className={styles.canvas} gl={{ alpha: true }} camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Wall onReady={handleModelReady} />
          </Suspense>
          <CameraRig />
        </Canvas>
      </div>
    </div>
  );
}