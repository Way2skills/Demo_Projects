import type { Metadata } from 'next'
import {
  FeaturedCollections,
  Inspiration,
} from '@/components/InteractiveSections'
import { ProductCategories } from '@/components/Sections'

export const metadata: Metadata = {
  title: 'Tile Collections',
  description:
    'Browse floor, wall, bathroom, kitchen, vitrified, wood-look and outdoor tile collections at Themo Tiles.',
}

export default function ProductPage() {
  return (
    <main>
      <ProductCategories />
      <FeaturedCollections />
      <Inspiration />
    </main>
  )
}
