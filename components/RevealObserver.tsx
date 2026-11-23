'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal:not(.is-visible)')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
