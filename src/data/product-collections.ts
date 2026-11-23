import {
  accessoryProducts,
  allProducts,
  featuredProducts,
} from "@/data/catalog";
import type { Product } from "@/types/catalog";

export type ProductCollectionSlug =
  | "new-in"
  | "sets"
  | "sarees"
  | "accessories"
  | "sale";

type ProductCollection = {
  title: string;
  products: Product[];
  emptyMessage: string;
};

function selectProducts(productIds: readonly string[]): Product[] {
  return allProducts.filter((product) => productIds.includes(product.id));
}

export const productCollections: Record<
  ProductCollectionSlug,
  ProductCollection
> = {
  "new-in": {
    title: "New In",
    products: featuredProducts,
    emptyMessage: "There are no new arrivals available right now.",
  },
  sets: {
    title: "Sets",
    products: selectProducts([
      "midnight-neelambari",
      "ivory-noor",
      "saffron-gulab",
      "heritage-zardozi-lehenga",
      "temple-border-kanchipuram",
      "vaayu-emerald-thread-dress",
      "anju-modi-hot-pink-anarkali-set",
      "anushree-reddy-ember-peplum-set",
      "anushree-reddy-zari-cutwork-peplum-set",
      "shalkii-green-lehenga-set-organza-dupatta",
      "rohit-bal-black-chanderi-lehenga-set",
    ]),
    emptyMessage: "There are no sets available right now.",
  },
  sarees: {
    title: "Sarees",
    products: selectProducts([
      "rani-pink-brocade",
      "emerald-kadhwa",
      "slate-blue-kanjivaram",
      "ivory-chanderi-tissue",
      "ekaya-banaras-i-do-saree",
      "banaras-ekaya-black-chiffon-embossed-saree",
    ]),
    emptyMessage: "There are no sarees available right now.",
  },
  accessories: {
    title: "Accessories",
    products: accessoryProducts,
    emptyMessage: "Accessories will be available here when added to the collection.",
  },
  sale: {
    title: "Sale",
    products: allProducts.filter(
      (product) =>
        product.compareAtPrice !== undefined &&
        product.compareAtPrice > product.price,
    ),
    emptyMessage: "There are no sale items available right now.",
  },
};
