/**
 * Structured data for the search engines.
 *
 * A dental practice is a local business first: the details that decide
 * whether we show up in a map result are the address, the phone number and
 * the opening hours, and all three already live in `@/data/clinic`. Building
 * the JSON-LD from them means the markup cannot drift from the page.
 */

import { clinic, type OpeningHours } from '@/data/clinic'
import type { Faq } from '@/data/faqs'
import { averageRating, testimonials } from '@/data/testimonials'
import { daysCovered, timeRange, type Day } from '@/lib/hours'
import { absoluteUrl, SITE_URL } from '@/lib/seo'

/** Schema.org spells the days out in full. */
const FULL_DAY: Record<Day, string> = {
  Sat: 'Saturday',
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
}

export interface JsonLd {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: unknown
}

/**
 * The address split the way `PostalAddress` wants it. The clinic writes it
 * as one line, so the last comma-separated part is taken as the country and
 * whatever precedes it as the locality.
 */
export function postalAddress(address: string = clinic.address) {
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  const country = parts.length > 1 ? parts[parts.length - 1] : undefined
  const locality = parts.length > 1 ? parts.slice(0, -1).join(', ') : parts[0]
  return {
    '@type': 'PostalAddress' as const,
    addressLocality: locality ?? '',
    ...(country ? { addressCountry: country } : {}),
  }
}

/**
 * One specification per row the clinic is open. Closed days are simply left
 * out — schema.org reads an absent day as shut, and saying so twice invites
 * the two statements to disagree.
 */
export function openingHoursSpecification(
  rows: OpeningHours[] = clinic.openingHours,
) {
  return rows.flatMap((row) => {
    const range = timeRange(row)
    if (!range) return []
    return [
      {
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: daysCovered(row).map((day) => FULL_DAY[day]),
        opens: range.opens,
        closes: range.closes,
      },
    ]
  })
}

/**
 * What the patients said, averaged.
 *
 * Left off entirely when there is nothing to average: an aggregate of zero
 * reviews reads as a rating of zero, which is worse than saying nothing.
 */
export function aggregateRating() {
  if (testimonials.length === 0) return null
  return {
    '@type': 'AggregateRating' as const,
    ratingValue: averageRating(),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  }
}

/** The clinic itself, as a local business a search engine can place. */
export function localBusinessJsonLd(): JsonLd {
  const rating = aggregateRating()
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}/#clinic`,
    name: clinic.name,
    description: clinic.tagline,
    url: SITE_URL,
    telephone: clinic.phone,
    email: clinic.email,
    address: postalAddress(),
    hasMap: clinic.mapsUrl,
    openingHoursSpecification: openingHoursSpecification(),
    ...(rating ? { aggregateRating: rating } : {}),
  }
}

/** A set of questions and answers, for the rich result. */
export function faqJsonLd(entries: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  }
}

/** The trail of pages leading to the one being viewed. */
export function breadcrumbJsonLd(
  trail: { name: string; route: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.route),
    })),
  }
}
