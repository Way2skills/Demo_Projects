"use client";

import { useEffect, useRef, useState } from "react";

const initialDetails = {
  fullName: "",
  email: "",
  mobile: "",
  building: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pinCode: "",
  addressType: "Home",
};

const inputClassName =
  "mt-2 min-h-12 w-full border border-[#D2AD86]/70 bg-[#FBFAF7] px-4 py-3 text-sm text-[#35332F] outline-none transition-colors placeholder:text-[#A29B91] focus:border-[#9B8055] focus:ring-2 focus:ring-[#9B8055]/30";

const paymentMethods = [
  {
    value: "upi",
    label: "UPI",
    description: "Demo selection only; no UPI ID or payment is collected.",
  },
  {
    value: "card",
    label: "Credit Card / Debit Card",
    description: "Demo selection only; no card details are requested.",
  },
  {
    value: "netbanking",
    label: "Net Banking",
    description: "Demo selection only; no bank credentials are requested.",
  },
  {
    value: "cod",
    label: "Cash on Delivery (COD)",
    description: "Demo selection only; no COD order is sent to a backend.",
  },
];

function validateDetails(details, paymentMethod) {
  const errors = {};

  if (details.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  const normalizedMobile = details.mobile.replace(/[\s-]/g, "");
  if (!/^(?:\+91)?[6-9]\d{9}$/.test(normalizedMobile)) {
    errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!details.building.trim()) {
    errors.building = "Enter your house, flat or building.";
  }

  if (!details.street.trim()) {
    errors.street = "Enter your street or area.";
  }

  if (!details.city.trim()) {
    errors.city = "Enter your city.";
  }

  if (!details.state.trim()) {
    errors.state = "Enter your state.";
  }

  if (!/^[1-9]\d{5}$/.test(details.pinCode.trim())) {
    errors.pinCode = "Enter a valid 6-digit PIN code.";
  }

  if (!["Home", "Work", "Other"].includes(details.addressType)) {
    errors.addressType = "Choose an address type.";
  }

  if (!paymentMethods.some((method) => method.value === paymentMethod)) {
    errors.paymentMethod = "Choose a payment method.";
  }

  return errors;
}

function CheckoutField({ id, label, error, optional = false, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.12em] text-[#6B4933]"
      >
        {label}
        {optional ? (
          <span className="ml-1 font-normal normal-case tracking-normal text-[#8A8176]">
            (optional)
          </span>
        ) : (
          <span aria-hidden="true" className="ml-1 text-[#A77B52]">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs leading-5 text-[#8A4B3A]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutForm({
  cart,
  hasValidPrices,
  onDemoOrderConfirmed,
}) {
  const [details, setDetails] = useState(initialDetails);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionLock = useRef(false);
  const submissionTimer = useRef(null);

  useEffect(
    () => () => {
      if (submissionTimer.current !== null) {
        window.clearTimeout(submissionTimer.current);
      }
    },
    [],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((currentDetails) => ({ ...currentDetails, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
  };

  const handlePaymentMethodChange = (event) => {
    const { value } = event.target;
    setPaymentMethod(value);
    setErrors((currentErrors) => ({
      ...currentErrors,
      paymentMethod: undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submissionLock.current) return;

    const nextErrors = validateDetails(details, paymentMethod);
    const hasValidCart =
      Array.isArray(cart) &&
      cart.length > 0 &&
      cart.every(
        (item) =>
          item &&
          item.id !== undefined &&
          item.id !== null &&
          Number.isFinite(item.quantity) &&
          item.quantity > 0,
      );

    if (!hasValidCart) {
      nextErrors.cart = "Your cart must contain valid items before checkout.";
    }

    if (!hasValidPrices) {
      nextErrors.prices =
        "Checkout is unavailable because a product price could not be confirmed.";
    }

    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        const focusTargetId =
          firstInvalidField === "paymentMethod"
            ? "payment-upi"
            : firstInvalidField === "cart" || firstInvalidField === "prices"
              ? `${firstInvalidField}-error`
              : firstInvalidField;
        document.getElementById(focusTargetId)?.focus();
      });
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    const selectedMethod = paymentMethods.find(
      (method) => method.value === paymentMethod,
    );
    submissionTimer.current = window.setTimeout(() => {
      submissionTimer.current = null;
      onDemoOrderConfirmed(selectedMethod.label);
    }, 500);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <fieldset
        disabled={isSubmitting}
        className="m-0 min-w-0 space-y-8 border-0 p-0"
      >
      <section aria-labelledby="customer-details-heading">
        <h2
          id="customer-details-heading"
          className="font-serif text-xl text-[#302219] sm:text-2xl"
        >
          Customer details
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <CheckoutField
            id="fullName"
            label="Full name"
            error={errors.fullName}
          >
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={details.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField id="email" label="Email address" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={details.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField id="mobile" label="Mobile number" error={errors.mobile}>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={details.mobile}
              onChange={handleChange}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>
        </div>
      </section>

      <section
        aria-labelledby="delivery-address-heading"
        className="border-t border-[#DED8CD] pt-7"
      >
        <h2
          id="delivery-address-heading"
          className="font-serif text-xl text-[#302219] sm:text-2xl"
        >
          Delivery address
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <CheckoutField
            id="building"
            label="House / Flat / Building"
            error={errors.building}
          >
            <input
              id="building"
              name="building"
              type="text"
              autoComplete="address-line1"
              required
              value={details.building}
              onChange={handleChange}
              aria-invalid={Boolean(errors.building)}
              aria-describedby={
                errors.building ? "building-error" : undefined
              }
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField
            id="street"
            label="Street / Area"
            error={errors.street}
          >
            <input
              id="street"
              name="street"
              type="text"
              autoComplete="address-line2"
              required
              value={details.street}
              onChange={handleChange}
              aria-invalid={Boolean(errors.street)}
              aria-describedby={errors.street ? "street-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField
            id="landmark"
            label="Landmark"
            optional
            error={errors.landmark}
          >
            <input
              id="landmark"
              name="landmark"
              type="text"
              value={details.landmark}
              onChange={handleChange}
              aria-invalid={Boolean(errors.landmark)}
              aria-describedby={
                errors.landmark ? "landmark-error" : undefined
              }
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField id="city" label="City" error={errors.city}>
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              value={details.city}
              onChange={handleChange}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? "city-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField id="state" label="State" error={errors.state}>
            <input
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              required
              value={details.state}
              onChange={handleChange}
              aria-invalid={Boolean(errors.state)}
              aria-describedby={errors.state ? "state-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField
            id="pinCode"
            label="PIN code"
            error={errors.pinCode}
          >
            <input
              id="pinCode"
              name="pinCode"
              type="text"
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[1-9][0-9]{5}"
              maxLength={6}
              required
              value={details.pinCode}
              onChange={handleChange}
              aria-invalid={Boolean(errors.pinCode)}
              aria-describedby={errors.pinCode ? "pinCode-error" : undefined}
              className={inputClassName}
            />
          </CheckoutField>

          <CheckoutField
            id="addressType"
            label="Address type"
            error={errors.addressType}
          >
            <select
              id="addressType"
              name="addressType"
              required
              value={details.addressType}
              onChange={handleChange}
              aria-invalid={Boolean(errors.addressType)}
              aria-describedby={
                errors.addressType ? "addressType-error" : undefined
              }
              className={inputClassName}
            >
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
          </CheckoutField>
        </div>
      </section>

      <fieldset className="border-t border-[#DED8CD] pt-7">
        <legend className="font-serif text-xl text-[#302219] sm:text-2xl">
          Payment method
        </legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {paymentMethods.map((method) => {
            const isSelected = paymentMethod === method.value;
            const radioId = `payment-${method.value}`;

            return (
              <label
                key={method.value}
                htmlFor={radioId}
                className={`flex min-h-24 cursor-pointer items-start gap-3 border px-4 py-4 transition-colors focus-within:ring-2 focus-within:ring-[#9B8055] focus-within:ring-offset-2 focus-within:ring-offset-[#F5F2EC] motion-reduce:transition-none ${
                  isSelected
                    ? "border-[#A97845] bg-[#F8EBDD]/70"
                    : "border-[#DED8CD] bg-[#FBFAF7] hover:border-[#D2AD86]"
                }`}
              >
                <input
                  id={radioId}
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={isSelected}
                  onChange={handlePaymentMethodChange}
                  aria-describedby={
                    errors.paymentMethod
                      ? "paymentMethod-error"
                      : undefined
                  }
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#A97845]"
                      : "border-[#9B8055]/70"
                  }`}
                >
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#A97845]" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#35332F]">
                    {method.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#6D6961]">
                    {method.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.paymentMethod && (
          <p
            id="paymentMethod-error"
            className="mt-2 text-xs leading-5 text-[#8A4B3A]"
            role="alert"
          >
            {errors.paymentMethod}
          </p>
        )}

      </fieldset>

      {errors.cart && (
        <p
          id="cart-error"
          tabIndex={-1}
          className="border border-[#D8B8A7] bg-[#F8EBDD] px-4 py-3 text-sm leading-6 text-[#754332] focus:outline-none"
          role="alert"
        >
          {errors.cart}
        </p>
      )}
      {errors.prices && (
        <p
          id="prices-error"
          tabIndex={-1}
          className="border border-[#D8B8A7] bg-[#F8EBDD] px-4 py-3 text-sm leading-6 text-[#754332] focus:outline-none"
          role="alert"
        >
          {errors.prices}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#302219] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-75 sm:w-auto sm:min-w-56"
      >
        {isSubmitting && (
          <svg
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
      </button>
      </fieldset>
    </form>
  );
}
