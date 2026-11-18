"use client";

import Link from "next/link";
import { useShop } from "@/components/providers/ShopProvider";
import WatchImage from "@/components/watches/WatchImage";
import Badge from "@/components/common/Badge";
import { watchSources } from "@/data/watchSources";
import { formatINR } from "@/utils/formatters";

export default function WatchCard({
  watch,
  showcaseLabel,
  enableListingHover = false,
}) {
  const { toggleWishlist, isInWishlist } = useShop();
  if (!watch) return null;

  const isWishlisted = isInWishlist(watch.id);
  const priceSource = watchSources[watch.slug];
  const hasVerifiedPrice =
    Number.isFinite(priceSource?.verifiedPrice) &&
    priceSource.verifiedPrice === watch.price;
  const isDemoPrice = priceSource?.priceStatus === "demo" || !hasVerifiedPrice;
  const audienceLabel = {
    Men: "Men's Watch",
    Women: "Women's Watch",
    Kids: "Kids' Watch",
    Couple: "Couple Watch",
    Couples: "Couple Watch",
  }[watch.gender];
  const imageScaleClass =
    {
      "spb507j1": "scale-[1.22]",
      "13110286060002": "scale-[1.14]",
      "21592462201007": "scale-[1.1]",
    }[watch.slug] ?? "";
  const cardTransitionClass = enableListingHover
    ? "transition-[background-color,border-color,box-shadow] duration-300 [@media(hover:hover)]:hover:shadow-[0_10px_24px_rgba(48,34,25,0.1)]"
    : "transition-colors duration-300";
  const imageHoverClass = enableListingHover
    ? "transition-[filter] duration-500 ease-out [@media(hover:hover)]:group-hover/image:brightness-[1.035] motion-reduce:transition-none"
    : "";

  return (
    <article
      className={`group group/card relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[#DED8CD] bg-[#FBFAF7] ${cardTransitionClass} hover:border-[#9B8055]/50 hover:bg-white`}
    >
      <div>
        <div className="group/image relative aspect-square w-full overflow-hidden rounded-t-xl bg-[#F5F2EC]">
          <Link
            href={`/watches/${watch.slug}`}
            aria-label={`View product details for ${watch.name} by ${watch.brand}`}
            className="absolute inset-0 z-0 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9B8055] focus-visible:outline-offset-[-3px]"
          >
            <WatchImage
              src={watch.imagePath}
              alt={`${watch.name} by ${watch.brand}`}
              className={`block h-full w-full object-contain object-center ${imageScaleClass} ${imageHoverClass}`}
              placeholderClassName="h-full w-full rounded-sm"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex h-9 items-center justify-center bg-[#35332F] text-[10px] font-normal uppercase tracking-[0.12em] text-[#FBFAF7] opacity-100 transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/image:opacity-100 [@media(hover:hover)]:group-focus-within/image:opacity-100"
            >
              VIEW PRODUCT
            </span>
          </Link>

          {showcaseLabel && (
            <Badge
              variant="ivory"
              size="sm"
              className="pointer-events-none absolute left-2.5 top-2.5 z-10 shadow-sm"
            >
              {showcaseLabel}
            </Badge>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(watch)}
            aria-label={
              isWishlisted
                ? `Remove ${watch.name} from wishlist`
                : `Add ${watch.name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className={`absolute right-2.5 top-2.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-[#FBFAF7]/95 shadow-sm transition-all duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/image:opacity-100 focus-visible:opacity-100 ${
              isWishlisted
                ? "border-[#9B8055]/50 text-[#7E6848]"
                : "border-[#DED8CD] text-[#6D6961] hover:text-[#7E6848]"
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>
        </div>

        <div className="p-2">
          <p className="truncate font-sans text-[11px] font-medium leading-4 text-[#6D6961]">
            {watch.brand}
            {audienceLabel && (
              <span className="text-[#9B8055]"> | {audienceLabel}</span>
            )}
          </p>

          <h3
            className="truncate whitespace-nowrap font-sans text-[13px] font-normal leading-5 tracking-normal text-[#35332F] transition-colors group-hover:text-[#6D6961]"
            title={watch.name}
          >
            <Link
              href={`/watches/${watch.slug}`}
              aria-label={watch.name}
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
            >
              {watch.name}
            </Link>
          </h3>
          <p className="mt-1 font-sans text-base font-bold tracking-normal text-[#35332F]">
            {formatINR(watch.price)}
          </p>
          {isDemoPrice && (
            <p className="mt-0.5 font-sans text-[10px] leading-4 text-[#7E6848]">
              Demo price
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
