"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  threshold?: number;
}

export default function SmoothReveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  className = "",
}: SmoothRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion || !rootRef.current) return;
    const targets = rootRef.current.querySelectorAll<HTMLElement>(".editorial-image");
    if (!targets.length) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        { clipPath: "inset(0 0 100% 0 round 2.25rem 0.35rem 2.25rem 0.35rem)" },
        {
          clipPath: "inset(0 0 0% 0 round 2.25rem 0.35rem 2.25rem 0.35rem)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true },
        },
      );
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div ref={rootRef} className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      }}
      ref={rootRef}
      className={className}
    >
      {children}
    </motion.div>
  );
}
