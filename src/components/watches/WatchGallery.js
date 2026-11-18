"use client";

import { useState } from "react";
import WatchImage from "@/components/watches/WatchImage";

export default function WatchGallery({ images = [], title = "" }) {
  const imageList = Array.isArray(images)
    ? images.reduce((uniqueImages, image) => {
        const normalizedImage =
          typeof image === "string"
            ? { src: image, alt: "" }
            : image && typeof image === "object" && !Array.isArray(image)
              ? image
              : null;
        const src =
          typeof normalizedImage?.src === "string"
            ? normalizedImage.src.trim()
            : "";

        if (!src || uniqueImages.some((existingImage) => existingImage.src === src)) {
          return uniqueImages;
        }

        uniqueImages.push({
          src,
          alt:
            typeof normalizedImage.alt === "string"
              ? normalizedImage.alt.trim()
              : "",
        });
        return uniqueImages;
      }, [])
    : [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (imageList.length === 0) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#DED8CD] bg-[#F8EBDD] lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:aspect-auto">
        <WatchImage
          src={null}
          alt={title || "this timepiece"}
          placeholderClassName="absolute inset-0 p-8 text-center"
        />
      </div>
    );
  }

  const selectedIndex = Math.min(activeImageIndex, imageList.length - 1);
  const selectedImage = imageList[selectedIndex];
  const imageAlt =
    selectedImage.alt ||
    `${title || "Watch"}${imageList.length > 1 ? `, image ${selectedIndex + 1}` : ""}`;

  return (
    <div
      role="group"
      aria-label={`${title || "Watch"} image gallery`}
      className="space-y-4 lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#DED8CD] bg-gradient-to-br from-[#F8EBDD] via-[#F5F2EC] to-[#EBD5BD] lg:aspect-auto lg:min-h-0 lg:flex-1">
        <WatchImage
          src={selectedImage.src}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10"
          placeholderClassName="absolute inset-0 p-6 text-center sm:p-10"
        />
      </div>

      {imageList.length > 1 && (
        <div
          role="group"
          aria-label="Choose a product image"
          className="flex flex-wrap gap-3 lg:flex-none"
        >
          {imageList.map((image, index) => {
            const thumbnailAlt =
              image.alt || `${title || "Watch"} image ${index + 1}`;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`Show image ${index + 1} of ${imageList.length}`}
                aria-pressed={selectedIndex === index}
                className={`relative h-20 w-20 overflow-hidden rounded border bg-[#F8EBDD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B8055] focus-visible:ring-offset-2 ${
                  selectedIndex === index
                    ? "border-[#9B8055]"
                    : "border-[#DED8CD] hover:border-[#A77B52]"
                }`}
              >
                <WatchImage
                  src={image.src}
                  alt={thumbnailAlt}
                  className="absolute inset-0 h-full w-full object-contain p-2"
                  placeholderClassName="absolute inset-0 p-2 text-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
