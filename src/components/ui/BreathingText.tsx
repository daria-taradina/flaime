'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BreathingTextProps {
  children: ReactNode;
  className?: string;
  minOpacity?: number;
  maxOpacity?: number;
  duration?: number;
  delay?: number;
}

export default function BreathingText({
  children,
  className = '',
  minOpacity = 0.5,
  maxOpacity = 1,
  duration = 2.5,
  delay = 0,
}: BreathingTextProps) {
  return (
    <motion.span
      className={className}
      animate={{ opacity: [minOpacity, maxOpacity, minOpacity] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
}