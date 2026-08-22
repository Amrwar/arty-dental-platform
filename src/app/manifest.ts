import type { MetadataRoute } from 'next'

import { clinic } from '@/data/clinic'

/**
 * The web app manifest, so the site installs sensibly when someone adds it
 * to a home screen - which patients do with the phone number to hand.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: clinic.shortName,
    description: clinic.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a1f44',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
