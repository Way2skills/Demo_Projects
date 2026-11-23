"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Category } from "@/types/catalog";

export default function CategorySection({
  categories,
}: {
  categories: Category[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollCategories(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(".category-card");
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const scrollDistance = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : track.clientWidth;

    track.scrollBy({ left: direction * scrollDistance, behavior: "smooth" });
  }

  return (
    <section className="category-section section-shell" id="categories">
      <div className="category-carousel-heading">
        <h2>Shop by Category</h2>
      </div>

      <div className="category-carousel">
        <button
          aria-label="Scroll categories left"
          className="category-carousel-control category-carousel-control-left"
          onClick={() => scrollCategories(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <div
          aria-label="Shop categories"
          className="category-carousel-track"
          id="category-carousel-track"
          ref={trackRef}
          role="region"
        >
          {categories.map((category) => (
            <a className="category-card" href="/all-fabrics" key={category.id}>
              <div className="category-image image-frame">
                <Image
                  alt={category.imageAlt}
                  className="cover-image"
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) 72vw, (max-width: 850px) 32vw, 23vw"
                  src={category.image}
                />
                <span aria-hidden="true" className="category-image-shade" />
                <h3 className="category-card-title">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
        <button
          aria-label="Scroll categories right"
          className="category-carousel-control category-carousel-control-right"
          onClick={() => scrollCategories(1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </div>
    </section>
  );
}
