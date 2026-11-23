import type { Metadata } from "next";
import ProductCollectionPage from "@/features/products/product-collection-page";

export const metadata: Metadata = {
  title: "Sets | Nool & Zari",
  description: "Explore sharara sets, lehengas, and occasion wear from Nool & Zari.",
};

export default function SetsPage() {
  return <ProductCollectionPage slug="sets" />;
}
