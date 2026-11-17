
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const bestSellerImages = [
  "/images/home/best/bs1.jpeg",
  "/images/home/best/bs2.jpeg",
  "/images/home/best/bs3.jpeg",
  "/images/home/best/bs4.jpeg",
  "/images/home/best/bs5.jpeg",
  "/images/home/best/bs6.jpeg",
];

const totalSlides = 4;

export default function BestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const textRef = useRef(null);

  // TEXT ANIMATION ON SCROLL
  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setTextVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // NEXT
  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  // PREVIOUS
  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  // IMAGE POSITION
  const getPosition = (index) => {
    if (index === activeIndex) return "left";

    if (index === activeIndex + 1) return "center";

    if (index === activeIndex + 2) return "right";

    return "hidden";
  };

  // LETTER-BY-LETTER TEXT ANIMATION
  const animatedText = (text, delay = 0, className = "") => {
    return (
      <span className={`block ${className}`}>
        {text.split("").map((letter, index) => (
          <span
            key={`${text}-${index}`}
            className="inline-block transition-all duration-500 ease-out"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible
                ? "translateY(0)"
                : "translateY(22px)",
              transitionDelay: textVisible
                ? `${delay + index * 0.045}s`
                : "0s",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F6F3EE]
        py-16
        md:py-20
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="
          mx-auto
          max-w-[1450px]
          px-6
          md:px-10
          lg:px-14
        "
      >
        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            items-center
            lg:grid-cols-[36%_64%]
          "
        >
          {/* LEFT CONTENT */}
          <div
            ref={textRef}
            className="relative z-30"
          >
            {/* TOP LABEL */}
            <div
              className="
                mb-4
                flex
                items-center
                gap-3
                transition-all
                duration-700
              "
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible
                  ? "translateY(0)"
                  : "translateY(18px)",
                transitionDelay: textVisible ? "0.1s" : "0s",
              }}
            >
              <span className="h-px w-8 bg-[#A88955]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.32em]
                  text-[#756B62]
                "
              >
                Custom Furniture
              </span>
            </div>

            {/* MAIN HEADING */}
            <h2
              className="
                font-serif
                text-[44px]
                leading-[0.95]
                tracking-[-0.03em]
                text-[#29231F]
                sm:text-[52px]
                md:text-[58px]
                lg:text-[64px]
              "
            >
              {animatedText("Best Custom", 0.3)}

              {animatedText(
                "Design for",
                1.05,
                "text-[#8B5A2B]"
              )}

              {animatedText("Your Room", 1.8)}
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-5
                max-w-[350px]
                text-[14px]
                leading-6
                font-medium
                text-[#4A3528]
                transition-all
                duration-700
              "
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: textVisible ? "2.7s" : "0s",
              }}
            >
              Thoughtfully designed furniture made to bring
              your space together with comfort and style.
            </p>

            {/* SHOP NOW */}
            <div
              className="
                mt-7
                transition-all
                duration-700
              "
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                transitionDelay: textVisible ? "3s" : "0s",
              }}
            >
              <Link
                href="/furniture"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-black
                  px-7
                  py-3
                  text-[13px]
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#29231F]
                  hover:gap-4
                  hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                "
              >
                Shop Now

                <span
                  className="
                    text-base
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div
            className="
              relative
              mt-12
              h-[390px]
              w-full
              sm:h-[410px]
              md:h-[430px]
              lg:mt-0
              lg:h-[430px]
              xl:h-[450px]
            "
          >
            {/* IMAGE STAGE */}
            <div className="absolute inset-0">
              {bestSellerImages.map((image, index) => {
                const position = getPosition(index);

                return (
                  <div
                    key={image}
                    className={`
                      absolute
                      left-1/2
                      top-1/2
                      h-[250px]
                      w-[250px]
                      sm:h-[270px]
                      sm:w-[270px]
                      md:h-[290px]
                      md:w-[290px]
                      lg:h-[300px]
                      lg:w-[300px]
                      xl:h-[320px]
                      xl:w-[320px]
                      overflow-hidden
                      rounded-[20px]
                      shadow-[0_18px_45px_rgba(70,45,30,0.16)]
                      transition-all
                      duration-[1000ms]
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      ${
                        position === "left"
                          ? `
                            z-10
                            -translate-x-[82%]
                            -translate-y-1/2
                            rotate-[7deg]
                            scale-[0.88]
                            opacity-100
                          `
                          : position === "center"
                          ? `
                            z-30
                            -translate-x-1/2
                            -translate-y-1/2
                            rotate-0
                            scale-100
                            opacity-100
                          `
                          : position === "right"
                          ? `
                            z-20
                            translate-x-[12%]
                            -translate-y-1/2
                            rotate-[7deg]
                            scale-[0.88]
                            opacity-100
                          `
                          : `
                            z-0
                            translate-x-[150%]
                            -translate-y-1/2
                            rotate-[12deg]
                            scale-[0.75]
                            opacity-0
                            pointer-events-none
                          `
                      }
                    `}
                  >
                    {/* IMAGE */}
                    <Image
                      src={image}
                      alt={`Neolen Custom Furniture ${index + 1}`}
                      fill
                      sizes="320px"
                      className="
                        object-cover
                        transition-transform
                        duration-[1400ms]
                        ease-out
                        hover:scale-[1.05]
                      "
                    />

                    {/* SOFT IMAGE OVERLAY */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/10
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* IMAGE BORDER */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-[20px]
                        ring-1
                        ring-white/40
                      "
                    />
                  </div>
                );
              })}
            </div>

            {/* SLIDER CONTROLS */}
            <div
              className="
                absolute
                bottom-0
                left-1/2
                z-40
                flex
                -translate-x-1/2
                items-center
                gap-3
              "
            >
              {/* PREVIOUS */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E8DED2]
                  text-[#6E5847]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-[#D8C8B7]
                "
              >
                ←
              </button>

              {/* NUMBER BUTTONS */}
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      text-[10px]
                      font-medium
                      transition-all
                      duration-300
                      ${
                        activeIndex === index
                          ? `
                            scale-110
                            bg-[#6E3F22]
                            text-white
                            shadow-[0_5px_15px_rgba(80,45,25,0.2)]
                          `
                          : `
                            bg-[#E8DED2]
                            text-[#756B62]
                            hover:bg-[#D8C8B7]
                          `
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* NEXT */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E8DED2]
                  text-[#6E5847]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-[#D8C8B7]
                "
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
