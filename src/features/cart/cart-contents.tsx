"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice, getProductById } from "@/services/catalog";
import {
  getCheckoutNowItem,
  getCartItems,
  getCartSubtotal,
  removeCartItem,
} from "@/services/cart";
import type { CartItem } from "@/types/cart";
import CheckoutContent from "@/features/checkout/checkout-content";
import styles from "@/features/commerce/commerce.module.css";

export default function CartContents({
  startCheckout = null,
}: {
  startCheckout?: "cart" | "now" | null;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(
    startCheckout !== null,
  );

  useEffect(() => {
    try {
      if (startCheckout === "now") {
        const item = getCheckoutNowItem();
        if (!item) {
          setError(
            "Your quick checkout selection has expired. Please select the product again.",
          );
        } else {
          setItems([item]);
        }
      } else {
        setItems(getCartItems());
      }
      setCheckoutOpen(startCheckout !== null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Your bag could not be loaded.",
      );
    } finally {
      setIsReady(true);
    }
  }, [startCheckout]);

  function backToBag() {
    setCheckoutOpen(false);
    try {
      setItems(getCartItems());
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Your bag could not be loaded.",
      );
    }
  }

  function removeItem(index: number) {
    try {
      removeCartItem(index);
      setItems(getCartItems());
      setError("");
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : "The item could not be removed.",
      );
    }
  }

  const subtotal = getCartSubtotal(items);

  if (!isReady) {
    return <p className={styles.notice}>Loading your bag…</p>;
  }

  if (checkoutOpen && !error && items.length > 0) {
    return (
      <CheckoutContent
        items={items}
        onBack={backToBag}
      />
    );
  }

  return (
    <section aria-labelledby="cart-title" className={styles.page}>
      <header className={styles.pageHeading}>
        <span className={styles.kicker}>Your Nool &amp; Zari selection</span>
        <h1 id="cart-title">Shopping Bag</h1>
      </header>
      {error && (
        <>
          <p className={styles.error} role="alert">
            {error}
          </p>
          {checkoutOpen && (
            <button
              className={styles.primaryLink}
              onClick={backToBag}
              type="button"
            >
              Back to shopping bag
            </button>
          )}
        </>
      )}
      {!error && items.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Your bag is waiting for a piece from the atelier.</p>
          <Link className={styles.primaryLink} href="/all-fabrics">
            Explore All Fabrics
          </Link>
        </div>
      ) : (
        !error && (
          <div className={styles.cartLayout}>
            <div className={styles.itemList}>
              {items.map((item, index) => {
                const product = getProductById(item.productId);
                if (!product) {
                  return null;
                }

                return (
                  <article className={styles.cartItem} key={`${item.productId}-${index}`}>
                    <div className={styles.itemImage}>
                      <Image
                        alt={product.imageAlt}
                        fill
                        sizes="120px"
                        src={product.image}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <p className={styles.brand}>{product.origin}</p>
                      <h2>{product.name}</h2>
                      <p className={styles.variant}>
                        Colour: {item.color}
                        {item.size ? ` · Size: ${item.size}` : ""}
                      </p>
                      <p className={styles.variant}>Quantity: {item.quantity}</p>
                      <strong>{formatPrice(product.price * item.quantity)}</strong>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(index)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className={styles.summary}>
              <h2>Order Summary</h2>
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p>Shipping and any applicable taxes are confirmed at checkout.</p>
              <button
                className={styles.primaryLink}
                onClick={() => setCheckoutOpen(true)}
                type="button"
              >
                Continue to Checkout
              </button>
            </aside>
          </div>
        )
      )}
    </section>
  );
}
