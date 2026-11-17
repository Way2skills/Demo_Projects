
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FeaturedFurnitureSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const animation = (delay) => ({
    opacity: isVisible ? undefined : 0,
    transform: isVisible ? undefined : "translateY(40px)",
    animation: isVisible
      ? `fadeInUp 0.85s ease-out ${delay}s both`
      : "none",
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F8F7F5]"
    >
      <div className="grid grid-cols-1 items-stretch md:min-h-[500px] md:grid-cols-2">

        {/* Left Content */}
        <div className="flex items-center px-7 py-12 sm:px-12 md:px-14 lg:px-20 md:py-10">
          <div className="mx-auto w-full max-w-[540px] -translate-y-3 md:-translate-y-5">

            {/* Label */}
            <p
              style={animation(0)}
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A88955]"
            >
              THE NEOLEN COLLECTION
            </p>

            {/* Main Heading */}
            <h2
              style={animation(0.2)}
              className="mt-4 text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-[#211E1B] sm:text-5xl lg:text-[54px]"
            >
              Comfort,
              <br />
              Crafted for Living
            </h2>

            {/* Subtitle */}
            <p
              style={animation(0.4)}
              className="mt-4 text-lg leading-relaxed text-[#756B62] sm:text-xl"
            >
              Relaxation meets thoughtful design.
            </p>

            {/* Divider */}
            <div
              style={animation(0.55)}
              className="mt-5 h-px w-16 bg-[#A88955]"
            />

            {/* Description */}
            <p
              style={animation(0.65)}
              className="mt-5 max-w-[470px] text-sm leading-7 text-[#4D4843] sm:text-[14px]"
            >
              Discover furniture that brings together timeless style,
              everyday comfort, and thoughtful craftsmanship.
              Create a space where every moment feels special.
            </p>

            {/* Button */}
            <Link
              href="/furniture/living-room/recliners"
              style={animation(0.85)}
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#29231F] px-9 text-[10px] font-semibold uppercase tracking-[0.13em] text-white transition-all duration-300 hover:bg-[#A88955] hover:px-11"
            >
              Discover Now
              <span className="ml-3 text-base">→</span>
            </Link>

          </div>
        </div>

        {/* Right Image */}
        <div className="group relative min-h-[350px] overflow-hidden bg-[#F0EFED] md:min-h-[500px]">

          <img
            src="/images/home/categories/h1.jpeg"
            alt="Neolen premium furniture collection"
            style={{
              opacity: isVisible ? undefined : 0,
              transform: isVisible ? undefined : "scale(1.10)",
              animation: isVisible
                ? "imageReveal 1.2s ease-out 1.15s both"
                : "none",
            }}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.035]"
          />

        </div>

      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageReveal {
          from {
            opacity: 0;
            transform: scale(1.10);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
