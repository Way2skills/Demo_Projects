import type { Metadata } from 'next'
import { Testimonials } from '@/components/InteractiveSections'
import { About, WhyChooseUs } from '@/components/Sections'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Get to know Themo Tiles, a local premium tile showroom helping Namakkal homeowners choose beautiful, practical surfaces.',
}

export default function AboutPage() {
  return (
    <main>
      <About />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}
