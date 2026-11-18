"use client";

import { useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";

export default function WatchDetailWishlistButton({ watch }) {
  const { hasRestored, isInWishlist, toggleWishlist } = useShop();
  const [animateFill, setAnimateFill] = useState(false);
  const isWishlisted = hasRestored && isInWishlist(watch.id);

  const handleToggle = (event) => {
    event.stopPropagation();
    if (!hasRestored) return;

    const willAdd = !isWishlisted;
    toggleWishlist(watch);
    setAnimateFill(willAdd);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!hasRestored}
      aria-label={
        !hasRestored
          ? "Loading wishlist status"
          : isWishlisted
            ? `Remove ${watch.name} from wishlist`
            : `Add ${watch.name} to wishlist`
      }
      aria-pressed={isWishlisted}
      aria-busy={!hasRestored}
      className="mt-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D2AD86]/70 bg-[#F8EBDD]/60 text-[#A97845] transition-colors hover:bg-[#F8EBDD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] motion-reduce:transition-none disabled:cursor-wait disabled:opacity-60"
    >
      <svg
        className={`h-5 w-5 transition-transform motion-reduce:transition-none ${
          isWishlisted ? "text-[#A97845]" : "text-[#7E6848]"
        } ${isWishlisted ? "fill-current" : "fill-none"} ${
          animateFill ? "watch-wishlist-heart-fill" : ""
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
        />
      </svg>
    </button>
  );
}
