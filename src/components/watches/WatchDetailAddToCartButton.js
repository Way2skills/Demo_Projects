"use client";

import { useEffect, useRef, useState } from "react";
import { useShop } from "@/components/providers/ShopProvider";

export default function WatchDetailAddToCartButton({ watch }) {
  const { addToCart, hasRestored } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const confirmationLock = useRef(false);
  const confirmationTimer = useRef(null);

  useEffect(
    () => () => {
      if (confirmationTimer.current !== null) {
        window.clearTimeout(confirmationTimer.current);
      }
    },
    [],
  );

  const handleAddToCart = () => {
    if (
      !hasRestored ||
      watch?.id === undefined ||
      watch?.id === null ||
      confirmationLock.current
    ) {
      return;
    }

    addToCart(watch);
    confirmationLock.current = true;
    setIsAdded(true);
    confirmationTimer.current = window.setTimeout(() => {
      confirmationLock.current = false;
      confirmationTimer.current = null;
      setIsAdded(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!hasRestored}
      aria-label={isAdded ? "Added to cart" : `Add ${watch.name} to cart`}
      aria-live="polite"
      className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded border border-[#35332F] bg-[#35332F] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBFAF7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFAF7] disabled:cursor-wait disabled:opacity-60"
    >
      {isAdded ? "ADDED TO CART ✓" : "ADD TO CART"}
    </button>
  );
}
