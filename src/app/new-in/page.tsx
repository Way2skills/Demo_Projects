import type { Metadata } from "next";
import ProductCollectionPage from "@/features/products/product-collection-page";

export const metadata: Metadata = {
  title: "New In | Nool & Zari",
  description: "Discover the featured arrivals from the Nool & Zari collection.",
};

export default function NewInPage() {
  return <ProductCollectionPage slug="new-in" />;
}
