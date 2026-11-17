"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const smallSpaceStyles = [
  {
    number: "01",
    title: "Minimal Living",
    subtitle: "Simple. Calm. Clutter-free.",
    description:
      "Create an open and peaceful home with minimalist furniture, clean layouts and carefully selected essentials.",
    image: "/images/rooms/small-space-styles/minimal-living.jpeg",
    href: "/furniture/living-room/sofa-beds",
  },
  {
    number: "02",
    title: "Compact Luxury",
    subtitle: "Luxury in every corner.",
    description:
      "Bring elegance into smaller interiors with premium finishes, refined furniture and thoughtful details.",
    image: "/images/rooms/small-space-styles/compact-luxury.jpeg",
    href: "/furniture/bedroom/beds",
  },
  {
    number: "03",
    title: "Natural & Cozy",
    subtitle: "Comfort inspired by nature.",
    description:
      "Design a welcoming space with warm wooden furniture, soft textures and natural colours.",
    image: "/images/rooms/small-space-styles/natural-cozy.jpeg",
    href: "/furniture/seating/accent-chairs",
  },
  {
    number: "04",
    title: "Smart Space Solutions",
    subtitle: "Make every inch count.",
    description:
      "Discover practical interiors with multifunctional furniture, smart storage and space-saving designs.",
    image: "/images/rooms/small-space-styles/smart-space.jpeg",
    href: "/furniture/tables-storage/study-tables",
  },
];

function AnimatedText({
  children,
  visible,
  delay = 0,
  charDelay = 28,
  className = "",
}) {
  const text = String(children);

  return (
    <span className={`inline ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0)"
              : "translateY(18px)",
            transition:
              "opacity 350ms ease, transform 350ms ease",
            transitionDelay: visible
              ? `${delay + index * charDelay}ms`
              : "0ms",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function SmallSpaceStyleCard({
  style,
  index,
  visible,
}) {
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const element = imageRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setImageVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <article className="group flex flex-col rounded-[12px] border border-black/10 bg-white p-2.5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      {/* Image */}
      <div
        ref={imageRef}
        className="relative h-[175px] w-full overflow-hidden rounded-[8px] bg-[#F5F3EF] md:h-[200px]"
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: imageVisible
            ? "translateY(0) scale(1)"
            : "translateY(45px) scale(0.97)",
          transition:
            "opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          transitionDelay: imageVisible
            ? `${index * 180}ms`
            : "0ms",
        }}
      >
        <Image
          src={style.image}
          alt={style.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-2 pb-2 pt-4 text-center">
        <h2 className="text-[16px] font-bold tracking-tight text-black">
          <AnimatedText
            visible={visible}
            delay={index * 120 + 100}
            charDelay={20}
          >
            {style.title}
          </AnimatedText>
        </h2>

        <p className="mt-1 min-h-[30px] text-[11px] leading-[15px] text-black/60">
          <AnimatedText
            visible={visible}
            delay={index * 120 + 250}
            charDelay={12}
          >
            {style.subtitle}
          </AnimatedText>
        </p>

        <p className="mt-2 min-h-[60px] text-[11px] leading-[17px] text-black/60">
          <AnimatedText
            visible={visible}
            delay={index * 140 + 450}
            charDelay={8}
          >
            {style.description}
          </AnimatedText>
        </p>

        <Link
          href={style.href}
          className="mt-4 inline-flex rounded-[6px] bg-black px-6 py-2 text-[10px] font-medium tracking-wide text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#222]"
        >
          SHOP NOW
        </Link>
      </div>
    </article>
  );
}

export default function SmallSpaceLivingPage() {
  const heroRef = useRef(null);
  const collectionRef = useRef(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [collectionVisible, setCollectionVisible] = useState(false);

  /* Hero animation */
  useEffect(() => {
    const element = heroRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* Collection animation */
  useEffect(() => {
    const element = collectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCollectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F3EE]">

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative h-[300px] overflow-hidden sm:h-[340px] lg:h-[390px]"
      >
        <Image
          src="/images/rooms/small-space.jpeg"
          alt="Neolen small space living"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1A120B]/50" />

        {/* Back Button */}
        <div
          className="absolute left-5 top-5 z-10 sm:left-8 sm:top-7 md:left-10"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible
              ? "translateX(0)"
              : "translateX(-25px)",
            transition:
              "opacity 500ms ease, transform 500ms ease",
          }}
        >
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#29231F]"
          >
            <span className="text-[14px]">←</span>
            BACK TO ROOMS
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-5 text-center">
          <div className="w-full max-w-[1400px] text-white">

            {/* Small Heading */}
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.35em] text-white/90 md:text-[10px]">
              <AnimatedText
                visible={heroVisible}
                delay={80}
                charDelay={18}
              >
                Neolen Room Inspirations
              </AnimatedText>
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-[36px] leading-[0.95] tracking-tight sm:text-[48px] md:text-[64px]">
              <AnimatedText
                visible={heroVisible}
                delay={220}
                charDelay={22}
              >
                Small Space Living
              </AnimatedText>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 w-full max-w-none whitespace-nowrap text-[10px] leading-5 text-white/90 sm:text-[12px] md:mt-5 md:text-[13px] md:leading-6">
              <AnimatedText
                visible={heroVisible}
                delay={520}
                charDelay={8}
              >
                Discover beautiful interiors that make small spaces feel comfortable, functional and effortlessly stylish.
              </AnimatedText>
            </p>

          </div>
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section
        ref={collectionRef}
        className="bg-[#FFFBF6] px-4 pb-20 pt-10 md:px-10 md:pb-24 md:pt-14"
      >
        {/* Section Heading */}
        <div className="mb-7 text-center md:mb-9">
          <h2 className="text-[21px] font-medium text-[#1A1A1A] md:text-[26px]">
            <AnimatedText
              visible={collectionVisible}
              delay={100}
              charDelay={20}
            >
              Shop by Collection
            </AnimatedText>
          </h2>
        </div>

        {/* Cards */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2">
          {smallSpaceStyles.map((style, index) => (
            <SmallSpaceStyleCard
              key={style.number}
              style={style}
              index={index}
              visible={collectionVisible}
            />
          ))}
        </div>
      </section>

    </main>
  );
}