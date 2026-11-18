/**
 * Reusable SectionHeading component.
 * Provides editorial typography with champagne-gold accents.
 * Supports alternating light and dark section themes, custom alignment, and heading tags.
 */
export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = "center",
  theme = "light",
  as: HeadingTag = "h2",
  className = "",
  children,
  ...props
}) {
  const isCenter = align === "center";
  const isLight = theme === "light";

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? "text-center mx-auto" : "text-left"
      } max-w-3xl ${className}`}
      {...props}
    >
      {/* Kicker Tag */}
      {tag && (
        <div
          className={`inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-[0.25em] font-semibold ${
            isLight ? "text-[#A77B52]" : "text-[#D2AD86]"
          }`}
        >
          <span
            className={`w-4 h-[1px] ${
              isLight ? "bg-[#A77B52]" : "bg-[#D2AD86]"
            }`}
            aria-hidden="true"
          />
          <span>{tag}</span>
          {isCenter && (
            <span
              className={`w-4 h-[1px] ${
                isLight ? "bg-[#A77B52]" : "bg-[#D2AD86]"
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Main Title */}
      {title && (
        <HeadingTag
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight ${
            isLight ? "text-[#302219]" : "text-[#F8EBDD]"
          }`}
        >
          {title}
        </HeadingTag>
      )}

      {/* Decorative champagne divider */}
      <div
        className={`w-12 h-[2px] ${
          isLight ? "bg-[#A77B52]" : "bg-gradient-to-r from-[#A77B52] to-[#EBD5BD]"
        } my-4 ${
          isCenter ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed font-light ${
            isLight ? "text-[#6B4933]" : "text-[#EBD5BD]"
          }`}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
}
