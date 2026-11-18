"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getCategoryBySlug } from "@/data/categories";

function getCategoryCollection(slug) {
  const category = getCategoryBySlug(slug);

  return {
    id: category.id,
    title: category.landingTitle || category.name,
    description: category.shortDescription,
    imagePath: category.imagePath,
    href: `/categories/${category.slug}`,
  };
}

const collections = [
  getCategoryCollection("mens-watches"),
  getCategoryCollection("womens-watches"),
  {
    id: "kids-watches",
    title: "Kids' Watches",
    description: "Playful, easy-to-wear designs for their everyday adventures.",
    imagePath: "/images/categories/kids.jpg",
    href: "/kids",
  },
  {
    id: "couple-watches",
    title: "Couple Watches",
    description: "Timepieces to mark a moment together.",
    imagePath: "/images/categories/couple.jpg",
    href: "/couples",
  },
  getCategoryCollection("dress-and-classic-watches"),
  getCategoryCollection("diver-watches"),
  getCategoryCollection("fashion-watches"),
  getCategoryCollection("heritage-collection"),
];

function getRelativeOffset(index, activeIndex) {
  const offset = (index - activeIndex + collections.length) % collections.length;
  return offset > collections.length / 2 ? offset - collections.length : offset;
}

function getCardPositionClass(offset) {
  if (offset === 0) return "showroom-category-carousel-card--active";
  if (Math.abs(offset) === 1) {
    return offset > 0
      ? "showroom-category-carousel-card--next"
      : "showroom-category-carousel-card--previous";
  }
  if (Math.abs(offset) === 2) {
    return offset > 0
      ? "showroom-category-carousel-card--next-far"
      : "showroom-category-carousel-card--previous-far";
  }
  if (offset === 3) return "showroom-category-carousel-card--next-back";
  return "showroom-category-carousel-card--hidden";
}

function CollectionCard({ collection, index, activeIndex }) {
  const offset = getRelativeOffset(index, activeIndex);
  const isActive = offset === 0;
  const content = (
    <>
      <Image
        src={collection.imagePath}
        alt={`${collection.title} collection`}
        fill
        loading={isActive ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="showroom-category-carousel-image"
      />
      <span
        aria-hidden="true"
        className="showroom-category-carousel-shade"
      />
      <span className="showroom-category-carousel-copy">
        <span className="showroom-category-carousel-kicker">
          Crueze TimeLine
        </span>
        <span className="showroom-category-carousel-title">
          {collection.title}
        </span>
        <span className="showroom-category-carousel-description">
          {collection.description}
        </span>
        <span className="showroom-category-carousel-action">
          Explore category <span aria-hidden="true">→</span>
        </span>
      </span>
    </>
  );

  return (
    <article
      aria-hidden={!isActive}
      aria-label={`${index + 1} of ${collections.length}: ${collection.title}`}
      aria-roledescription="slide"
      className={`showroom-category-carousel-card ${getCardPositionClass(offset)}`}
      inert={!isActive}
      role="group"
    >
      {isActive ? (
        <Link href={collection.href} className="showroom-category-carousel-link">
          {content}
        </Link>
      ) : (
        <div
          aria-hidden="true"
          className="showroom-category-carousel-link"
        >
          {content}
        </div>
      )}
    </article>
  );
}

export default function ShowroomCollections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex =
    (activeIndex - 1 + collections.length) % collections.length;
  const nextIndex = (activeIndex + 1) % collections.length;

  const showPrevious = () => {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + collections.length) % collections.length,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % collections.length);
  };

  return (
    <div>
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
        <p
          className="scroll-reveal-heading text-[10px] font-semibold uppercase tracking-[0.24em] text-[#A77B52] sm:text-xs"
          style={{ transitionDelay: "0ms" }}
        >
          A considered selection
        </p>
        <h2
          id="showroom-collections-title"
          className="scroll-reveal-heading mt-3 font-serif text-3xl font-normal leading-tight text-[#302219] sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: "180ms" }}
        >
          Explore Our Collections
        </h2>
        <p
          className="scroll-reveal-card mt-4 text-sm leading-7 text-[#6B4933] sm:text-base"
          style={{ "--scroll-reveal-delay": "360ms" }}
        >
          Find a timepiece that reflects who you are, from everyday favorites
          to enduring designs.
        </p>
      </div>

      <div className="showroom-collections-layout lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <figure
          className="showroom-curated-figure showroom-collections-left-reveal"
          style={{ "--showroom-side-reveal-delay": "480ms" }}
        >
          <div className="showroom-curated-image-reveal">
            <Image
              src="/images/showroom/curated-collection.jpg"
              alt="A curated display of luxury watches in the Crueze TimeLine showroom"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="showroom-curated-image"
            />
            <span
              aria-hidden="true"
              className="showroom-curated-shutter-seam"
            />
            <span aria-hidden="true" className="showroom-curated-index">
              <span className="h-px w-8 bg-[#D2AD86]" />
              THE CRUEZE EDIT
            </span>
          </div>
        </figure>

        <div className="showroom-collections-content">
          <div
            className="showroom-category-carousel-wrap showroom-collections-right-reveal"
            style={{ "--showroom-side-reveal-delay": "600ms" }}
          >
            <div
              aria-label="Browse all eight watch categories"
              aria-roledescription="carousel"
              className="showroom-category-carousel"
              role="region"
            >
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  index={index}
                  activeIndex={activeIndex}
                />
              ))}
            </div>

            <div
              aria-label="Category carousel controls"
              className="showroom-category-carousel-controls"
              role="group"
            >
              <button
                type="button"
                aria-label={`Previous category: ${collections[previousIndex].title}`}
                className="showroom-category-carousel-button"
                onClick={showPrevious}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M19 12H5m7 7-7-7 7-7" />
                </svg>
              </button>
              <p
                aria-atomic="true"
                aria-live="polite"
                className="showroom-category-carousel-count"
              >
                {activeIndex + 1} <span aria-hidden="true">/</span>{" "}
                {collections.length}
              </p>
              <button
                type="button"
                aria-label={`Next category: ${collections[nextIndex].title}`}
                className="showroom-category-carousel-button"
                onClick={showNext}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
