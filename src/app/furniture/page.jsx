
"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import livingRoomCategories from "@/data/livingRoomData";

const livingRoomHero = "/images/furniture/living-room/sofas/h1.jpeg";

const categories = [
  {
    id: "living-room",
    name: "Living Room",
    image: livingRoomHero,
    description: "Furniture designed for comfortable living",
    items: livingRoomCategories,
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "/images/furniture/bedroom/beds/bed-01/beige.jpeg",
    description: "Create a relaxing and beautiful bedroom",
    items: [
      {
        id: "beds",
        name: "Beds",
        image: "/images/furniture/bedroom/beds/b1.jpeg",
      },
      {
        id: "wardrobes",
        name: "Wardrobes",
        image: "/images/furniture/bedroom/beds/w1.jpeg",
      },
      {
        id: "bedside-tables",
        name: "Bedside Tables",
        image: "/images/furniture/bedroom/beds/be.jpeg",
      },
      {
        id: "dressing-tables",
        name: "Dressing Tables",
        image: "/images/furniture/bedroom/beds/d1.jpeg",
      },
    ],
  },
  {
    id: "dining",
    name: "Dining",
    image: "/images/home/categories/h2.jpeg",
    description: "Furniture for memorable dining moments",
    items: [
      {
        id: "dining-tables",
        name: "Dining Tables",
        image: "/images/home/categories/d1.jpeg",
      },
      {
        id: "dining-chairs",
        name: "Dining Chairs",
        image: "/images/home/categories/d2.jpeg",
      },
      {
        id: "dining-sets",
        name: "Dining Sets",
        image: "/images/home/categories/d3.jpeg",
      },
      {
        id: "sideboards",
        name: "Sideboards",
        image: "/images/home/categories/d4.jpeg",
      },
    ],
  },
  {
    id: "seating",
    name: "Seating",
    image: "/images/home/categories/chairs.jpeg",
    description: "Comfortable seating for every space",
    items: [
      {
        id: "accent-chairs",
        name: "Accent Chairs",
        image: "/images/home/categories/ac.jpeg",
      },
      {
        id: "lounge-chairs",
        name: "Lounge Chairs",
        image: "/images/home/categories/ac1.jpeg",
      },
      {
        id: "armchairs",
        name: "Armchairs",
        image: "/images/home/categories/ac2.jpeg",
      },
      {
        id: "benches",
        name: "Benches",
        image: "/images/home/categories/ac4.jpeg",
      },
    ],
  },
  {
    id: "tables-storage",
    name: "Tables & Storage",
    image: "/images/home/categories/h3.jpeg",
    description: "Smart furniture and storage solutions",
    items: [
      {
        id: "console-tables",
        name: "Console Tables",
        image: "/images/home/categories/tables.jpeg",
      },
      {
        id: "study-tables",
        name: "Study Tables",
        image: "/images/home/categories/st.jpeg",
      },
      {
        id: "bookshelves",
        name: "Bookshelves",
        image: "/images/home/categories/st1.jpeg",
      },
      {
        id: "cabinets",
        name: "Cabinets",
        image: "/images/home/categories/st2.jpeg",
      },
    ],
  },
];

// CATEGORY PAGE ROUTING
function getCategoryHref(item, activeCategory) {
  const livingRoomIds = [
    "sofas",
    "recliners",
    "sofa-beds",
    "coffee-tables",
    "side-tables",
    "tv-units",
  ];

  // Living Room
  if (
    activeCategory === "living-room" &&
    livingRoomIds.includes(item.id)
  ) {
    return `/furniture/living-room/${item.slug || item.id}`;
  }

  // Bedroom
  if (activeCategory === "bedroom") {
    return `/furniture/bedroom/${item.id}`;
  }

  // Dining
  if (activeCategory === "dining") {
    return `/furniture/dining/${item.id}`;
  }

  // Seating
  if (activeCategory === "seating") {
    return `/furniture/seating/${item.id}`;
  }

  // Tables & Storage
  if (activeCategory === "tables-storage") {
    return `/furniture/tables-storage/${item.id}`;
  }

  return `/furniture/${item.id}`;
}

// SCROLL REVEAL
function useScrollReveal(threshold = 0.12) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, visible];
}

// MAIN CATEGORY CARD
function MainCategoryCard({
  category,
  active,
  onClick,
  className,
  index,
}) {
  const [cardRef, visible] = useScrollReveal(0.1);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative block w-full overflow-hidden rounded-sm bg-[#EAE1D6] text-left transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-12 scale-[0.97] opacity-0"
      } ${className}`}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        onError={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
      />

      <div className="absolute inset-0 bg-black/10 transition-all duration-700 group-hover:bg-black/25" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#29231F] shadow-md transition-all duration-500 group-hover:bg-[#713A1B] group-hover:text-white sm:px-5 sm:py-3 sm:text-sm ${
            active ? "ring-2 ring-white/80" : ""
          }`}
        >
          {category.name}

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#29231F] text-xs text-white transition-all duration-500 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#713A1B]">
            →
          </span>
        </span>
      </div>
    </button>
  );
}

