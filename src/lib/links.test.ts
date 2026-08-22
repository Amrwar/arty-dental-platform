import { describe, expect, it } from 'vitest'

import { primaryNav } from '@/data/navigation'

import {
  anchorOf,
  collectHrefs,
  isActiveRoute,
  isExternal,
  isInternal,
  routeOf,
} from './links'
import { sitemapRoutes } from './seo'

describe('isInternal', () => {
  it('recognises a site route', () => {
    expect(isInternal('/services')).toBe(true)
  })

  it('does not claim an absolute url', () => {
    expect(isInternal('https://facebook.com')).toBe(false)
  })

  it('does not claim a tel link', () => {
    expect(isInternal('tel:+201003843828')).toBe(false)
  })

  it('does not claim a bare anchor', () => {
    expect(isInternal('#testimonials')).toBe(false)
  })
})

describe('isExternal', () => {
  it('recognises https', () => {
    expect(isExternal('https://instagram.com')).toBe(true)
  })

  it('recognises mailto and tel as off-site schemes', () => {
    expect(isExternal('mailto:a@b.com')).toBe(true)
    expect(isExternal('tel:+201003843828')).toBe(true)
  })

  it('does not claim a site route', () => {
    expect(isExternal('/contact')).toBe(false)
  })
})

describe('routeOf', () => {
  it('returns the page a plain route names', () => {
    expect(routeOf('/services')).toBe('/services')
  })

  it('drops the anchor', () => {
    expect(routeOf('/services#general')).toBe('/services')
  })

  it('drops a query string', () => {
    expect(routeOf('/contact?ref=footer')).toBe('/contact')
  })

  it('keeps the home page as a single slash', () => {
    expect(routeOf('/')).toBe('/')
  })

  it('treats a home-page anchor as the home page', () => {
    expect(routeOf('/#testimonials')).toBe('/')
  })

  it('trims a trailing slash so two spellings compare equal', () => {
    expect(routeOf('/services/')).toBe('/services')
  })

  it('has no route for an off-site link', () => {
    expect(routeOf('https://facebook.com')).toBeNull()
  })

  it('has no route for a bare anchor', () => {
    expect(routeOf('#testimonials')).toBeNull()
  })
})

describe('anchorOf', () => {
  it('reads the anchor without its hash', () => {
    expect(anchorOf('/services#general')).toBe('general')
  })

  it('reads a bare anchor', () => {
    expect(anchorOf('#testimonials')).toBe('testimonials')
  })

  it('is null when the href asks for none', () => {
    expect(anchorOf('/services')).toBeNull()
  })

  it('is null for an empty hash rather than an empty string', () => {
    expect(anchorOf('/services#')).toBeNull()
  })
})

describe('collectHrefs', () => {
  it('finds hrefs in a flat list', () => {
    expect(collectHrefs([{ href: '/a' }, { href: '/b' }])).toEqual(['/a', '/b'])
  })

  it('finds hrefs nested inside an object of lists', () => {
    const tree = { one: [{ href: '/a' }], two: [{ href: '/b' }] }
    expect(collectHrefs(tree).sort()).toEqual(['/a', '/b'])
  })

  it('ignores entries that carry no href', () => {
    expect(collectHrefs([{ label: 'no link' }, { href: '/a' }])).toEqual(['/a'])
  })

  it('returns nothing for an empty tree', () => {
    expect(collectHrefs([])).toEqual([])
  })
})

describe('isActiveRoute', () => {
  it('marks the link to the page being viewed', () => {
    expect(isActiveRoute('/services', '/services')).toBe(true)
  })

  it('leaves other links alone', () => {
    expect(isActiveRoute('/services', '/contact')).toBe(false)
  })

  it('keeps a section link lit on a page beneath it', () => {
    expect(isActiveRoute('/services/whitening', '/services')).toBe(true)
  })

  it('does not treat a similarly named route as being beneath it', () => {
    expect(isActiveRoute('/services-old', '/services')).toBe(false)
  })

  it('only lights home up on home', () => {
    expect(isActiveRoute('/', '/')).toBe(true)
    expect(isActiveRoute('/services', '/')).toBe(false)
  })

  it('ignores a trailing slash on either side', () => {
    expect(isActiveRoute('/services/', '/services')).toBe(true)
    expect(isActiveRoute('/services', '/services/')).toBe(true)
  })

  it('treats the empty path as home', () => {
    expect(isActiveRoute('', '/')).toBe(true)
  })

  it('is never true for an external link', () => {
    expect(isActiveRoute('/', 'https://example.com')).toBe(false)
  })

  it('is never true for a bare anchor', () => {
    expect(isActiveRoute('/services', '#top')).toBe(false)
  })

  it('matches the route part of a link carrying an anchor', () => {
    expect(isActiveRoute('/services', '/services#whitening')).toBe(true)
  })

  it('lights exactly one primary link on each of the site\u0027s own pages', () => {
    for (const route of sitemapRoutes()) {
      const lit = primaryNav.filter((link) => isActiveRoute(route, link.href))
      expect(lit.length).toBeLessThanOrEqual(1)
    }
  })
})
