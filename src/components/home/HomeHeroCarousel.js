"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Button from "@/components/common/Button";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionPreference() {
  return false;
}

const slides = [
  {
    id: "art-of-time",
    imageSrc: "/images/hero/hero-watch.png",
    imageAlt: "A gold watch displayed against warm champagne fabric",
    imageClassName:
      "object-cover brightness-[1.12] object-[68%_center] sm:object-[64%_center] lg:object-center",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(48,34,25,0.88)_0%,rgba(48,34,25,0.74)_33%,rgba(48,34,25,0.38)_49%,transparent_66%)]",
    eyebrow: "TIMELESS ELEGANCE",
    title: (
      <>
        More Than a Watch,
        <span className="mt-2 block">A Statement.</span>
      </>
    ),
    description:
      "Explore distinctive timepieces from Indian and international watchmakers, selected for design, character and craftsmanship.",
    actions: [
      { label: "Explore Collection", href: "/watches", variant: "primary" },
      {
        label: "Discover Watchmakers",
        href: "/brands",
        variant: "outline",
      },
    ],
  },
  {
    id: "human-connection",
    imageSrc: "/images/hero/hero-people.png",
    imageAlt: "Two people wearing watches",
    imageSizes: "100vw",
    imageClassName:
      "object-cover object-[72%_center] md:object-[76%_30%]",
    overlayClassName:
      "bg-[linear-gradient(180deg,rgba(48,34,25,0.92)_0%,rgba(48,34,25,0.84)_48%,rgba(48,34,25,0.64)_70%,rgba(48,34,25,0.3)_100%)] md:bg-[linear-gradient(90deg,rgba(48,34,25,0.96)_0%,rgba(48,34,25,0.88)_20%,rgba(48,34,25,0.62)_31%,rgba(48,34,25,0.16)_41%,transparent_52%)]",
    contentFrameClassName: "items-start pt-12 md:items-center md:pt-0",
    contentClassName: "md:w-[33%] md:max-w-[33%]",
    titleClassName: "md:text-5xl lg:text-6xl",
    eyebrow: "TIMELESS CONNECTION",
    title: "Every Moment Deserves Elegance.",
    description:
      "Discover timepieces that reflect your personality, style and timeless taste.",
    actions: [
      { label: "Explore Collection", href: "/watches", variant: "primary" },
    ],
  },
  {
    id: "world-of-watchmaking",
    imageSrc: "/images/hero/hero-brands.png",
    imageAlt: "A refined collection of watches displayed in a showroom",
    imageClassName: "object-cover object-center",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(35,24,17,0.78)_0%,rgba(35,24,17,0.58)_26%,rgba(35,24,17,0.28)_41%,transparent_58%)]",
    eyebrow: "THE WORLD OF WATCHMAKING",
    title: "Discover Exceptional Watchmakers.",
    description:
      "Explore distinctive creations from India's finest and the world's most celebrated watch brands.",
    actions: [
      {
        label: "Discover Watchmakers",
        href: "/brands",
        variant: "primary",
      },
    ],
  },
];

