import Link from "next/link";

/**
 * Reusable luxury Button component.
 * Supports primary (champagne-gold), outline, secondary (charcoal), ghost, and ivory variants.
 * When `href` is supplied, renders an accessible Next.js Link without invalid button attributes.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D2AD86] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8EBDD] disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-sm gap-1.5",
    md: "text-sm px-5 py-2.5 rounded-sm gap-2",
    lg: "text-base px-7 py-3.5 rounded-sm gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#A77B52] text-[#F8EBDD] hover:bg-[#6B4933] active:bg-[#302219] font-semibold",
    outline:
      "border border-[#A77B52] text-[#6B4933] bg-transparent hover:border-[#A77B52] hover:bg-[#EBD5BD]",
    secondary:
      "bg-[#302219] text-[#F8EBDD] border border-[#302219] hover:bg-[#6B4933] hover:border-[#6B4933]",
    ghost:
      "bg-transparent text-[#6B4933] hover:text-[#302219] hover:bg-[#EBD5BD]",
    ivory:
      "bg-[#F8EBDD] text-[#302219] border border-[#EBD5BD] hover:bg-[#EBD5BD] font-semibold",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
