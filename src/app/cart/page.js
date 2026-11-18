"use client";

import Link from "next/link";
import CartItemRow from "@/components/cart/CartItemRow";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import ShoppingBagEmptyState from "@/components/cart/ShoppingBagEmptyState";
import { useShop } from "@/components/providers/ShopProvider";

export default function CartPage() {
  const { cart, cartCount, hasRestored } = useShop();

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-10 text-[#35332F] sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[#D2AD86]/70 pb-6 sm:mb-11 sm:pb-8">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A77B52]">
              Your selection
            </p>
            <h1 className="font-serif text-3xl font-normal tracking-wide text-[#302219] sm:text-4xl">
              MY SHOPPING BAG
            </h1>
            <p
              className="mt-3 text-sm text-[#6D6961]"
              aria-live="polite"
              aria-atomic="true"
            >
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Link
            href="/watches"
            className="inline-flex min-h-11 items-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B4933] underline decoration-[#D2AD86] underline-offset-4 transition-colors hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F2EC]"
          >
            CONTINUE SHOPPING
          </Link>
        </header>

        {!hasRestored ? (
          <p
            className="border border-[#DED8CD] bg-[#FBFAF7] px-6 py-10 text-center text-sm text-[#6D6961]"
            role="status"
          >
            Loading your shopping bag...
          </p>
        ) : cart.length === 0 ? (
          <ShoppingBagEmptyState />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
            <section aria-labelledby="cart-items-heading">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2
                  id="cart-items-heading"
                  className="font-serif text-xl text-[#302219] sm:text-2xl"
                >
                  Your timepieces
                </h2>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#6D6961]">
                  {cart.length} {cart.length === 1 ? "style" : "styles"}
                </span>
              </div>
              <div className="divide-y divide-[#DED8CD] border-y border-[#DED8CD]">
                {cart.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </section>

            <CartOrderSummary
              cart={cart}
              cartCount={cartCount}
              actionHref="/checkout"
              actionLabel="PROCEED TO CHECKOUT"
              actionRequiresValidPrices
            />
          </div>
        )}
      </div>
    </main>
  );
}
