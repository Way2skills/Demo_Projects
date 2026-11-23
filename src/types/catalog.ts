export interface Category {
  id: string;
  name: string;
  origin: string;
  technique: string;
  startingPrice: string;
  image: string;
  imageAlt: string;
}

export interface ProductSwatch {
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  weave?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: string;
  category: "bridal" | "limited" | "all" | "accessories" | "sets";
  swatches: ProductSwatch[];
  sizes?: string[];
  sizeChartUrl?: string;
}
