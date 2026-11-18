import Image from "next/image";

export default function CategoryEditorialHero({ category }) {
  const categoryTitle = category.landingTitle || category.name;
  const isSplitEditorialCategory =
    category.slug === "womens-watches" || category.slug === "mens-watches";
  const isStyleCategory = category.isStyleCategory === true;
  const alignCtaWithEditorialCopy =
    isSplitEditorialCategory || isStyleCategory;
  const { editorialHero } = category;
  const photoPanelClassName = isSplitEditorialCategory
    ? "category-editorial-photo relative isolate aspect-[641/343] w-full overflow-hidden bg-transparent lg:aspect-auto lg:min-h-[65vh]"
    : "category-editorial-photo relative isolate flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#F2E6D6] via-[#E8D8C2] to-[#DCC5A7] p-4 sm:min-h-[360px] sm:p-7 lg:min-h-[520px] lg:p-8";
  const sectionClassName = isSplitEditorialCategory
    ? "relative isolate w-full overflow-hidden border-b border-[#CDB18C] bg-gradient-to-br from-[#FBF6ED] via-[#F4E8D8] to-[#EAD9C4]"
    : "relative isolate overflow-hidden border-b border-[#CDB18C] bg-gradient-to-br from-[#FBF6ED] via-[#F4E8D8] to-[#EAD9C4]";
  const gridClassName = isSplitEditorialCategory
    ? "relative grid w-full grid-cols-1 items-stretch lg:min-h-[65vh] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    : "relative mx-auto grid max-w-7xl grid-cols-1 items-stretch lg:min-h-[640px] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]";
  const copyPanelClassName = isSplitEditorialCategory
    ? "category-editorial-copy relative flex w-full flex-col justify-center py-8 pl-8 pr-4 sm:py-10 sm:pl-10 sm:pr-6 lg:py-4 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-12"
    : "category-editorial-copy relative flex flex-col justify-center px-1 py-6 sm:px-3 sm:py-8 lg:py-6 lg:pr-12";

  return (
    <>
      <section
        aria-label={`${categoryTitle} category`}
        className={sectionClassName}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-white/35 blur-3xl"
        />
        <div className={gridClassName}>
          <div className={copyPanelClassName}>
            <p
              className={`mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#92704D] sm:text-xs sm:tracking-[0.24em] ${
                isSplitEditorialCategory ? "mb-4 lg:mb-3" : "lg:mb-4"
              }`}
            >
              CRUEZE TIMELINE
            </p>
            <h1
              className={`max-w-xl font-serif leading-[1.04] tracking-tight text-[#302219] ${
                isStyleCategory
                  ? "text-[2.875rem] font-normal sm:text-[3.5rem] lg:text-[5.5rem]"
                  : `text-5xl font-normal sm:text-6xl ${
                      isSplitEditorialCategory
                        ? "lg:text-7xl xl:text-8xl"
                        : "lg:text-8xl"
                    }`
              }`}
            >
              {editorialHero.headline}
            </h1>
            <p
              className={`mt-4 uppercase tracking-[0.2em] text-[#92704D] sm:tracking-[0.24em] ${
                isStyleCategory
                  ? "font-bold text-xs sm:text-sm lg:mt-3"
                  : isSplitEditorialCategory
                    ? "mt-3 font-bold text-xs sm:text-sm lg:mt-2"
                    : "font-semibold text-[10px] sm:text-xs lg:mt-3"
              }`}
            >
              {editorialHero.label}
            </p>
            <p
              className={`mt-5 max-w-md text-base leading-7 text-[#654B38] sm:mt-6 sm:text-lg sm:leading-8 ${
                isSplitEditorialCategory ? "mt-4 sm:mt-5 lg:mt-3" : "lg:mt-4"
              }`}
            >
              {editorialHero.description}
            </p>
            <ul
              className={`mt-4 grid max-w-md grid-cols-2 gap-3 border-y border-[#A77B52]/25 py-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#654B38] sm:gap-5 sm:text-xs ${
                isSplitEditorialCategory
                  ? "mt-3 py-3 lg:mt-2 lg:py-2"
                  : "lg:mt-3 lg:py-3"
              }`}
            >
              {editorialHero.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-[#A77B52]"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
            <div
              className={`mt-6 sm:mt-8 ${
                isSplitEditorialCategory
                  ? "mt-4 max-w-md sm:mt-6 lg:mt-4"
                  : alignCtaWithEditorialCopy
                    ? "w-full lg:mt-6"
                    : "flex items-center gap-4 lg:mt-6"
              }`}
            >
              {!alignCtaWithEditorialCopy && (
                <span
                  aria-hidden="true"
                  className="h-px w-12 shrink-0 bg-[#A77B52]/70"
                />
              )}
              <a
                href="#category-products"
                className={`group inline-flex min-h-11 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5D412C] transition-colors hover:text-[#A77B52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4E8D8] sm:text-xs ${
                  alignCtaWithEditorialCopy
                    ? "w-full border-t border-[#A77B52]/70 pt-2"
                    : ""
                }`}
              >
                {editorialHero.ctaLabel}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  <path
                    d="M3.5 10h12m-5-5 5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p
              className={`text-[9px] font-semibold uppercase tracking-[0.2em] text-[#92704D] sm:text-[10px] ${
                isSplitEditorialCategory
                  ? "mt-3 sm:mt-4 lg:mt-3"
                  : "mt-4 sm:mt-5 lg:mt-4"
              }`}
            >
              {editorialHero.footer}
            </p>
          </div>

          <div className={photoPanelClassName}>
            <div
              className={
                isSplitEditorialCategory
                  ? "absolute inset-0"
                  : "relative aspect-[3/2] w-full max-w-[900px] overflow-hidden bg-transparent shadow-[0_8px_24px_rgba(48,34,25,0.10)] lg:w-[94%]"
              }
            >
              <Image
                src={category.imagePath}
                alt={`${categoryTitle} watch collection`}
                fill
                priority
                sizes={
                  isSplitEditorialCategory
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 58vw, 100vw"
                }
                className={
                  isSplitEditorialCategory
                    ? "scale-[1.08] object-cover object-right"
                    : "object-contain"
                }
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes category-editorial-copy-reveal {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes category-editorial-photo-reveal {
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .category-editorial-copy {
          animation: category-editorial-copy-reveal 800ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .category-editorial-photo {
          animation: category-editorial-photo-reveal 950ms 100ms
            cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-editorial-copy,
          .category-editorial-photo {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
