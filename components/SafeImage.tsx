'use client'

import { useState } from 'react'
import Image from 'next/image'
import { imageUrl } from '../lib/siteData'

export default function SafeImage({
  image,
  alt,
  width = 1000,
  className = '',
  loading = 'lazy',
}: {
  image: string
  alt: string
  width?: number
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      className={className}
      src={hasError ? '/image-fallback.svg' : imageUrl(image, width)}
      alt={alt}
      width={width}
      height={Math.round(width * 0.68)}
      sizes="(max-width: 720px) 100vw, 50vw"
      loading={loading}
      onError={() => setHasError(true)}
    />
  )
}
