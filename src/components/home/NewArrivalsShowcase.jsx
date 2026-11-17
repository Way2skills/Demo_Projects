
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const galleryItems = [
  {
    image: "/images/home/categories/n1.jpeg",
    title: "Designed for Comfort",
    description:
      "Discover beautifully crafted chairs that bring comfort and elegance to your living space. Explore stylish designs that complement your interiors. Enjoy exceptional support and comfort every day. Add a timeless touch to your home.",
  },
  {
    image: "/images/home/categories/n2.jpeg",
    title: "Luxury for Every Home",
    description:
      "Explore thoughtfully designed furniture that transforms your home into a beautiful space. Discover elegant styles made for modern living. Enjoy the perfect blend of comfort and functionality. Create a home that reflects your personal style.",
  },
  {
    image: "/images/home/categories/n3.jpeg",
    title: "Relax in Style",
    titleLines: ["Relax in", "Style"],
    description:
      "Experience exceptional comfort with sofas designed for modern living. Choose from elegant styles that complement your interiors. Enjoy supportive seating made for everyday relaxation. Bring timeless beauty into your home.",
  },
  {
    image: "/images/home/categories/n4.jpeg",
    title: "Details That Matter",
    description:
      "Bring functionality and timeless style together with our elegant tables. Discover designs that complement every room. Enjoy practical surfaces for your everyday needs. Add a refined finishing touch to your home.",
  },
  {
    image: "/images/home/categories/n13.jpeg",
    title: "Rest in Elegance",
    titleLines: ["Rest in", "Elegance"],
    description:
      "Create a peaceful bedroom with furniture made for comfort and relaxation. Discover beautiful designs for restful spaces. Enjoy thoughtful details and lasting quality. Make every night feel more relaxing.",
  },
  {
    image: "/images/home/categories/n7.jpeg",
    title: "Organised Beautifully",
    description:
      "Discover stylish storage solutions that make everyday living effortless. Keep your essentials neatly organised. Choose designs that blend beauty with functionality. Create a clutter-free and elegant home.",
  },
  {
    image: "/images/home/categories/n12.jpeg",
    title: "A Beautiful Focal Point",
    description:
      "Give your living room a refined look with our contemporary TV units. Explore elegant designs for modern homes. Keep your entertainment space beautifully organised. Create a stylish focal point in your living room.",
  },
  {
    image: "/images/home/categories/n11.jpeg",
    title: "Style Within Reach",
    description:
      "Add a sophisticated touch to your living room with elegant coffee tables. Discover designs that bring style and practicality together. Find the perfect addition to your seating area. Make your living space feel complete.",
  },
  {
    image: "/images/home/categories/n10.jpeg",
    title: "Small Details, Big Impact",
    description:
      "Complete your space with versatile side tables crafted for modern homes. Keep everyday essentials close at hand. Choose elegant designs that suit your interiors. Add functionality and charm to every corner.",
  },
];

const totalItems = galleryItems.length;

// WORD-BY-WORD ANIMATION
function AnimatedWords({ text, lines, active }) {
  const titleLines = lines || [text];

  return (
    <>
      {titleLines.map((line, lineIndex) => (
        <span key={`${active}-line-${lineIndex}`} className="block">
          {line.split(" ").map((word, index) => (
            <span
              key={`${active}-${lineIndex}-${index}`}
              className="inline-block animate-word mr-[0.22em]"
              style={{
                animationDelay: `${(lineIndex * 2 + index) * 120}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function NewArrivalsShowcase() {
  const [active, setActive] = useState(0);

  // AUTOMATIC IMAGE AND TEXT CHANGE EVERY 2 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % totalItems);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // PREVIOUS SLIDE
  const prevSlide = () => {
    setActive((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // NEXT SLIDE
  const nextSlide = () => {
    setActive((prev) => (prev + 1) % totalItems);
  };

  const currentItem = galleryItems[active];

  return (
    <section className="relative bg-white px-4 py-12 md:px-7 lg:px-12">
      <div className="mx-auto max-w-[1500px]">

        {/* BLACK BANNER */}
        <div className="overflow-hidden rounded-[22px] bg-[#111111] text-white md:rounded-[26px]">

          <div className="grid items-center lg:min-h-[500px] lg:grid-cols-[0.82fr_1.18fr]">

            {/* LEFT CONTENT */}
            <div className="relative z-20 px-7 pb-8 pt-10 md:px-10 lg:py-12 lg:pl-12 xl:pl-14">

              {/* LABEL */}
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-semibold tracking-[0.3em] text-[#D5C4A5]">
                  Neolen Furniture
                </span>

                <span className="h-px w-14 bg-[#A88955]" />
              </div>

              {/* ANIMATED HEADING */}
              <h2
                key={`heading-${active}`}
                className="mt-6 min-h-[2.3em] max-w-[430px] font-serif text-[36px] font-normal leading-[1.15] tracking-[-0.035em] text-[#F6F3EE] md:text-[48px] xl:text-[54px]"
              >
                <AnimatedWords
                  text={currentItem.title}
                  lines={currentItem.titleLines}
                  active={active}
                />
              </h2>

              {/* ANIMATED DESCRIPTION */}
              <p
                key={`description-${active}`}
                className="animate-text-reveal mt-5 min-h-[112px] max-w-[380px] text-sm leading-7 text-white/65 md:text-[15px]"
              >
                {currentItem.description}
              </p>

              {/* BUTTON */}
              <Link
                href="/furniture"
                className="mt-7 inline-flex items-center gap-5 rounded-full bg-[#F6F3EE] px-7 py-4 text-xs font-semibold text-[#29231F] transition-all duration-300 hover:bg-[#C5A582] hover:text-white"
              >
                Explore Collection
                <span className="text-base">→</span>
              </Link>

              {/* CONTROLS */}
              <div className="mt-9 flex items-center gap-4">

                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous item"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl transition-all hover:border-[#C5A582] hover:bg-[#C5A582]"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next item"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5A582] text-xl transition-all hover:bg-[#B89570]"
                >
                  →
                </button>

                {/* COUNTER */}
                <div className="ml-2 flex items-center gap-3">
                  <span className="whitespace-nowrap text-xs tracking-wider">
                    {String(active + 1).padStart(2, "0")}
                    <span className="mx-1 text-white/40">/</span>
                    {String(totalItems).padStart(2, "0")}
                  </span>

                  <div className="h-[2px] w-16 bg-white/20">
                    <div
                      className="h-full bg-[#C5A582] transition-all duration-500"
                      style={{
                        width: `${((active + 1) / totalItems) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SINGLE IMAGE */}
            <div className="relative h-[320px] w-full p-4 md:h-[420px] lg:h-[500px] lg:p-5">

              <div className="relative h-full w-full overflow-hidden rounded-[16px] md:rounded-[20px]">

                {galleryItems.map((item, index) => (
                  <div
                    key={item.image}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      active === index
                        ? "z-10 scale-100 opacity-100"
                        : "z-0 scale-105 opacity-0"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
