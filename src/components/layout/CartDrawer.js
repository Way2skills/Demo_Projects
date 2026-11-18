"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import CartItemRow from "@/components/cart/CartItemRow";
import ShoppingBagEmptyState from "@/components/cart/ShoppingBagEmptyState";
import { useShop } from "@/components/providers/ShopProvider";
import { formatINR } from "@/utils/formatters";

export default function CartDrawer() {
  const { cart, cartCount, hasRestored, cartOpen, closeCart } = useShop();
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

  const isCartReady = hasHydrated && hasRestored;
  const visibleCartCount = isCartReady ? cartCount : 0;
  const isDrawerOpen = hasHydrated && cartOpen;
  const hasValidPrices = cart.every(
    (item) =>
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0,
  );
  const subtotal = hasValidPrices
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : null;

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
        closeCart();
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
        previousFocus !== document.body &&
        previousFocus.isConnected
      ) {
        window.requestAnimationFrame(() => previousFocus.focus());
      }
    };
  }, [isDrawerOpen, closeCart]);

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
        aria-label="Close shopping bag"
        onClick={closeCart}
        className={`absolute inset-0 h-full w-full bg-[#302219]/35 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="cart-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal={isDrawerOpen ? "true" : undefined}
        aria-labelledby="cart-drawer-title"
        className={`fixed inset-y-0 right-0 flex w-[92vw] max-w-md flex-col border-l border-[#D2AD86]/60 bg-[#FBFAF7] text-[#35332F] shadow-[-12px_0_40px_rgba(48,34,25,0.16)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-full ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-4 border-b border-[#DED8CD] bg-[#F8EBDD] px-5 py-5 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                id="cart-drawer-title"
                className="whitespace-nowrap font-serif text-xl text-[#302219] sm:text-2xl"
              >
                MY SHOPPING BAG
              </h2>
              <svg
                className="h-5 w-5 shrink-0 text-[#A77B52]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                />
              </svg>
              <span className="whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#6D6961]">
                {visibleCartCount}{" "}
                {visibleCartCount === 1 ? "item" : "items"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-[#6D6961]">
              Your selected timepieces, ready when you are.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="shrink-0 rounded-full border border-[#D2AD86]/70 p-2 text-[#6B4933] transition-colors hover:bg-[#EBD5BD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
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
          {!isCartReady ? (
            <p className="py-10 text-center text-sm text-[#6D6961]" role="status">
              Loading your shopping bag...
            </p>
          ) : cartCount === 0 ? (
            <ShoppingBagEmptyState compact onExploreClick={closeCart} />
          ) : (
            <ul aria-live="polite" aria-relevant="additions removals">
              {cart.map((item) => (
                <li key={item.id}>
                  <CartItemRow
                    item={item}
                    compact
                    onProductClick={closeCart}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {isCartReady && cartCount > 0 && (
          <footer className="border-t border-[#DED8CD] bg-[#F8EBDD]/70 px-5 py-5 sm:px-7">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 text-[#6D6961]">
                <span>Subtotal</span>
                <span className="shrink-0 text-[#35332F]">
                  {hasValidPrices ? formatINR(subtotal) : "Price unavailable"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 font-medium text-[#302219]">
                <span>Total</span>
                <span className="shrink-0">
                  {hasValidPrices ? formatINR(subtotal) : "Price unavailable"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#6D6961]">
              Shipping and offers are not included yet.
            </p>
            {hasValidPrices ? (
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex min-h-12 w-full items-center justify-center bg-[#302219] px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
              >
                PROCEED TO CHECKOUT
              </Link>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[#8A4B3A]" role="alert">
                Checkout is unavailable because a product price could not be
                confirmed.
              </p>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}
