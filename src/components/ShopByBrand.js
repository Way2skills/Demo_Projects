import SectionHeading from "@/components/common/SectionHeading";
import BrandCard from "@/components/BrandCard";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import {
  getIndianBrands,
  getInternationalBrands,
} from "@/data/brands";

const brandGroups = [
  { title: "Indian Brands", brands: getIndianBrands() },
  { title: "International Brands", brands: getInternationalBrands() },
];

export default function ShopByBrand() {
  return (
    <ScrollRevealSection
      id="shop-by-brand"
      aria-label="Shop by brand"
      className="home-scroll-reveal scroll-mt-24 border-b border-[#EBD5BD] bg-[#EFE4D3] px-4 pt-5 pb-12 text-[#302219] sm:px-8 sm:pt-6 sm:py-16 lg:px-12 lg:pt-8 lg:pb-20"
    >
      <div className="w-full">
        <div className="scroll-reveal-heading">
          <SectionHeading
            tag="A WORLD OF WATCHMAKERS"
            title="SHOP BY BRAND"
            subtitle="Discover distinctive timepieces from Indian and international watchmakers."
            align="center"
            theme="light"
            className="!mb-10 md:!mb-12 [&_h2]:font-serif [&_h2]:font-normal [&_h2]:tracking-wide"
          />
        </div>

        <div className="space-y-12 sm:space-y-14">
          {brandGroups.map((group, groupIndex) => {
            const groupOffset = brandGroups
              .slice(0, groupIndex)
              .reduce(
                (count, previousGroup) => count + previousGroup.brands.length,
                0,
              );

            return (
              <section key={group.title} aria-label={group.title}>
                <div className="scroll-reveal-heading mb-5 flex items-center gap-4 sm:mb-7">
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#D2AD86]/70"
                  />
                  <h3 className="font-serif text-lg font-medium tracking-wide text-[#6B4933] sm:text-xl">
                    {group.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[#D2AD86]/70"
                  />
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-6">
                  {group.brands.map((brand, index) => (
                    <li
                      key={brand.id}
                      className={`scroll-reveal-card min-w-0 ${
                        group.title === "International Brands" && index === 0
                          ? "lg:col-start-2"
                          : ""
                      }`}
                      style={{
                        "--scroll-reveal-delay": `${
                          (groupOffset + index) * 220
                        }ms`,
                      }}
                    >
                      <BrandCard brand={brand} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
