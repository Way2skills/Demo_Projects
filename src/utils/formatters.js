/**
 * Format numeric value to Indian Rupee (INR - ₹) currency format.
 * Example: 450000 -> ₹4,50,000
 */
export function formatINR(amount) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return "Price unavailable";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
