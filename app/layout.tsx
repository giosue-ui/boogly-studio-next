import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://boogly.studio'),
  title: {
    default: 'Boogly Studio – Echte Menschen. Echte Begegnungen.',
    template: '%s | Boogly Studio',
  },
  description:
    'Boogly Studio produziert authentische Social-Video-Formate. Bewirb dich für unsere Castings und werde Teil unserer Community.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://boogly.studio',
    siteName: 'Boogly Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Boogly Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
