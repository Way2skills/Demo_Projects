"use client";

import Link from "next/link";
import WatchImage from "@/components/watches/WatchImage";
import { useShop } from "@/components/providers/ShopProvider";
import { formatINR } from "@/utils/formatters";

export default function CartItemRow({
  item,
  readOnly = false,
  compact = false,
  onProductClick,
}) {
  const { updateCartQuantity, removeFromCart } = useShop();
  const hasPrice = Number.isFinite(item.price);
  const productName = item.name || "Watch";
  const imageClassName = compact
    ? "relative h-20 w-20 shrink-0 overflow-hidden border border-[#DED8CD] bg-[#FBFAF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
    : "relative h-28 w-24 shrink-0 overflow-hidden border border-[#DED8CD] bg-[#FBFAF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] sm:h-32 sm:w-28";
  const contentClassName = compact
    ? "flex min-w-0 flex-1 flex-col gap-3"
    : "flex min-w-0 flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center";

  return (
    <article
      className={
        compact
          ? "flex gap-3 py-4"
          : "flex gap-4 py-5 sm:gap-6 sm:py-6"
      }
    >
      <Link
        href={item.slug ? `/watches/${item.slug}` : "/watches"}
        onClick={onProductClick}
        aria-label={`View ${productName}`}
        className={imageClassName}
      >
        <WatchImage
          src={item.imagePath}
          alt={productName}
          className="absolute inset-0 h-full w-full object-contain p-2"
          placeholderClassName="absolute inset-0 p-2 text-center"
        />
      </Link>

      <div className={contentClassName}>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A77B52]">
            {item.brand || "CRUEZE TIMELINE"}
          </p>
          {item.slug ? (
            <Link
              href={`/watches/${item.slug}`}
              onClick={onProductClick}
              className={
                compact
                  ? "mt-1 line-clamp-2 inline-block max-w-full font-serif text-sm leading-5 text-[#302219] transition-colors hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
                  : "mt-1 inline-block max-w-full font-serif text-base leading-6 text-[#302219] transition-colors hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] sm:text-lg"
              }
            >
              {productName}
            </Link>
          ) : (
            <h3
              className={
                compact
                  ? "mt-1 line-clamp-2 font-serif text-sm leading-5 text-[#302219]"
                  : "mt-1 font-serif text-base leading-6 text-[#302219] sm:text-lg"
              }
            >
              {productName}
            </h3>
          )}
          <p className="mt-1 text-sm font-medium text-[#35332F]">
            {formatINR(item.price)}
          </p>
        </div>

        {readOnly ? (
          <p className="shrink-0 text-xs uppercase tracking-[0.1em] text-[#6D6961]">
            Quantity: {item.quantity}
          </p>
        ) : (
          <div
            className={`flex flex-wrap items-center ${
              compact ? "justify-between gap-x-3 gap-y-2" : "gap-x-5 gap-y-3"
            }`}
          >
            <div
              className={`inline-flex items-center border border-[#D2AD86]/70 bg-[#FBFAF7] ${
                compact ? "h-9" : "h-10"
              }`}
              aria-label={`Quantity for ${productName}`}
            >
              <button
                type="button"
                onClick={() =>
                  updateCartQuantity(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                aria-label={`Decrease quantity of ${productName}`}
                className={`inline-flex items-center justify-center text-lg text-[#6B4933] transition-colors hover:bg-[#F8EBDD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B8055] disabled:cursor-not-allowed disabled:opacity-40 ${
                  compact ? "h-9 w-9" : "h-10 w-10"
                }`}
              >
                <span aria-hidden="true">−</span>
              </button>
              <output
                className="min-w-8 text-center text-sm tabular-nums text-[#302219]"
                aria-live="polite"
                aria-atomic="true"
              >
                {item.quantity}
              </output>
              <button
                type="button"
                onClick={() =>
                  updateCartQuantity(item.id, item.quantity + 1)
                }
                aria-label={`Increase quantity of ${productName}`}
                className={`inline-flex items-center justify-center text-lg text-[#6B4933] transition-colors hover:bg-[#F8EBDD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9B8055] ${
                  compact ? "h-9 w-9" : "h-10 w-10"
                }`}
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="min-h-10 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7E6848] underline decoration-[#D2AD86]/70 underline-offset-4 transition-colors hover:text-[#302219] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
