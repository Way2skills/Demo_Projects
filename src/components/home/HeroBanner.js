import Image from "next/image";
import Button from "@/components/common/Button";

/**
 * HeroBanner Component for Crueze TimeLine.
 * An editorial introduction to Indian and international watchmakers.
 */
export default function HeroBanner({
  imageSrc = "/images/hero/hero-watch.png",
  eyebrow = "TIMELESS ELEGANCE",
  imageAlt = "Watch featured by Crueze TimeLine",
  title = (
    <>
      More Than a Watch,
      <span className="mt-2 block text-[#302219]">A Statement.</span>
    </>
  ),
  description = "Explore distinctive timepieces from Indian and international watchmakers, selected for design, character and craftsmanship.",
  showActions = true,
  ariaLabel = "Welcome to Crueze TimeLine",
}) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative isolate min-h-[720px] overflow-hidden border-b border-[#EBD5BD] bg-[#F8EBDD] text-[#302219] sm:min-h-[680px] lg:min-h-[min(760px,90vh)]"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[1.12] object-[68%_center] sm:object-[64%_center] lg:object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#F8EBDD]/85 via-[#F8EBDD]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1600px] items-center px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="w-full max-w-xl py-8 text-left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#A77B52] sm:mb-7">
            {eyebrow}
          </p>

          <h1 className="font-serif text-4xl font-normal leading-[1.12] tracking-tight text-[#302219] sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <div
            className="my-6 h-px w-14 bg-[#A77B52]/70 sm:my-8"
            aria-hidden="true"
          />

          <p className="max-w-lg text-base font-medium leading-relaxed text-[#6B4933] sm:text-lg">
            {description}
          </p>

          {showActions && (
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button
                href="/watches"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Collection
              </Button>
              <Button
                href="/brands"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Discover Watchmakers
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
