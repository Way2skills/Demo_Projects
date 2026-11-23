import type { Category, Product } from "@/types/catalog";

export const categories: Category[] = [
  {
    id: "kanjivaram",
    name: "Kanjivaram Treasures",
    origin: "Tamil Nadu Looms",
    technique: "Korvai Weave",
    startingPrice: "$680",
    image: "/images/category-kanjivaram-new.jpg",
    imageAlt: "Model wearing a slate-blue Kanjivaram saree with traditional gold motifs",
  },
  {
    id: "banarasi",
    name: "Banarasi Brocade",
    origin: "Varanasi Heritage",
    technique: "Kadhwa Technique",
    startingPrice: "$590",
    image: "/images/category-banarasi-new.jpg",
    imageAlt: "Model wearing an ivory Banarasi saree with delicate embellishment",
  },
  {
    id: "organza",
    name: "Organza & Chanderi",
    origin: "Madhya Pradesh Weft",
    technique: "Tissue & Resham",
    startingPrice: "$420",
    image: "/images/category-organza-chanderi.jpg",
    imageAlt: "Model wearing an ivory Organza and Chanderi saree with delicate gold motifs",
  },
  {
    id: "lehenga",
    name: "Heritage Lehengas",
    origin: "Custom Atelier",
    technique: "Haute Trousseau",
    startingPrice: "$1,450",
    image: "/images/category-heritage-lehengas.jpg",
    imageAlt: "Model wearing a slate-blue heritage lehenga with intricate gold embroidery",
  },
];

const availableSizes = ["S", "M", "L", "XL", "2XL"];

export const featuredProducts: Product[] = [
  {
    id: "rani-pink-brocade",
    name: "The Rani Pink Gold Brocade",
    origin: "Varanasi Looms",
    weave: "Pure Katan Silk",
    description:
      "Hand-knotted gold zari pallu with traditional floral shikargah motifs.",
    price: 920,
    image: "/images/product-rani-pink.jpg",
    imageAlt: "Rani pink Banarasi brocade sari in a vintage courtyard",
    category: "bridal",
    sizes: availableSizes,
    swatches: [
      { name: "Rosewater Blush", color: "#e0a99e" },
      { name: "Gold Zari", color: "#d4af37" },
      { name: "Midnight Indigo", color: "#111e38" },
    ],
  },
  {
    id: "midnight-neelambari",
    name: "Eira Sharara Set",
    origin: "Kanchipuram Heritage",
    weave: "Heavy Korvai Silk",
    description:
      "Contrasting temple gopuram borders in 24K electroplated zari cord.",
    price: 1150,
    image: "/images/eira-sharara-set.png",
    imageAlt: "Model wearing an embellished champagne sharara set",
    category: "limited",
    sizes: availableSizes,
    swatches: [
      { name: "Midnight Neelambari", color: "#111e38" },
      { name: "Champagne Gold", color: "#d4af37" },
      { name: "Royal Sapphire", color: "#182b50" },
    ],
  },
  {
    id: "ivory-noor",
    name: "Ivory Bloom Dress",
    origin: "Aroka",
    weave: "Tissue Silk & Organza",
    description:
      "Featherlight spun silk overlay accompanied by an unstitched silk blouse.",
    price: 740,
    image: "/images/ivory-bloom-dress.png",
    imageAlt: "Model wearing an ivory dress with pink floral embroidery",
    category: "all",
    sizes: availableSizes,
    swatches: [
      { name: "Ivory Noor", color: "#fdf8f6" },
      { name: "Basra Pearl", color: "#ebddd5" },
      { name: "Pure Zari", color: "#d4af37" },
    ],
  },
  {
    id: "saffron-gulab",
    name: "Saffron Gulab Lehenga",
    origin: "Bridal Atelier",
    weave: "Raw Matka Silk",
    description: "Hand-sewn over 420 artisan hours with spun silver and gold wires.",
    price: 2450,
    image: "/images/saffron-gulab-lehenga.png",
    imageAlt: "Model wearing a rose-pink bridal lehenga with ornate embroidery",
    category: "bridal",
    sizes: availableSizes,
    swatches: [
      { name: "Rosewater Champagne", color: "#e0a99e" },
      { name: "Gold Thread", color: "#d4af37" },
      { name: "Midnight Indigo", color: "#111e38" },
    ],
  },
  {
    id: "anju-modi-hot-pink-anarkali-set",
    name: "Hot Pink Anarkali Set",
    origin: "ANJU MODI",
    description:
      "A hot pink Anarkali set with multicoloured floral embroidery and a coordinating drape.",
    price: 63840,
    compareAtPrice: 79800,
    image: "/images/anju-modi-hot-pink-anarkali-set.png",
    imageAlt:
      "Model wearing a hot pink Anarkali set with colourful embroidered details and a coordinating drape.",
    category: "limited",
    sizes: availableSizes,
    swatches: [{ name: "Hot Pink", color: "#a3164a" }],
  },
];

