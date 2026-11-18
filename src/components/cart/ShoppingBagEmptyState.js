import Link from "next/link";

export default function ShoppingBagEmptyState({
  compact = false,
  onExploreClick,
}) {
  return (
    <section
      className={
        compact
          ? "flex h-full flex-col items-center justify-center py-12 text-center"
          : "mx-auto max-w-2xl border border-[#DED8CD] bg-[#FBFAF7] px-6 py-12 text-center sm:px-10 sm:py-16"
      }
    >
      <span
        className={`mx-auto flex items-center justify-center border border-[#D2AD86]/70 bg-[#F8EBDD] text-[#A77B52] ${
          compact ? "mb-5 h-14 w-14" : "mb-6 h-16 w-16"
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path
            d="M15 17v-4a9 9 0 0 1 18 0v4m-23 0h28l2 24H8l2-24Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M18 21v2m12-2v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <h2
        className={`font-serif font-normal text-[#302219] ${
          compact ? "text-xl" : "text-2xl sm:text-3xl"
        }`}
      >
        YOUR BAG IS WAITING
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6D6961]">
        Discover a timepiece that makes every moment yours.
      </p>
      <Link
        href="/watches"
        onClick={onExploreClick}
        className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#302219] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
      >
        EXPLORE WATCHES
      </Link>
    </section>
  );
}
