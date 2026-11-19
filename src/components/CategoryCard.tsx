
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="category-card"
    >
      <div className="category-card-image">
        <Image
          src={category.image}
          alt={category.name}
          width={400}
          height={400}
          unoptimized
        />
      </div>

      <div className="category-card-content">
        <h3>{category.name}</h3>

        <p>{category.description}</p>

        <span>Explore Collection</span>
      </div>
    </Link>
  );
}
