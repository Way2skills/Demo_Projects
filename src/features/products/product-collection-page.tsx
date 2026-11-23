import ProductShowcase from "@/features/products/product-showcase";
import {
  productCollections,
  type ProductCollectionSlug,
} from "@/data/product-collections";

export default function ProductCollectionPage({
  slug,
}: {
  slug: ProductCollectionSlug;
}) {
  const collection = productCollections[slug];

  return (
    <main>
      <section className="all-fabrics-page section-shell">
        <ProductShowcase
          emptyMessage={collection.emptyMessage}
          key={slug}
          products={collection.products}
          title={collection.title}
        />
      </section>
    </main>
  );
}
