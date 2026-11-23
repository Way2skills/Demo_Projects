"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { occasions } from "@/data/homepage";
import styles from "./occasion-section.module.css";

export default function OccasionSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollOccasions(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(`.${styles.card}`);
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const scrollDistance = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : track.clientWidth;

    track.scrollBy({ left: direction * scrollDistance, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="shop-by-occasion-heading"
      className={`${styles.section} section-shell`}
      id="products"
    >
      <h2 className={styles.heading} id="shop-by-occasion-heading">
        Shop by Occasion
      </h2>

      <div className={styles.carousel}>
        <button
          aria-label="Scroll occasions left"
          className={`${styles.control} ${styles.controlLeft}`}
          onClick={() => scrollOccasions(-1)}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={22} />
        </button>
        <div
          aria-label="Shop by occasion"
          className={styles.track}
          ref={trackRef}
          role="region"
        >
          {occasions.map((occasion) => (
            <a
              aria-label={`Shop ${occasion.name} in All Fabrics`}
              className={styles.card}
              href="/all-fabrics"
              key={occasion.name}
            >
              <div className={styles.image}>
                <Image
                  alt={occasion.imageAlt}
                  className={styles.coverImage}
                  fill
                  loading="lazy"
                  sizes="(max-width: 600px) 78vw, (max-width: 850px) 42vw, 23vw"
                  src={occasion.image}
                />
                <span aria-hidden="true" className={styles.shade} />
                <h3 className={styles.cardTitle}>{occasion.name}</h3>
              </div>
            </a>
          ))}
        </div>
        <button
          aria-label="Scroll occasions right"
          className={`${styles.control} ${styles.controlRight}`}
          onClick={() => scrollOccasions(1)}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={22} />
        </button>
      </div>
    </section>
  );
}
