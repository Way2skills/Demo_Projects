"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/catalog";
import {
  addCartItem,
  CART_CHECKOUT_NOW_EVENT,
  setCheckoutNowItem,
} from "@/services/cart";
import type { CartItem } from "@/types/cart";
import styles from "./product-purchase-options.module.css";

export default function ProductPurchaseOptions({
  product,
}: {
  product: Product;
}) {
  const [selectedColor, setSelectedColor] = useState(
    product.swatches[0]?.name ?? "",
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  function getCartItem(): CartItem | null {
    if (!selectedColor) {
      setError("Please select a colour.");
      return null;
    }

    if (product.sizes?.length && !selectedSize) {
      setError("Please select a size.");
      return null;
    }

    return {
      productId: product.id,
      color: selectedColor,
      ...(selectedSize ? { size: selectedSize } : {}),
      quantity,
    };
  }

  function addToCart() {
    const item = getCartItem();
    if (!item) {
      return;
    }

    try {
      addCartItem(item);
      setError("");
    } catch (addError) {
      setError(
        addError instanceof Error
          ? addError.message
          : "The item could not be added to your bag.",
      );
    }
  }

  function buyNow() {
    const item = getCartItem();
    if (!item) {
      return;
    }

    try {
      setCheckoutNowItem(item);
      window.dispatchEvent(new Event(CART_CHECKOUT_NOW_EVENT));
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Quick checkout could not be started.",
      );
    }
  }

  return (
    <div className={styles.options}>
      <fieldset className={styles.optionGroup}>
        <legend>
          Colour{selectedColor ? ` · ${selectedColor}` : ""}
        </legend>
        <div className={styles.swatches}>
          {product.swatches.map((swatch) => (
            <button
              aria-label={`Select ${swatch.name}`}
              aria-pressed={selectedColor === swatch.name}
              className={styles.swatchButton}
              key={swatch.name}
              onClick={() => {
                setSelectedColor(swatch.name);
                setError("");
              }}
              title={swatch.name}
              type="button"
            >
              <span
                aria-hidden="true"
                className={styles.swatch}
                style={{ backgroundColor: swatch.color }}
              />
            </button>
          ))}
        </div>
      </fieldset>

      {product.sizes?.length ? (
        <fieldset className={styles.optionGroup}>
          <legend>Size</legend>
          <div className={styles.sizes}>
            {product.sizes.map((size) => (
              <button
                aria-pressed={selectedSize === size}
                className={styles.sizeButton}
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setError("");
                }}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
          {product.sizeChartUrl && (
            <a className={styles.sizeChart} href={product.sizeChartUrl}>
              Size Chart
            </a>
          )}
        </fieldset>
      ) : null}

      <div className={styles.quantityRow}>
        <span>Quantity</span>
        <div aria-label="Quantity" className={styles.quantity}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
          >
            <Minus aria-hidden="true" size={14} />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQuantity((value) => value + 1)}
            type="button"
          >
            <Plus aria-hidden="true" size={14} />
          </button>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.actions}>
        <button className={styles.addButton} onClick={addToCart} type="button">
          Add to Cart
        </button>
        <button className={styles.buyButton} onClick={buyNow} type="button">
          Buy It Now
        </button>
      </div>
    </div>
  );
}
