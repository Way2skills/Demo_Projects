
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { x: 0, y: 55 },
    down: { x: 0, y: -55 },
    left: { x: 55, y: 0 },
    right: { x: -55, y: 0 },
  };

  const start = directions[direction] || directions.up;

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, ...start, scale: 0.98 }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
