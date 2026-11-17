
import Link from "next/link";
import { collections } from "@/data/homeData";

export default function CollectionSection() {
  return (
    <section className="overflow-hidden bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 text-center animate-[fadeUp_0.8s_ease-out_both]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A88955]">
            CURATED FOR YOUR HOME
          </p>

          <h2 className="text-3xl font-semibold text-[#29231F] md:text-4xl">
            Featured Collections
          </h2>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {collections.map((collection, index) => (
            <Link
              href={collection.href}
              key={collection.title}
              className="group relative h-[380px] overflow-hidden bg-[#DDD5CC] animate-[fadeUp_0.9s_ease-out_both] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:h-[450px]"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              {/* Collection Image */}
              <img
                src={collection.image}
                alt={collection.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5 transition-all duration-700 group-hover:from-black/85 group-hover:via-black/25" />

              {/* Collection Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 text-white transition-transform duration-700 group-hover:-translate-y-3 md:p-10">
                <h3 className="translate-y-3 text-3xl font-semibold opacity-90 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:text-4xl">
                  {collection.title}
                </h3>

                <p className="mt-3 max-w-md translate-y-3 text-sm leading-6 text-white/90 opacity-0 transition-all delay-100 duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  {collection.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-semibold tracking-wider transition-all duration-500 group-hover:gap-5">
                  DISCOVER MORE
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>

              {/* Hover Border */}
              <div className="pointer-events-none absolute inset-4 border border-white/0 transition-all duration-700 group-hover:inset-5 group-hover:border-white/50" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
