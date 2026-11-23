import type { Metadata } from "next";
import ProductShowcase from "@/features/products/product-showcase";
import { allFabricsProducts } from "@/data/catalog";
import { searchProducts } from "@/services/catalog";

export const metadata: Metadata = {
  title: "All Fabrics | Nool & Zari",
  description:
    "Explore Nool & Zari silk sarees, lehengas, dresses, and heirloom fabrics.",
};

export default async function AllFabricsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const queryParam = params.q;
  const query = (Array.isArray(queryParam) ? queryParam[0] : queryParam)?.trim() ?? "";
  const products = query
    ? searchProducts(allFabricsProducts, query)
    : allFabricsProducts;

  return (
    <main>
      <section className="all-fabrics-page section-shell">
        <ProductShowcase
          emptyMessage={
            query
              ? `No products match "${query}". Try a different name, fabric, or keyword.`
              : "There are no fabrics available right now."
          }
          key={query || "all-fabrics"}
          products={products}
          title={query ? `Results for "${query}"` : "All Fabrics"}
        />
      </section>
    </main>
  );
}
