"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { formatPrice, getProductById } from "@/services/catalog";
import {
  clearCheckoutNowItem,
  getCartSubtotal,
  saveCartItems,
} from "@/services/cart";
import type { CartItem } from "@/types/cart";
import styles from "@/features/commerce/commerce.module.css";

const INCLUDED_TAX_RATE = 0.18;

interface CheckoutContentProps {
  items: CartItem[];
  onBack?: () => void;
  onSubmitted?: () => void;
  compact?: boolean;
}

function formatTaxAmount(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function CheckoutContent({
  items,
  onBack,
  onSubmitted,
  compact = false,
}: CheckoutContentProps) {
  const checkoutId = useId();
  const [phone, setPhone] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountFeedback, setDiscountFeedback] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState<number | null>(null);
  const deliveryFormId = `delivery-details-${checkoutId}`;
  const discountCodeId = `discount-code-${checkoutId}`;
  const titleId = `checkout-title-${checkoutId}`;
  const subtotal = getCartSubtotal(items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const includedTax = subtotal - subtotal / (1 + INCLUDED_TAX_RATE);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedTotal(subtotal);
    saveCartItems([]);
    clearCheckoutNowItem();
    setOrderSubmitted(true);
    onSubmitted?.();
  }

  function handleDiscountSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDiscountFeedback(
      discountCode.trim()
        ? "Discount codes are not enabled in this checkout preview."
        : "Enter a discount code to apply it.",
    );
  }

  if (orderSubmitted) {
    return (
      <section
        aria-labelledby={titleId}
        className={`${styles.page}${compact ? ` ${styles.embeddedCheckout}` : ""}`}
      >
        {compact ? (
          <h1 className="visually-hidden" id={titleId}>
            Order submitted successfully
          </h1>
        ) : (
          <header className={styles.pageHeading}>
            <h1 id={titleId}>Order submitted successfully</h1>
          </header>
        )}
        <div className={styles.checkoutSuccess}>
          <span aria-hidden="true" className={styles.checkoutSuccessIcon}>
            <Check size={24} />
          </span>
          <h2>Thank you for your order</h2>
          <p>
            Your checkout details have been submitted. This is a preview only:
            no payment was processed and no real order was placed.
          </p>
          <strong>Order total: {formatPrice(submittedTotal ?? subtotal)}</strong>
          {onBack && (
            <button
              className={styles.payNowButton}
              onClick={onBack}
              type="button"
            >
              Back to shopping bag
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={titleId}
      className={`${styles.page}${compact ? ` ${styles.embeddedCheckout}` : ""}`}
    >
      {compact ? (
        <h1 className="visually-hidden" id={titleId}>
          Checkout
        </h1>
      ) : (
        <header className={styles.pageHeading}>
          {onBack && (
            <button
              className={styles.checkoutBackButton}
              onClick={onBack}
              type="button"
            >
              Back to shopping bag
            </button>
          )}
          <h1 id={titleId}>Checkout</h1>
        </header>
      )}
      <div
        className={`${styles.checkoutLayout} ${styles.checkoutLayoutFlow}${compact ? ` ${styles.checkoutLayoutCompact}` : ""}`}
      >
        <aside
          className={`${styles.checkoutSummary} ${styles.checkoutSummaryFlow}${compact ? ` ${styles.checkoutSummaryCompact}` : ""}`}
        >
          <h2>Order Summary</h2>
          <ul className={styles.checkoutItemList}>
            {items.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) {
                return null;
              }
              return (
                <li
                  className={styles.checkoutItem}
                  key={`${item.productId}-${index}`}
                >
                  <div className={styles.checkoutItemImage}>
                    <Image
                      alt={product.imageAlt}
                      fill
                      loading={index < 3 ? "eager" : "lazy"}
                      sizes="72px"
                      src={product.image}
                    />
                    <span className={styles.checkoutItemQuantity}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className={styles.checkoutItemInfo}>
                    <p>{product.name}</p>
                    <span>
                      {item.size ? `${item.size} / ` : ""}
                      {item.color}
                    </span>
                  </div>
                  <strong className={styles.checkoutItemPrice}>
                    {formatPrice(product.price * item.quantity)}
                  </strong>
                </li>
              );
            })}
          </ul>
          <div className={styles.checkoutTotals}>
            <div className={styles.checkoutTotalRow}>
              <span>
                Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <form
              className={`${styles.discountForm} ${styles.checkoutCouponFlow}`}
              onSubmit={handleDiscountSubmit}
            >
              <label className="visually-hidden" htmlFor={discountCodeId}>
                Discount code
              </label>
              <input
                autoComplete="off"
                id={discountCodeId}
                onChange={(event) => {
                  setDiscountCode(event.target.value);
                  setDiscountFeedback("");
                }}
                placeholder="Discount code"
                value={discountCode}
              />
              <button type="submit">Apply</button>
            </form>
            {discountFeedback && (
              <p
                aria-live="polite"
                className={styles.discountFeedback}
                role="status"
              >
                {discountFeedback}
              </p>
            )}
            <div className={styles.checkoutGrandTotal}>
              <span>Total</span>
              <strong>
                <span>INR</span>
                {formatPrice(subtotal)}
              </strong>
            </div>
            <p>Including {formatTaxAmount(includedTax)} in taxes</p>
          </div>
        </aside>
        <form
          className={`${styles.checkoutForm} ${styles.checkoutFormFlow}${compact ? ` ${styles.checkoutFormCompact}` : ""}`}
          id={deliveryFormId}
          onSubmit={handleSubmit}
        >
          <h2>Delivery details</h2>
          <label>
            Full name
            <input autoComplete="name" name="name" required />
          </label>
          <label>
            Email address
            <input autoComplete="email" name="email" required type="email" />
          </label>
          <label>
            Phone number
            <input
              autoComplete="tel"
              inputMode="numeric"
              maxLength={10}
              minLength={10}
              name="phone"
              onChange={(event) =>
                setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
              }
              pattern="[0-9]{10}"
              required
              type="tel"
              value={phone}
              title="Enter a 10-digit phone number"
            />
          </label>
          <label>
            Delivery address
            <textarea
              autoComplete="street-address"
              name="address"
              required
              rows={3}
            />
          </label>
        </form>
        <p className={styles.checkoutDisclaimer}>
          Preview only — Pay Now will not charge you or place an order.
        </p>
        <button
          className={styles.payNowButton}
          form={deliveryFormId}
          type="submit"
        >
          Pay Now
        </button>
      </div>
    </section>
  );
}
