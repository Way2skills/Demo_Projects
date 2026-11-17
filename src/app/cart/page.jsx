
"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    isLoaded,
  } = useCart();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F8F6F2]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#B8ADA1] border-t-[#29231F]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 pb-20 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <div className="mx-auto max-w-[1250px]">

        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 text-[11px] font-medium tracking-[0.12em] text-[#29231F]">
          <Link href="/" className="transition hover:text-[#A88955]">
            HOME
          </Link>
          <span className="text-[#756B62]">/</span>
          <span className="font-semibold text-[#1F1B18]">
            SHOPPING CART
          </span>
        </div>

        {/* Page Heading */}
        <div className="mb-9 flex flex-col justify-between gap-4 border-b border-[#A89B8D] pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#29231F]">
              Your Selection
            </p>

            <h1 className="text-3xl font-medium tracking-tight text-[#1F1B18] sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-sm font-medium text-[#4A4038]">
              Review your selected furniture before proceeding.
            </p>
          </div>

          <p className="text-sm font-medium text-[#29231F]">
            <span className="font-bold text-[#1F1B18]">
              {cartCount}
            </span>{" "}
            {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="flex min-h-[430px] flex-col items-center justify-center border border-[#B8ADA1] bg-white px-5 py-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F6F3EE] text-3xl text-[#4A4038]">
              🛒
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#29231F]">
              Your Selection
            </p>

            <h2 className="text-2xl font-medium text-[#1F1B18]">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-[380px] text-sm leading-7 text-[#4A4038]">
              Discover thoughtfully designed furniture and find the
              perfect pieces for your home.
            </p>

            <Link
              href="/furniture"
              className="mt-8 inline-flex items-center justify-center bg-[#29231F] px-9 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#4A3528]"
            >
              Explore Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-14">

            {/* Cart Products */}
            <section className="min-w-0">

              {/* Table Header */}
              <div className="hidden grid-cols-[minmax(0,1fr)_100px_120px_100px] gap-3 border-b border-[#A89B8D] px-2 pb-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#29231F] md:grid">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Total</span>
              </div>

              {/* Product List */}
              <div>
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant || "default"}`}
                    className="grid grid-cols-1 gap-4 border-b border-[#B8ADA1] py-6 sm:grid-cols-[120px_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_100px_120px_100px] md:items-center md:gap-3 md:px-2"
                  >

                    {/* Product Information */}
                    <div className="flex min-w-0 gap-4 md:items-center">
                      <div className="h-[115px] w-[115px] shrink-0 overflow-hidden bg-[#EFEBE5] sm:h-[120px] sm:w-[120px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="flex min-w-0 flex-col justify-center">
                        <h3 className="text-sm font-semibold leading-6 text-[#1F1B18] sm:text-base">
                          {item.name}
                        </h3>

                        {item.variant && (
                          <p className="mt-1 text-xs font-medium text-[#4A4038]">
                            Finish: {item.variant}
                          </p>
                        )}

                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.variant)
                          }
                          className="mt-3 w-fit border-b border-[#756B62] pb-0.5 text-[11px] font-medium text-[#29231F] transition hover:border-red-600 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between md:block md:text-center">
                      <span className="text-xs font-semibold text-[#29231F] md:hidden">
                        Price
                      </span>

                      <span className="text-sm font-semibold text-[#1F1B18]">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between md:justify-center">
                      <span className="text-xs font-semibold text-[#29231F] md:hidden">
                        Quantity
                      </span>

                      <div className="flex h-10 items-center border border-[#A89B8D] bg-white">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id, item.variant)
                          }
                          aria-label="Decrease quantity"
                          className="flex h-full w-9 items-center justify-center text-base font-medium text-[#1F1B18] transition hover:bg-[#EAE5DE]"
                        >
                          −
                        </button>

                        <span className="flex h-full min-w-[34px] items-center justify-center border-x border-[#B8ADA1] text-sm font-semibold text-[#1F1B18]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id, item.variant)
                          }
                          aria-label="Increase quantity"
                          className="flex h-full w-9 items-center justify-center text-base font-medium text-[#1F1B18] transition hover:bg-[#EAE5DE]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex items-center justify-between md:block md:text-right">
                      <span className="text-xs font-semibold text-[#29231F] md:hidden">
                        Total
                      </span>

                      <span className="text-sm font-bold text-[#1F1B18]">
                        ₹
                        {(
                          Number(item.price) * item.quantity
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/furniture"
                className="mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1F1B18] transition hover:text-[#A88955]"
              >
                <span className="text-base">←</span>
                Continue Shopping
              </Link>
            </section>

            {/* Order Summary */}
            <aside className="w-full border-t border-[#A89B8D] pt-6 lg:sticky lg:top-24 lg:border-t-0 lg:pt-0">

              {/* Summary Heading */}
              <div className="mb-6 border-b border-[#A89B8D] pb-5">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#29231F]">
                  Neolen Furniture
                </p>

                <h2 className="text-2xl font-medium tracking-tight text-[#1F1B18]">
                  Order Summary
                </h2>
              </div>

              {/* Summary Table */}
              <div className="border-y border-[#A89B8D]">

                {/* Items */}
                <div className="flex items-center justify-between gap-3 border-b border-[#B8ADA1] py-5">
                  <div>
                    <p className="text-sm font-semibold text-[#1F1B18]">
                      Total Items
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#4A4038]">
                      Selected furniture
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#1F1B18]">
                    {cartCount}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between gap-3 py-5">
                  <span className="text-sm font-semibold text-[#29231F]">
                    Subtotal
                  </span>

                  <span className="text-sm font-bold text-[#1F1B18]">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Estimated Total */}
              <div className="mt-6 flex items-center justify-between gap-3 border-b border-[#A89B8D] pb-6">
                <span className="text-sm font-bold text-[#1F1B18]">
                  Estimated Total
                </span>

                <span className="text-xl font-bold text-[#4A3528]">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Checkout Button - Fixed Color */}
              <Link
                href="/checkout"
                className="mt-7 flex min-h-[54px] w-full items-center justify-center gap-3 bg-[#29231F] px-5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white hover:bg-[#29231F] active:bg-[#29231F] focus:bg-[#29231F] transition-none"
              >
                Proceed to Checkout
                <span className="text-base">→</span>
              </Link>

              {/* Secure Shopping */}
              <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#29231F]">
                <span className="text-[#A88955]">✦</span>
                Secure shopping experience
              </div>

            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