const fabricAndApparelProducts: Product[] = [
  ...featuredProducts,
  {
    id: "emerald-kadhwa",
    name: "Emerald Banarasi Kadhwa",
    origin: "Varanasi Heritage",
    weave: "Kadhwa Silk",
    description: "Handwoven emerald silk with antique-gold floral motifs.",
    price: 880,
    image: "/images/category-banarasi-new.jpg",
    imageAlt: "Emerald Banarasi silk saree with antique-gold motifs",
    category: "all",
    sizes: availableSizes,
    swatches: [
      { name: "Emerald", color: "#315b49" },
      { name: "Antique Gold", color: "#c5a15b" },
    ],
  },
  {
    id: "slate-blue-kanjivaram",
    name: "Slate Blue Kanjivaram",
    origin: "Tamil Nadu Looms",
    weave: "Korvai Pure Silk",
    description: "A classic Kanjivaram drape finished with a temple border.",
    price: 1080,
    image: "/images/category-kanjivaram-new.jpg",
    imageAlt: "Slate-blue Kanjivaram saree with traditional gold motifs",
    category: "bridal",
    sizes: availableSizes,
    swatches: [
      { name: "Slate Blue", color: "#64758b" },
      { name: "Gold Zari", color: "#d4af37" },
    ],
  },
  {
    id: "ivory-chanderi-tissue",
    name: "Ivory Chanderi Tissue",
    origin: "Chanderi Valley",
    weave: "Tissue & Resham",
    description: "Lightweight ivory silk with delicate zari detailing.",
    price: 520,
    image: "/images/category-organza-chanderi.jpg",
    imageAlt: "Ivory Chanderi saree with subtle gold motifs",
    category: "all",
    sizes: availableSizes,
    swatches: [
      { name: "Ivory", color: "#fdf8f6" },
      { name: "Champagne", color: "#cbb279" },
    ],
  },
  {
    id: "heritage-zardozi-lehenga",
    name: "Heritage Zardozi Lehenga",
    origin: "Bridal Atelier",
    weave: "Raw Silk & Zardozi",
    description: "A richly embroidered heirloom silhouette for celebrations.",
    price: 1980,
    image: "/images/category-heritage-lehengas.jpg",
    imageAlt: "Heritage lehenga with intricate gold embroidery",
    category: "bridal",
    sizes: availableSizes,
    swatches: [
      { name: "Midnight Indigo", color: "#111e38" },
      { name: "Gold Thread", color: "#d4af37" },
    ],
  },
  {
    id: "rosewood-tussar-zari",
    name: "Rosewood Tussar Zari",
    origin: "Bhagalpur Looms",
    weave: "Tussar Silk & Zari",
    description: "Textured tussar silk woven with a softly gleaming zari edge.",
    price: 650,
    image: "/images/rosewood-tussar-zari.png",
    imageAlt: "Model wearing a rosewood outfit with gold zari detailing",
    category: "all",
    sizes: availableSizes,
    swatches: [
      { name: "Rosewood", color: "#7b4e50" },
      { name: "Zari Gold", color: "#d4af37" },
    ],
  },
  {
    id: "temple-border-kanchipuram",
    name: "Onyx Trail Sharara Set",
    origin: "Pankaj & Nidhi",
    weave: "Heavy Korvai Silk",
    description: "Traditional temple-border silk, woven for lasting occasions.",
    price: 1320,
    image: "/images/onyx-trail-sharara-set.png",
    imageAlt: "Model wearing a black sharara set with ornate gold embroidery",
    category: "limited",
    sizes: availableSizes,
    swatches: [
      { name: "Royal Blue", color: "#233b6c" },
      { name: "Gold Zari", color: "#d4af37" },
    ],
  },
  {
    id: "vaayu-emerald-thread-dress",
    name: "Emerald Thread embroidered Dress",
    origin: "VAAYU",
    description:
      "A teal dress with delicate floral threadwork and gathered sleeves.",
    price: 8330,
    compareAtPrice: 9800,
    image: "/images/vaayu-emerald-thread-dress.png",
    imageAlt:
      "Model wearing a teal dress with floral embroidery and gathered sleeves.",
    category: "all",
    sizes: availableSizes,
    swatches: [{ name: "Emerald Teal", color: "#087778" }],
  },
  {
    id: "ekaya-banaras-i-do-saree",
    name: "The 'i Do' Saree",
    origin: "EKAYA BANARAS",
    description:
      "A black saree with intricate antique-gold motifs and ornate border work.",
    price: 33731.25,
    compareAtPrice: 44975,
    image: "/images/ekaya-banaras-i-do-saree.png",
    imageAlt:
      "Model wearing a black and antique-gold saree with ornate woven borders in a dark, gilded setting.",
    category: "bridal",
    sizes: availableSizes,
    swatches: [{ name: "Black and Gold", color: "#28231f" }],
  },
  {
    id: "banaras-ekaya-black-chiffon-embossed-saree",
    name: "Handwoven Black Chiffon Embossed Saree",
    origin: "BANARAS EKAYA",
    description:
      "A handwoven black chiffon saree with an elegant embossed floral design.",
    price: 49975,
    image: "/images/banaras-ekaya-black-chiffon-embossed-saree.png",
    imageAlt:
      "Model wearing a black chiffon saree with silver floral embossing against a red backdrop.",
    category: "bridal",
    sizes: availableSizes,
    swatches: [{ name: "Black and Silver", color: "#28231f" }],
  },
];

