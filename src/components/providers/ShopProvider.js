"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ShopContext = createContext(undefined);
const STORAGE_KEY = "crueze-shop-state";

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeWishlist(value) {
  if (!Array.isArray(value)) return [];

  const watchesById = new Map();
  value.forEach((watch) => {
    if (!isRecord(watch) || watch.id === undefined || watch.id === null) return;
    if (!watchesById.has(watch.id)) {
      watchesById.set(watch.id, watch);
    }
  });

  return Array.from(watchesById.values());
}

function normalizeCart(value) {
  if (!Array.isArray(value)) return [];

  const watchesById = new Map();
  value.forEach((watch) => {
    if (!isRecord(watch) || watch.id === undefined || watch.id === null) return;

    const quantity =
      Number.isSafeInteger(watch.quantity) && watch.quantity > 0
        ? watch.quantity
        : 1;
    const existing = watchesById.get(watch.id);

    if (existing) {
      watchesById.set(watch.id, {
        ...existing,
        ...watch,
        quantity: existing.quantity + quantity,
      });
    } else {
      watchesById.set(watch.id, { ...watch, quantity });
    }
  });

  return Array.from(watchesById.values());
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      try {
        const savedState = window.localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          try {
            const parsedState = JSON.parse(savedState);
            if (isRecord(parsedState)) {
              if (isMounted) {
                setCart(normalizeCart(parsedState.cart));
                setWishlist(normalizeWishlist(parsedState.wishlist));
              }
            } else {
              console.warn("Saved shop state has an invalid format.");
            }
          } catch (error) {
            console.warn("Could not parse saved shop state.", error);
          }
        }
      } catch (error) {
        console.error("Could not access saved shop state in localStorage.", error);
      } finally {
        if (isMounted) {
          setHasRestored(true);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasRestored) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, wishlist }),
      );
    } catch (error) {
      console.error("Could not persist shop state to localStorage.", error);
    }
  }, [cart, wishlist, hasRestored]);

  const addToCart = useCallback((watch) => {
    if (!watch || watch.id === undefined || watch.id === null) return;

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === watch.id);
      if (existing) {
        return currentCart.map((item) =>
          item.id === watch.id
            ? { ...watch, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentCart, { ...watch, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  }, []);

  const updateCartQuantity = useCallback((id, quantity) => {
    const nextQuantity = Number(quantity);
    if (!Number.isFinite(nextQuantity)) return;

    if (nextQuantity <= 0) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((watch) => watch.id !== id),
    );
  }, []);

  const openCart = useCallback(() => {
    setWishlistOpen(false);
    setCartOpen(true);
  }, []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openWishlist = useCallback(() => {
    setCartOpen(false);
    setWishlistOpen(true);
  }, []);
  const closeWishlist = useCallback(() => setWishlistOpen(false), []);

  const toggleWishlist = useCallback((watch) => {
    if (!watch || watch.id === undefined || watch.id === null) return;

    setWishlist((currentWishlist) => {
      if (currentWishlist.some((item) => item.id === watch.id)) {
        return currentWishlist.filter((item) => item.id !== watch.id);
      }
      return [...currentWishlist, watch];
    });
  }, []);

  const isInWishlist = useCallback(
    (id) => wishlist.some((watch) => watch.id === id),
    [wishlist],
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      hasRestored,
      cartCount,
      wishlistCount,
      openCart,
      closeCart,
      openWishlist,
      closeWishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
    }),
    [
      cart,
      wishlist,
      cartOpen,
      wishlistOpen,
      hasRestored,
      cartCount,
      wishlistCount,
      openCart,
      closeCart,
      openWishlist,
      closeWishlist,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider.");
  }
  return context;
}
