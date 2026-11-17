
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { allSearchProducts } from "@/data/searchProducts";
import { useWishlist } from "@/components/wishlist/WishlistProvider";
import { useCart } from "@/components/cart/CartProvider";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[15px] w-[15px]"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[20px] w-[20px]"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-[20px] w-[20px]"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 8H6" />
      <circle cx="10" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </svg>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/furniture" },
  { name: "Rooms", href: "/rooms" },
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const navFontClass =
  "font-sans text-[15px] font-bold tracking-[0.035em]";

const navTextClass =
  "text-[#171717] hover:text-[#A88955]";

// ICON WITH COUNT
function IconWithCount({ children, count, label, onClick, href }) {
  const commonClass =
    "relative flex h-10 w-10 shrink-0 items-center justify-center text-[#171717] transition-all duration-300 hover:scale-105 hover:text-[#A88955]";

  const iconContent = (
    <>
      {children}

      {count > 0 && (
        <span className="absolute right-0 top-0 flex h-[16px] min-w-[16px] -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#493326] px-1 text-[9px] font-semibold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${label}${count > 0 ? `, ${count} items` : ""}`}
        className={commonClass}
      >
        {iconContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}${count > 0 ? `, ${count} items` : ""}`}
      className={commonClass}
    >
      {iconContent}
    </button>
  );
}

// SEARCH BAR
function SearchBar({
  searchQuery,
  setSearchQuery,
  products,
  onNavigate,
}) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const searchRef = useRef(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.category,
          product.description || "",
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [searchQuery, products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (filteredProducts.length > 0) {
      onNavigate(filteredProducts[0].href);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex h-[33px] items-center gap-2 border border-[#E5E0DA] bg-[#F5F4F2] px-2.5 transition-all duration-300 focus-within:border-[#B9A58D] focus-within:bg-white">
          <span className="shrink-0 text-[#77716A]">
            <SearchIcon />
          </span>

          <input
            type="search"
            value={searchQuery}
            onFocus={() => setSuggestionsOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSuggestionsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSuggestionsOpen(false);
              }
            }}
            placeholder="Search furniture..."
            autoComplete="off"
            className="w-full min-w-0 bg-transparent font-sans text-[11px] font-normal text-[#29231F] outline-none placeholder:text-[#89837C]"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSuggestionsOpen(false);
              }}
              className="shrink-0 font-sans text-[10px] text-[#756B62] transition hover:text-[#29231F]"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {suggestionsOpen && searchQuery.trim() && (
        <div className="absolute left-0 top-full z-[200] mt-2 max-h-[420px] w-full min-w-[260px] overflow-y-auto border border-[#DDD5CC] bg-[#F6F3EE] shadow-xl">
          {filteredProducts.length > 0 ? (
            <>
              <p className="border-b border-[#EEE9E3] px-4 py-3 font-sans text-xs text-[#756B62]">
                Matching products
              </p>

              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => onNavigate(product.href)}
                  className="flex w-full items-center gap-3 border-b border-[#F0ECE7] p-3 text-left transition hover:bg-[#EDE5DA]"
                >
                  <div className="h-[58px] w-[58px] shrink-0 overflow-hidden bg-[#EAE3D9]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm text-[#29231F]">
                      {product.name}
                    </p>

                    <p className="mt-1 font-sans text-xs text-[#756B62]">
                      {product.category}
                    </p>

                    {Number(product.price) > 0 && (
                      <p className="mt-1 font-sans text-xs text-[#493326]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>

                  <span className="text-sm text-[#A88955]">→</span>
                </button>
              ))}
            </>
          ) : (
            <p className="px-4 py-7 text-center font-sans text-sm text-[#756B62]">
              No matching products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// MAIN NAVBAR
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { wishlistCount } = useWishlist();
  const { cartCount, openCart } = useCart();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const handleProductNavigate = (href) => {
    setSearchQuery("");
    setMobileOpen(false);
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-[#E7E2DC] bg-white text-[#171717] shadow-sm">

      {/* RESPONSIVE NAVBAR CONTAINER */}
      <div className="relative mx-auto flex min-h-[68px] w-full items-center justify-between gap-2 px-3 py-2 sm:min-h-[72px] sm:gap-4 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          aria-label="Neolen Furniture Home"
          className="flex min-w-0 shrink-0 items-center transition-opacity duration-300 hover:opacity-75"
        >
          <img
            src="/images/logo/neolen-logo.jpeg"
            alt="Neolen Furniture"
            className="h-10 w-auto max-w-[115px] object-contain sm:h-[46px] sm:max-w-[160px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative whitespace-nowrap py-2.5 ${navFontClass} ${navTextClass} transition-colors duration-300 ${
                  isActive
                    ? "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-[#171717]"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP SEARCH + ICONS */}
        <div className="hidden shrink-0 items-center gap-1.5 md:flex lg:gap-2">
          <div className="w-[135px] lg:w-[155px] 2xl:w-[180px]">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              products={allSearchProducts}
              onNavigate={handleProductNavigate}
            />
          </div>

          <IconWithCount
            href="/wishlist"
            label="Wishlist"
            count={wishlistCount}
          >
            <HeartIcon />
          </IconWithCount>

          <IconWithCount
            label="Cart"
            count={cartCount}
            onClick={openCart}
          >
            <CartIcon />
          </IconWithCount>
        </div>

        {/* MOBILE ICONS */}
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2 md:hidden">
          <IconWithCount
            href="/wishlist"
            label="Wishlist"
            count={wishlistCount}
          >
            <HeartIcon />
          </IconWithCount>

          <IconWithCount
            label="Cart"
            count={cartCount}
            onClick={openCart}
          >
            <CartIcon />
          </IconWithCount>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[6px] text-[#171717]"
          >
            <span
              className={`h-[1.5px] w-6 bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-[3.75px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-[1.5px] w-6 bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-[3.75px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="absolute left-0 top-full z-[110] w-full border-t border-[#E7E2DC] bg-white px-5 py-4 text-[#171717] shadow-lg md:hidden">

          {/* MOBILE SEARCH */}
          <div className="mb-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              products={allSearchProducts}
              onNavigate={handleProductNavigate}
            />
          </div>

          {/* MOBILE LINKS */}
          <nav className="flex flex-col">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`border-b border-[#E7E2DC] py-3 ${navFontClass} ${navTextClass} transition-colors ${
                    isActive ? "text-[#A88955]" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
