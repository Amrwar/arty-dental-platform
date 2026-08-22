import type { Metadata } from 'next'

// The gallery page itself is a client component for the lightbox, so its
// metadata lives here instead.
export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Before and after photographs of work carried out at the clinic, alongside pictures of the practice itself.',
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
