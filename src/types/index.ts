export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  description: string;
  sku?: string;
  colorVariants?: ColorVariant[];
  subcategory?: string;
  gender?: string;
  ageRange?: string[];
  createdAt?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: string[];
}

export interface CartItem {
  id: number | string;
  productId?: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  [key: string]: any;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Order {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  customer?: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: string;
  paymentMethod: string;
  date: string;
}
