/**
 * Everywhere the site links to itself.
 *
 * Keeping the trees here rather than inside the components is what lets a
 * test walk them: `navigation.test.ts` checks every internal link against
 * the routes that actually exist on disk, and every `/services#…` anchor
 * against the service ids. The footer used to advertise sections that had
 * never been built, and nothing noticed.
 */

import { serviceHref } from '@/data/services'

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink extends NavLink {
  /** Name of the lucide icon the footer renders. */
  icon: 'Facebook' | 'Instagram' | 'Twitter'
}

/** The header. */
export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

/**
 * The footer's service column. Each entry points at a section that exists
 * on `/services` - `serviceHref` builds the anchor from the id so a
 * renamed service cannot silently orphan the link.
 */
export const footerServices: NavLink[] = [
  { label: 'General Dentistry', href: serviceHref('general') },
  { label: 'Cosmetic Dentistry', href: serviceHref('cosmetic') },
  { label: 'Orthodontics', href: serviceHref('orthodontics') },
  { label: 'Pediatric Dentistry', href: serviceHref('pediatric') },
  { label: 'Emergency Care', href: serviceHref('emergency') },
]

/** The footer's clinic column. */
export const footerCompany: NavLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Doctors', href: '/doctors' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

/** The small print. */
export const legalNav: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'Twitter' },
]

/** Everything above, for the tests and the sitemap to walk in one go. */
export const navigation = {
  primaryNav,
  footerServices,
  footerCompany,
  legalNav,
}
