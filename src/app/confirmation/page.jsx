
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("neolen-latest-order");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Unable to load order:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#F2E9DE]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#C8BBAE] border-t-[#29231F]" />
      </div>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-[#F2E9DE] px-5 text-center">
        <h1 className="text-2xl font-bold text-[#29231F]">
          No Order Found
        </h1>

        <p className="mt-2 text-sm text-[#756B62]">
          Please place an order to view your confirmation details.
        </p>

        <Link
          href="/furniture"
          className="mt-6 bg-[#29231F] px-7 py-3 text-[11px] font-semibold uppercase tracking-widest text-white"
        >
          Explore Furniture
        </Link>
      </main>
    );
  }

  const customer = order.customer || {};

  const customerDetails = [
    ["Full Name", customer.fullName],
    ["Email", customer.email],
    ["Phone", customer.phone],
    ["Country", customer.country],
    ["Address", customer.address],
    ["Apartment", customer.apartment || "—"],
    ["City", customer.city],
    ["State", customer.state],
    ["PIN Code", customer.pincode],
  ];

  return (
    <main className="min-h-screen bg-[#F2E9DE] px-3 py-7 sm:px-5 sm:py-9">
      <div className="mx-auto max-w-[850px]">

        {/* Header */}
        <div className="mb-5 rounded-lg border border-[#E5DACE] bg-[#FBF6EF] px-5 py-3 text-center">
          <Link
            href="/"
            className="text-xl font-light tracking-[0.2em] text-[#29231F]"
          >
            NEOLEN
            <span className="block text-[8px] font-medium tracking-[0.35em] text-[#756B62]">
              FURNITURE
            </span>
          </Link>
        </div>

        {/* Confirmation Card */}
        <section className="rounded-lg border border-[#E5DACE] bg-[#FBF6EF] p-5 shadow-sm sm:p-7">

          {/* Success Message */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#A88955] text-2xl text-[#4A3528]">
              ✓
            </div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#A88955]">
              Neolen Furniture
            </p>

            <h1 className="mt-2 text-2xl font-bold text-[#29231F] sm:text-3xl">
              Thank You for Your Order!
            </h1>

            <p className="mt-2 text-xs text-[#756B62]">
              Your order details have been saved successfully.
            </p>

            <p className="mt-3 text-xs font-bold text-[#29231F]">
              Order ID: {order.orderId}
            </p>
          </div>

          {/* Customer Details */}
          <div className="border-y border-[#C8BBAE] py-5">
            <h2 className="mb-4 text-lg font-bold text-[#29231F]">
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {customerDetails.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-medium text-[#756B62]">
                    {label}
                  </p>

                  <p className="mt-0.5 break-words text-xs font-semibold text-[#29231F]">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ordered Products */}
          <div className="py-5">
            <h2 className="mb-4 text-lg font-bold text-[#29231F]">
              Ordered Products
            </h2>

            <div className="space-y-4">
              {(order.items || []).map((item, index) => (
                <div
                  key={`${item.id}-${item.variant || index}`}
                  className="flex items-center gap-3 border-b border-[#D5CCC1] pb-4"
                >
                  <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-md bg-[#EAE3DA]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-[#29231F] sm:text-sm">
                      {item.name}
                    </h3>

                    {item.variant && (
                      <p className="mt-1 text-[10px] text-[#756B62]">
                        Finish: {item.variant}
                      </p>
                    )}

                    <p className="mt-1 text-[10px] text-[#756B62]">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-xs font-bold text-[#29231F] sm:text-sm">
                    ₹{(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-[#C8BBAE] pt-4">
            <span className="text-base font-bold text-[#29231F]">
              Order Total
            </span>

            <span className="text-xl font-bold text-[#29231F]">
              ₹{Number(order.total || 0).toLocaleString("en-IN")}
            </span>
          </div>

          {/* Order Status */}
          <p className="mt-3 text-center text-[10px] font-medium text-[#756B62]">
            Order Status: {order.status}
          </p>

          {/* Continue Shopping */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/furniture"
              className="flex min-h-[44px] items-center justify-center bg-[#29231F] px-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-none hover:bg-[#29231F] active:bg-[#29231F]"
            >
              Continue Shopping →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <p className="mt-5 text-center text-[10px] text-[#756B62]">
          © 2026 NEOLEN FURNITURE
        </p>
      </div>
    </main>
  );
}
