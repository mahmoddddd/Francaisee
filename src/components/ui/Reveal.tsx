'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const distance = 24;

const buildVariants = (direction: Direction, reduced: boolean): Variants => {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.4 } }
    };
  }
  const offset =
    direction === 'up'
      ? { y: distance }
      : direction === 'down'
      ? { y: -distance }
      : direction === 'left'
      ? { x: distance }
      : direction === 'right'
      ? { x: -distance }
      : {};
  return {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
    }
  };
};

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const variants = buildVariants(direction, reduced);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
