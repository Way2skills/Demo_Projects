"use client";

import Link from "next/link";
import WatchCard from "@/components/watches/WatchCard";
import { useShop } from "@/components/providers/ShopProvider";

export default function WishlistPage() {
  const { wishlist, wishlistCount, hasRestored } = useShop();

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-12 text-[#35332F] sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 border-b border-[#D2AD86]/70 pb-7 sm:mb-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A77B52]">
            Saved timepieces
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-wide text-[#302219] sm:text-4xl">
            MY WISHLIST
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6D6961] sm:text-base">
            Keep the timepieces you love close at hand.
          </p>
        </header>

        {!hasRestored ? (
          <p
            className="border border-[#DED8CD] bg-[#FBFAF7] px-6 py-10 text-center text-sm text-[#6D6961]"
            role="status"
          >
            Loading your saved timepieces...
          </p>
        ) : wishlistCount === 0 ? (
          <section className="mx-auto max-w-2xl border border-[#DED8CD] bg-[#FBFAF7] px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="font-serif text-2xl font-normal text-[#302219]">
              Your wishlist is waiting
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6D6961]">
              Save a timepiece from the collection and it will be kept here.
            </p>
            <Link
              href="/watches"
              className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#302219] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
            >
              CONTINUE SHOPPING
            </Link>
          </section>
        ) : (
          <section aria-labelledby="wishlist-page-list-heading">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#DED8CD] pb-4">
              <h2
                id="wishlist-page-list-heading"
                className="font-serif text-2xl font-normal text-[#302219]"
              >
                Saved selection
              </h2>
              <p
                className="text-xs uppercase tracking-[0.12em] text-[#6D6961]"
                aria-live="polite"
                aria-atomic="true"
              >
                {wishlistCount} {wishlistCount === 1 ? "watch" : "watches"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
