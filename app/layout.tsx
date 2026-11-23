import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import RevealObserver from '@/components/RevealObserver'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Themo Tiles | Premium Tiles Showroom',
    template: '%s | Themo Tiles',
  },
  description:
    'Discover thoughtfully selected floor, wall, bathroom and kitchen tiles at Themo Tiles, Salem Road, Namakkal.',
  icons: {
    icon: '/images/themo-tile-logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div className="site-root">
          <Header />
          <RevealObserver />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
