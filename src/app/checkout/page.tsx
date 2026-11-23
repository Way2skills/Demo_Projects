import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout | Nool & Zari",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;
  redirect(mode === "now" ? "/cart?checkout=now" : "/cart?checkout=cart");
}
