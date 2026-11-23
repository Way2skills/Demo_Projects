import { allProducts } from "@/data/catalog";
import type { Product } from "@/types/catalog";

function normalizeSearchText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getProductById(productId: string): Product | undefined {
  return allProducts.find((product) => product.id === productId);
}

export function searchProducts(
  products: readonly Product[],
  query: string,
): Product[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [...products];

  const terms = normalizedQuery.split(/\s+/);

  return products
    .map((product, index) => {
      const name = normalizeSearchText(product.name);
      const origin = normalizeSearchText(product.origin);
      const weave = normalizeSearchText(product.weave ?? "");
      const description = normalizeSearchText(product.description);
      const fields = [
        name,
        origin,
        weave,
        description,
        normalizeSearchText(product.imageAlt),
        normalizeSearchText(product.category),
        normalizeSearchText(product.id),
        ...product.swatches.map((swatch) => normalizeSearchText(swatch.name)),
      ];
      const matches = terms.every((term) =>
        fields.some((field) => field.includes(term)),
      );
      const phraseScore =
        name === normalizedQuery ? 100 : name.includes(normalizedQuery) ? 50 : 0;
      const fieldScore = terms.reduce((score, term) => {
        if (name.includes(term)) return score + 8;
        if (origin.includes(term)) return score + 6;
        if (weave.includes(term)) return score + 5;
        if (description.includes(term)) return score + 3;
        return score + 1;
      }, 0);

      return { product, index, matches, score: phraseScore + fieldScore };
    })
    .filter((result) => result.matches)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((result) => result.product);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getDiscountPercent(
  product: Pick<Product, "price" | "compareAtPrice">,
): number | undefined {
  if (
    product.compareAtPrice === undefined ||
    product.compareAtPrice <= product.price
  ) {
    return undefined;
  }

  return Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
  );
}
