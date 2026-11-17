
"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9998] bg-black/35 backdrop-blur-[2px]"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[9999] flex h-screen w-full max-w-[430px] flex-col rounded-l-[28px] bg-[#F6F3EE] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDD5CC] px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold tracking-wide text-[#29231F]">
              Your Cart
            </h2>

            <p className="mt-1 text-xs text-[#756B62]">
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DDD5CC] text-xl text-[#29231F] transition"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 text-5xl text-[#756B62]">
                🛒
              </div>

              <h3 className="text-lg font-semibold text-[#29231F]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#756B62]">
                Add your favourite furniture pieces and they will appear here.
              </p>

              <Link
                href="/furniture"
                onClick={closeCart}
                className="mt-6 rounded-full bg-[#29231F] px-5 py-2.5 text-xs font-medium text-white transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.variant || "default"}`}
                  className="rounded-2xl border border-[#DDD5CC] bg-white p-3"
                >
                  <div className="flex gap-3">

                    {/* Product Image */}
                    <div className="h-[105px] w-[90px] shrink-0 overflow-hidden rounded-xl bg-[#F1EEE9]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[#29231F]">
                            {item.name}
                          </h3>

                          {item.variant && (
                            <p className="mt-1 text-xs text-[#756B62]">
                              {item.variant}
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.variant)
                          }
                          className="shrink-0 text-xs text-[#756B62] transition hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Price */}
                      <p className="mt-2 text-sm font-semibold text-[#4A3528]">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-full border border-[#DDD5CC]">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id, item.variant)
                            }
                            className="flex h-8 w-8 items-center justify-center text-lg text-[#29231F] transition hover:bg-[#F6F3EE]"
                          >
                            −
                          </button>

                          <span className="flex h-8 min-w-[32px] items-center justify-center border-x border-[#DDD5CC] text-sm font-medium text-[#29231F]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id, item.variant)
                            }
                            className="flex h-8 w-8 items-center justify-center text-lg text-[#29231F] transition hover:bg-[#F6F3EE]"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total */}
                        <p className="text-sm font-semibold text-[#29231F]">
                          ₹
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#DDD5CC] bg-white px-6 py-5">

            {/* Subtotal */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[#756B62]">
                Subtotal
              </span>

              <span className="text-lg font-semibold text-[#29231F]">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Continue Shopping */}
            <Link
              href="/furniture"
              onClick={closeCart}
              className="mb-2.5 flex w-full items-center justify-center rounded-full bg-[#29231F] px-4 py-2.5 text-xs font-medium text-white transition"
            >
              <span className="mr-2">←</span>
              Continue Shopping
            </Link>

            {/* View Cart & Checkout */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex items-center justify-center rounded-full bg-[#29231F] px-3 py-2.5 text-xs font-medium text-white transition"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center rounded-full bg-[#29231F] px-3 py-2.5 text-xs font-medium text-white transition"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
