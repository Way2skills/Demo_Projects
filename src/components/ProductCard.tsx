
"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  function handleAddToCart() {
    if (onAddToCart) {
      onAddToCart(product);
    }

    // Open the global cart drawer
    window.dispatchEvent(new Event("babyhunt-open-cart"));
  }

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          unoptimized
        />

        {product.badge && (
          <span className="product-card-badge">
            {product.badge}
          </span>
        )}
      </div>

      <div className="product-card-content">
        <p className="product-card-category">
          {product.category}
        </p>

        <h3>{product.name}</h3>

        <p className="product-card-description">
          {product.description}
        </p>

        <div className="product-card-bottom">
          <div className="product-card-price">
            <strong>₹{product.price}</strong>

            {product.oldPrice && (
              <del>₹{product.oldPrice}</del>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={17} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