export default function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const touchStartX = useRef(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const isPaused = isHovered || isFocusWithin;

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return undefined;

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, autoplayResetKey, isPaused, prefersReducedMotion]);

  const selectSlide = (index) => {
    setActiveIndex(index);
    setAutoplayResetKey((currentKey) => currentKey + 1);
  };

  const moveSlide = (direction) => {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + direction + slides.length) % slides.length,
    );
    setAutoplayResetKey((currentKey) => currentKey + 1);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) > 48) {
      moveSlide(distance < 0 ? 1 : -1);
    }
  };

  return (
    <ScrollRevealSection
      aria-label="Homepage hero carousel"
      aria-roledescription="carousel"
      className="home-scroll-reveal relative isolate min-h-[720px] touch-pan-y overflow-hidden border-b border-[#EBD5BD] bg-[#F8EBDD] text-[#302219] sm:min-h-[680px] lg:min-h-[min(760px,90vh)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocusWithin(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStartX.current = null;
      }}
    >
      <div id="home-hero-slides" className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const textRevealClass = isActive
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0";

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-[#F1ECE6] ${
                  slide.imageFrameClassName ?? ""
                }`}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  priority={index < 2}
                  sizes={slide.imageSizes ?? "100vw"}
                  className={`transition-transform duration-[7000ms] ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                    slide.imageClassName
                  } ${isActive ? "scale-[1.045]" : "scale-100"}`}
                />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                  slide.overlayClassName
                }`}
                aria-hidden="true"
              />

              <div
                className={`relative z-10 mx-auto flex h-full max-w-[1600px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${
                  slide.contentFrameClassName ?? "items-center"
                }`}
              >
                <div
                  className={`scroll-reveal-heading w-full max-w-xl py-8 text-left ${
                    slide.contentClassName ?? ""
                  }`}
                >
                  <p
                    className={`mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#EBD5BD] drop-shadow-[0_1px_3px_rgba(20,12,8,0.28)] transition-all delay-100 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:mb-7 ${textRevealClass}`}
                  >
                    {slide.eyebrow}
                  </p>

                  <h1
                    className={`font-serif text-4xl font-medium leading-[1.12] tracking-tight text-[#FBF7F0] drop-shadow-[0_1px_3px_rgba(20,12,8,0.28)] transition-all delay-200 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:text-5xl ${
                      slide.titleClassName ?? "md:text-6xl"
                    } ${textRevealClass}`}
                  >
                    {slide.title}
                  </h1>

                  <div
                    className={`my-6 h-px w-14 bg-[#A77B52]/70 transition-all delay-300 duration-700 ease-out motion-reduce:transition-none sm:my-8 ${textRevealClass}`}
                    aria-hidden="true"
                  />

                  <p
                    className={`max-w-lg text-base font-medium leading-relaxed text-[#F3E6D6] drop-shadow-[0_1px_3px_rgba(20,12,8,0.28)] transition-all delay-[400ms] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:text-lg ${textRevealClass}`}
                  >
                    {slide.description}
                  </p>

                  <div
                    className={`mt-8 flex flex-col items-start gap-3 transition-all delay-500 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:flex-row sm:gap-4 ${textRevealClass}`}
                  >
                    {slide.actions.map((action) => (
                      <Button
                        key={action.label}
                        href={action.href}
                        variant={action.variant}
                        size="lg"
                        className={`w-full sm:w-auto ${
                          action.variant === "outline"
                            ? "!border-[#EBD5BD] !bg-[#302219]/25 !text-[#FBF7F0] hover:!bg-[#302219]/50"
                            : ""
                        }`}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous hero slide"
        aria-controls="home-hero-slides"
        onClick={() => moveSlide(-1)}
        className="absolute left-4 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EBD5BD]/70 bg-[#302219]/35 text-[#FBF7F0] backdrop-blur-sm transition-colors hover:bg-[#302219]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBD5BD] motion-reduce:transition-none sm:left-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next hero slide"
        aria-controls="home-hero-slides"
        onClick={() => moveSlide(1)}
        className="absolute right-4 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EBD5BD]/70 bg-[#302219]/35 text-[#FBF7F0] backdrop-blur-sm transition-colors hover:bg-[#302219]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EBD5BD] motion-reduce:transition-none sm:right-6 sm:top-6 sm:h-12 sm:w-12"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <nav
        aria-label="Choose a hero slide"
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
              aria-pressed={isActive}
              onClick={() => selectSlide(index)}
              className={`h-2.5 rounded-full border border-[#FBF7F0]/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBF7F0] motion-reduce:transition-none ${
                isActive
                  ? "w-8 bg-[#A77B52]"
                  : "w-2.5 bg-[#FBF7F0]/45 hover:bg-[#FBF7F0]/80"
              }`}
            />
          );
        })}
      </nav>
    </ScrollRevealSection>
  );
}
