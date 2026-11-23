"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import {
  CART_CHECKOUT_NOW_EVENT,
  CART_OPEN_EVENT,
  getCartCount,
} from "@/services/cart";
import CartDrawer from "@/features/cart/cart-drawer";
import useDismissibleLayer from "@/hooks/use-dismissible-layer";
import { navigationLinks } from "@/config/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [bagCount, setBagCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<"cart" | "checkout">("cart");
  const [checkoutSource, setCheckoutSource] = useState<"cart" | "now">("cart");
  const closeCart = useCallback(() => setCartOpen(false), []);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchPanelRef = useRef<HTMLFormElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const accountPanelRef = useRef<HTMLDivElement>(null);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeAccount = useCallback(() => setAccountOpen(false), []);

  useDismissibleLayer(searchOpen, searchPanelRef, closeSearch, searchButtonRef);
  useDismissibleLayer(menuOpen, navigationRef, closeMenu, menuButtonRef);
  useDismissibleLayer(
    accountOpen,
    accountPanelRef,
    closeAccount,
    accountButtonRef,
  );

  useEffect(() => {
    try {
      setBagCount(getCartCount());
    } catch (error) {
      console.error("Unable to read the saved shopping bag.", error);
    }

    function updateCount(event: Event) {
      if (
        event.type !== "nool-bag-change" ||
        !(event instanceof CustomEvent) ||
        typeof event.detail !== "number"
      ) {
        return;
      }

      setBagCount(event.detail);
    }

    function openCart() {
      setDrawerView("cart");
      setCheckoutSource("cart");
      setCartOpen(true);
    }

    function openQuickCheckout() {
      setDrawerView("checkout");
      setCheckoutSource("now");
      setCartOpen(true);
    }

    window.addEventListener("nool-bag-change", updateCount);
    window.addEventListener(CART_OPEN_EVENT, openCart);
    window.addEventListener(CART_CHECKOUT_NOW_EVENT, openQuickCheckout);
    return () => {
      window.removeEventListener("nool-bag-change", updateCount);
      window.removeEventListener(CART_OPEN_EVENT, openCart);
      window.removeEventListener(CART_CHECKOUT_NOW_EVENT, openQuickCheckout);
    };
  }, []);

  return (
    <>
      <header className="site-header luxury-header">
        <div className="header-main luxury-header-main">
          <div className="header-spacer">
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="icon-button menu-toggle luxury-icon"
              onClick={() => setMenuOpen((open) => !open)}
              ref={menuButtonRef}
              type="button"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <Link
            aria-label="Nool & Zari home"
            className="brand luxury-brand"
            href="/"
          >
            <span>Nool</span>
            <span aria-hidden="true" className="luxury-ampersand">
              &amp;
            </span>
            <span>Zari</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className={`main-nav luxury-nav${menuOpen ? " is-open" : ""}`}
            ref={navigationRef}
          >
            {navigationLinks.map((link) => (
              <Link
                aria-current={pathname === link.href ? "page" : undefined}
                href={link.href}
                key={link.label}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-tools luxury-tools">
            <button
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Close search" : "Search archive"}
              className="icon-button luxury-icon"
              onClick={() => setSearchOpen((open) => !open)}
              ref={searchButtonRef}
              type="button"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <div className="account-menu-wrap">
              <button
                aria-controls="account-menu"
                aria-expanded={accountOpen}
                aria-label={accountOpen ? "Close account menu" : "Your account"}
                className="profile-button luxury-profile"
                onClick={() => {
                  setAccountOpen((open) => !open);
                  setSearchOpen(false);
                  setMenuOpen(false);
                }}
                ref={accountButtonRef}
                type="button"
              >
                <UserRound size={20} aria-hidden="true" />
              </button>
              {accountOpen && (
                <div
                  aria-label="Account options"
                  className="account-menu"
                  id="account-menu"
                  ref={accountPanelRef}
                >
                  <div className="account-menu-heading">
                    <strong>Nool &amp; Zari</strong>
                    <span>Sign in to access your orders</span>
                  </div>
                  <Link href="/account/sign-in" onClick={closeAccount}>
                    <UserRound aria-hidden="true" size={16} />
                    Sign in
                  </Link>
                  <Link href="/account/create-account" onClick={closeAccount}>
                    <UserRound aria-hidden="true" size={16} />
                    Create account
                  </Link>
                </div>
              )}
            </div>
            <button
              aria-label={`Shopping bag, ${bagCount} items`}
              aria-controls="cart-drawer"
              aria-expanded={cartOpen}
              className="icon-button count-icon luxury-icon"
              onClick={() => {
                if (cartOpen) {
                  setCartOpen(false);
                } else {
                  setDrawerView("cart");
                  setCheckoutSource("cart");
                  setCartOpen(true);
                }
              }}
              ref={cartButtonRef}
              type="button"
            >
              <ShoppingBag size={20} />
              <span>{bagCount}</span>
            </button>
          </div>
        </div>
        {searchOpen && (
          <form
            className="search-panel luxury-search"
            onSubmit={(event) => {
              event.preventDefault();
              const searchTerm = query.trim();
              if (!searchTerm) return;

              router.push(`/all-fabrics?q=${encodeURIComponent(searchTerm)}`);
              setSearchOpen(false);
            }}
            ref={searchPanelRef}
            role="search"
          >
            <label className="visually-hidden" htmlFor="archive-search">
              Search the collection
            </label>
            <input
              autoFocus
              id="archive-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the collection"
              required
              value={query}
            />
            <button aria-label="Submit search" type="submit">
              <Search size={18} />
            </button>
          </form>
        )}
      </header>
      <CartDrawer
        checkoutSource={checkoutSource}
        dismissTriggerRef={cartButtonRef}
        onBackToCart={() => {
          setDrawerView("cart");
          setCheckoutSource("cart");
        }}
        onClose={closeCart}
        onViewChange={setDrawerView}
        open={cartOpen}
        view={drawerView}
      />
    </>
  );
}
