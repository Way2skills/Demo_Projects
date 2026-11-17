
import Link from "next/link";

export default function Craftsmanship() {
  return (
    <section className="overflow-hidden bg-[#F6F3EE] px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* Craftsmanship Image */}
        <div className="group h-[400px] overflow-hidden bg-[#DDD5CC] animate-[fadeUp_1s_ease-out_both]">
          <img
            src="/images/home/craftsmanship/c1.jpeg"
            alt="Furniture craftsmanship"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        </div>

        {/* Craftsmanship Content */}
        <div className="max-w-xl">
          <p className="mb-4 animate-[fadeUp_0.8s_ease-out_both] text-xs font-semibold uppercase tracking-[0.25em] text-[#A88955]">
            MADE WITH CARE
          </p>

          <h2 className="animate-[fadeUp_0.9s_ease-out_0.15s_both] text-3xl font-semibold leading-tight text-[#29231F] md:text-4xl">
            Crafted for Comfort.
            <br />
            Designed to Last.
          </h2>

          <p className="mt-6 animate-[fadeUp_0.9s_ease-out_0.3s_both] text-base leading-8 text-[#756B62]">
            At Neolen Furniture, we believe every piece should bring together
            thoughtful design, quality materials and everyday comfort.
            Discover furniture made to become part of your home for years
            to come.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 animate-[fadeUp_0.9s_ease-out_0.45s_both] bg-[#4A3528] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#29231F] hover:shadow-lg"
          >
            OUR STORY
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
