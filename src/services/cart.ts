import { getProductById } from "@/services/catalog";
import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "nool-zari-cart";
const CHECKOUT_NOW_STORAGE_KEY = "nool-zari-checkout-now";
const BAG_CHANGE_EVENT = "nool-bag-change";
export const CART_OPEN_EVENT = "nool-cart-open";
export const CART_CHECKOUT_NOW_EVENT = "nool-checkout-now";

function validateCartItem(value: unknown): CartItem {
  if (typeof value !== "object" || value === null) {
    throw new Error("A saved bag item is invalid.");
  }

  const candidate = value as Record<string, unknown>;
  if (
    typeof candidate.productId !== "string" ||
    typeof candidate.color !== "string" ||
    typeof candidate.quantity !== "number" ||
    !Number.isInteger(candidate.quantity) ||
    candidate.quantity < 1 ||
    (candidate.size !== undefined && typeof candidate.size !== "string")
  ) {
    throw new Error("A saved bag item is missing valid product options.");
  }

  const product = getProductById(candidate.productId);
  if (!product || !product.swatches.some((swatch) => swatch.name === candidate.color)) {
    throw new Error("A saved bag item refers to an unavailable product or colour.");
  }

  const size =
    candidate.size === "One Size" && product.sizes?.includes("S")
      ? "S"
      : candidate.size;

  if (
    (product.sizes?.length &&
      (typeof size !== "string" || !product.sizes.includes(size))) ||
    (!product.sizes?.length && size !== undefined)
  ) {
    throw new Error("A saved bag item has an unavailable size.");
  }

  return {
    productId: candidate.productId,
    color: candidate.color,
    ...(typeof size === "string" ? { size } : {}),
    quantity: candidate.quantity,
  };
}

function parseItems(serialized: string): CartItem[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error("Your saved bag could not be read. Please clear it and try again.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Your saved bag has an invalid format.");
  }

  return parsed.map(validateCartItem);
}

function announceBagChange(items: CartItem[]): void {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  window.dispatchEvent(new CustomEvent(BAG_CHANGE_EVENT, { detail: count }));
}

export function getCartItems(): CartItem[] {
  const serialized = window.localStorage.getItem(CART_STORAGE_KEY);
  return serialized ? parseItems(serialized) : [];
}

export function getCartCount(): number {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: readonly CartItem[]): number {
  return items.reduce(
    (total, item) =>
      total + (getProductById(item.productId)?.price ?? 0) * item.quantity,
    0,
  );
}

export function saveCartItems(items: CartItem[]): void {
  const validatedItems = items.map(validateCartItem);
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validatedItems));
  announceBagChange(validatedItems);
}

export function addCartItem(item: CartItem): void {
  const validatedItem = validateCartItem(item);
  const items = getCartItems();
  const existingIndex = items.findIndex(
    (existing) =>
      existing.productId === validatedItem.productId &&
      existing.color === validatedItem.color &&
      existing.size === validatedItem.size,
  );

  if (existingIndex === -1) {
    saveCartItems([...items, validatedItem]);
    window.dispatchEvent(new Event(CART_OPEN_EVENT));
    return;
  }

  const nextItems = [...items];
  nextItems[existingIndex] = {
    ...nextItems[existingIndex],
    quantity: nextItems[existingIndex].quantity + validatedItem.quantity,
  };
  saveCartItems(nextItems);
  window.dispatchEvent(new Event(CART_OPEN_EVENT));
}

export function removeCartItem(index: number): void {
  const items = getCartItems();
  if (!Number.isInteger(index) || index < 0 || index >= items.length) {
    throw new Error("That bag item is no longer available.");
  }
  saveCartItems(items.filter((_, itemIndex) => itemIndex !== index));
}

export function setCheckoutNowItem(item: CartItem): void {
  const validatedItem = validateCartItem(item);
  window.sessionStorage.setItem(
    CHECKOUT_NOW_STORAGE_KEY,
    JSON.stringify(validatedItem),
  );
}

export function getCheckoutNowItem(): CartItem | null {
  const serialized = window.sessionStorage.getItem(CHECKOUT_NOW_STORAGE_KEY);
  if (!serialized) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new Error("Your quick checkout selection could not be read.");
  }
  return validateCartItem(parsed);
}

export function clearCheckoutNowItem(): void {
  window.sessionStorage.removeItem(CHECKOUT_NOW_STORAGE_KEY);
}
