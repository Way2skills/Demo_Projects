
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";

const CART_KEY = "babyhunt-cart";
const FREE_DELIVERY_LIMIT = 999;

// Different color/size combinations are treated as separate cart items.
const getCartItemKey = (item) =>
  item.cartItemId ||
  `${item.id}-${item.selectedColor || ""}-${item.selectedSize || ""}`;

const getSavedCart = () => {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export default function CartDrawer() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState(getSavedCart);

  const syncCart = useCallback(() => {
    setCart(getSavedCart());
  }, []);

  const saveCart = useCallback((updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("babyhunt-cart-updated"));
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      syncCart();
      setIsOpen(true);
    };

    const handleCartUpdate = () => syncCart();

    window.addEventListener("babyhunt-open-cart", handleOpen);
    window.addEventListener("babyhunt-cart-updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("babyhunt-open-cart", handleOpen);
      window.removeEventListener("babyhunt-cart-updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, [syncCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeDrawer = () => setIsOpen(false);

  const updateQuantity = (itemKey, change) => {
    const updatedCart = cart.map((item) => {
      if (getCartItemKey(item) === itemKey) {
        return {
          ...item,
          quantity: Math.max(
            1,
            Number(item.quantity || 1) + change
          ),
        };
      }

      return item;
    });

    saveCart(updatedCart);
  };

  const removeItem = (itemKey) => {
    const updatedCart = cart.filter(
      (item) => getCartItemKey(item) !== itemKey
    );

    saveCart(updatedCart);
  };

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const remaining = Math.max(0, FREE_DELIVERY_LIMIT - subtotal);
  const hasFreeDelivery = subtotal >= FREE_DELIVERY_LIMIT;

  const goToCart = () => {
    closeDrawer();
    router.push("/cart");
  };

  const goToCheckout = () => {
    closeDrawer();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="bh-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          <motion.aside
            className="bh-cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            {/* Header */}
            <div className="bh-drawer-header">
              <div>
                <h2>Your Shopping Bag</h2>
                <p>{totalItems} items in your cart</p>
              </div>

              <button
                type="button"
                className="bh-drawer-close"
                onClick={closeDrawer}
                aria-label="Close cart"
              >
                <X size={22} />
              </button>
            </div>

            {/* Delivery Message */}
            <div className="bh-drawer-delivery">
              <Truck size={19} />
              <span>
                {hasFreeDelivery
                  ? "Yay! You have unlocked free delivery."
                  : `Add ₹${remaining} more for free delivery.`}
              </span>
            </div>

            {/* Cart Items */}
            <div className="bh-drawer-items">
              {cart.length === 0 ? (
                <div className="bh-empty-cart">
                  <div className="bh-empty-icon">
                    <ShoppingBag size={38} />
                  </div>

                  <h3>Your cart is waiting!</h3>
                  <p>Looks like you have not added anything yet.</p>

                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="bh-continue-btn"
                  >
                    Continue Shopping <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const itemKey = getCartItemKey(item);

                  return (
                    <div className="bh-cart-item" key={itemKey}>
                      <div className="bh-cart-image">
                        <Image
                          src={item.image || "/images/placeholder.jpg"}
                          alt={item.name || "Baby product"}
                          width={82}
                          height={88}
                          unoptimized
                        />
                      </div>

                      <div className="bh-cart-info">
                        <h3>{item.name}</h3>

                        <p className="bh-cart-price">
                          ₹{item.price}
                        </p>

                        {/* Selected Color and Size */}
                        {(item.selectedColor || item.selectedSize) && (
                          <div className="bh-cart-variants">
                            {item.selectedColor && (
                              <p>
                                <span>Color:</span>{" "}
                                <strong>{item.selectedColor}</strong>
                              </p>
                            )}

                            {item.selectedSize && (
                              <p>
                                <span>Size:</span>{" "}
                                <strong>{item.selectedSize}</strong>
                              </p>
                            )}
                          </div>
                        )}

                        {/* Quantity and Remove */}
                        <div className="bh-cart-actions">
                          <div className="bh-quantity-control">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(itemKey, -1)
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span>{item.quantity || 1}</span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(itemKey, 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="bh-remove-btn"
                            onClick={() => removeItem(itemKey)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <strong className="bh-item-total">
                        ₹
                        {Number(item.price || 0) *
                          Number(item.quantity || 1)}
                      </strong>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="bh-drawer-footer">
                <div className="bh-subtotal">
                  <span>Subtotal</span>
                  <strong>₹{subtotal}</strong>
                </div>

                <p className="bh-tax-note">
                  Shipping and taxes calculated at checkout.
                </p>

                <button
                  type="button"
                  className="bh-checkout-btn"
                  onClick={goToCheckout}
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className="bh-view-cart-btn"
                  onClick={goToCart}
                >
                  View Cart
                </button>

                <button
                  type="button"
                  className="bh-continue-shopping-btn"
                  onClick={closeDrawer}
                >
                  <ArrowRight size={16} />
                  Continue Shopping
                </button>

                <div className="bh-secure-note">
                  <ShieldCheck size={16} />
                  <span>Safe and secure shopping</span>
                </div>
              </div>
            )}
          </motion.aside>

          {/* Styles */}
          <style jsx global>{`
            .bh-drawer-overlay {
              position: fixed;
              inset: 0;
              background: rgba(35, 25, 28, 0.42);
              backdrop-filter: blur(3px);
              z-index: 9998;
            }

            .bh-cart-drawer {
              position: fixed;
              top: 0;
              right: 0;
              width: min(460px, 100%);
              height: 100dvh;
              background: #fbfaf5;
              z-index: 9999;
              display: flex;
              flex-direction: column;
              box-shadow: -10px 0 40px rgba(0, 0, 0, 0.12);
              color: #44343a;
            }

            .bh-drawer-header {
              padding: 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #e6e1d6;
            }

            .bh-drawer-header h2 {
              font-size: 23px;
              margin: 0 0 5px;
              color: #513942;
            }

            .bh-drawer-header p {
              margin: 0;
              color: #827c70;
              font-size: 13px;
            }

            .bh-drawer-close {
              width: 39px;
              height: 39px;
              border: none;
              border-radius: 50%;
              background: #e8eee6;
              color: #744d5a;
              display: grid;
              place-items: center;
              cursor: pointer;
            }

            .bh-drawer-delivery {
              margin: 16px 20px 5px;
              padding: 13px;
              background: #efeee7;
              border-radius: 10px;
              color: #865c68;
              display: flex;
              align-items: center;
              gap: 10px;
              font-size: 13px;
            }

            .bh-drawer-items {
              flex: 1;
              overflow-y: auto;
              padding: 12px 20px;
            }

            .bh-cart-item {
              display: flex;
              align-items: center;
              gap: 13px;
              padding: 17px 0;
              border-bottom: 1px solid #f0e5e3;
            }

            .bh-cart-image {
              width: 82px;
              height: 88px;
              flex-shrink: 0;
              border-radius: 11px;
              overflow: hidden;
              background: #f7eeee;
            }

            .bh-cart-image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .bh-cart-info {
              flex: 1;
              min-width: 0;
            }

            .bh-cart-info h3 {
              font-size: 14px;
              margin: 0 0 7px;
              color: #513942;
            }

            .bh-cart-price {
              color: #54745c;
              font-weight: 600;
              margin: 0 0 9px;
              font-size: 14px;
            }

            .bh-cart-variants {
              margin: 0 0 11px;
              display: flex;
              flex-direction: column;
              gap: 4px;
            }

            .bh-cart-variants p {
              margin: 0;
              color: #8e737b;
              font-size: 12px;
            }

            .bh-cart-variants strong {
              color: #624650;
              font-weight: 600;
            }

            .bh-cart-actions {
              display: flex;
              align-items: center;
              gap: 15px;
            }

            .bh-quantity-control {
              display: flex;
              align-items: center;
              gap: 12px;
              border: 1px solid #ead6d9;
              border-radius: 7px;
              padding: 4px 7px;
            }

            .bh-quantity-control button,
            .bh-remove-btn {
              border: none;
              background: transparent;
              color: #855d69;
              cursor: pointer;
              display: flex;
              align-items: center;
            }

            .bh-quantity-control span {
              font-size: 13px;
              min-width: 12px;
              text-align: center;
            }

            .bh-remove-btn {
              color: #54745c;
            }

            .bh-item-total {
              font-size: 13px;
              white-space: nowrap;
              color: #513942;
              align-self: flex-start;
              padding-top: 4px;
            }

            .bh-drawer-footer {
              padding: 19px 22px 15px;
              border-top: 1px solid #f0e4e3;
              background: #fbfaf5;
            }

            .bh-subtotal {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 16px;
              color: #513942;
            }

            .bh-subtotal strong {
              font-size: 21px;
            }

            .bh-tax-note {
              font-size: 11px;
              color: #9c858a;
              margin: 7px 0 15px;
            }

            .bh-checkout-btn,
            .bh-view-cart-btn {
              width: 100%;
              min-height: 47px;
              border-radius: 9px;
              font-weight: 600;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 9px;
              font-size: 14px;
            }

            .bh-checkout-btn {
              border: none;
              background: #54745c;
              color: white;
            }

            .bh-view-cart-btn {
              margin-top: 9px;
              background: white;
              border: 1px solid #dce5d8;
              color: #805564;
            }

            .bh-continue-shopping-btn {
              width: 100%;
              border: none;
              background: transparent;
              color: #936a76;
              padding: 15px 8px 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              cursor: pointer;
              font-size: 13px;
              font-weight: 600;
            }

            .bh-continue-shopping-btn svg {
              transform: rotate(180deg);
            }

            .bh-secure-note {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 7px;
              color: #9a858a;
              font-size: 11px;
              padding-top: 5px;
            }

            .bh-empty-cart {
              min-height: 330px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }

            .bh-empty-icon {
              width: 78px;
              height: 78px;
              border-radius: 50%;
              background: #f8eaea;
              color: #54745c;
              display: grid;
              place-items: center;
              margin-bottom: 17px;
            }

            .bh-empty-cart h3 {
              color: #513942;
              margin: 0 0 8px;
            }

            .bh-empty-cart p {
              color: #827c70;
              font-size: 13px;
              margin: 0 0 20px;
            }

            .bh-continue-btn {
              border: none;
              background: #54745c;
              color: white;
              padding: 12px 19px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
              cursor: pointer;
            }

            @media (max-width: 480px) {
              .bh-drawer-header {
                padding: 19px;
              }

              .bh-drawer-items {
                padding: 10px 15px;
              }

              .bh-drawer-footer {
                padding: 15px;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
