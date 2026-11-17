
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// LETTER BY LETTER TEXT ANIMATION
function AnimatedText({ text, visible, delay = 0, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={`inline-block transition-all duration-500 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: visible
              ? `${delay + index * 35}ms`
              : "0ms",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

const features = [
  {
    title: "Expert Craftsmanship",
    description: "Precision work from seasoned craftsmen",
    icon: (
      <>
        <path d="m14.5 6.5 3-3a4 4 0 0 1 0 5.7l-3 3" />
        <path d="m12 9 3 3-9.5 9.5a2.1 2.1 0 0 1-3-3L12 9Z" />
        <path d="m8 13 3 3" />
      </>
    ),
  },
  {
    title: "Attention to Detail",
    description: "Every joint and finish meticulously examined",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="m16 16 5 5" />
        <path d="M8 10.5h5" />
      </>
    ),
  },
  {
    title: "Quality Finishes",
    description: "Durable protective coatings for lasting beauty",
    icon: (
      <>
        <path d="m3 21 2.5-7L17 2.5 21.5 7 10 18.5 3 21Z" />
        <path d="m14 5 5 5" />
        <path d="m5.5 14 4.5 4.5" />
      </>
    ),
  },
  {
    title: "Made for Modern Homes",
    description: "Designed to complement contemporary living spaces",
    icon: (
      <>
        <path d="m2 11 10-8 10 8" />
        <path d="M5 10v11h14V10" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
  },
];

export default function ArtOfMakingSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // REPLAY ANIMATION ON BOTH UP AND DOWN SCROLL
  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white px-5 py-16 text-[#29231F] sm:px-8 md:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1450px]">

        {/* CENTER HEADING */}
        <div className="mb-10 text-center md:mb-12">

          <h2 className="font-serif text-[34px] font-medium leading-tight tracking-[0.02em] sm:text-[42px] md:text-[48px]">
            <AnimatedText
              text="The Art of Making"
              visible={visible}
              delay={100}
            />
          </h2>

          <p className="mt-2 font-serif text-[15px] tracking-[0.12em] text-[#756B62] sm:text-lg">
            <AnimatedText
              text="Built with Care"
              visible={visible}
              delay={750}
            />
            {" • "}
            <AnimatedText
              text="Made to Last"
              visible={visible}
              delay={1200}
            />
          </p>

          {/* CENTER LINE */}
          <div
            className={`mx-auto mt-5 h-px bg-[#B89570] transition-all duration-1000 ${
              visible ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? "1500ms" : "0ms",
            }}
          />
        </div>

        {/* IMAGE + FEATURES */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT IMAGE */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              visible
                ? "translate-x-0 scale-100 opacity-100"
                : "-translate-x-12 scale-[0.97] opacity-0"
            }`}
            style={{
              transitionDelay: visible ? "200ms" : "0ms",
            }}
          >
            <div className="relative aspect-[1.38/1] w-full overflow-hidden bg-[#F2F0ED]">

              <Image
                src="/images/about/c3.jpeg"
                alt="Artisan carefully crafting premium wooden furniture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-transform duration-1000 ease-out ${
                  visible ? "scale-100" : "scale-110"
                }`}
              />

            </div>

            {/* EXPERIENCE BADGE */}
            <div
              className={`absolute bottom-5 left-5 flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full border border-[#B89570] bg-white/95 text-center shadow-lg transition-all duration-700 sm:bottom-7 sm:left-7 sm:h-[130px] sm:w-[130px] ${
                visible
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? "900ms" : "0ms",
              }}
            >
              <span className="font-serif text-3xl font-semibold text-[#29231F] sm:text-4xl">
                01+
              </span>

              <span className="text-sm font-semibold text-[#29231F]">
                Years
              </span>

              <span className="mt-1 text-[10px] text-[#756B62]">
                Of Craftsmanship
              </span>
            </div>
          </div>

          {/* RIGHT FEATURES */}
          <div className="flex flex-col justify-center gap-8 py-2 sm:gap-10">

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex items-center gap-5 transition-all duration-700 ease-out ${
                  visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
                style={{
                  transitionDelay: visible
                    ? `${500 + index * 350}ms`
                    : "0ms",
                }}
              >

                {/* ICON */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center text-[#29231F] transition-all duration-700 sm:h-16 sm:w-16 ${
                    visible
                      ? "scale-100 rotate-0"
                      : "scale-75 -rotate-12"
                  }`}
                  style={{
                    transitionDelay: visible
                      ? `${500 + index * 350}ms`
                      : "0ms",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-11 w-11 sm:h-12 sm:w-12"
                  >
                    {feature.icon}
                  </svg>
                </div>

                {/* ANIMATED TEXT */}
                <div className="min-w-0">

                  <h3 className="text-lg font-medium tracking-tight text-[#171717] sm:text-xl md:text-[22px]">
                    <AnimatedText
                      text={feature.title}
                      visible={visible}
                      delay={600 + index * 350}
                    />
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#625D58] sm:text-[15px]">
                    <AnimatedText
                      text={feature.description}
                      visible={visible}
                      delay={950 + index * 350}
                    />
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
