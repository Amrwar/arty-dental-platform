import { describe, expect, it } from 'vitest'

import { clinic } from '@/data/clinic'

import { absoluteUrl, pageDescription, pageTitle, SITE_URL, sitemapRoutes } from './seo'

describe('SITE_URL', () => {
  it('is an https origin', () => {
    expect(SITE_URL.startsWith('https://')).toBe(true)
  })

  it('carries no trailing slash, so joins do not double up', () => {
    expect(SITE_URL.endsWith('/')).toBe(false)
  })
})

describe('pageTitle', () => {
  it('puts the clinic after the page name', () => {
    expect(pageTitle('Services')).toBe(`Services | ${clinic.name}`)
  })

  it('is just the clinic when no page is named', () => {
    expect(pageTitle()).toBe(clinic.name)
  })
})

describe('pageDescription', () => {
  it('passes a description through', () => {
    expect(pageDescription('Anything')).toBe('Anything')
  })

  it('falls back to the tagline', () => {
    expect(pageDescription()).toBe(clinic.tagline)
  })
})

describe('absoluteUrl', () => {
  it('builds a url for a route', () => {
    expect(absoluteUrl('/services')).toBe(`${SITE_URL}/services`)
  })

  it('leaves the home page as the bare origin', () => {
    expect(absoluteUrl('/')).toBe(SITE_URL)
  })

  it('adds the missing slash rather than joining two words', () => {
    expect(absoluteUrl('contact')).toBe(`${SITE_URL}/contact`)
  })

  it('never produces a double slash in the path', () => {
    expect(absoluteUrl('/gallery').replace('https://', '')).not.toContain('//')
  })
})

describe('sitemapRoutes', () => {
  it('lists the home page first', () => {
    expect(sitemapRoutes()[0]).toBe('/')
  })

  it('lists every route once', () => {
    const routes = sitemapRoutes()
    expect(new Set(routes).size).toBe(routes.length)
  })

  it('lists the pages the header links to', () => {
    for (const route of ['/services', '/doctors', '/gallery', '/contact']) {
      expect(sitemapRoutes()).toContain(route)
    }
  })

  it('lists the pages only the footer links to', () => {
    for (const route of ['/about', '/privacy', '/terms']) {
      expect(sitemapRoutes()).toContain(route)
    }
  })

  it('holds routes only, never anchors', () => {
    for (const route of sitemapRoutes()) {
      expect(route).not.toContain('#')
    }
  })

  it('keeps everything after the home page in a stable order', () => {
    const rest = sitemapRoutes().slice(1)
    expect(rest).toEqual([...rest].sort())
  })

  it('is stable between calls', () => {
    expect(sitemapRoutes()).toEqual(sitemapRoutes())
  })
})
