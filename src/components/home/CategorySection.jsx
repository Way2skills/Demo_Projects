
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/homeData";

export default function CategorySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false);
          setAnimationKey((previous) => previous + 1);

          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F7F4EF] px-5 py-14 md:px-10 md:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div
          key={`heading-${animationKey}`}
          className={`category-heading mb-9 text-center md:mb-11 ${
            isVisible ? "category-show" : "category-hide"
          }`}
        >
          <h2 className="font-serif text-[30px] font-semibold tracking-tight text-[#211C18] sm:text-4xl md:text-[40px]">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              key={`${animationKey}-${category.name}`}
              href={category.href}
              aria-label={`Shop ${category.name}`}
              style={{ animationDelay: `${index * 180}ms` }}
              className={`category-card group block min-w-0 overflow-hidden rounded-md border border-[#E5E2DE] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A5A36] ${
                isVisible ? "category-show" : "category-hide"
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-[#EAE7E3]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                <div className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-[#8A5A36] text-white opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-lg leading-none">→</span>
                </div>
              </div>

              <div className="flex min-h-[52px] items-center justify-center bg-[#EAE8E5] px-2 py-3 transition-colors duration-300 group-hover:bg-[#DED9D2]">
                <h3 className="text-center text-[14px] font-bold tracking-wide text-[#171717] md:text-[15px]">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
