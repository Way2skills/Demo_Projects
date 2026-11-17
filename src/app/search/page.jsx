
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { newArrivals } from "@/data/homeData";
import livingRoomCategories from "@/data/livingRoomData";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchQuery(params.get("q") || "");
  }, []);

  // Prepare products from existing shared data
  const products = useMemo(() => {
    const arrivalProducts = (newArrivals || []).map((product) => ({
      id: product.href,
      name: product.name,
      price: product.price,
      image: product.variants?.[0]?.image || "",
      href: product.href,
      category: "New Arrivals",
    }));

    const categoryProducts = [];

    (livingRoomCategories || []).forEach((category) => {
      (category.models || []).forEach((model) => {
        categoryProducts.push({
          id: model.id,
          name: model.name,
          price: model.price || null,
          image:
            model.image ||
            model.variants?.[0]?.image ||
            category.image ||
            "",
          href: `/furniture/living-room/${category.slug}`,
          category: category.name,
        });
      });
    });

    const combined = [...arrivalProducts, ...categoryProducts];

    // Remove duplicate product names
    return combined.filter(
      (product, index, self) =>
        index ===
        self.findIndex(
          (item) =>
            item.name.toLowerCase() === product.name.toLowerCase()
        )
    );
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    const results = products.filter((product) => {
      const searchableText =
        `${product.name} ${product.category}`.toLowerCase();

      return searchableText.includes(query);
    });

    if (sortBy === "name") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "price-low") {
      results.sort(
        (a, b) => (a.price || 0) - (b.price || 0)
      );
    }

    if (sortBy === "price-high") {
      results.sort(
        (a, b) => (b.price || 0) - (a.price || 0)
      );
    }

    return results;
  }, [products, searchQuery, sortBy]);

  const formatPrice = (price) => {
    if (price == null) return null;

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  return (
    <main className="min-h-screen bg-[#F6F3EE] pb-20 pt-32">
      <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-14">

        {/* PAGE HEADING */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.3em] text-[#A88955]">
            NEOLEN FURNITURE
          </p>

          <h1 className="text-3xl font-medium tracking-wide text-[#29231F] sm:text-4xl">
            Search Products
          </h1>

          <p className="mt-3 text-sm text-[#756B62]">
            Find the perfect furniture for your home.
          </p>
        </div>

        {/* SEARCH INPUT */}
        <div className="mx-auto mb-12 max-w-[850px]">
          <div className="flex items-center border border-[#DDD5CC] bg-white px-5 py-4 shadow-sm transition focus-within:border-[#A88955]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mr-4 h-5 w-5 shrink-0 text-[#756B62]"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sofas, beds, dining tables..."
              className="w-full bg-transparent text-sm text-[#29231F] outline-none placeholder:text-[#A49A90]"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="ml-3 text-xs text-[#756B62] transition hover:text-[#29231F]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* RESULTS HEADER */}
        {searchQuery.trim() && (
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-[#29231F]">
                Search Results
              </h2>

              <p className="mt-1 text-xs text-[#756B62]">
                {filteredProducts.length} products found for "{searchQuery}"
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#DDD5CC] bg-white px-4 py-3 text-xs text-[#29231F] outline-none"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        )}

        {/* PRODUCT GRID */}
        {!searchQuery.trim() ? (
          <div className="py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#A88955]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </div>

            <h2 className="text-xl font-medium text-[#29231F]">
              What are you looking for?
            </h2>

            <p className="mt-2 text-sm text-[#756B62]">
              Start typing to discover furniture products.
            </p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">

            {filteredProducts.map((product) => (
              <Link
                href={product.href}
                key={product.id}
                className="group block"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[#EAE6E0]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-[#756B62]">
                      Image coming soon
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A88955]">
                    {product.category}
                  </p>

                  <h3 className="text-sm font-medium text-[#29231F] transition-colors group-hover:text-[#A88955]">
                    {product.name}
                  </h3>

                  {product.price != null && (
                    <p className="mt-2 text-sm font-semibold text-[#493326]">
                      {formatPrice(product.price)}
                    </p>
                  )}

                  <span className="mt-3 inline-block border-b border-[#A88955] pb-1 text-[9px] font-semibold tracking-[0.15em] text-[#493326]">
                    VIEW PRODUCT
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-medium text-[#29231F]">
              No products found
            </h2>

            <p className="mt-3 text-sm text-[#756B62]">
              We couldn't find products matching "{searchQuery}".
            </p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-7 bg-[#493326] px-7 py-3 text-[10px] font-semibold tracking-[0.15em] text-white transition hover:bg-[#29231F]"
            >
              CLEAR SEARCH
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
