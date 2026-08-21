import { describe, expect, it } from 'vitest'

import {
  formatPhone,
  isPublishableEmail,
  normalisePhone,
  telHref,
  whatsappHref,
} from '@/lib/contact'

import { clinic } from './clinic'

describe('the published contact details', () => {
  it('give a dialable phone number in E.164', () => {
    expect(clinic.phone).toMatch(/^\+\d{8,15}$/)
  })

  it('store the phone without spacing, so links need no cleaning', () => {
    expect(normalisePhone(clinic.phone)).toBe(clinic.phone)
  })

  it('display the phone grouped for reading', () => {
    expect(formatPhone(clinic.phone)).toBe('+20 100 384 3828')
  })

  it('build a tel link with no spaces in it', () => {
    expect(telHref(clinic.phone)).toBe('tel:+201003843828')
  })

  it('build a wa.me link with no plus in it', () => {
    expect(whatsappHref(clinic.phone)).toBe('https://wa.me/201003843828')
  })

  it('give an address that could be published', () => {
    expect(isPublishableEmail(clinic.email)).toBe(true)
  })

  it('keep the email lower case, as it is typed everywhere on the site', () => {
    expect(clinic.email).toBe(clinic.email.toLowerCase())
  })

  it('give a maps link that leaves the site over https', () => {
    expect(clinic.mapsUrl.startsWith('https://')).toBe(true)
  })
})

describe('the clinic identity', () => {
  it('has a name', () => {
    expect(clinic.name.trim().length).toBeGreaterThan(0)
  })

  it('has a short name the header can fit', () => {
    expect(clinic.shortName.length).toBeLessThanOrEqual(clinic.name.length)
  })

  it('carries the short name inside the full name', () => {
    expect(clinic.name.startsWith(clinic.shortName)).toBe(true)
  })

  it('has a tagline that is a sentence rather than a fragment', () => {
    expect(clinic.tagline.trim().endsWith('.')).toBe(true)
  })

  it('names the city it is in', () => {
    expect(clinic.address.trim().length).toBeGreaterThan(0)
  })
})

describe('the opening hours', () => {
  it('are published at all', () => {
    expect(clinic.openingHours.length).toBeGreaterThan(0)
  })

  it('label every row with the days it covers', () => {
    for (const row of clinic.openingHours) {
      expect(row.days.trim().length).toBeGreaterThan(0)
    }
  })

  it('give every row hours, even if those hours are "Closed"', () => {
    for (const row of clinic.openingHours) {
      expect(row.hours.trim().length).toBeGreaterThan(0)
    }
  })

  it('carry no untrimmed padding that would show on the page', () => {
    for (const row of clinic.openingHours) {
      expect(row.days).toBe(row.days.trim())
      expect(row.hours).toBe(row.hours.trim())
    }
  })
})
