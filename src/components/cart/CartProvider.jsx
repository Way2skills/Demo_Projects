
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved cart before enabling localStorage updates
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("neolen-cart");

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart only after initial loading
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("neolen-cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.variant === product.variant
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.variant === product.variant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (id, variant) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, variant) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.variant === variant
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, variant) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.variant === variant)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    isLoaded,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
