import type { Metadata } from "next";
import ProductCollectionPage from "@/features/products/product-collection-page";

export const metadata: Metadata = {
  title: "Sale | Nool & Zari",
  description: "Explore sale items from the Nool & Zari collection.",
};

export default function SalePage() {
  return <ProductCollectionPage slug="sale" />;
}