// SUB CATEGORY CARD
function SubCategoryCard({ item, activeCategory, index }) {
  const href = getCategoryHref(item, activeCategory);
  const [cardRef, visible] = useScrollReveal(0.12);

  return (
    <Link
      ref={cardRef}
      href={href}
      className={`group block transition-all duration-700 ease-out hover:-translate-y-2 ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-12 scale-[0.96] opacity-0"
      }`}
      style={{
        transitionDelay: visible ? `${index * 110}ms` : "0ms",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#EAE1D6] shadow-sm transition-shadow duration-700 group-hover:shadow-xl">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 sm:p-4">
          <h3 className="translate-y-1 text-sm font-semibold text-white transition-transform duration-500 group-hover:translate-y-0 sm:text-base">
            {item.name}
          </h3>

          <span className="flex h-8 w-8 translate-x-1 items-center justify-center rounded-full bg-white text-[#29231F] opacity-90 transition-all duration-500 group-hover:translate-x-0 group-hover:bg-[#713A1B] group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// MAIN FURNITURE PAGE
export default function FurniturePage() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("living-room");

  const categorySectionRef = useRef(null);
  const shouldScrollRef = useRef(false);
  const initialLoadRef = useRef(false);

  const active =
    categories.find(
      (category) => category.id === activeCategory
    ) || categories[0];

  // URL QUERY + HASH HANDLING
  useEffect(() => {
    if (initialLoadRef.current) return;

    const requestedCategory = searchParams.get("category");
    const hash = window.location.hash;

    const validCategoryIds = categories.map(
      (category) => category.id
    );

    let targetCategory = "living-room";

    if (validCategoryIds.includes(requestedCategory)) {
      targetCategory = requestedCategory;
    } else if (validCategoryIds.includes(hash.replace("#", ""))) {
      targetCategory = hash.replace("#", "");
    }

    setActiveCategory(targetCategory);
    initialLoadRef.current = true;

    const shouldScroll =
      Boolean(requestedCategory) ||
      validCategoryIds.includes(hash.replace("#", "")) ||
      hash === "#furniture-categories";

    if (shouldScroll) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          categorySectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 250);
      });
    }
  }, [searchParams]);

  // MAIN CATEGORY CLICK
  const handleCategoryClick = (id) => {
    if (id === activeCategory) {
      categorySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    shouldScrollRef.current = true;
    setActiveCategory(id);

    // Update URL hash without page reload
    window.history.replaceState(null, "", `/furniture#${id}`);
  };

  // SCROLL AFTER CATEGORY CHANGE
  useEffect(() => {
    if (!shouldScrollRef.current) return;

    const timer = setTimeout(() => {
      categorySectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      shouldScrollRef.current = false;
    }, 180);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F3EE]">
      {/* PAGE HEADING */}
      <section className="px-5 pb-7 pt-12 text-center sm:pb-9 sm:pt-16">
        <p className="mb-2 animate-[fadeIn_800ms_ease-out_both] text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A88955]">
          NEOLEN FURNITURE
        </p>

        <h1 className="animate-[fadeInUp_900ms_ease-out_both] font-serif text-3xl font-semibold text-[#29231F] sm:text-4xl">
          Categories
        </h1>

        <p className="mx-auto mt-3 max-w-lg animate-[fadeInUp_1100ms_ease-out_both] text-sm text-[#756B62]">
          Discover thoughtfully designed furniture for every space in your home.
        </p>
      </section>

      {/* MAIN CATEGORY IMAGES */}
      <section className="mx-auto max-w-[1500px] px-4 sm:px-7 lg:px-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <MainCategoryCard
            category={categories[0]}
            active={activeCategory === "living-room"}
            onClick={() => handleCategoryClick("living-room")}
            index={0}
            className="col-span-2 row-span-2 min-h-[270px] aspect-[1.15/1] sm:min-h-[400px] lg:aspect-auto lg:min-h-[480px]"
          />

          <MainCategoryCard
            category={categories[1]}
            active={activeCategory === "bedroom"}
            onClick={() => handleCategoryClick("bedroom")}
            index={1}
            className="min-h-[135px] aspect-[1.25/1] sm:min-h-[200px] lg:aspect-auto lg:min-h-[232px]"
          />

          <MainCategoryCard
            category={categories[2]}
            active={activeCategory === "dining"}
            onClick={() => handleCategoryClick("dining")}
            index={2}
            className="min-h-[135px] aspect-[1.25/1] sm:min-h-[200px] lg:aspect-auto lg:min-h-[232px]"
          />

          <MainCategoryCard
            category={categories[3]}
            active={activeCategory === "seating"}
            onClick={() => handleCategoryClick("seating")}
            index={3}
            className="min-h-[135px] aspect-[1.25/1] sm:min-h-[200px] lg:aspect-auto lg:min-h-[232px]"
          />

          <MainCategoryCard
            category={categories[4]}
            active={activeCategory === "tables-storage"}
            onClick={() => handleCategoryClick("tables-storage")}
            index={4}
            className="min-h-[135px] aspect-[1.25/1] sm:min-h-[200px] lg:aspect-auto lg:min-h-[232px]"
          />
        </div>
      </section>

      {/* SELECTED CATEGORY SUB-CATEGORIES */}
      <section
        id="furniture-categories"
        ref={categorySectionRef}
        className="mx-auto max-w-[1500px] scroll-mt-24 px-4 pb-16 pt-14 sm:px-7 sm:pb-20 sm:pt-16 lg:px-10"
      >
        <div
          key={active.id}
          className="mb-8 flex animate-[fadeInUp_700ms_ease-out_both] flex-col justify-between gap-3 border-b border-[#DDD5CC] pb-5 sm:flex-row sm:items-end"
        >
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A88955]">
              EXPLORE COLLECTION
            </p>

            <h2 className="font-serif text-3xl font-semibold text-[#29231F] sm:text-4xl">
              {active.name}
            </h2>

            <p className="mt-2 text-sm text-[#756B62]">
              {active.description}
            </p>
          </div>

          <p className="text-xs text-[#756B62]">
            {active.items.length} Collections
          </p>
        </div>

        <div
          key={`subcategories-${active.id}`}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
        >
          {active.items.map((item, index) => (
            <SubCategoryCard
              key={item.id}
              item={item}
              activeCategory={active.id}
              index={index}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

