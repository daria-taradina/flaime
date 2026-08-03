'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Wall() {
  const { scene } = useGLTF('/models/hero-wall.glb');
  return <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} />;
}

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    // adjust startZ/endZ based on where your F hole actually sits —
    // this is just a first guess to see if the motion feels right
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#test-hero-scroll',
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
      },
    });

    tl.fromTo(
      camera.position,
      { z: 10 },
      { z: -2, ease: 'none' }
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [camera]);

  return null;
}

export default function TestHeroPage() {
  return (
    <div id="test-hero-scroll" style={{ height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 5]} intensity={1} />
        <Wall />
        <CameraRig />
      </Canvas>
    </div>
  );
}