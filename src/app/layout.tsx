import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import JsonLd from '@/components/seo/JsonLd'
import Footer from '@/components/layout/Footer'
import { clinic } from '@/data/clinic'
import { localBusinessJsonLd } from '@/lib/jsonld'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${clinic.name} | Premium Dental Care`,
    // Pages set their own short title; the clinic is appended here so no
    // page has to remember to do it.
    template: `%s | ${clinic.name}`,
  },
  description: clinic.tagline,
  keywords: [
    'dental clinic',
    'dentist',
    'dental care',
    'teeth whitening',
    'dental implants',
    'cosmetic dentistry',
    'root canal',
    'pediatric dentistry',
  ],
  openGraph: {
    type: 'website',
    siteName: clinic.name,
    title: `${clinic.name} | Premium Dental Care`,
    description: clinic.tagline,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${clinic.name} | Premium Dental Care`,
    description: clinic.tagline,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonLd data={localBusinessJsonLd()} />
        {/* Hidden until it is tabbed to; the header is fixed, so without it
            a keyboard user walks the whole nav on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