export const accessoryProducts: Product[] = [
  {
    id: "mesh-studios-heart-red",
    name: "The Heart - Red",
    origin: "Mesh Studios",
    description:
      "A red textured handbag with a gathered silhouette and rounded top handle.",
    price: 12500,
    image: "/images/mesh-studios-heart-red.png",
    imageAlt: "Red textured handbag with a rounded handle held against denim.",
    category: "accessories",
    swatches: [{ name: "Red", color: "#b92831" }],
  },
  {
    id: "amyra-zahri-silk-clutch-pink",
    name: "Zahri Silk Clutch - Pink",
    origin: "AMYRA",
    description:
      "A pink silk clutch with a structured frame, gold-tone handle, and woven motifs.",
    price: 3299,
    image: "/images/amyra-zahri-silk-clutch-pink.png",
    imageAlt:
      "Pink silk clutch with a gold-tone handle and floral motifs held against an ivory outfit.",
    category: "accessories",
    swatches: [{ name: "Pink", color: "#d62982" }],
  },
  {
    id: "nayaab-serinity-sailor-lattice-mint-maritime",
    name: "Serinity Sailor Lattice Mint Maritime",
    origin: "NAYAAB BY SONIA",
    description:
      "A beaded ivory clutch with mint accents, pearl detailing, and a fringed silhouette.",
    price: 11900,
    image: "/images/nayaab-serinity-sailor-lattice-mint-maritime.png",
    imageAlt:
      "Ivory and mint beaded clutch with pearl detailing and a fringed silhouette.",
    category: "accessories",
    swatches: [{ name: "Mint", color: "#b9c9ae" }],
  },
  {
    id: "nayaab-pearl-treasure-gold",
    name: "Pearl Treasure Gold",
    origin: "NAYAAB BY SONIA",
    description:
      "A gold-toned potli bag with pearl embellishment, beaded handles, and tassel detailing.",
    price: 9000,
    image: "/images/nayaab-pearl-treasure-gold.png",
    imageAlt:
      "Gold-toned potli bag covered in pearls, with beaded handles and a long tassel.",
    category: "accessories",
    swatches: [{ name: "Gold", color: "#c49a48" }],
  },
  {
    id: "kesya-nizam-cufflinks",
    name: "Nizam Cufflinks",
    origin: "KESYA",
    description:
      "Hexagonal black cufflinks framed with a border of clear stones.",
    price: 14100,
    image: "/images/kesya-nizam-cufflinks.png",
    imageAlt:
      "Pair of black hexagonal cufflinks framed with clear stones on a white background.",
    category: "accessories",
    swatches: [{ name: "Black", color: "#171717" }],
  },
  {
    id: "kesya-yellow-jharokha-pocket-square",
    name: "Yellow Jharokha Pocket Square",
    origin: "KESYA",
    description:
      "A blue pocket square with a yellow Jharokha pattern and border.",
    price: 1200,
    image: "/images/kesya-yellow-jharokha-pocket-square.png",
    imageAlt:
      "Blue pocket square with a yellow Jharokha pattern and border on a white background.",
    category: "accessories",
    swatches: [{ name: "Yellow and Blue", color: "#e5b823" }],
  },
  {
    id: "nayaab-pearl-treasure-clutch-silver",
    name: "Pearl Treasure Clutch Silver",
    origin: "NAYAAB BY SONIA",
    description:
      "A silver-toned clutch with pearl embellishment and a beaded shoulder handle.",
    price: 9900,
    image: "/images/nayaab-pearl-treasure-clutch-silver.png",
    imageAlt:
      "Silver-toned pearl-embellished clutch with a beaded handle, carried against a black outfit.",
    category: "accessories",
    swatches: [{ name: "Silver", color: "#d8d9d7" }],
  },
  {
    id: "suhani-pittie-imperial-filigree-drop-earrings",
    name: "The Imperial Filigree Drop Earrings",
    origin: "SUHANI PITTIE",
    description:
      "Gold filigree drop earrings with square stone pendants and ruby-toned accents.",
    price: 4950,
    compareAtPrice: 5500,
    image: "/images/suhani-pittie-imperial-filigree-drop-earrings.png",
    imageAlt:
      "Pair of gold filigree drop earrings with pink gem accents arranged on a textured surface.",
    category: "accessories",
    swatches: [{ name: "Gold and Pink", color: "#b61e68" }],
  },
  {
    id: "suhani-pittie-crystal-maya-22k-earrings",
    name: "Crystal Maya 22k Gold Plated Earrings",
    origin: "SUHANI PITTIE",
    description:
      "22k gold-plated sunburst earrings with crystal and ruby-toned stone accents.",
    price: 5000,
    compareAtPrice: 10000,
    image: "/images/suhani-pittie-crystal-maya-22k-earrings.png",
    imageAlt:
      "Pair of gold-plated sunburst earrings with crystal and ruby-toned stone details.",
    category: "accessories",
    swatches: [{ name: "Gold and Crystal", color: "#c9a34b" }],
  },
];

