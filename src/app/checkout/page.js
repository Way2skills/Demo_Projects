"use client";

import { useState } from "react";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import ShoppingBagEmptyState from "@/components/cart/ShoppingBagEmptyState";
import DemoOrderConfirmation from "@/components/checkout/DemoOrderConfirmation";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { useShop } from "@/components/providers/ShopProvider";

export default function CheckoutPage() {
  const { cart, cartCount, hasRestored, clearCart } = useShop();
  const [demoPaymentMethod, setDemoPaymentMethod] = useState(null);

  const handleDemoOrderConfirmed = (paymentMethod) => {
    clearCart();
    setDemoPaymentMethod(paymentMethod);
  };

  if (demoPaymentMethod) {
    return <DemoOrderConfirmation paymentMethod={demoPaymentMethod} />;
  }

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-10 text-[#35332F] sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 border-b border-[#D2AD86]/70 pb-6 sm:mb-11 sm:pb-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A77B52]">
            Order review
          </p>
          <h1 className="font-serif text-3xl font-normal tracking-wide text-[#302219] sm:text-4xl">
            CHECKOUT
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6D6961]">
            Provide delivery details and review your selected timepieces.
          </p>
        </header>

        {!hasRestored ? (
          <p
            className="border border-[#DED8CD] bg-[#FBFAF7] px-6 py-10 text-center text-sm text-[#6D6961]"
            role="status"
          >
            Loading your order...
          </p>
        ) : cart.length === 0 ? (
          <ShoppingBagEmptyState />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
            <section aria-label="Customer and delivery information">
              <CheckoutForm
                cart={cart}
                onDemoOrderConfirmed={handleDemoOrderConfirmed}
                hasValidPrices={cart.every(
                  (item) =>
                    Number.isFinite(item.price) &&
                    item.price >= 0 &&
                    Number.isFinite(item.quantity) &&
                    item.quantity > 0,
                )}
              />
            </section>

            <CartOrderSummary
              cart={cart}
              cartCount={cartCount}
              showItems
              showShippingStatus
            />
          </div>
        )}
      </div>
    </main>
  );
}
