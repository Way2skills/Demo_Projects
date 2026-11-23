import type { Metadata } from 'next'
import { Showroom } from '@/components/Sections'

export const metadata: Metadata = {
  title: 'Visit Our Showroom',
  description:
    'Visit Themo Tiles on Salem Road, Namakkal – 637001 to compare tile textures, finishes and formats in person.',
}

export default function ShowroomPage() {
  return (
    <main className="page-offset showroom-page">
      <Showroom />
    </main>
  )
}
