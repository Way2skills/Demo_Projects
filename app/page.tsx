import type { Metadata } from 'next'
import { Hero } from '@/components/InteractiveSections'
import DeliverySection from '@/components/DeliverySection'
import FaqSection from '@/components/FaqSection'

export const metadata: Metadata = {
  title: 'Premium Tiles Showroom in Namakkal',
  description:
    'Explore premium floor, wall, bathroom and kitchen tiles at Themo Tiles in Namakkal. Find considered finishes for every room.',
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DeliverySection />
      <FaqSection />
    </main>
  )
}
