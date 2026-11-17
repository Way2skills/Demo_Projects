
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}

export default function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("neolenWishlist") || "[]"
      );

      setWishlistItems(Array.isArray(saved) ? saved : []);
    } catch {
      setWishlistItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "neolenWishlist",
      JSON.stringify(wishlistItems)
    );

    window.dispatchEvent(
      new Event("neolen-wishlist-updated")
    );
  }, [wishlistItems, isLoaded]);

  const addToWishlist = (product) => {
    setWishlistItems((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      if (exists) return previous;

      return [...previous, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const toggleWishlist = (product) => {
    setWishlistItems((previous) => {
      const exists = previous.some(
        (item) => item.id === product.id
      );

      return exists
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product];
    });
  };

  const isWishlisted = (id) =>
    wishlistItems.some((item) => item.id === id);

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
