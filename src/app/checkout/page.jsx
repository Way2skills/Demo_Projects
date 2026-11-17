
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

export default function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isLoaded,
    clearCart,
  } = useCart();

  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "India",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // PLACE ORDER
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "country",
      "address",
      "city",
      "state",
      "pincode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (
      formData.pincode &&
      !/^\d{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const orderId = `NLR-${Date.now()}`;

      const newOrder = {
        orderId,
        customer: { ...formData },
        items: cartItems.map((item) => ({
          ...item,
        })),
        cartCount,
        subtotal: cartTotal,
        total: cartTotal,
        status: "Order Placed",
        createdAt: new Date().toISOString(),
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("neolen-orders") || "[]"
      );

      if (!Array.isArray(existingOrders)) {
        throw new Error("Invalid saved orders data");
      }

      localStorage.setItem(
        "neolen-orders",
        JSON.stringify([...existingOrders, newOrder])
      );

      localStorage.setItem(
        "neolen-latest-order",
        JSON.stringify(newOrder)
      );

      clearCart();
      router.push("/confirmation");
    } catch (error) {
      console.error("Order saving error:", error);
      alert("Unable to save your order. Please try again.");
    }
  };

  const inputClass =
    "mt-2 h-[46px] w-full rounded-md border border-[#D5CCC1] bg-[#FBF8F3] px-3 text-[13px] font-medium text-[#29231F] outline-none placeholder:font-normal placeholder:text-[#95897E] focus:border-[#75604C] focus:bg-white";

  const labelClass =
    "text-[12px] font-semibold text-[#29231F]";

  if (!isLoaded) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#F2E9DE]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C8BBAE] border-t-[#29231F]" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#F2E9DE] px-5 text-center">
        <h1 className="text-3xl font-semibold text-[#29231F]">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-sm text-[#756B62]">
          Add your favourite furniture before proceeding to checkout.
        </p>

        <Link
          href="/furniture"
          className="mt-8 rounded-md bg-[#29231F] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-none hover:bg-[#29231F]"
        >
          Explore Furniture
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F2E9DE] px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Checkout Progress */}
        <div className="mb-6 flex flex-col items-center justify-between gap-5 rounded-xl border border-[#E5DACE] bg-[#FBF6EF] px-6 py-5 shadow-sm sm:flex-row sm:px-9">

          <Link
            href="/"
            className="text-center text-2xl font-light tracking-[0.2em] text-[#29231F]"
          >
            NEOLEN
            <span className="block text-[9px] font-medium tracking-[0.35em] text-[#756B62]">
              FURNITURE
            </span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-medium sm:gap-4 sm:text-sm">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-[#756B62] transition hover:text-[#29231F]"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#756B62] text-[10px]">
                ✓
              </span>
              Cart
            </Link>

            <span className="h-px w-5 bg-[#B8ADA1] sm:w-10" />

            <span className="flex items-center gap-2 font-bold text-[#1F1B18]">
              <span className="h-3 w-3 rounded-full bg-[#29231F]" />
              Checkout
            </span>

            <span className="h-px w-5 bg-[#B8ADA1] sm:w-10" />

            <span className="text-[#A69A8E]">
              Confirmation
            </span>
          </div>

          <div className="hidden items-center gap-4 text-[#29231F] sm:flex">
            <span className="text-lg">♧</span>
            <span className="text-lg">?</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.25fr_1fr]">

            {/* LEFT - SHIPPING ADDRESS */}
            <section className="rounded-xl border border-[#E5DACE] bg-[#FBF6EF] p-5 shadow-sm sm:p-8 lg:p-10">

              <h1 className="mb-5 text-3xl font-bold tracking-tight text-[#171411] sm:text-4xl">
                Checkout
              </h1>

              {/* Step Indicators */}
              <div className="mb-7 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E9DED1] px-4 py-2 text-[11px] font-semibold text-[#29231F]">
                  ● 1. Shipping Address
                </span>

                <span className="rounded-full bg-[#F0E8DF] px-4 py-2 text-[11px] font-medium text-[#756B62]">
                  2. Review & Place Order
                </span>
              </div>

              {/* Shipping Heading */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#1F1B18]">
                  Shipping Address
                </h2>

                <p className="mt-1 text-xs text-[#756B62]">
                  We'll use this address for delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      let value = e.target.value;

                      const firstAt = value.indexOf("@");

                      if (firstAt !== -1) {
                        value =
                          value.slice(0, firstAt + 1) +
                          value.slice(firstAt + 1).replace(/@/g, "");
                      }

                      handleChange({
                        target: {
                          name: "email",
                          value,
                        },
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                      }

                      if (
                        e.key === "@" &&
                        formData.email.includes("@")
                      ) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter your email"
                    className={inputClass}
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    className={inputClass}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className={labelClass}>
                    Country *
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="India">India</option>
                  </select>

                  {errors.country && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Street Address *
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number and street name"
                    className={inputClass}
                  />

                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Apartment */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Apartment, Suite, etc.
                    <span className="ml-2 text-[10px] font-normal text-[#94877E]">
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, floor, building name"
                    className={inputClass}
                  />
                </div>

                {/* City */}
                <div>
                  <label className={labelClass}>
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={inputClass}
                  />

                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className={labelClass}>
                    State *
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={inputClass}
                  />

                  {errors.state && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.state}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <label className={labelClass}>
                    PIN Code *
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    placeholder="6-digit PIN code"
                    className={inputClass}
                  />

                  {errors.pincode && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit - Mobile */}
              <div className="mt-8 lg:hidden">
                <button
                  type="submit"
                  className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-md bg-[#29231F] px-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-none hover:bg-[#29231F] active:bg-[#29231F] focus:bg-[#29231F]"
                >
                  Place Order
                  <span className="text-base">→</span>
                </button>
              </div>
            </section>

            {/* RIGHT - ORDER SUMMARY */}
            <aside className="rounded-xl border border-[#E5DACE] bg-[#FBF6EF] p-5 shadow-sm sm:p-8 lg:sticky lg:top-24 lg:p-9">

              <h2 className="mb-7 text-2xl font-bold tracking-tight text-[#171411]">
                Order Summary
              </h2>

              {/* Products */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant || "default"}`}
                    className="flex gap-4 border-b border-[#D5CCC1] pb-6"
                  >
                    <div className="h-[105px] w-[105px] shrink-0 overflow-hidden rounded-lg bg-[#EAE3DA] sm:h-[125px] sm:w-[125px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-bold leading-6 text-[#1F1B18] sm:text-base">
                          {item.name}
                        </h3>

                        {item.variant && (
                          <p className="mt-1 text-[11px] font-medium text-[#756B62]">
                            Finish: {item.variant}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <p className="text-xs font-medium text-[#4A4038]">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-base font-bold text-[#171411]">
                          ₹
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="space-y-4 border-b border-[#D5CCC1] py-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#29231F]">
                    Subtotal ({cartCount} items)
                  </span>

                  <span className="text-sm font-bold text-[#171411]">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between gap-3 py-6">
                <span className="text-xl font-bold text-[#171411]">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#171411] sm:text-3xl">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Submit - Desktop */}
              <button
                type="submit"
                className="hidden min-h-[54px] w-full items-center justify-center gap-3 rounded-md bg-[#29231F] px-5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white transition-none hover:bg-[#29231F] active:bg-[#29231F] focus:bg-[#29231F] lg:flex"
              >
                Place Order
                <span className="text-base">→</span>
              </button>

              <p className="mt-5 text-center text-[11px] font-medium text-[#756B62]">
                ♧ Your information is safe and secure.
              </p>

              <Link
                href="/cart"
                className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#29231F] transition hover:text-[#A88955]"
              >
                ← Back to Shopping Cart
              </Link>
            </aside>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-9 text-center text-[11px] font-medium tracking-wide text-[#756B62]">
          © 2026 NEOLEN FURNITURE
          <span className="mx-2">•</span>
          Quality Furniture for Modern Living
        </div>
      </div>
    </main>
  );
}
