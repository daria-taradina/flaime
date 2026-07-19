'use client';

import { motion } from 'framer-motion';

interface FallingArrowProps {
  className?: string;
  direction?: 'down' | 'up';
  distance?: number;
  duration?: number;
  delay?: number;
  symbol?: string;
}

export default function FallingArrow({
  className = '',
  direction = 'down',
  distance = 10,
  duration = 1.8,
  delay = 0,
  symbol = '↓',
}: FallingArrowProps) {
  const sign = direction === 'down' ? 1 : -1;

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      animate={{
        y: [0, 0, sign * distance, sign * distance],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.7, 1],
      }}
    >
      {symbol}
    </motion.span>
  );
}