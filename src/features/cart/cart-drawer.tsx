"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { formatPrice, getProductById } from "@/services/catalog";
import CheckoutContent from "@/features/checkout/checkout-content";
import {
  getCheckoutNowItem,
  getCartItems,
  getCartSubtotal,
  removeCartItem,
  saveCartItems,
} from "@/services/cart";
import type { CartItem } from "@/types/cart";
import useDismissibleLayer from "@/hooks/use-dismissible-layer";
import styles from "./cart-drawer.module.css";

interface CartDrawerProps {
  dismissTriggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  onClose: () => void;
  view: "cart" | "checkout";
  checkoutSource: "cart" | "now";
  onViewChange: (view: "cart" | "checkout") => void;
  onBackToCart: () => void;
}

export default function CartDrawer({
  dismissTriggerRef,
  open,
  onClose,
  view,
  checkoutSource,
  onViewChange,
  onBackToCart,
}: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useDismissibleLayer(open, dialogRef, onClose, dismissTriggerRef);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setIsReady(false);
    setError("");
    setOrderSubmitted(false);

    function loadItems() {
      try {
        if (checkoutSource === "now") {
          const item = getCheckoutNowItem();
          if (!item) {
            setItems([]);
            setError(
              "Your quick checkout selection has expired. Please select the product again.",
            );
            return;
          }
          setItems([item]);
        } else {
          setItems(getCartItems());
        }
        setError("");
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Your bag could not be loaded.",
        );
      } finally {
        setIsReady(true);
      }
    }

    function handleBagChange(event: Event) {
      if (event.type === "nool-bag-change") {
        loadItems();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements =
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea',
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

    loadItems();
    closeButtonRef.current?.focus();
    window.addEventListener("nool-bag-change", handleBagChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("nool-bag-change", handleBagChange);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [checkoutSource, onClose, open]);

  function changeQuantity(index: number, quantity: number) {
    const nextItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, quantity } : item,
    );

    try {
      saveCartItems(nextItems);
      setItems(nextItems);
      setError("");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "The bag quantity could not be updated.",
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

  function backToCart() {
    setOrderSubmitted(false);
    onBackToCart();
  }

  if (!open) {
    return null;
  }

  const subtotal = getCartSubtotal(items);

  return (
    <div className={styles.backdrop}>
      <aside
        aria-labelledby="cart-drawer-title"
        aria-modal="true"
        className={styles.drawer}
        id="cart-drawer"
        ref={dialogRef}
        role="dialog"
      >
        <header className={styles.header}>
          <h2 id="cart-drawer-title">
            {view === "checkout" ? "Checkout" : "Cart"}
          </h2>
          {view === "checkout" && !orderSubmitted && (
            <button
              className={styles.backButton}
              onClick={backToCart}
              type="button"
            >
              Back to bag
            </button>
          )}
          <button
            aria-label="Close cart"
            className={styles.closeButton}
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className={styles.items}>
          {!isReady ? (
            <p className={styles.emptyMessage}>Loading your bag…</p>
          ) : error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : view === "checkout" ? (
            <CheckoutContent
              compact
              items={items}
              onBack={backToCart}
              onSubmitted={() => setOrderSubmitted(true)}
            />
          ) : items.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Your bag is empty.</p>
              <Link href="/all-fabrics" onClick={onClose}>
                Explore All Fabrics
              </Link>
            </div>
          ) : (
            items.map((item, index) => {
              const product = getProductById(item.productId);
              if (!product) {
                return null;
              }

              return (
                <article
                  className={styles.item}
                  key={`${item.productId}-${item.color}-${item.size ?? ""}-${index}`}
                >
                  <Link
                    aria-label={`View ${product.name}`}
                    className={styles.image}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                  >
                    <Image
                      alt={product.imageAlt}
                      fill
                      sizes="112px"
                      src={product.image}
                    />
                  </Link>
                  <div className={styles.itemDetails}>
                    <p className={styles.brand}>{product.origin}</p>
                    <h3>{product.name}</h3>
                    <p className={styles.price}>{formatPrice(product.price)}</p>
                    <p className={styles.variant}>
                      {item.size ? `${item.size} / ` : ""}
                      {item.color}
                    </p>
                    <div className={styles.itemActions}>
                      <div aria-label="Quantity" className={styles.quantity}>
                        <button
                          aria-label={`Decrease ${product.name} quantity`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            changeQuantity(index, item.quantity - 1)
                          }
                          type="button"
                        >
                          <Minus aria-hidden="true" size={14} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() =>
                            changeQuantity(index, item.quantity + 1)
                          }
                          type="button"
                        >
                          <Plus aria-hidden="true" size={14} />
                        </button>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(index)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {view === "cart" && (
          <footer className={styles.footer}>
            <p className={styles.shippingNote}>
              Taxes and shipping calculated at checkout
            </p>
            <button
              className={`${styles.checkoutButton}${!isReady || error || items.length === 0 ? ` ${styles.checkoutDisabled}` : ""}`}
              disabled={!isReady || Boolean(error) || items.length === 0}
              onClick={() => {
                setOrderSubmitted(false);
                onViewChange("checkout");
              }}
              type="button"
            >
              Checkout <span aria-hidden="true">·</span> {formatPrice(subtotal)}
            </button>
            <Link className={styles.viewBagLink} href="/cart" onClick={onClose}>
              View full bag
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
