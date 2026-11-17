"use client";

import Link from "next/link";

const bedroomCategories = [
  {
    id: "beds",
    name: "Beds",
    description:
      "Discover stylish and comfortable beds designed for relaxing nights and beautiful bedrooms.",
    image:
      "/images/furniture/bedroom/beds/b1.jpeg",
    count: "5 Designs",
    href: "/furniture/bedroom/beds",
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    description:
      "Explore modern wardrobes with elegant finishes and practical storage solutions.",
    image:"/images/furniture/bedroom/wardrobes/wardrobe-01/beige.jpeg",
  
    count: "5 Designs",
    href: "/furniture/bedroom/wardrobes",
  },
  {
    id: "bedside-tables",
    name: "Bedside Tables",
    description:
      "Complete your bedroom with elegant bedside tables offering everyday convenience.",
    image:
      "/images/furniture/bedroom/bedside-tables/bedside-01/natural-oak.jpeg",
    count: "5 Designs",
    href: "/furniture/bedroom/bedside-tables",
  },
  {
    id: "dressing-tables",
    name: "Dressing Tables",
    description:
      "Create a beautiful personal space with our modern and premium dressing tables.",
    image:
      "/images/furniture/bedroom/dressing-tables/dressing-01/natural-oak.jpeg",
    count: "5 Designs",
    href: "/furniture/bedroom/dressing-tables",
  },
];

export default function BedroomPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#382519]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#EAD8C2]">
        <div className="absolute inset-0">
          <img
            src="/images/furniture/bedroom/beds/bed-01/beige.jpeg"
            alt="Bedroom Furniture"
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#EAD8C2] via-[#EAD8C2]/90 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-6 py-16 md:px-12">
          <div className="max-w-2xl">

            <Link
              href="/furniture"
              className="mb-6 inline-block text-sm text-[#714A32] hover:text-[#382519]"
            >
              Furniture / Bedroom
            </Link>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#815333]">
              Neolen Furniture
            </p>

            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              Bedroom Collection
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#684B37] md:text-base">
              Transform your bedroom into a comfortable and elegant
              space with our thoughtfully designed furniture collection.
            </p>

            <a
              href="#bedroom-categories"
              className="mt-8 inline-flex items-center bg-[#713A1B] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#512A16]"
            >
              Explore Collection
              <span className="ml-3">→</span>
            </a>

          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section
        id="bedroom-categories"
        className="mx-auto max-w-7xl px-5 py-16 md:px-10"
      >

        <div className="mb-12 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#986B49]">
            Explore Our Furniture
          </p>

          <h2 className="mt-3 font-serif text-3xl md:text-4xl">
            Shop Bedroom Furniture
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#806A58]">
            Find the perfect furniture pieces to bring comfort,
            functionality and timeless style to your bedroom.
          </p>

          <div className="mx-auto mt-5 h-px w-20 bg-[#A77B56]" />

        </div>

        <div className="mb-8 flex items-center justify-between border-b border-[#E5D8C9] pb-4">
          <p className="text-sm text-[#765A43]">
            4 Categories
          </p>

          <p className="text-xs uppercase tracking-wider text-[#92765D]">
            Bedroom Furniture
          </p>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {bedroomCategories.map((category) => (

            <Link
              key={category.id}
              href={category.href}
              className="group overflow-hidden border border-[#EDE3D8] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* CATEGORY IMAGE */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F3ED]">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#713A1B]">
                  {category.count}
                </div>

              </div>

              {/* CATEGORY DETAILS */}
              <div className="p-5">

                <h3 className="font-serif text-xl transition group-hover:text-[#8A4D29]">
                  {category.name}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#806A58]">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#EDE3D8] pt-4">

                  <span className="text-xs font-semibold uppercase tracking-wider text-[#713A1B]">
                    Explore Designs
                  </span>

                  <span className="text-lg text-[#713A1B] transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* BOTTOM SERVICE SECTION */}
      <section className="border-y border-[#E6D8C9] bg-[#F4E9DC]">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 text-center sm:grid-cols-3">

          <div>
            <h3 className="font-serif text-lg">
              Elegant Designs
            </h3>
            <p className="mt-2 text-xs text-[#806A58]">
              Beautiful furniture for modern bedrooms
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">
              Quality Craftsmanship
            </h3>
            <p className="mt-2 text-xs text-[#806A58]">
              Designed with attention to detail
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg">
              Everyday Comfort
            </h3>
            <p className="mt-2 text-xs text-[#806A58]">
              Furniture made for comfortable living
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}