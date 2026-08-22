import type { Metadata } from 'next'

import JsonLd from '@/components/seo/JsonLd'
import { faqs } from '@/data/faqs'
import { faqJsonLd } from '@/lib/jsonld'

// The contact page runs the booking form in the browser, so it cannot export
// metadata itself.
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Clinic address, telephone number, opening hours and a form for requesting an appointment.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* The page answers these below the form. */}
      <JsonLd data={faqJsonLd(faqs)} />
      {children}
    </>
  )
}
