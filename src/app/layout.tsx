import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
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
        {/* Rendered on the server so crawlers see it in the source. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
