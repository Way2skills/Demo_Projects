"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";

/**
 * Responsive mobile navigation drawer for Crueze TimeLine.
 * Clean, accessible slide-over drawer with warm champagne styling.
 */
export default function MobileNav({
  isOpen,
  onClose,
  onOpenWishlist,
  onOpenCart,
  cartCount = 0,
  wishlistCount = 0,
  currentPath,
  onWatchmakersClick,
}) {
  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { label: "Home", href: "/", count: "Welcome" },
    { label: "All Timepieces", href: "/watches", count: "Collection" },
    { label: "Watchmakers", href: "/#esteemed-brands", count: "Multi-Brand" },
    { label: "About Showroom", href: "/showroom", count: "Our Story" },
    { label: "Contact & Inquiries", href: "/contact", count: "Visit Us" },
    {
      label: "Wishlist",
      action: "wishlist",
      count:
        wishlistCount === 0
          ? "Saved Timepieces"
          : `${wishlistCount} saved timepieces`,
    },
    {
      label: "Shopping Bag",
      action: "cart",
      count: cartCount === 0 ? "Empty" : `${cartCount} items`,
    },
  ];

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-label="Mobile Navigation Menu"
      inert={!isOpen}
      className="fixed inset-0 z-50 lg:hidden"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity 300ms ease-out",
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302219]/30 backdrop-blur-sm"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 300ms ease-out",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between overflow-y-auto border-l border-[#EBD5BD] bg-[#F8EBDD] p-6 text-[#302219] shadow-[0_8px_28px_rgba(48,34,25,0.12)]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#EBD5BD]">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#302219]">
              CRUEZE TIMELINE
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="rounded border border-[#EBD5BD] p-2 text-[#302219] transition-colors hover:border-[#A77B52] hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77B52]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile Menu Links" className="mt-8 space-y-1">
            {navLinks.map((link) => {
              const isHomeActive =
                link.href === "/" && currentPath === "/";
              const className = `group flex w-full items-center justify-between rounded px-3 py-3.5 text-left text-base font-semibold transition-colors hover:bg-[#EBD5BD] hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A77B52] ${
                isHomeActive
                  ? "border-l-2 border-[#A77B52] bg-[#EBD5BD] !text-[#A77B52]"
                  : "text-[#302219]"
              }`;
              const linkContent = (
                <>
                  <span className="tracking-wide transition-transform group-hover:translate-x-1">
                    {link.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#6B4933] group-hover:text-[#A77B52]">
                    {link.count}
                  </span>
                </>
              );

              if (link.action === "wishlist") {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenWishlist();
                    }}
                    className={className}
                  >
                    {linkContent}
                  </button>
                );
              }

              if (link.action === "cart") {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCart();
                    }}
                    className={className}
                  >
                    {linkContent}
                  </button>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    onClose();
                    if (link.href === "/#esteemed-brands") {
                      onWatchmakersClick(event);
                    }
                  }}
                  aria-current={isHomeActive ? "page" : undefined}
                  style={
                    isHomeActive
                      ? { backgroundColor: "#EBD5BD", borderLeftColor: "#A77B52" }
                      : undefined
                  }
                  className={className}
                >
                  {linkContent}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-4 border-t border-[#EBD5BD] pt-8">
          <Button
            href="/contact"
            variant="primary"
            size="md"
            className="w-full !bg-[#A77B52] text-center !text-[#F8EBDD] hover:!bg-[#6B4933] focus-visible:!ring-[#A77B52] focus-visible:!ring-offset-[#F8EBDD]"
            onClick={onClose}
          >
            Inquire for Consultation
          </Button>

          <div className="space-y-1 pt-2 text-xs text-[#6B4933]">
            <p className="font-medium text-[#6B4933]">Showroom Consultations</p>
            <p className="text-[11px] text-[#6B4933]">
              Private viewings scheduled by appointment.
            </p>
            <p className="text-[10px] text-[#6B4933]">
              [Physical showroom location details to be announced]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
