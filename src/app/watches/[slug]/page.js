import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/common/Badge";
import WatchDetailAddToCartButton from "@/components/watches/WatchDetailAddToCartButton";
import WatchGallery from "@/components/watches/WatchGallery";
import WatchDetailWishlistButton from "@/components/watches/WatchDetailWishlistButton";
import WatchSpecs from "@/components/watches/WatchSpecs";
import { getWatchBySlug } from "@/data/watches";
import { watchSources } from "@/data/watchSources";
import { formatINR } from "@/utils/formatters";

function getVerifiedWarranty(warranty) {
  const duration = warranty?.duration;
  const hasValidDuration =
    Number.isFinite(duration?.value) &&
    duration.value > 0 &&
    ["month", "months", "year", "years"].includes(duration.unit);
  const sourceUrl =
    typeof warranty?.sourceUrl === "string" ? warranty.sourceUrl : "";
  const hasSecureSource =
    URL.canParse(sourceUrl) && new URL(sourceUrl).protocol === "https:";

  if (
    warranty?.verified !== true ||
    !hasValidDuration ||
    typeof warranty.type !== "string" ||
    warranty.type.trim() === "" ||
    typeof warranty.sourceName !== "string" ||
    warranty.sourceName.trim() === "" ||
    warranty.region !== "India" ||
    !hasSecureSource
  ) {
    return null;
  }

  return {
    ...warranty,
    coverageDetails: Array.isArray(warranty.coverageDetails)
      ? warranty.coverageDetails.filter(
          (detail) => typeof detail === "string" && detail.trim() !== "",
        )
      : [],
    exclusions: Array.isArray(warranty.exclusions)
      ? warranty.exclusions.filter(
          (exclusion) =>
            typeof exclusion === "string" && exclusion.trim() !== "",
        )
      : [],
  };
}

function getDemoWarranty(warranty) {
  const duration = warranty?.duration;
  const hasValidDuration =
    Number.isFinite(duration?.value) &&
    duration.value > 0 &&
    ["month", "months", "year", "years"].includes(duration.unit);

  if (warranty?.demoOnly !== true || !hasValidDuration) {
    return null;
  }

  return { duration };
}

export default async function WatchDetailPage({ params }) {
  const { slug } = await params;
  const watch = getWatchBySlug(slug);

  if (!watch) {
    notFound();
  }

  const warranty = getVerifiedWarranty(watch.warranty);
  const demoWarranty = getDemoWarranty(watch.warranty);
  const priceSource = watchSources[watch.slug];
  const hasVerifiedPrice =
    Number.isFinite(priceSource?.verifiedPrice) &&
    priceSource.verifiedPrice === watch.price;
  const isDemoPrice = priceSource?.priceStatus === "demo" || !hasVerifiedPrice;

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-4 py-12 text-[#35332F] sm:px-6 sm:py-16 lg:px-8 lg:pt-4">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/watches"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#7E6848] transition-colors hover:text-[#35332F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] lg:mb-4"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Watches
        </Link>

        <article className="grid items-start gap-8 lg:grid-cols-2 lg:gap-8">
          <WatchGallery
            key={watch.slug}
            images={
              Array.isArray(watch.images) && watch.images.length > 0
                ? watch.images
                : [watch.imagePath]
            }
            title={watch.name}
          />

          <div
            role="region"
            aria-label={`${watch.name} details`}
            tabIndex={0}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#D2AD86 #FBFAF7",
            }}
            className="rounded-xl border border-[#DED8CD] bg-[#FBFAF7] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] sm:p-8 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain"
          >
            <header>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9B8055]">
                {watch.brand}
              </p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h1 className="min-w-0 flex-1 break-words font-serif text-3xl leading-tight text-[#35332F] sm:text-4xl lg:text-5xl">
                  {watch.name}
                </h1>
                <WatchDetailWishlistButton watch={watch} />
              </div>
              {watch.badge && (
                <div className="mt-5">
                  <Badge variant="gold">{watch.badge}</Badge>
                </div>
              )}
              <p className="mt-6 text-2xl font-medium tracking-tight text-[#7E6848]">
                {formatINR(watch.price)}
              </p>
              {isDemoPrice && (
                <p className="mt-1 text-xs leading-5 text-[#6D6961]">
                  Demo price only — not a confirmed selling price or official
                  manufacturer price.
                </p>
              )}
              <WatchDetailAddToCartButton watch={watch} />
            </header>

            {watch.shortDescription && (
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#6D6961]">
                {watch.shortDescription}
              </p>
            )}

            <section
              aria-labelledby="watch-specifications-title"
              className="mt-10"
            >
              <h2
                id="watch-specifications-title"
                className="mb-4 font-serif text-xl text-[#35332F]"
              >
                Specifications
              </h2>
              <WatchSpecs
                specs={watch}
              />
            </section>

            <section
              aria-labelledby="watch-warranty-title"
              className="mt-8 border-t border-[#DED8CD] pt-6"
            >
              <h2
                id="watch-warranty-title"
                className="font-serif text-xl text-[#35332F]"
              >
                Warranty
              </h2>
              {warranty ? (
                <>
                  <p className="mt-3 font-serif text-2xl text-[#7E6848]">
                    {warranty.duration.value}{" "}
                    {warranty.duration.value === 1
                      ? warranty.duration.unit.replace(/s$/, "")
                      : warranty.duration.unit}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6D6961]">
                    {warranty.type}
                  </p>
                  {warranty.coverageDetails.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-[#9B8055]">
                        Coverage
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#6D6961]">
                        {warranty.coverageDetails.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {warranty.exclusions.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-[#9B8055]">
                        Exclusions
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#6D6961]">
                        {warranty.exclusions.map((exclusion) => (
                          <li key={exclusion}>{exclusion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href={warranty.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-xs text-[#7E6848] underline decoration-[#D2AD86] underline-offset-4 transition-colors hover:text-[#302219] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055]"
                  >
                    Source: {warranty.sourceName}
                  </a>
                </>
              ) : demoWarranty ? (
                <>
                  <p className="mt-3 font-serif text-2xl text-[#7E6848]">
                    {demoWarranty.duration.value}{" "}
                    {demoWarranty.duration.value === 1
                      ? demoWarranty.duration.unit.replace(/s$/, "")
                      : demoWarranty.duration.unit}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#6D6961]">
                    Demo placeholder only — not a manufacturer or retailer warranty, and not a promise of coverage.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[#6D6961]">
                  Warranty details to be confirmed
                </p>
              )}
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
