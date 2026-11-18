"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import Button from "@/components/common/Button";
import { useShop } from "@/components/providers/ShopProvider";

const ESTEEMED_BRANDS_SCROLL_KEY = "crueze-esteemed-brands-scroll";

/**
 * Main showroom Navbar.
 * Premium light styling, responsive navigation links, accessible controls, and quick action shortcuts.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
  const {
    cartCount,
    wishlistCount,
    cartOpen,
    wishlistOpen,
    openCart,
    openWishlist,
  } = useShop();

  const scrollToEsteemedBrands = useCallback((smooth = true) => {
    document.getElementById("esteemed-brands")?.scrollIntoView({
      behavior:
        smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "smooth"
          : "auto",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (
      currentPath !== "/" ||
      window.sessionStorage.getItem(ESTEEMED_BRANDS_SCROLL_KEY) !== "pending"
    ) {
      return;
    }

    window.sessionStorage.removeItem(ESTEEMED_BRANDS_SCROLL_KEY);

    const timeout = window.setTimeout(() => {
      window.history.replaceState(null, "", "/#esteemed-brands");
      scrollToEsteemedBrands(false);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [currentPath, scrollToEsteemedBrands]);

  const handleWatchmakersClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    if (currentPath === "/") {
      window.history.pushState(null, "", "/#esteemed-brands");
      window.setTimeout(() => scrollToEsteemedBrands(), 100);
      return;
    }

    window.sessionStorage.setItem(ESTEEMED_BRANDS_SCROLL_KEY, "pending");
    router.push("/", { scroll: false });
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Timepieces", href: "/watches" },
    { label: "Watchmakers", href: "/#esteemed-brands" },
    { label: "About Showroom", href: "/showroom" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#EBD5BD] bg-[#EBD5BD] transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid h-[68px] grid-cols-[1fr_auto] items-center sm:h-20 lg:grid-cols-[1fr_auto_1fr]">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group min-w-0 justify-self-start rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]"
            >
              <Image
                src="/images/logo/logo.png"
                alt="Crueze TimeLine"
                width={2172}
                height={724}
                priority
                unoptimized
                className="h-12 w-auto max-w-full object-contain transition-opacity group-hover:opacity-90 sm:h-16 lg:h-16 xl:h-20"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden items-center justify-center gap-x-6 lg:flex xl:gap-x-9"
            >
              {navItems.map((item) => {
                const isHomeActive =
                  item.href === "/" && currentPath === "/";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={
                      item.href === "/#esteemed-brands"
                        ? handleWatchmakersClick
                        : undefined
                    }
                    aria-current={isHomeActive ? "page" : undefined}
                    className={`inline-block rounded border-b border-transparent py-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D2AD86] xl:text-sm ${
                      isHomeActive
                        ? "border-[#A77B52] !text-[#A77B52]"
                        : "text-[#6B4933]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden items-center justify-self-end gap-x-5 lg:flex">
              <button
                type="button"
                onClick={openWishlist}
                aria-label={
                  wishlistCount === 0
                    ? "Wishlist, empty"
                    : `Wishlist, ${wishlistCount} ${
                        wishlistCount === 1 ? "saved timepiece" : "saved timepieces"
                      }`
                }
                aria-haspopup="dialog"
                aria-expanded={wishlistOpen}
                aria-controls="wishlist-drawer"
                className="relative rounded p-2 text-[#302219] transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span
                    className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#D2AD86] px-1 text-[10px] font-semibold leading-none text-[#302219] ring-2 ring-[#F8EBDD]"
                    aria-hidden="true"
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Drawer */}
              <button
                type="button"
                onClick={openCart}
                aria-label={
                  cartCount === 0
                    ? "Shopping bag, empty"
                    : `Shopping bag, ${cartCount} ${
                        cartCount === 1 ? "item" : "items"
                      }`
                }
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                aria-controls="cart-drawer"
                className="relative rounded p-2 text-[#302219] transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86]"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span
                    className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#D2AD86] px-1 text-[10px] font-semibold leading-none text-[#302219] ring-2 ring-[#F8EBDD]"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Consultation / Inquire Button */}
              <div className="hidden sm:block">
                <Button
                  href="/contact"
                  variant="outline"
                  size="sm"
                  className="!border-[#A77B52] !bg-transparent !text-[#6B4933] hover:!bg-[#EBD5BD] hover:!text-[#302219] focus-visible:!ring-[#D2AD86] focus-visible:!ring-offset-[#F8EBDD]"
                >
                  Inquire
                </Button>
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label="Open mobile navigation menu"
              className="justify-self-end rounded p-2 text-[#302219] transition-colors hover:text-[#D2AD86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86] lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenWishlist={openWishlist}
        onOpenCart={openCart}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        currentPath={currentPath}
        onWatchmakersClick={handleWatchmakersClick}
      />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
