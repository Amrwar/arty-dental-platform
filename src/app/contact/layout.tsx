import type { Metadata } from 'next'

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
  return <>{children}</>
}
