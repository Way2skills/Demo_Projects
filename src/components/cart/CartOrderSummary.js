import Link from "next/link";
import CartItemRow from "@/components/cart/CartItemRow";
import { formatINR } from "@/utils/formatters";

export default function CartOrderSummary({
  cart,
  cartCount,
  actionHref,
  actionLabel,
  actionRequiresValidPrices = false,
  showItems = false,
  showShippingStatus = false,
}) {
  const hasValidPrices = cart.every(
    (item) =>
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isFinite(item.quantity) &&
      item.quantity > 0,
  );
  const subtotal = hasValidPrices
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : null;

  return (
    <aside
      aria-labelledby="order-summary-heading"
      tabIndex={showItems ? 0 : undefined}
      style={
        showItems
          ? {
              scrollbarWidth: "thin",
              scrollbarColor: "#D2AD86 #FBFAF7",
            }
          : undefined
      }
      className={`border border-[#DED8CD] bg-[#FBFAF7] p-5 sm:p-6 lg:sticky lg:top-28 ${
        showItems
          ? "lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain"
          : ""
      }`}
    >
      <h2
        id="order-summary-heading"
        className="font-serif text-xl text-[#302219] sm:text-2xl"
      >
        Order Summary
      </h2>
      {showItems && (
        <ul
          aria-label="Items in this order"
          className="mt-4 divide-y divide-[#DED8CD] border-y border-[#DED8CD]"
        >
          {cart.map((item) => (
            <li key={item.id}>
              <CartItemRow item={item} readOnly compact />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 space-y-4 border-b border-[#DED8CD] pb-5 text-sm">
        <div className="flex items-start justify-between gap-4 text-[#6D6961]">
          <span>
            Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
          </span>
          <span className="shrink-0 text-right text-[#35332F]">
            {hasValidPrices ? formatINR(subtotal) : "Price unavailable"}
          </span>
        </div>
        {showShippingStatus && (
          <div className="flex items-start justify-between gap-4 text-[#6D6961]">
            <span>Shipping</span>
            <span className="shrink-0 text-right text-[#35332F]">
              To be confirmed
            </span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 py-5 font-medium text-[#302219]">
        <span>Total</span>
        <span className="shrink-0 text-right">
          {hasValidPrices ? formatINR(subtotal) : "Price unavailable"}
        </span>
      </div>
      <p className="border-t border-[#DED8CD] pt-4 text-xs leading-5 text-[#6D6961]">
        For now, the total includes item prices only. Shipping and offers are
        not included.
      </p>

      {actionHref && actionLabel && (
        hasValidPrices || !actionRequiresValidPrices ? (
          <Link
            href={actionHref}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-[#302219] px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F8EBDD] transition-colors hover:bg-[#6B4933] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2"
          >
            {actionLabel}
          </Link>
        ) : (
          <p
            className="mt-5 text-sm leading-6 text-[#8A4B3A]"
            role="alert"
          >
            Checkout is unavailable because a product price could not be
            confirmed.
          </p>
        )
      )}
    </aside>
  );
}
