
import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-[#29231F] px-6 py-20 text-center md:px-12 md:py-28">

      {/* Decorative Background Circles */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full border border-white/10 transition-transform duration-1000 hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-3xl">

        {/* Eyebrow */}
        <p className="mb-4 animate-[fadeUp_0.8s_ease-out_both] text-xs font-semibold uppercase tracking-[0.3em] text-[#C4A77A]">
          MAKE YOUR SPACE YOURS
        </p>

        {/* Heading */}
        <h2 className="animate-[fadeUp_0.9s_ease-out_0.15s_both] text-3xl font-semibold leading-tight text-white md:text-5xl">
          Find Furniture That Feels Like Home
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl animate-[fadeUp_0.9s_ease-out_0.3s_both] text-sm leading-7 text-white/70 md:text-base">
          Explore our furniture collections and create a space that reflects
          your style.
        </p>

        {/* CTA Button */}
        <Link
          href="/furniture"
          className="group mt-8 inline-flex items-center gap-3 animate-[fadeUp_0.9s_ease-out_0.45s_both] bg-white px-9 py-4 text-sm font-semibold text-[#29231F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E9E1D7] hover:shadow-xl"
        >
          EXPLORE FURNITURE

          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
