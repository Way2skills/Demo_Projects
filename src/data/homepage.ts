import type {
  CraftDetail,
  HeroCredential,
  Occasion,
  Testimonial,
} from "@/types/homepage";

export const occasions: Occasion[] = [
  {
    name: "Wedding Trousseau",
    image: "/images/wedding-trousseau-lehenga.jpg",
    imageAlt: "Model wearing a champagne-gold embroidered bridal lehenga",
  },
  {
    name: "Festive Edit",
    image: "/images/hero-banarasi-model.jpg",
    imageAlt: "Woman wearing a pink Banarasi silk saree",
  },
  {
    name: "Elevated Essentials",
    image: "/images/category-organza-chanderi.jpg",
    imageAlt: "Woman wearing an ivory saree with delicate gold motifs",
  },
  {
    name: "Vacation Edit",
    image: "/images/category-kanjivaram-new.jpg",
    imageAlt: "Woman wearing a slate-blue silk saree",
  },
];

export const craftDetails: CraftDetail[] = [
  {
    title: "Hand-spun Spindles",
    description:
      "Naturally sourced cocoon silks turned on gentle wooden taklis.",
    icon: "waves",
  },
  {
    title: "24K Dipped Zari",
    description:
      "Certified silver threads bathed in micro-micron gold plating.",
    icon: "gem",
  },
  {
    title: "Made-to-Measure",
    description:
      "Bespoke fall, edging, and blouse embroidery tailored to you.",
    icon: "accessibility",
  },
];

export const heroCredentials: HeroCredential[] = [
  { label: "100% Pure Mulberry Silk", icon: "check" },
  { label: "Master Craftsmen Guild", icon: "users" },
  { label: "Certified Zari Purity", icon: "award" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The pure mulberry weight of the Kanjivaram is unlike anything made today. Draping it felt like wearing a piece of family history.",
    initials: "AP",
    name: "Ananya Parthasarathy",
    details: "Bridal Patron • London",
  },
  {
    quote:
      "The virtual atelier fitting was impeccable. The team zoomed into the hand-dipped zari wire before weaving started. Utterly bespoke.",
    initials: "RM",
    name: "Dr. Radhika Mehta",
    details: "Atelier Member • New York",
  },
  {
    quote:
      "My daughter’s wedding trousseau centered entirely around Nool & Zari’s Banarasi Kadhwa sari. A masterpiece in genuine craftsmanship.",
    initials: "SC",
    name: "Sunita Chandra",
    details: "Patron • Mumbai",
  },
  {
    quote:
      "Every detail felt personal and deeply considered. The silk drape, the hand-finished border, and the final fitting were all exceptional.",
    initials: "NV",
    name: "Nisha Venkatesh",
    details: "Bride • Bengaluru",
  },
  {
    quote:
      "I ordered a festive sari for a family celebration and it arrived with the most exquisite finish. It felt couture without being excessive.",
    initials: "AK",
    name: "Aditi Kapoor",
    details: "Patron • Dubai",
  },
  {
    quote:
      "The craft is extraordinary, but the experience is what makes it unforgettable. The atelier team truly listens and understands your story.",
    initials: "SM",
    name: "Sana Mirza",
    details: "Private Client • London",
  },
];
