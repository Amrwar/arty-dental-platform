import { describe, expect, it } from 'vitest'

import { slugify } from '@/lib/text'

import { serviceById, serviceHref, serviceIds, services } from './services'

describe('the service catalogue', () => {
  it('offers a treatment at all', () => {
    expect(services.length).toBeGreaterThan(0)
  })

  it('gives every service an id', () => {
    for (const service of services) {
      expect(service.id.trim().length).toBeGreaterThan(0)
    }
  })

  it('uses each id once, since the id is the anchor', () => {
    const ids = serviceIds()
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps every id url-safe', () => {
    for (const id of serviceIds()) {
      expect(id).toBe(slugify(id))
    }
  })

  it('titles every service', () => {
    for (const service of services) {
      expect(service.title.trim().length).toBeGreaterThan(0)
    }
  })

  it('uses each title once', () => {
    const titles = services.map((service) => service.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('describes every service in a full sentence', () => {
    for (const service of services) {
      expect(service.description.trim().endsWith('.')).toBe(true)
    }
  })

  it('quotes a price for every service', () => {
    for (const service of services) {
      expect(service.price).toMatch(/\d/)
    }
  })

  it('lists what each service includes', () => {
    for (const service of services) {
      expect(service.features.length).toBeGreaterThan(0)
    }
  })

  it('never repeats a feature within one service', () => {
    for (const service of services) {
      expect(new Set(service.features).size).toBe(service.features.length)
    }
  })

  it('gives every feature some text', () => {
    for (const service of services) {
      for (const feature of service.features) {
        expect(feature.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('illustrates every service over https', () => {
    for (const service of services) {
      expect(service.image.startsWith('https://')).toBe(true)
    }
  })

  it('never carries untrimmed text into the markup', () => {
    for (const service of services) {
      expect(service.title).toBe(service.title.trim())
      expect(service.description).toBe(service.description.trim())
    }
  })
})

describe('serviceById', () => {
  it('finds a service by its id', () => {
    expect(serviceById('general')?.title).toBe('General Dentistry')
  })

  it('finds the pediatric service under the id the anchors use', () => {
    expect(serviceById('pediatric')?.title).toBe('Pediatric Dentistry')
  })

  it('is undefined for an id nothing answers to', () => {
    expect(serviceById('endodontics')).toBeUndefined()
  })

  it('is undefined rather than throwing on an empty id', () => {
    expect(serviceById('')).toBeUndefined()
  })
})

describe('serviceHref', () => {
  it('builds the anchor the footer uses', () => {
    expect(serviceHref('general')).toBe('/services#general')
  })

  it('builds an href for every service in the catalogue', () => {
    for (const id of serviceIds()) {
      expect(serviceHref(id)).toBe(`/services#${id}`)
    }
  })
})
