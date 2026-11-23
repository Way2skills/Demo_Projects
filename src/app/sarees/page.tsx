import type { Metadata } from "next";
import ProductCollectionPage from "@/features/products/product-collection-page";

export const metadata: Metadata = {
  title: "Sarees | Nool & Zari",
  description: "Explore heritage silk sarees from the Nool & Zari collection.",
};

export default function SareesPage() {
  return <ProductCollectionPage slug="sarees" />;
}
