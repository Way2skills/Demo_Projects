"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice, getDiscountPercent } from "@/services/catalog";
import {
  addCartItem,
  CART_CHECKOUT_NOW_EVENT,
  setCheckoutNowItem,
} from "@/services/cart";
import useDismissibleLayer from "@/hooks/use-dismissible-layer";
import type { Product } from "@/types/catalog";
import type { CartItem } from "@/types/cart";
import styles from "./quick-view-modal.module.css";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

function getMissingOptions(
  product: Product,
  color: string | null,
  size: string | null,
): string[] {
  const missing: string[] = [];
  if (product.swatches.length > 0 && !color) {
    missing.push("colour");
  }
  if (product.sizes?.length && !size) {
    missing.push("size");
  }
  return missing;
}

export default function QuickViewModal({
  product,
  onClose,
}: QuickViewModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.swatches[0]?.name ?? null,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] ?? null,
  );
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  useDismissibleLayer(true, dialogRef, onClose);

  useEffect(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        document.querySelectorAll<HTMLElement>(
          '[role="dialog"] button:not([disabled]), [role="dialog"] a[href]',
        );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const missingOptions = getMissingOptions(
    product,
    selectedColor,
    selectedSize,
  );
  const canPurchase = missingOptions.length === 0;
  const discountPercent = getDiscountPercent(product);

  function getCartItem(): CartItem | null {
    if (!canPurchase) {
      setFeedback(`Please select a ${missingOptions.join(" and ")}.`);
      return null;
    }

    if (product.swatches.length > 0 && !selectedColor) {
      return null;
    }

    return {
      productId: product.id,
      color: selectedColor ?? product.swatches[0]?.name ?? "",
      ...(selectedSize ? { size: selectedSize } : {}),
      quantity,
    };
  }

  function addToBag() {
    const item = getCartItem();
    if (!item) {
      return;
    }

    try {
      addCartItem(item);
      onClose();
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
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
      onClose();
      window.dispatchEvent(new Event(CART_CHECKOUT_NOW_EVENT));
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Quick checkout could not be started.",
      );
    }
  }

  return (
    <div className={styles.backdrop}>
      <section
        aria-labelledby="quick-view-title"
        aria-modal="true"
        className={styles.dialog}
        ref={dialogRef}
        role="dialog"
      >
        <div className={styles.mobileHeader}>
          <span aria-hidden="true">Choose Options</span>
          <button
            aria-label="Close quick view"
            className={styles.closeButton}
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={21} strokeWidth={1.5} />
          </button>
        </div>
        <div className={styles.image}>
          <Image
            alt={product.imageAlt}
            className={styles.imageContent}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 52vw"
            src={product.image}
          />
          {discountPercent !== undefined && (
            <span className={styles.saleBadge}>{discountPercent}% Off</span>
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.brand}>{product.origin}</p>
          <h2 className={styles.title} id="quick-view-title">
            {product.name}
          </h2>
          <div className={styles.priceRow}>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            {product.compareAtPrice !== undefined && (
              <p className={styles.compareAtPrice}>
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>

          <div
            className={`${styles.variantOptions}${product.sizes?.length ? "" : ` ${styles.variantOptionsSingle}`}`}
          >
            {product.sizes?.length ? (
              <fieldset className={styles.optionGroup}>
                <legend>Size</legend>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      aria-pressed={selectedSize === size}
                      className={styles.sizeOption}
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setFeedback("");
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

            {product.swatches.length > 0 && (
              <fieldset className={styles.optionGroup}>
                <legend>
                  Colour{selectedColor ? ` · ${selectedColor}` : ""}
                </legend>
                <div className={styles.colorOptions}>
                  {product.swatches.map((swatch) => (
                    <button
                      aria-label={swatch.name}
                      aria-pressed={selectedColor === swatch.name}
                      className={styles.colorOption}
                      key={swatch.name}
                      onClick={() => {
                        setSelectedColor(swatch.name);
                        setFeedback("");
                      }}
                      title={swatch.name}
                      type="button"
                    >
                      {swatch.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
          </div>

          <div className={styles.quantityRow}>
            <span>Quantity</span>
            <div aria-label="Quantity" className={styles.quantityControl}>
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

          {missingOptions.length > 0 && (
            <p className={styles.validationHint}>
              Select a {missingOptions.join(" and ")} to continue.
            </p>
          )}
          <div className={styles.actions}>
            <button
              className={styles.primaryAction}
              disabled={!canPurchase}
              onClick={addToBag}
              type="button"
            >
              Add to Cart
            </button>
            <button
              className={styles.secondaryAction}
              disabled={!canPurchase}
              onClick={buyNow}
              type="button"
            >
              Buy It Now
            </button>
          </div>
          <p aria-live="polite" className={styles.feedback} role="status">
            {feedback}
          </p>
          <Link className={styles.detailsLink} href={`/products/${product.id}`}>
            View Details
          </Link>
        </div>
      </section>
    </div>
  );
}
