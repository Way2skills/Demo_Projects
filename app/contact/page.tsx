import type { Metadata } from 'next'
import { Contact } from '@/components/InteractiveSections'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Themo Tiles in Namakkal by phone, WhatsApp or visit us on Salem Road, Namakkal – 637001.',
}

export default function ContactPage() {
  return (
    <main className="page-offset">
      <Contact />
    </main>
  )
}
