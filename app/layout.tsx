import type { Metadata } from 'next'
import { Archivo, Space_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/sanity/queries'

// Fonts werden zur Build-Zeit heruntergeladen und SELBST gehostet (DSGVO, kein Google-Request).
// Archivo (Black) für Headlines & Text, Space Mono für Labels/Eyebrows.
const fontDisplay = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const fontText = Archivo({ subsets: ['latin'], variable: '--font-text', display: 'swap' })
const fontMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  // Kanonische Domain fest auf www.boogly.studio (Basis für OG-URLs & Sitemap)
  metadataBase: new URL('https://www.boogly.studio'),
  title: {
    default: 'Boogly Studio – Echte Menschen. Echte Begegnungen.',
    template: '%s | Boogly Studio',
  },
  description:
    'Boogly Studio produziert authentische Social-Video-Formate. Bewirb dich für unsere Castings und werde Teil unserer Community.',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.boogly.studio',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="de" className={`${fontDisplay.variable} ${fontText.variable} ${fontMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
