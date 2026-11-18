"use client";

import { useState } from "react";

function isValidImagePath(value) {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  const path = value.trim();
  if (path.startsWith("/") && !path.startsWith("//")) {
    return true;
  }

  try {
    const url = new URL(path);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function WatchImage({
  src,
  alt,
  className = "",
  placeholderClassName = "",
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const imagePath = typeof src === "string" ? src.trim() : "";
  const showImage = isValidImagePath(imagePath) && failedSrc !== imagePath;

  if (!showImage) {
    return (
      <div
        role="img"
        aria-label={`Image unavailable for ${alt || "this timepiece"}`}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F8EBDD] via-[#EEEAE2] to-[#EBD5BD] text-[#A77B52]/70 ${placeholderClassName}`}
      >
        <svg
          viewBox="0 0 96 96"
          fill="none"
          className="h-20 w-20 sm:h-24 sm:w-24"
          aria-hidden="true"
        >
          <path
            d="M37 9h22l4 16a27 27 0 0 1 0 46l-4 16H37l-4-16a27 27 0 0 1 0-46l4-16Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="48" cy="48" r="20" stroke="currentColor" strokeWidth="2" />
          <path
            d="M48 36v13l9 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-center font-serif text-sm text-[#6B4933]/80">
          Image currently unavailable
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imagePath}
      alt={alt || ""}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(imagePath)}
    />
  );
}
