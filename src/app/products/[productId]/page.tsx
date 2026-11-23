import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { allProducts } from "@/data/catalog";
import {
  formatPrice,
  getDiscountPercent,
  getProductById,
} from "@/services/catalog";
import ProductPurchaseOptions from "@/features/products/product-purchase-options";
import styles from "./product-details.module.css";

export const metadata: Metadata = {
  title: "Product Details | Nool & Zari",
};

export function generateStaticParams() {
  return allProducts.map((product) => ({ productId: product.id }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!product) {
    notFound();
  }
  const returnHref =
    product.category === "accessories"
      ? "/accessories"
      : product.category === "sets"
        ? "/sets"
        : "/all-fabrics";
  const returnLabel =
    product.category === "accessories"
      ? "Return to Accessories"
      : product.category === "sets"
        ? "Return to Sets"
        : "Return to All Fabrics";
  const discountPercent = getDiscountPercent(product);

  return (
    <main>
      <article className={styles.page}>
        <div className={styles.image}>
          <Image
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 750px) 100vw, 50vw"
            src={product.image}
          />
          {discountPercent !== undefined && (
            <span className={styles.saleBadge}>{discountPercent}% Off</span>
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.brand}>{product.origin}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.priceRow}>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            {product.compareAtPrice !== undefined && (
              <p className={styles.compareAtPrice}>
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
          </div>
          <p className={styles.description}>{product.description}</p>
          <dl className={styles.meta}>
            {product.weave && (
              <div>
                <dt>Weave</dt>
                <dd>{product.weave}</dd>
              </div>
            )}
            <div>
              <dt>Atelier</dt>
              <dd>{product.origin}</dd>
            </div>
          </dl>
          <ProductPurchaseOptions product={product} />
          <Link className={styles.backLink} href={returnHref}>
            {returnLabel}
          </Link>
        </div>
      </article>
    </main>
  );
}