export const setProducts: Product[] = [
  {
    id: "anushree-reddy-ember-peplum-set",
    name: "Ember Peplum Set",
    origin: "ANUSHREE REDDY",
    description:
      "A coral-pink peplum set with delicate floral embroidery and a flowing skirt.",
    price: 155220,
    compareAtPrice: 199000,
    image: "/images/anushree-reddy-ember-peplum-set.png",
    imageAlt:
      "Model wearing a coral-pink embroidered peplum top and flowing skirt in a garden.",
    category: "sets",
    sizes: availableSizes,
    swatches: [{ name: "Ember Pink", color: "#e87970" }],
  },
  {
    id: "anushree-reddy-zari-cutwork-peplum-set",
    name: "Zari Cutwork Peplum Set",
    origin: "ANUSHREE REDDY",
    description:
      "A lime-yellow peplum set with intricate zari cutwork and a flowing skirt.",
    price: 149000,
    image: "/images/anushree-reddy-zari-cutwork-peplum-set.png",
    imageAlt:
      "Model wearing a lime-yellow embroidered zari cutwork peplum set in a garden.",
    category: "sets",
    sizes: availableSizes,
    swatches: [{ name: "Lime Yellow", color: "#c5b62a" }],
  },
  {
    id: "shalkii-green-lehenga-set-organza-dupatta",
    name: "Green Lehenga Set With Organza Dupatta",
    origin: "SHALKII",
    description:
      "A sage-green embroidered lehenga set paired with a coordinating organza dupatta.",
    price: 48000,
    image: "/images/shalkii-green-lehenga-organza-dupatta-set.png",
    imageAlt:
      "Model wearing a sage-green embroidered lehenga set with an organza dupatta.",
    category: "sets",
    sizes: availableSizes,
    swatches: [{ name: "Sage Green", color: "#9da99a" }],
  },
  {
    id: "rohit-bal-black-chanderi-lehenga-set",
    name: "Black Chanderi Lehenga Set",
    origin: "ROHIT BAL",
    description:
      "A black Chanderi lehenga set with vibrant floral embroidery and a coordinating dupatta.",
    price: 94999,
    image: "/images/rohit-bal-black-chanderi-lehenga-set.png",
    imageAlt:
      "Model wearing a black Chanderi lehenga set with colorful floral embroidery.",
    category: "sets",
    sizes: availableSizes,
    swatches: [{ name: "Black", color: "#171717" }],
  },
];

export const allProducts: Product[] = [
  ...fabricAndApparelProducts,
  ...accessoryProducts,
  ...setProducts,
];

export const allFabricsProducts = allProducts.filter(
  (product) => product.category !== "accessories",
);

