"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useShop } from "@/components/providers/ShopProvider";
import WatchImage from "@/components/watches/WatchImage";
import { formatINR } from "@/utils/formatters";

function WishlistItem({ watch, closeWishlist, removeFromWishlist }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    if (isRemoving) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      removeFromWishlist(watch.id);
      return;
    }

    setIsRemoving(true);
    window.setTimeout(() => removeFromWishlist(watch.id), 220);
  };

  return (
    <li
      aria-hidden={isRemoving}
      className={`flex items-center gap-3 overflow-hidden border-b transition-[max-height,opacity,transform,padding] duration-200 motion-reduce:transition-none sm:gap-4 ${
        isRemoving
          ? "max-h-0 -translate-x-2 border-transparent py-0 opacity-0"
          : "max-h-40 border-[#DED8CD] py-4 opacity-100"
      }`}
    >
      <Link
        href={`/watches/${watch.slug}`}
        onClick={closeWishlist}
        aria-label={`View ${watch.name}`}
        tabIndex={isRemoving ? -1 : undefined}
        className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-[#DED8CD] bg-[#F5F2EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] sm:h-24 sm:w-24"
      >
        <WatchImage
          src={watch.imagePath}
          alt={watch.name}
          className="h-full w-full object-contain p-2"
          placeholderClassName="h-full w-full"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.12em] text-[#A77B52]">
          {watch.brand}
        </p>
        <Link
          href={`/watches/${watch.slug}`}
          onClick={closeWishlist}
          tabIndex={isRemoving ? -1 : undefined}
          className="mt-1 line-clamp-2 font-serif text-sm leading-5 text-[#302219] transition-colors hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] sm:text-base"
        >
          {watch.name}
        </Link>
        <p className="mt-1 text-sm font-semibold text-[#35332F]">
          {formatINR(watch.price)}
        </p>
      </div>

      <button
        type="button"
        disabled={isRemoving}
        onClick={handleRemove}
        aria-label={`Remove ${watch.name} from wishlist`}
        aria-pressed="true"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D2AD86]/60 bg-[#F8EBDD] text-[#8F6B3F] transition-colors hover:border-[#A77B52] hover:bg-[#EBD5BD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] disabled:cursor-default"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
          />
        </svg>
      </button>
    </li>
  );
}

export default function WishlistDrawer() {
  const {
    wishlist,
    wishlistCount,
    hasRestored,
    wishlistOpen,
    closeWishlist,
    removeFromWishlist,
  } = useShop();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        setHasHydrated(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const isWishlistReady = hasHydrated && hasRestored;
  const visibleWishlistCount = isWishlistReady ? wishlistCount : 0;
  const isDrawerOpen = hasHydrated && wishlistOpen;

  useEffect(() => {
    if (!isDrawerOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeWishlist();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (!drawerRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus !== document.body
      ) {
        window.requestAnimationFrame(() => previousFocus.focus());
      }
    };
  }, [isDrawerOpen, closeWishlist]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] duration-300 motion-reduce:transition-none ${
        isDrawerOpen ? "visible" : "invisible delay-300"
      }`}
      aria-hidden={!isDrawerOpen}
      inert={!isDrawerOpen}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close wishlist"
        onClick={closeWishlist}
        className={`absolute inset-0 h-full w-full bg-[#302219]/35 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="wishlist-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal={isDrawerOpen ? "true" : undefined}
        aria-labelledby="wishlist-drawer-title"
        className={`fixed inset-y-0 right-0 flex w-[92vw] max-w-md flex-col border-l border-[#D2AD86]/60 bg-[#FBFAF7] text-[#35332F] shadow-[-12px_0_40px_rgba(48,34,25,0.16)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-full ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#DED8CD] bg-[#F8EBDD] px-5 py-5 sm:px-7">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="wishlist-drawer-title"
                className="font-serif text-2xl text-[#302219]"
              >
                MY WISHLIST
              </h2>
              <svg
                className="h-[18px] w-[18px] shrink-0 text-[#A97845]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                />
              </svg>
              <span
                className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#6D6961]"
              >
                {visibleWishlistCount}{" "}
                {visibleWishlistCount === 1 ? "watch" : "watches"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-[#6D6961]">
              Keep your favorite timepieces close at hand.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeWishlist}
            aria-label="Close wishlist"
            className="rounded-full border border-[#D2AD86]/70 p-2 text-[#6B4933] transition-colors hover:bg-[#EBD5BD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="m6 6 12 12M18 6 6 18"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 sm:px-7">
          {!isWishlistReady ? (
            <p className="py-10 text-center text-sm text-[#6D6961]" role="status">
              Loading your saved timepieces...
            </p>
          ) : visibleWishlistCount === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D2AD86]/70 bg-[#F8EBDD] text-[#A77B52]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
                  />
                </svg>
              </span>
              <h3 className="font-serif text-xl text-[#302219]">
                Your list is waiting
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#6D6961]">
                Save a timepiece with the heart icon and it will be kept here.
              </p>
              <Link
                href="/watches"
                onClick={closeWishlist}
                className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#302219] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <ul aria-live="polite" aria-relevant="additions removals">
              {wishlist.map((watch) => (
                <WishlistItem
                  key={watch.id}
                  watch={watch}
                  closeWishlist={closeWishlist}
                  removeFromWishlist={removeFromWishlist}
                />
              ))}
            </ul>
          )}
        </div>

        {isWishlistReady && visibleWishlistCount > 0 && (
          <footer className="border-t border-[#DED8CD] bg-[#F8EBDD]/70 px-5 py-5 sm:px-7">
            <Link
              href="/wishlist"
              onClick={closeWishlist}
              className="flex min-h-12 w-full items-center justify-center bg-[#302219] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
            >
              VIEW ALL WISHLIST
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
