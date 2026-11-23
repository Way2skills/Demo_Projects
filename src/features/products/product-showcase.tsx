"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import type { Product } from "@/types/catalog";
import { formatPrice, getDiscountPercent } from "@/services/catalog";
import QuickViewModal from "@/features/products/quick-view-modal";
import styles from "./product-showcase.module.css";

interface ProductShowcaseProps {
  products: Product[];
  title: string;
  emptyMessage: string;
}

const PRODUCTS_PER_PAGE = 16;

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "alphabetical-az", label: "Alphabetically, A-Z" },
  { value: "alphabetical-za", label: "Alphabetically, Z-A" },
  { value: "price-low-high", label: "Price, low to high" },
  { value: "price-high-low", label: "Price, high to low" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export default function ProductShowcase({
  products,
  title,
  emptyMessage,
}: ProductShowcaseProps) {
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sortControlRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const closeQuickView = useCallback(() => setSelectedProduct(null), []);
  const activeSortCount = sortOption === "featured" ? 0 : 1;

  useEffect(() => {
    if (!sortMenuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !sortControlRef.current?.contains(event.target)
      ) {
        setSortMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSortMenuOpen(false);
        sortButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [sortMenuOpen]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortOption) {
      case "alphabetical-az":
        return sorted.sort((left, right) =>
          left.name.localeCompare(right.name, "en", { sensitivity: "base" }),
        );
      case "alphabetical-za":
        return sorted.sort((left, right) =>
          right.name.localeCompare(left.name, "en", { sensitivity: "base" }),
        );
      case "price-low-high":
        return sorted.sort((left, right) => left.price - right.price);
      case "price-high-low":
        return sorted.sort((left, right) => right.price - left.price);
      default:
        return sorted;
    }
  }, [products, sortOption]);
  const pageCount = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const pageProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  return (
    <>
      <header className={styles.collectionHeader}>
        <h1 className="visually-hidden">{title}</h1>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
        <div className={styles.toolbar}>
          <p aria-live="polite" className={styles.productCount}>
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
          <div className={styles.sortControl} ref={sortControlRef}>
            <button
              aria-controls="collection-sort-options"
              aria-expanded={sortMenuOpen}
              aria-label={
                activeSortCount
                  ? `Sort by, ${activeSortCount} sort applied`
                  : "Sort by"
              }
              className={styles.sortButton}
              onClick={() => setSortMenuOpen((isOpen) => !isOpen)}
              ref={sortButtonRef}
              type="button"
            >
              <span className={styles.sortButtonContent}>
                <span>Sort By</span>
                <ChevronDown
                  aria-hidden="true"
                  className={styles.sortChevron}
                  size={15}
                  strokeWidth={1.5}
                />
                {activeSortCount > 0 && (
                  <span aria-hidden="true" className={styles.sortBadge}>
                    {activeSortCount}
                  </span>
                )}
              </span>
            </button>
            <div
              aria-label="Sort products"
              className={styles.sortMenu}
              hidden={!sortMenuOpen}
              id="collection-sort-options"
              role="group"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  aria-pressed={sortOption === option.value}
                  className={styles.sortOption}
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value);
                    setPage(1);
                    setSortMenuOpen(false);
                    sortButtonRef.current?.focus();
                  }}
                  type="button"
                >
                  <span>{option.label}</span>
                  {sortOption === option.value && (
                    <Check aria-hidden="true" size={15} strokeWidth={1.75} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      {pageProducts.length > 0 ? (
        <div className={styles.grid}>
          {pageProducts.map((product) => {
            const productHref = `/products/${product.id}`;
            const discountPercent = getDiscountPercent(product);

            return (
              <article className={styles.card} key={product.id}>
                <div className={styles.image}>
                  <Link
                    aria-label={`View ${product.name}`}
                    className={styles.imageLink}
                    href={productHref}
                  >
                    <Image
                      alt={product.imageAlt}
                      className={styles.imageContent}
                      fill
                      sizes="(max-width: 600px) 46vw, (max-width: 850px) 46vw, 23vw"
                      src={product.image}
                    />
                  </Link>
                  {discountPercent !== undefined && (
                    <span className={styles.saleBadge}>
                      {discountPercent}% Off
                    </span>
                  )}
                  <button
                    aria-label={`Quick view ${product.name}`}
                    className={styles.quickViewButton}
                    onClick={() => setSelectedProduct(product)}
                    type="button"
                  >
                    <Plus aria-hidden="true" size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <Link className={styles.infoLink} href={productHref}>
                  <div className={styles.info}>
                    <p className={styles.brand}>{product.origin}</p>
                    <h2 className={styles.name}>{product.name}</h2>
                    <div className={styles.priceRow}>
                      <p className={styles.price}>
                        {formatPrice(product.price)}
                      </p>
                      {product.compareAtPrice !== undefined && (
                        <p className={styles.compareAtPrice}>
                          {formatPrice(product.compareAtPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="empty-products" role="status">
          {emptyMessage}
        </p>
      )}
      {pageCount > 1 && (
        <nav aria-label="Product pagination" className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            type="button"
          >
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                aria-current={currentPage === pageNumber ? "page" : undefined}
                aria-label={`Page ${pageNumber}`}
                className={styles.pageButton}
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            );
          })}
          <button
            className={styles.pageButton}
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
            type="button"
          >
            Next
          </button>
        </nav>
      )}
      {selectedProduct && (
        <QuickViewModal
          key={selectedProduct.id}
          onClose={closeQuickView}
          product={selectedProduct}
        />
      )}
    </>
  );
}