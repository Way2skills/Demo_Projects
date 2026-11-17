
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    number: "01",
    icon: "design",
    title: "Thoughtful Design",
    text: "Every piece is thoughtfully designed to bring together beauty, comfort, and everyday functionality.",
  },
  {
    number: "02",
    icon: "quality",
    title: "Crafted with Care",
    text: "From materials to finishing details, we focus on craftsmanship that you can see and feel.",
  },
  {
    number: "03",
    icon: "space",
    title: "Made for Your Space",
    text: "Our furniture is created to complement different spaces, lifestyles, and ways of living.",
  },
  {
    number: "04",
    icon: "support",
    title: "Built to Last",
    text: "Timeless designs and dependable quality made to remain beautiful through everyday living.",
  },
];

function ReasonIcon({ type }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      {type === "design" && (
        <>
          <path d="M3 11V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
          <path d="M3 11h18v7H3z" />
          <path d="M5 18v2M19 18v2M7 11V8h4v3M13 11V8h4v3" />
        </>
      )}

      {type === "quality" && (
        <>
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </>
      )}

      {type === "space" && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 4v5H4M15 20v-5h5M9 15h6M12 12v3" />
        </>
      )}

      {type === "support" && (
        <>
          <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
          <rect x="3" y="12" width="4" height="7" rx="2" />
          <rect x="17" y="12" width="4" height="7" rx="2" />
          <path d="M17 19a5 5 0 0 1-5 3h-2" />
        </>
      )}
    </svg>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);

  // SECTION VISIBILITY
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStep(1);
        } else {
          setStep(0);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const section = sectionRef.current;

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // SEQUENTIAL ANIMATION
  useEffect(() => {
    if (step === 0 || step >= 7) return;

    const timer = setTimeout(() => {
      setStep((current) => current + 1);
    }, 650);

    return () => clearTimeout(timer);
  }, [step]);

  const showHeader = step >= 1;
  const showImage = step >= 2;
  const showButton = step >= 7;

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-5 py-16 font-sans md:px-10 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-[1250px]">

        {/* CENTER HEADING */}
        <div
          className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-1000 ease-out md:mb-16 ${
            showHeader
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* MAIN HEADING - NO DASH LINES */}
          <div className="mb-5 flex items-center justify-center">
            <h2 className="font-serif text-[30px] font-semibold tracking-tight text-[#211C18] sm:text-4xl md:text-[40px]">
              Why Choose Us
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="mx-auto max-w-2xl font-sans text-[15px] font-normal leading-8 text-[#756B62] md:text-base">
            Experience the perfect blend of style, comfort and quality with
            Neolen Furniture.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT IMAGE */}
          <div
            className={`relative transition-all duration-[1200ms] ease-out ${
              showImage
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <div className="group relative aspect-[5/4] overflow-hidden rounded-[28px] bg-[#F6F3EE]">
              <Image
                src="/images/home/why-choose-us.jpeg"
                alt="Neolen Furniture beautifully designed living space"
                fill
                priority={false}
                className={`object-cover transition-transform duration-[1800ms] ease-out ${
                  showImage ? "scale-100" : "scale-110"
                } group-hover:scale-105`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center">

            {/* REASONS */}
            <div className="space-y-6 md:space-y-7">
              {reasons.map((item, index) => {
                const itemVisible = step >= index + 3;

                return (
                  <div
                    key={item.number}
                    className={`group flex items-center gap-4 transition-all duration-700 ease-out md:gap-5 ${
                      itemVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-7 opacity-0"
                    }`}
                  >
                    {/* BLACK CIRCLE ICON */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#171717] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#A88955] md:h-[54px] md:w-[54px]">
                      <ReasonIcon type={item.icon} />
                    </div>

                    {/* REASON TEXT */}
                    <div className="flex-1">
                      <h3 className="font-sans text-base font-semibold text-[#29231F] transition-colors duration-300 group-hover:text-[#A88955] md:text-lg">
                        {item.title}
                      </h3>

                      <p className="mt-1 font-sans text-[13px] font-normal leading-6 text-[#756B62] md:text-sm">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EXPLORE BUTTON */}
            <div
              className={`mt-8 transition-all duration-700 ease-out ${
                showButton
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href="/furniture"
                className="group inline-flex items-center gap-3 rounded-full bg-[#171717] px-7 py-3.5 font-sans text-xs font-semibold text-white transition-all duration-300 hover:bg-[#A88955]"
              >
                Explore More

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
