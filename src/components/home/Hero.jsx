
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const heroImages = ["/images/home/hero/n2.jpeg"];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroRef = useRef(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(heroElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
      setTextKey((current) => current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? heroImages.length - 1 : current - 1
    );
    setTextKey((current) => current + 1);
    setIsVisible(true);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % heroImages.length);
    setTextKey((current) => current + 1);
    setIsVisible(true);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    setTextKey((current) => current + 1);
    setIsVisible(true);
  };

  return (
    <section
      ref={heroRef}
      className="group relative flex h-[calc(100svh-82px)] min-h-[540px] max-h-[868px] w-full items-center overflow-hidden bg-[#F8F6F5] sm:min-h-[580px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* FULL BACKGROUND IMAGE */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
            activeIndex === index
              ? "z-[1] scale-[1.10] opacity-100"
              : "z-0 scale-[1.14] opacity-0"
          }`}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
          aria-hidden="true"
        />
      ))}

      {/* LEFT TEXT CONTENT */}
      <div className="relative z-[3] flex h-full w-full items-center px-6 sm:px-10 md:px-[5%] lg:px-[3%]">
        <div
          key={textKey}
          className="flex w-full max-w-[650px] -translate-y-[40px] flex-col items-start text-left sm:-translate-y-[35px] lg:-translate-y-[45px]"
        >
          {/* TOP LABEL */}
          <p
            className={`hero-reveal mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.055em] text-[#344D70] sm:mb-5 sm:gap-3 sm:text-[12px] md:text-[13px] ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ "--delay": "0.15s" }}
          >
            NEOLEN FURNITURE
            <span className="h-px w-7 bg-[#AAB4C2] sm:w-10" />
          </p>

          {/* MAIN HEADING */}
          <h1
            className={`hero-reveal w-full font-serif text-[29px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#101A2B] min-[380px]:text-[32px] sm:text-[46px] md:text-[49px] lg:text-[54px] xl:text-[58px] ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ "--delay": "0.35s" }}
          >
            <span className="block whitespace-nowrap">
              Crafted for
            </span>

            <span className="block whitespace-nowrap">
              Comfort &
            </span>

            <span className="block whitespace-nowrap">
              Everyday Living
            </span>
          </h1>

          {/* DESCRIPTION */}
          <div
            className={`hero-reveal mt-4 sm:mt-5 ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ "--delay": "0.6s" }}
          >
            <p className="text-[13px] font-medium leading-[1.5] tracking-[-0.02em] text-[#252525] sm:text-[16px] md:text-[18px]">
              Functional. Elegant. Timeless.
            </p>

            <p className="mt-2 max-w-[540px] text-[12px] font-normal leading-[1.7] tracking-normal text-[#353535] sm:text-[14px] md:text-[15px]">
              Thoughtfully crafted furniture, timeless designs and beautiful
              details that make every space feel like home.
            </p>
          </div>

          {/* SHOP BUTTON */}
          <div
            className={`hero-reveal mt-6 sm:mt-8 ${
              isVisible ? "is-visible" : ""
            }`}
            style={{ "--delay": "0.85s" }}
          >
            <Link
              href="/furniture"
              className="group/button inline-flex h-[42px] min-w-[138px] items-center justify-center gap-2 rounded-full bg-[#29466F] px-5 text-[11px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#1D3557] hover:gap-4 sm:h-[46px] sm:min-w-[160px] sm:gap-3 sm:px-6 sm:text-[13px]"
            >
              Explore Furniture

              <span className="text-[15px] transition-transform duration-300 group-hover/button:translate-x-1 sm:text-[16px]">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* SLIDE ARROWS */}
      {heroImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-[5] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-xl text-[#243B5B] transition-all hover:bg-white sm:left-4 sm:h-10 sm:w-10 sm:text-2xl"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-[5] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-xl text-[#243B5B] transition-all hover:bg-white sm:right-4 sm:h-10 sm:w-10 sm:text-2xl"
          >
            ›
          </button>

          {/* SLIDE DOTS */}
          <div className="absolute bottom-5 left-6 z-[5] flex items-center gap-3 sm:bottom-7 sm:left-10 md:left-[3%]">
            {heroImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-[8px] rounded-full transition-all duration-500 sm:h-[9px] ${
                  activeIndex === index
                    ? "w-[8px] bg-[#29466F] sm:w-[9px]"
                    : "w-[8px] border border-[#29466F]/50 bg-white/50 sm:w-[9px]"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* TEXT ANIMATION */}
      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          transform: translate3d(0, 25px, 0);
          filter: blur(3px);
          transition:
            opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            filter 1s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: 0s;
        }

        .hero-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
          transition-delay: var(--delay);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal,
          .hero-reveal.is-visible {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
