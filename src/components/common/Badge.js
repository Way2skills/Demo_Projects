/**
 * Reusable luxury Badge component.
 * Ideal for watch specifications, movement markers, and status indicators.
 */
export default function Badge({
  children,
  variant = "gold",
  size = "sm",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center font-medium uppercase tracking-[0.15em] transition-colors rounded-sm select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    gold: "bg-[#EBD5BD] text-[#6B4933] border border-[#D2AD86]",
    dark: "bg-[#302219] text-[#F8EBDD] border border-[#302219]",
    ivory: "bg-[#F8EBDD] text-[#302219] border border-[#EBD5BD] font-semibold",
    outline: "border border-[#A77B52] text-[#6B4933] bg-transparent",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.sm} ${
        variantStyles[variant] || variantStyles.gold
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
