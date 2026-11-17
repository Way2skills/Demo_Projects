
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { newArrivals } from "@/data/homeData";

function ProductCard({ product, index, animationKey }) {
  const productImage = product.variants?.[0]?.image;

  return (
    <div
      className="group new-arrival-card"
      style={{
        animationDelay: `${index * 180 + 350}ms`,
      }}
    >
      {/* Clickable Product Image */}
      <Link
        href={product.href}
        aria-label={`View ${product.name}`}
        className="block overflow-hidden rounded-sm bg-[#F0ECE5]"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            className="new-arrival-image h-full w-full object-cover"
          />

          {/* Subtle Image Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-colors duration-700 group-hover:bg-black/[0.07]" />
        </div>
      </Link>

      {/* Product Name Only */}
      <div className="pt-5 text-center">
        <Link
          href={product.href}
          aria-label={`View ${product.name}`}
        >
          <h3 className="text-base font-semibold text-[#29231F] transition-colors duration-300 hover:text-[#A88955] md:text-lg">
            {product.name}
          </h3>
        </Link>
      </div>
    </div>
  );
}

export default function ProductSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Replay animation whenever section enters viewport
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey((previous) => previous + 1);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const heading = "New Arrivals";

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F7F4EF] px-5 pt-8 pb-16 md:px-10 md:pt-10 md:pb-20"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Animated Center Heading */}
        <div className="mb-6 text-center md:mb-8">
          <h2
            aria-label="New Arrivals"
            className={`flex justify-center overflow-hidden font-serif text-3xl font-semibold tracking-tight text-[#29231F] md:text-4xl ${
              isVisible ? "heading-animation" : "heading-hidden"
            }`}
          >
            {Array.from(heading).map((letter, index) => (
              <span
                key={`${animationKey}-${index}`}
                className="heading-letter inline-block"
                style={{
                  animationDelay: `${index * 65}ms`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>

          <div
            key={`line-${animationKey}`}
            className={`mx-auto mt-3 h-[2px] bg-[#A88955] heading-line ${
              isVisible ? "heading-line-show" : ""
            }`}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">
          {newArrivals.map((product, index) => (
            <ProductCard
              key={`${animationKey}-${product.name}`}
              product={product}
              index={index}
              animationKey={animationKey}
            />
          ))}
        </div>

      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        .heading-hidden .heading-letter {
          opacity: 0;
          transform: translateY(35px) rotate(5deg);
        }

        .heading-animation .heading-letter {
          animation: arrivalLetterReveal 0.7s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes arrivalLetterReveal {
          0% {
            opacity: 0;
            transform: translateY(35px) rotate(5deg);
          }

          65% {
            opacity: 1;
            transform: translateY(-5px) rotate(-1deg);
          }

          100% {
            opacity: 1;
            transform: translateY(0) rotate(0);
          }
        }

        .heading-line {
          width: 0;
          opacity: 0;
          transition:
            width 0.8s ease,
            opacity 0.5s ease;
        }

        .heading-line-show {
          width: 55px;
          opacity: 1;
          transition-delay: 0.8s;
        }

        .new-arrival-card {
          opacity: 0;
          animation: arrivalCardReveal 0.85s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes arrivalCardReveal {
          0% {
            opacity: 0;
            transform: translateY(45px) scale(0.97);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .new-arrival-image {
          opacity: 0;
          transform: scale(1.09) translateY(15px);
          animation: arrivalImageReveal 1.1s
            cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: inherit;
          transition: transform 1s
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes arrivalImageReveal {
          0% {
            opacity: 0;
            transform: scale(1.09) translateY(15px);
          }

          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .group:hover .new-arrival-image {
          transform: scale(1.07) translateY(-3px);
        }

        @media (prefers-reduced-motion: reduce) {
          .heading-animation .heading-letter,
          .new-arrival-card,
          .new-arrival-image {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .heading-line {
            width: 55px;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
