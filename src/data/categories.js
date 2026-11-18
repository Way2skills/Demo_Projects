/**
 * Category data for the Crueze TimeLine watch collection.
 */
export const categories = [
  {
    id: "cat-1",
    name: "Men's Watches",
    slug: "mens-watches",
    shortDescription:
      "Distinctive designs that balance confident proportions with considered detail.",
    heroDescription:
      "Confident proportions and considered detail make these pieces distinctive on every occasion.",
    imagePath: "/images/categories/for-him.jpg",
    editorialHero: {
      headline: "Made for His Moments.",
      label: "MEN'S WATCHES",
      description:
        "Confident proportions and considered detail make these pieces distinctive on every occasion.",
      highlights: ["Confident Proportions", "Everyday Precision"],
      ctaLabel: "EXPLORE THE COLLECTION",
      footer: "DESIGNED FOR YOUR EVERYDAY",
    },
    isFeatured: true,
  },
  {
    id: "cat-2",
    name: "Women's Watches",
    slug: "womens-watches",
    shortDescription:
      "Refined timepieces shaped by graceful forms, thoughtful details, and personal style.",
    heroDescription:
      "Graceful silhouettes and expressive accents bring a refined point of view to every wrist.",
    imagePath: "/images/categories/for-her.jpg",
    editorialHero: {
      headline: "Grace in Every Moment.",
      label: "WOMEN'S WATCHES",
      description:
        "Graceful silhouettes and expressive accents bring a refined point of view to every wrist.",
      highlights: ["Graceful Silhouettes", "Expressive Detail"],
      ctaLabel: "EXPLORE THE COLLECTION",
      footer: "A REFLECTION OF PERSONAL STYLE",
    },
    isFeatured: true,
  },
  {
    id: "cat-3",
    name: "Unisex Watches",
    slug: "unisex-watches",
    shortDescription:
      "Versatile designs with a balanced aesthetic for every expression of personal style.",
    heroDescription:
      "Balanced proportions and versatile design move effortlessly between styles.",
    imagePath: "/images/categories/unisex-watches.jpeg",
    isFeatured: true,
  },
  {
    id: "cat-4",
    name: "Automatic Watches",
    slug: "automatic-watches",
    shortDescription:
      "Mechanical movements and considered details celebrate the art of traditional watchmaking.",
    heroDescription:
      "Discover the quiet craft of self-winding movements and finely considered mechanics.",
    imagePath: "/images/categories/automatic-watches.jpeg",
    isFeatured: true,
  },
  {
    id: "cat-5",
    name: "Chronograph Watches",
    slug: "chronograph-watches",
    shortDescription:
      "Purposeful dial layouts bring precision timing and technical character to the wrist.",
    heroDescription:
      "Precision timing meets purposeful dial design in these technical, expressive pieces.",
    imagePath: "/images/categories/chronograph-watches.jpeg",
    isFeatured: true,
  },
  {
    id: "cat-6",
    name: "Dress & Classic Watches",
    slug: "dress-and-classic-watches",
    landingTitle: "Dress & Classic",
    shortDescription:
      "Timeless silhouettes and understated details lend a composed finish to any occasion.",
    heroDescription:
      "Understated profiles and polished details offer a composed finish for every occasion.",
    imagePath: "/images/categories/dress-and-classic.jpg",
    editorialHero: {
      headline: "The Art of Timeless Elegance.",
      label: "DRESS & CLASSIC",
      description:
        "Timeless silhouettes and understated details lend a composed finish to any occasion.",
      highlights: ["Refined Design", "Everyday Elegance"],
      ctaLabel: "DISCOVER THE COLLECTION",
      footer: "DESIGNED TO DEFINE YOUR MOMENTS",
    },
    isStyleCategory: true,
    isFeatured: true,
  },
  {
    id: "cat-7",
    name: "Diver Watches",
    slug: "diver-watches",
    landingTitle: "Sports & Adventure",
    shortDescription:
      "Bold, legible designs draw inspiration from the enduring language of dive watches.",
    heroDescription:
      "Bold legibility and adventurous character bring the spirit of exploration to the wrist.",
    imagePath: "/images/categories/sports-adventure.jpg",
    editorialHero: {
      headline: "Ready for the Journey.",
      label: "SPORTS & ADVENTURE",
      description:
        "Built for open water and beyond, these purpose-led timepieces bring clear legibility and resilient character to every journey.",
      highlights: ["Adventure Ready", "Precision in Motion"],
      ctaLabel: "EXPLORE THE COLLECTION",
      footer: "MADE TO MOVE WITH YOU",
    },
    isStyleCategory: true,
    isFeatured: true,
  },
  {
    id: "cat-8",
    name: "Fashion Watches",
    slug: "fashion-watches",
    landingTitle: "Fashion & Statement",
    shortDescription:
      "Expressive shapes and contemporary details make a distinctive statement of style.",
    heroDescription:
      "Expressive shapes and distinctive details make every timepiece a personal statement.",
    imagePath: "/images/categories/fashion-statement.jpg",
    editorialHero: {
      headline: "Time, with Character.",
      label: "FASHION & STATEMENT",
      description:
        "Expressive shapes and contemporary details turn every glance into an individual statement.",
      highlights: ["Expressive Form", "Distinctive Detail"],
      ctaLabel: "EXPLORE THE COLLECTION",
      footer: "MAKE EVERY MOMENT YOURS",
    },
    isStyleCategory: true,
    isFeatured: true,
  },
  {
    id: "cat-9",
    name: "Smart & Digital Watches",
    slug: "smart-and-digital-watches",
    shortDescription:
      "Modern digital displays pair practical functionality with clean, contemporary design.",
    heroDescription:
      "Contemporary digital displays bring practical function to streamlined everyday design.",
    imagePath: "/images/categories/smart-digital-watches.jpeg",
    isFeatured: true,
  },
  {
    id: "cat-10",
    name: "Heritage Collection",
    slug: "heritage-collection",
    landingTitle: "Heritage",
    shortDescription:
      "Classic forms and enduring design details evoke the rich traditions of horology.",
    heroDescription:
      "Timeless forms and enduring details honor the stories that shape watchmaking.",
    imagePath: "/images/categories/heritage.jpg",
    editorialHero: {
      headline: "A Legacy in Time.",
      label: "HERITAGE COLLECTION",
      description:
        "Enduring forms and considered craftsmanship carry the stories of horology into a new generation.",
      highlights: ["Enduring Craft", "Stories That Last"],
      ctaLabel: "EXPLORE THE COLLECTION",
      footer: "ROOTED IN TIME, MADE FOR TODAY",
    },
    isStyleCategory: true,
    isFeatured: true,
  },
  {
    id: "cat-11",
    name: "Luxury Watches",
    slug: "luxury-watches",
    shortDescription:
      "Exceptional design, fine materials, and intricate details define elevated timekeeping.",
    heroDescription:
      "Fine materials, exceptional design, and intricate finishing define this elevated selection.",
    imagePath: "/images/categories/luxury-watches.jpeg",
    isFeatured: true,
  },
];

/**
 * Helper: Retrieve all featured categories
 */
export function getFeaturedCategories() {
  return categories.filter((category) => category.isFeatured);
}

/**
 * Helper: Retrieve category by its slug
 */
export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug);
}
