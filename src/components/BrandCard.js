import Image from "next/image";
import Link from "next/link";
import { getWatchesByBrand } from "@/data/watches";

export default function BrandCard({ brand }) {
  const hasProducts = getWatchesByBrand(brand.slug).length > 0;
  const content = (
    <>
      <span className="relative block h-36 w-full sm:h-44 lg:h-48">
        <Image
          src={`/images/brands/watches/${brand.slug}.png`}
          alt={`${brand.name} watch`}
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 42vw, 44vw"
          className={`object-contain ${
            brand.slug === "rolex"
              ? "scale-[1.25]"
              : brand.slug === "bangalore-watch-company"
                ? "scale-[0.9]"
                : ""
          }`}
        />
      </span>
      <span className="mt-3 flex h-20 shrink-0 items-center justify-center border-t border-[#EBD5BD]">
        <span className="relative block h-12 w-full sm:h-14">
          <Image
            src={`/images/brands/logos/${brand.slug}.png`}
            alt={`${brand.name} logo`}
            fill
            sizes="(min-width: 1024px) 160px, 40vw"
            className={`object-contain ${
              brand.slug === "jaipur-watch-company" ||
              brand.slug === "bangalore-watch-company"
                ? "scale-[1.1]"
                : ""
            }`}
          />
        </span>
      </span>
    </>
  );
  const cardClassName =
    "group flex h-full flex-col overflow-hidden rounded-xl border border-[#EBD5BD] bg-[#FBFAF7] p-3 shadow-[0_6px_20px_rgba(48,34,25,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#D2AD86] hover:shadow-[0_14px_30px_rgba(48,34,25,0.13)] motion-reduce:transform-none motion-reduce:transition-none sm:p-4";

  return hasProducts ? (
    <Link
      href={`/brands/${brand.slug}`}
      aria-label={`Shop ${brand.name} watches`}
      className={cardClassName}
    >
      {content}
    </Link>
  ) : (
    <article
      aria-label={`${brand.name}, products coming soon`}
      className={`${cardClassName} cursor-default`}
    >
      {content}
    </article>
  );
}
