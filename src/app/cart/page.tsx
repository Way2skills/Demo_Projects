import type { Metadata } from "next";
import CartContents from "@/features/cart/cart-contents";

export const metadata: Metadata = {
  title: "Shopping Bag | Nool & Zari",
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;

  return (
    <main>
      <CartContents
        startCheckout={
          checkout === "now" ? "now" : checkout === "cart" ? "cart" : null
        }
      />
    </main>
  );
}
