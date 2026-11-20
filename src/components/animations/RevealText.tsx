"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function RevealText({
  text,
  tag = "h2",
  className = "",
  delay = 0.1,
  duration = 0.8,
  stagger = 0.04,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const Tag = tag;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay * i,
      },
    }),
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: "110%",
      rotateZ: 2,
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateZ: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Tag className={`${className} inline-block overflow-hidden`}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden leading-tight">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
