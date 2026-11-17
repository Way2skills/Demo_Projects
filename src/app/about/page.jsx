"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Thoughtful Design",
    description:
      "Furniture that brings together simplicity, purpose and visual elegance.",
  },
  {
    number: "02",
    title: "Everyday Comfort",
    description:
      "Spaces designed to make everyday moments feel more relaxed and enjoyable.",
  },
  {
    number: "03",
    title: "Timeless Style",
    description:
      "A considered approach to design that feels beautiful beyond changing trends.",
  },
];

const philosophyPoints = [
  {
    number: "01",
    title: "Thoughtful Design",
    description:
      "Every piece is carefully considered to bring balance, purpose and beauty into your space.",
  },
  {
    number: "02",
    title: "Everyday Comfort",
    description:
      "Furniture designed around the way you live, making everyday moments more comfortable.",
  },
  {
    number: "03",
    title: "Timeless Character",
    description:
      "Warm materials, elegant forms and thoughtful details that feel beautiful beyond trends.",
  },
  {
    number: "04",
    title: "Purposeful Living",
    description:
      "Versatile designs that make every corner of your home feel meaningful and personal.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    const elements = document.querySelectorAll(".about-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-visible");
          } else {
            entry.target.classList.remove("about-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-page overflow-hidden bg-[#F8F6F2] text-[#29231F]">
      {/* HERO SECTION */}
      <section className="about-hero relative flex min-h-[560px] items-center overflow-hidden sm:min-h-[610px] md:min-h-[650px]">
        <Image
          src="/images/about/hero.jpeg"
          alt="Neolen luxury furniture interior"
          fill
          priority
          sizes="100vw"
          className="about-hero-image object-cover"
        />

        <div className="about-hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-16 md:px-14 md:py-20 lg:px-24">
          <div className="max-w-[760px]">
            <div className="about-hero-kicker flex items-center gap-4">
              <span className="h-px w-12 bg-[#E0C49C]" />
              <p className="text-[11px] font-medium tracking-[5px] text-[#F1D7AF] md:text-xs">
                ABOUT NEOLEN
              </p>
            </div>

            <h1 className="about-hero-title mt-6 text-[46px] font-light leading-[1.08] tracking-[-2px] text-[#FFFDF8] sm:text-6xl md:text-7xl lg:text-[88px]">
              Designed for
              <br />
              the way you
              <br />
              <span className="about-gold-text font-normal italic">
                live.
              </span>
            </h1>

            <p className="about-hero-description mt-6 max-w-[520px] text-[14px] leading-7 text-[#F5EDE3] sm:text-[15px] md:mt-7 md:text-lg md:leading-8">
              Thoughtfully designed furniture, beautiful details and spaces
              <br />
              that make every moment at home feel special.
            </p>

            <div className="about-hero-button mt-7 md:mt-8">
              <Link
                href="/furniture"
                className="group inline-flex min-h-[52px] items-center justify-center gap-8 border border-[#D8BD98] bg-[#493326]/80 px-8 py-4 text-[11px] font-medium tracking-[3px] text-white transition-all duration-500 hover:border-[#F0D9B6] hover:bg-[#E7D1B2] hover:text-[#29231F]"
              >
                EXPLORE FURNITURE
                <span className="text-lg transition-transform duration-500 group-hover:translate-x-2">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-8 z-10 hidden items-center gap-4 md:flex">
          <span className="h-px w-12 bg-[#D5B78D]" />
          <p className="text-[10px] font-medium tracking-[3px] text-white/90">
            A BETTER WAY TO LIVE
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="overflow-hidden px-5 py-12 sm:px-8 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1380px] items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="about-reveal relative z-10 mx-auto max-w-[560px] lg:mx-0">
            <p className="mb-5 text-[11px] font-medium tracking-[4px] text-[#A17D50]">
              THE NEOLEN STORY
            </p>

            <h2 className="text-[clamp(38px,5vw,64px)] font-light leading-[1.12] tracking-[-1.8px] text-[#30251E]">
              Creating spaces
              <br />
              that feel like
              <br />
              <span className="font-normal italic text-[#9B754A]">
                home.
              </span>
            </h2>

            <div className="my-6 h-px w-16 bg-[#B18B58]" />

            <p className="max-w-[510px] text-[15px] leading-8 text-[#766D64] md:text-base md:leading-9">
              Neolen was imagined around a simple idea: furniture
              should bring beauty, comfort, and purpose into everyday
              life. We bring together thoughtful designs, versatile
              furniture, and timeless aesthetics to help you create
              spaces that reflect your personal style.
            </p>

            <p className="mt-4 max-w-[510px] text-[15px] leading-8 text-[#766D64] md:text-base md:leading-9">
              From welcoming living rooms to peaceful bedrooms
              and inspiring workspaces, every space deserves
              thoughtful details and a personality of its own.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-9 bg-[#B18B58]" />
              <span className="text-[10px] font-semibold tracking-[2.5px] text-[#9B754A]">
                THOUGHTFULLY DESIGNED · BEAUTIFULLY LIVED
              </span>
            </div>
          </div>

          {/* STORY IMAGES */}
          <div className="about-reveal about-story-visual relative mx-auto aspect-[1.12/1] w-full max-w-[650px]">
            <div className="about-story-main-image absolute right-[3%] top-[5%] h-[78%] w-[78%] overflow-hidden rounded-[28px] bg-[#EAE3D9] shadow-[0_18px_50px_rgba(50,38,28,0.12)]">
              <Image
                src="/images/about/our-story.jpeg"
                alt="Neolen thoughtfully designed living space"
                fill
                sizes="(max-width: 768px) 85vw, 500px"
                className="about-story-main-photo object-cover"
              />
            </div>

            <div className="about-story-small-image absolute bottom-[3%] left-[3%] z-10 h-[43%] w-[43%] overflow-hidden rounded-[20px] border-[7px] border-[#F8F6F2] bg-[#EAE3D9] shadow-[0_15px_40px_rgba(50,38,28,0.14)]">
              <Image
                src="/images/home/categories/beds.jpeg"
                alt="Beautiful bedroom furniture"
                fill
                sizes="(max-width: 768px) 45vw, 280px"
                className="object-cover"
              />
            </div>

            <div className="about-story-label absolute left-0 top-[12%] z-20 flex items-center gap-2 rounded-full border border-[#E9E0D5] bg-[#FFFEFC] px-5 py-3 shadow-[0_8px_25px_rgba(50,38,28,0.09)]">
              <span className="h-2 w-2 rounded-full bg-[#A17D50]" />
              <span className="text-[10px] font-medium tracking-[1px] text-[#493326] sm:text-[11px]">
                Thoughtfully made for living
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN PHILOSOPHY */}
      <section className="bg-[#F8F6F2] px-6 py-12 text-[#29231F] md:px-12 md:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1380px] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT SIDE - IMAGE */}
          <div className="about-reveal philosophy-image-frame relative aspect-[4/4.2] w-full overflow-hidden md:aspect-[5/4] lg:aspect-[4/4.3]">
            <Image
              src="/images/about/design-philosophy.jpeg"
              alt="Neolen furniture design philosophy and interior"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="philosophy-image object-cover"
            />

            <div className="absolute inset-0 bg-[#241A14]/10" />

            <div className="philosophy-image-caption absolute bottom-6 left-6 z-10 sm:bottom-8 sm:left-8">
              <span className="text-[9px] font-medium tracking-[3px] text-white/90 sm:text-[10px]">
                NEOLEN · DESIGN WITH PURPOSE
              </span>
            </div>
          </div>

          {/* RIGHT SIDE - FOUR POINTS ONLY */}
          <div className="about-reveal philosophy-content">
            <div className="philosophy-points-list flex flex-col">
              {philosophyPoints.map((item, index) => (
                <div
                  key={item.number}
                  className="philosophy-point group flex gap-5 border-b border-[#DDD5CC] py-5 first:pt-0 last:border-b-0 sm:gap-7 sm:py-6"
                  style={{ "--point-index": index }}
                >
                  <span className="pt-1 text-[10px] font-medium tracking-[2px] text-[#A17D50] sm:text-xs">
                    {item.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="text-[20px] font-light text-[#30251E] transition-colors duration-500 group-hover:text-[#9B754A] sm:text-[24px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[440px] text-[13px] leading-7 text-[#766D64] sm:text-[14px] sm:leading-8">
                      {item.description}
                    </p>
                  </div>

                  <span className="philosophy-arrow mt-1 text-lg text-[#A17D50]">
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1320px] items-start gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12 lg:gap-16">
          {/* LEFT SIDE - TEXT */}
          <div className="about-reveal order-2 pt-0 md:order-1">
            <p className="mb-5 text-[11px] font-medium tracking-[4px] text-[#A17D50]">
              THE ART OF DETAIL
            </p>

            <h2 className="text-4xl font-light leading-[1.2] tracking-[-1px] text-[#30251E] md:text-5xl lg:text-[62px]">
              Beauty lives
              <br />
              in the
              <span className="font-normal italic text-[#9B754A]">
                {" "}details.
              </span>
            </h2>

            <div className="my-6 h-px w-16 bg-[#B18B58]" />

            <p className="max-w-[560px] text-[15px] leading-8 text-[#766D64] md:text-base md:leading-9">
              The character of a furniture piece is often found in the details —
              the texture of a material, the balance of its form and the way it
              comes together with the rest of a room.
            </p>

            <p className="mt-4 max-w-[560px] text-[15px] leading-8 text-[#766D64] md:text-base md:leading-9">
              We celebrate the details that make a space feel considered,
              comfortable and uniquely yours.
            </p>

            {/* CRAFTED WITH CARE - NORMAL PARAGRAPH */}
            <p className="mt-4 max-w-[560px] text-[15px] leading-8 text-[#766D64] md:text-base md:leading-9">
              Every finish, texture and detail is thoughtfully chosen to bring
              lasting beauty and character to your home.
            </p>
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="about-reveal about-image-frame relative order-1 aspect-[5/4.5] w-full overflow-hidden md:order-2 md:aspect-[4/4.2]">
            <Image
              src="/images/about/craftsmanship.jpeg"
              alt="Furniture craftsmanship and wood details"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="about-section-image object-cover"
            />
          </div>
        </div>
      </section>

      {/* DETAIL IMAGE */}
      <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden md:min-h-[440px]">
        <Image
          src="/images/about/detail.jpeg"
          alt="Beautiful furniture material details"
          fill
          sizes="100vw"
          className="about-detail-image object-cover"
        />

        <div className="absolute inset-0 bg-[#241A14]/55" />

        <div className="about-reveal relative z-10 mx-auto max-w-[800px] px-6 text-center">
          <p className="mb-5 text-[11px] font-medium tracking-[5px] text-[#F1D7AF]">
            MADE FOR YOUR MOMENTS
          </p>

          <h2 className="text-4xl font-light leading-tight tracking-[-1px] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Your space.
            <br />
            <span className="font-normal italic text-[#E6CBA6]">
              Your story.
            </span>
          </h2>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="about-reveal mb-9 text-center">
            <p className="mb-4 text-[11px] font-medium tracking-[4px] text-[#A17D50]">
              WHAT MATTERS TO US
            </p>

            <h2 className="text-4xl font-light tracking-[-1px] text-[#30251E] md:text-6xl">
              The Neolen
              <span className="font-normal italic text-[#9B754A]">
                {" "}way.
              </span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((item, index) => (
              <div
                key={item.number}
                className="about-reveal about-value-card group border border-[#E0D8CE] bg-[#F1ECE5] p-7 md:p-9"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <p className="mb-8 text-xs font-medium tracking-[3px] text-[#A17D50]">
                  {item.number}
                </p>

                <h3 className="text-2xl font-light text-[#30251E] md:text-3xl">
                  {item.title}
                </h3>

                <div className="my-5 h-px w-12 bg-[#B18B58] transition-all duration-500 group-hover:w-20" />

                <p className="text-[15px] leading-7 text-[#766D64] md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMATION STYLES */}
      <style jsx global>{`
        .about-page {
          --about-gold: #D6B78C;
        }

        /* HERO IMAGE */
        .about-hero-image {
          object-position: center 55%;
          animation: aboutHeroImage 2s ease-out both;
        }

        .about-hero-overlay {
          background:
            linear-gradient(
              90deg,
              rgba(25, 18, 14, 0.88) 0%,
              rgba(35, 25, 19, 0.72) 38%,
              rgba(35, 25, 19, 0.30) 72%,
              rgba(35, 25, 19, 0.12) 100%
            ),
            linear-gradient(
              0deg,
              rgba(25, 18, 14, 0.30),
              transparent 60%
            );
        }

        /* HERO TEXT */
        .about-gold-text {
          background: linear-gradient(
            110deg,
            #F3D9AE,
            #D8B47D,
            #FFF0D7
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 5px 28px rgba(0, 0, 0, 0.18);
        }

        .about-hero-kicker,
        .about-hero-title,
        .about-hero-description,
        .about-hero-button {
          opacity: 0;
          animation: aboutHeroText 1s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
        }

        .about-hero-kicker {
          animation-delay: 0.2s;
        }

        .about-hero-title {
          animation-delay: 0.4s;
        }

        .about-hero-description {
          animation-delay: 0.7s;
        }

        .about-hero-button {
          animation-delay: 0.95s;
        }

        /* SCROLL REVEAL */
        .about-reveal {
          opacity: 0;
          transform: translateY(25px);
          transition:
            opacity 0.75s ease,
            transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .about-reveal.about-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* TEXT STAGGER */
        .about-reveal.about-visible > p,
        .about-reveal.about-visible > h2,
        .about-reveal.about-visible > h3,
        .about-reveal.about-visible > a,
        .about-reveal.about-visible > div:not(.about-image-frame) {
          animation: aboutTextReveal 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .about-reveal.about-visible > :nth-child(1) {
          animation-delay: 0.05s;
        }

        .about-reveal.about-visible > :nth-child(2) {
          animation-delay: 0.16s;
        }

        .about-reveal.about-visible > :nth-child(3) {
          animation-delay: 0.27s;
        }

        .about-reveal.about-visible > :nth-child(4) {
          animation-delay: 0.38s;
        }

        .about-reveal.about-visible > :nth-child(5) {
          animation-delay: 0.49s;
        }

        /* CRAFTSMANSHIP IMAGE */
        .about-image-frame {
          background: #E8DED1;
        }

        .about-section-image {
          transform: scale(1.12);
          transition: transform 1.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .about-image-frame.about-visible .about-section-image {
          transform: scale(1);
        }

        .about-detail-image {
          animation: aboutDetailZoom 16s ease-in-out infinite alternate;
        }

        /* STORY MAIN IMAGE */
        .about-story-main-image {
          opacity: 0;
          clip-path: inset(0 0 0 100%);
          transition:
            clip-path 1.3s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 1s ease;
        }

        .about-story-visual.about-visible .about-story-main-image {
          opacity: 1;
          clip-path: inset(0 0 0 0);
        }

        .about-story-main-photo {
          transform: scale(1.12);
          transition: transform 2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .about-story-visual.about-visible .about-story-main-photo {
          transform: scale(1);
        }

        /* SMALL OVERLAPPING IMAGE */
        .about-story-small-image {
          opacity: 0;
          transform: translate(-35px, 25px);
          transition:
            opacity 1s ease 0.5s,
            transform 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s;
        }

        .about-story-visual.about-visible .about-story-small-image {
          opacity: 1;
          transform: translate(0, 0);
          animation: storySmallFloat 5s ease-in-out 1.6s infinite;
        }

        /* FLOATING LABEL */
        .about-story-label {
          opacity: 0;
          transform: translateX(-25px);
          transition:
            opacity 0.8s ease 0.8s,
            transform 0.8s ease 0.8s;
        }

        .about-story-visual.about-visible .about-story-label {
          opacity: 1;
          transform: translateX(0);
        }

        /* DESIGN PHILOSOPHY IMAGE */
        .philosophy-image-frame {
          background: #EAE3D9;
        }

        .philosophy-image {
          transform: scale(1.12);
          clip-path: inset(0 0 0 100%);
          transition:
            transform 1.8s cubic-bezier(0.2, 0.7, 0.2, 1),
            clip-path 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .philosophy-image-frame.about-visible .philosophy-image {
          transform: scale(1);
          clip-path: inset(0 0 0 0);
        }

        .philosophy-image-caption {
          opacity: 0;
          transform: translateY(15px);
          transition:
            opacity 0.8s ease 0.9s,
            transform 0.8s ease 0.9s;
        }

        .philosophy-image-frame.about-visible .philosophy-image-caption {
          opacity: 1;
          transform: translateY(0);
        }

        /* FOUR POINTS - ONE BY ONE ANIMATION */
        .philosophy-points-list {
          width: 100%;
        }

        .philosophy-point {
          opacity: 0;
          transform: translateX(45px);
          transition:
            opacity 0.8s ease,
            transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: calc(0.15s + var(--point-index) * 0.2s);
        }

        .philosophy-content.about-visible .philosophy-point {
          opacity: 1;
          transform: translateX(0);
        }

        .philosophy-arrow {
          opacity: 0;
          transform: translate(-5px, 5px);
          transition:
            opacity 0.4s ease,
            transform 0.4s ease;
        }

        .philosophy-point:hover .philosophy-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* VALUE CARDS */
        .about-value-card {
          transition:
            opacity 0.85s ease,
            transform 0.85s cubic-bezier(0.2, 0.7, 0.2, 1),
            background 0.6s ease,
            border-color 0.6s ease,
            box-shadow 0.6s ease;
        }

        .about-value-card:hover {
          transform: translateY(-8px);
          border-color: #B18B58;
          background: #EBE2D6;
          box-shadow: 0 20px 45px rgba(54, 39, 27, 0.10);
        }

        /* KEYFRAMES */
        @keyframes aboutHeroImage {
          from {
            transform: scale(1.1);
          }

          to {
            transform: scale(1);
          }
        }

        @keyframes aboutHeroText {
          from {
            opacity: 0;
            transform: translateY(35px);
            filter: blur(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes aboutTextReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(3px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes aboutDetailZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.07);
          }
        }

        @keyframes storySmallFloat {
          0%, 100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -9px;
          }
        }

        /* MOBILE */
        @media (max-width: 767px) {
          .about-hero-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(25, 18, 14, 0.88),
                rgba(25, 18, 14, 0.52)
              ),
              linear-gradient(
                0deg,
                rgba(25, 18, 14, 0.32),
                transparent
              );
          }

          .about-hero-image {
            object-position: 58% center;
          }

          .about-hero-title {
            letter-spacing: -1.5px;
          }

          .about-story-visual {
            width: 100%;
          }

          .about-story-main-image {
            border-radius: 20px;
          }

          .about-story-small-image {
            border-width: 5px;
            border-radius: 15px;
          }

          .about-story-label {
            padding: 10px 13px;
          }

          .about-story-label span {
            font-size: 9px;
          }

          .philosophy-image-frame {
            aspect-ratio: 1 / 1.05;
          }

          .philosophy-content {
            padding-top: 0;
          }

          .philosophy-point {
            gap: 15px;
            padding-top: 18px;
            padding-bottom: 18px;
          }

          .philosophy-arrow {
            opacity: 1;
            transform: none;
          }
        }

        /* ACCESSIBILITY */
        @media (prefers-reduced-motion: reduce) {
          .about-hero-image,
          .about-detail-image,
          .about-hero-kicker,
          .about-hero-title,
          .about-hero-description,
          .about-hero-button,
          .about-reveal.about-visible > * {
            animation: none !important;
          }

          .about-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .about-section-image,
          .about-story-main-photo,
          .philosophy-image {
            transform: none;
            transition: none;
            clip-path: none;
          }

          .about-story-main-image,
          .about-story-small-image,
          .about-story-label,
          .philosophy-image-caption,
          .philosophy-point {
            opacity: 1;
            transform: none;
            clip-path: none;
            transition: none;
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}