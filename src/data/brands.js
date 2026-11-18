/**
 * Sample Brand Data for Crueze TimeLine.
 * DISCLAIMER & NOTICE:
 * These brand entries represent horological reference information for showcase and demo purposes only.
 * Crueze TimeLine does not claim official brand partnerships, authorized dealership status,
 * or confirmed showroom inventory for any of these manufacturers.
 */

export const brands = [
  // --- Indian Brands ---
  {
    id: "brand-in-1",
    name: "Titan",
    slug: "titan",
    country: "India",
    originGroup: "Indian",
    establishedYear: 1984,
    tagline: "Pioneering Indian Watchmaking & Craftsmanship",
    shortDescription:
      "An Indian watchmaker with a broad range of timepieces and distinctive collections.",
    specialty: "Contemporary and Classic Timepieces",
    collections: ["Nebula", "Edge", "Automatic"],
    isFeatured: true,
  },
  {
    id: "brand-in-2",
    name: "Sonata",
    slug: "sonata",
    country: "India",
    originGroup: "Indian",
    establishedYear: 1986,
    tagline: "Everyday Style and Versatile Designs",
    shortDescription:
      "An Indian watch brand offering varied designs for everyday wear and personal style.",
    specialty: "Everyday Watches",
    isFeatured: true,
  },
  {
    id: "brand-in-3",
    name: "Fastrack",
    slug: "fastrack",
    country: "India",
    originGroup: "Indian",
    establishedYear: 1998,
    tagline: "Youthful Style and Contemporary Design",
    shortDescription:
      "An Indian lifestyle brand known for expressive watches and contemporary accessories.",
    specialty: "Fashion Watches and Accessories",
    isFeatured: true,
  },
  {
    id: "brand-in-4",
    name: "Joker & Witch",
    slug: "joker-and-witch",
    country: "India",
    originGroup: "Indian",
    tagline: "Contemporary Fashion Watches & Modern Accessories",
    shortDescription:
      "Modern Indian direct-to-consumer fashion brand offering trend-driven wristwatches, jewelry pairings, and contemporary lifestyle accessories for everyday style.",
    specialty: "Fashion Watches & Curated Accessories",
    isFeatured: true,
  },
  {
    id: "brand-in-5",
    name: "Jaipur Watch Company",
    slug: "jaipur-watch-company",
    country: "India",
    originGroup: "Indian",
    establishedYear: 2013,
    tagline: "Numismatic Coin Dials & Bespoke Craft",
    shortDescription:
      "An Indian watch brand with distinctive designs inspired by numismatic details and artisanal craft.",
    specialty: "Coin-Inspired and Artisan Dials",
    isFeatured: true,
  },
  {
    id: "brand-in-6",
    name: "Bangalore Watch Company",
    slug: "bangalore-watch-company",
    country: "India",
    originGroup: "Indian",
    establishedYear: 2018,
    tagline: "Story-Driven Fine Indian Horology",
    shortDescription:
      "An independent Indian watchmaker creating design-led timepieces inspired by aviation, space, and cultural narratives.",
    specialty: "Aviation and Space-Inspired Design",
    isFeatured: true,
  },

  // --- International Watchmakers ---
  {
    id: "brand-int-1",
    name: "Rolex",
    slug: "rolex",
    country: "Switzerland",
    originGroup: "International",
    establishedYear: 1905,
    tagline: "Precision Chronometers & Timeless Prestige",
    shortDescription:
      "Swiss manufacture celebrated for robust Oyster perpetual architecture, chronometric precision, and legendary tool watch heritage.",
    specialty: "Superlative Chronometers & Oyster Architecture",
    isFeatured: true,
  },
  {
    id: "brand-int-2",
    name: "Omega",
    slug: "omega",
    country: "Switzerland",
    originGroup: "International",
    establishedYear: 1848,
    tagline: "Master Chronometry & Space Exploration",
    shortDescription:
      "Swiss watchmaker with an illustrious history spanning ocean depths, the Olympic Games, and Co-Axial Master Chronometer calibers.",
    specialty: "Co-Axial Master Chronometers",
    isFeatured: true,
  },
  {
    id: "brand-int-3",
    name: "Seiko",
    slug: "seiko",
    country: "Japan",
    originGroup: "International",
    establishedYear: 1881,
    tagline: "Pioneering Japanese Manufacture & Diver Heritage",
    shortDescription:
      "A Japanese watchmaker known for a wide range of timepieces, including mechanical and diver-inspired designs.",
    specialty: "Mechanical Watches and Tool-Watch Design",
    isFeatured: true,
  },
  {
    id: "brand-int-4",
    name: "Tissot",
    country: "Switzerland",
    slug: "tissot",
    originGroup: "International",
    establishedYear: 1853,
    tagline: "Traditional Swiss Horology & Innovation",
    shortDescription:
      "A Swiss watchmaker offering a range of traditional and contemporary timepieces.",
    specialty: "Swiss Watches and Classic Designs",
    isFeatured: true,
  },
];

/**
 * Helper: Retrieve all Indian brands
 */
export function getIndianBrands() {
  return brands.filter((brand) => brand.originGroup === "Indian");
}

/**
 * Helper: Retrieve all International watchmakers
 */
export function getInternationalBrands() {
  return brands.filter((brand) => brand.originGroup === "International");
}

/**
 * Helper: Retrieve featured watchmakers
 */
export function getFeaturedBrands() {
  return brands.filter((brand) => brand.isFeatured);
}

/**
 * Helper: Look up brand by its slug
 */
export function getBrandBySlug(slug) {
  return brands.find((brand) => brand.slug === slug);
}
