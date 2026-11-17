
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const materials = [
  {
    id: "01",
    title: "Premium Wood",
    description: "Strong. Sustainable. Timeless.",
    image: "/images/home/materials/premium-wood.jpeg",
  },
  {
    id: "02",
    title: "Luxury Fabrics",
    description: "Soft. Durable. Elegant.",
    image: "/images/home/materials/luxury-fabrics.jpeg",
  },
  {
    id: "03",
    title: "Sturdy Hardware",
    description: "Reliable. Long-Lasting.",
    image: "/images/home/materials/hardware.jpeg",
  },
  {
    id: "04",
    title: "High-Density Foam",
    description: "Ultimate Comfort.",
    image: "/images/home/materials/foam.jpeg",
  },
];

export default function MaterialCraftsmanshipSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-5 py-16 text-[#29201B] sm:px-8 md:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* SECTION HEADING */}
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-3 flex items-center justify-center gap-5">
            <span className="hidden h-px w-20 bg-[#C6A58A] sm:block" />

            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-[#A98261] sm:text-[11px]">
              Material & Craftsmanship
            </span>

            <span className="hidden h-px w-20 bg-[#C6A58A] sm:block" />
          </div>

          <h2 className="font-serif text-[clamp(25px,3.5vw,42px)] font-medium leading-tight tracking-[-0.025em] text-[#30221B]">
            Premium Materials. Lasting Quality.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-[#655A52] sm:text-[15px] sm:leading-7">
            We carefully choose the finest materials and combine them with
            expert craftsmanship to create furniture that stands the test of
            time.
          </p>
        </div>

        {/* MATERIAL CARDS */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-4 lg:gap-5">

          {materials.map((item, index) => (
            <div
              key={item.id}
              className={`group overflow-hidden bg-white transition-all duration-1000 hover:-translate-y-1 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {/* IMAGE */}
              <div className="relative aspect-[1.55/1] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* CARD CONTENT - WHITE BACKGROUND */}
              <div className="flex min-h-[120px] flex-col items-center justify-center bg-white px-3 py-4 text-center sm:min-h-[125px] sm:py-5">

                {/* MATERIAL ICONS */}
                <div className="mb-2.5 flex h-8 w-8 items-center justify-center text-[#72543E]">

                  {index === 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <path d="M3 17h18M5 14l4-4 4 3 6-6" />
                      <path d="M4 17v-3l5-5 4 3 7-7v12" />
                      <path d="M7 20h10" />
                    </svg>
                  )}

                  {index === 1 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <path d="M4 5l16 14M4 10l12 10M8 3l12 16M3 15l6 6" />
                      <path d="M8 3l-5 5M16 3l5 5M3 16l5 5M16 16l5 5" />
                    </svg>
                  )}

                  {index === 2 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <path d="M12 2.5l8 3.5v5.5c0 5-3.5 8.5-8 10.5-4.5-2-8-5.5-8-10.5V6l8-3.5z" />
                      <path d="m8.5 12 2.3 2.3 4.7-5" />
                    </svg>
                  )}

                  {index === 3 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8"
                    >
                      <path d="M4 14c0-3.5 2.8-6 8-6s8 2.5 8 6" />
                      <path d="M3 14h18M6 14v3M18 14v3" />
                      <path d="M9 8c0-2 1-3 3-3s3 1 3 3" />
                    </svg>
                  )}
                </div>

                {/* TITLE */}
                <h3 className="text-[14px] font-semibold tracking-tight text-[#30221B] sm:text-[15px]">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-1 text-[11px] leading-5 text-[#76675D] sm:text-xs">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DISCOVER BUTTON */}
        <div
          className={`mt-7 flex justify-center transition-all duration-1000 delay-500 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 rounded-full bg-black px-7 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 sm:px-9 sm:py-3.5"
          >
            <span>Discover Our Quality</span>

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
