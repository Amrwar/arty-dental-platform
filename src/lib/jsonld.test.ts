/**
 * The structured data.
 *
 * Search engines are unforgiving here: a day named twice or a time on the
 * wrong clock is worse than no markup at all, because it contradicts the
 * page it sits on.
 */

import { describe, expect, it } from 'vitest'

import { clinic } from '@/data/clinic'
import { faqs } from '@/data/faqs'

import {
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  openingHoursSpecification,
  postalAddress,
} from './jsonld'
import { SITE_URL } from './seo'

describe('postalAddress', () => {
  it('takes the last part as the country', () => {
    expect(postalAddress('Cairo, Egypt').addressCountry).toBe('Egypt')
  })

  it('takes what precedes it as the locality', () => {
    expect(postalAddress('Cairo, Egypt').addressLocality).toBe('Cairo')
  })

  it('keeps a street with the locality rather than dropping it', () => {
    const address = postalAddress('12 Nile St, Maadi, Egypt')
    expect(address.addressLocality).toBe('12 Nile St, Maadi')
    expect(address.addressCountry).toBe('Egypt')
  })

  it('names no country when the address is a single part', () => {
    expect(postalAddress('Cairo')).not.toHaveProperty('addressCountry')
  })

  it('ignores stray spacing around the commas', () => {
    expect(postalAddress('  Cairo ,  Egypt ').addressLocality).toBe('Cairo')
  })

  it('is typed as a PostalAddress', () => {
    expect(postalAddress()['@type']).toBe('PostalAddress')
  })

  it('reads the clinic address by default', () => {
    expect(postalAddress().addressLocality).toBe(
      postalAddress(clinic.address).addressLocality,
    )
  })
})

describe('openingHoursSpecification', () => {
  const spec = openingHoursSpecification()

  it('publishes a specification for the days the clinic opens', () => {
    expect(spec.length).toBeGreaterThan(0)
  })

  it('leaves closed days out entirely', () => {
    const named = spec.flatMap((row) => row.dayOfWeek)
    expect(named).not.toContain('Friday')
  })

  it('spells the days out in full', () => {
    for (const row of spec) {
      for (const day of row.dayOfWeek) expect(day.length).toBeGreaterThan(3)
    }
  })

  it('gives the times on the 24-hour clock', () => {
    for (const row of spec) {
      expect(row.opens).toMatch(/^\d{2}:\d{2}$/)
      expect(row.closes).toMatch(/^\d{2}:\d{2}$/)
    }
  })

  it('closes later than it opens', () => {
    for (const row of spec) expect(row.closes > row.opens).toBe(true)
  })

  it('names no day twice across the whole schedule', () => {
    const named = spec.flatMap((row) => row.dayOfWeek)
    expect(new Set(named).size).toBe(named.length)
  })

  it('skips a row whose hours cannot be read', () => {
    const spec = openingHoursSpecification([
      { days: 'Sat - Thu', hours: 'By appointment' },
    ])
    expect(spec).toEqual([])
  })

  it('reads a schedule handed to it rather than the clinic\u0027s', () => {
    const spec = openingHoursSpecification([
      { days: 'Monday', hours: '9 AM - 5 PM' },
    ])
    expect(spec).toHaveLength(1)
    expect(spec[0].dayOfWeek).toEqual(['Monday'])
    expect(spec[0].opens).toBe('09:00')
  })
})

describe('localBusinessJsonLd', () => {
  const data = localBusinessJsonLd()

  it('declares the schema.org context', () => {
    expect(data['@context']).toBe('https://schema.org')
  })

  it('is a dentist, not a generic business', () => {
    expect(data['@type']).toBe('Dentist')
  })

  it('carries the clinic name', () => {
    expect(data.name).toBe(clinic.name)
  })

  it('gives the dialable phone number, not the pretty one', () => {
    expect(data.telephone).toBe(clinic.phone)
    expect(data.telephone).toMatch(/^\+/)
  })

  it('gives an absolute url for the site', () => {
    expect(data.url).toBe(SITE_URL)
  })

  it('has a stable identifier other markup can point at', () => {
    expect(data['@id']).toBe(`${SITE_URL}/#clinic`)
  })

  it('includes the opening hours', () => {
    expect(Array.isArray(data.openingHoursSpecification)).toBe(true)
  })

  it('survives a round trip through JSON, which is how it ships', () => {
    expect(JSON.parse(JSON.stringify(data))).toEqual(data)
  })

  it('leaves no field undefined for the serialiser to drop', () => {
    for (const value of Object.values(data)) expect(value).toBeDefined()
  })
})

describe('faqJsonLd', () => {
  it('is an FAQ page', () => {
    expect(faqJsonLd(faqs)['@type']).toBe('FAQPage')
  })

  it('carries one question per entry', () => {
    const data = faqJsonLd(faqs) as { mainEntity: unknown[] }
    expect(data.mainEntity).toHaveLength(faqs.length)
  })

  it('puts the answer inside the question', () => {
    const data = faqJsonLd([{ question: 'Q?', answer: 'A.' }]) as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[]
    }
    expect(data.mainEntity[0].name).toBe('Q?')
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('A.')
  })

  it('copes with an empty list rather than throwing', () => {
    const data = faqJsonLd([]) as { mainEntity: unknown[] }
    expect(data.mainEntity).toEqual([])
  })
})

describe('breadcrumbJsonLd', () => {
  const trail = [
    { name: 'Home', route: '/' },
    { name: 'Services', route: '/services' },
  ]

  it('numbers the steps from one', () => {
    const data = breadcrumbJsonLd(trail) as {
      itemListElement: { position: number }[]
    }
    expect(data.itemListElement.map((step) => step.position)).toEqual([1, 2])
  })

  it('gives every step an absolute url', () => {
    const data = breadcrumbJsonLd(trail) as {
      itemListElement: { item: string }[]
    }
    for (const step of data.itemListElement) {
      expect(step.item.startsWith('http')).toBe(true)
    }
  })

  it('keeps the order it was given', () => {
    const data = breadcrumbJsonLd(trail) as {
      itemListElement: { name: string }[]
    }
    expect(data.itemListElement.map((step) => step.name)).toEqual([
      'Home',
      'Services',
    ])
  })

  it('is a breadcrumb list', () => {
    expect(breadcrumbJsonLd(trail)['@type']).toBe('BreadcrumbList')
  })
})
