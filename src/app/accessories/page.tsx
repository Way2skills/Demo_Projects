import type { Metadata } from "next";
import ProductCollectionPage from "@/features/products/product-collection-page";

export const metadata: Metadata = {
  title: "Accessories | Nool & Zari",
  description: "Explore accessories from the Nool & Zari collection.",
};

export default function AccessoriesPage() {
  return <ProductCollectionPage slug="accessories" />;
}
