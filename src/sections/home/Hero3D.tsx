'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { HERO } from '@/data/home';
import { cloudinaryUrl } from '@/utils/constants';
import styles from './Hero3D.module.css';

gsap.registerPlugin(ScrollTrigger);

useGLTF.preload('/models/hero-wall.glb');

function Wall({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF('/models/hero-wall.glb');

  useEffect(() => {
    onReady();
  }, [onReady]);

  return <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} />;
}

function CameraRig({ onCamera }: { onCamera: (camera: THREE.Camera) => void }) {
  const { camera } = useThree();

  useEffect(() => {
    onCamera(camera);
  }, [camera, onCamera]);

  return null;
}

export default function Hero3D() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);

  const [modelReady, setModelReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const ready = modelReady && videoReady;

  const videoSrc = cloudinaryUrl('video', HERO.videoPublicId, 'f_auto,q_auto:good');
  const posterSrc = cloudinaryUrl('image', HERO.posterPublicId, 'f_auto,q_auto,w_1800');

  const handleModelReady = useCallback(() => setModelReady(true), []);
  const handleCamera = useCallback((camera: THREE.Camera) => {
    cameraRef.current = camera;
  }, []);

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

  // single master timeline — camera dolly + bg zoom scrub together off one ScrollTrigger
  // so there's zero chance of them drifting relative to each other
  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    const camera = cameraRef.current;
    if (!hero || !video || !camera || !ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(camera.position, { z: 10 }, { z: -2, ease: 'none' }, 0);
    }, hero);

    return () => ctx.revert();
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
          {/* keep this barely-there — any higher and the front reads as lit again */}
          <ambientLight intensity={0.05} />

          {/* the actual effect: light sits behind the wall (negative z, opposite the
              camera's starting side) so only the far side + hole edges catch it */}
          <pointLight position={[0, 0, -6]} intensity={12} distance={20} decay={2} color="#ffb37a" />
          <directionalLight position={[0, 2, -8]} intensity={0.6} color="#ffb37a" />

          <Suspense fallback={null}>
            <Wall onReady={handleModelReady} />
          </Suspense>
          <CameraRig onCamera={handleCamera} />
        </Canvas>
      </div>
    </div>
  );
}