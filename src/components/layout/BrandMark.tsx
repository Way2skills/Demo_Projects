"use client";

export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg aria-label="Shinewood brand mark" role="img" viewBox="0 0 44 44" className={className} fill="none">
      <path d="M8 36V14.5L22 7l14 7.5V36" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 36V18l8-4 8 4v18" stroke="currentColor" strokeWidth="1.1" opacity=".75" />
      <path d="m12 29 10-6 10 6M12 34l10-6 10 6" stroke="currentColor" strokeWidth="1" opacity=".58" />
      <path d="M5 36h34" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="22" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}
