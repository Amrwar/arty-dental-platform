/**
 * Link integrity.
 *
 * The routes are read off disk rather than listed here, so a page that is
 * deleted or renamed breaks these tests instead of breaking the site. A
 * rebrand once pointed the footer at `/services#endodontics`, a section
 * that had never existed, and it shipped.
 */

import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { serviceIds } from '@/data/services'
import { anchorOf, collectHrefs, isExternal, isInternal, routeOf } from '@/lib/links'

import {
  footerCompany,
  footerServices,
  legalNav,
  navigation,
  primaryNav,
  socialLinks,
} from './navigation'

const APP_DIR = join(process.cwd(), 'src', 'app')

/** Every route the app directory really serves. */
function routesOnDisk(dir = APP_DIR, prefix = ''): string[] {
  const found: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isDirectory()) {
      if (entry === 'page.tsx') found.push(prefix === '' ? '/' : prefix)
      continue
    }
    if (entry.startsWith('_') || entry.startsWith('.')) continue
    found.push(...routesOnDisk(full, `${prefix}/${entry}`))
  }
  return found
}

const routes = routesOnDisk()
const everyHref = collectHrefs(navigation)

describe('the routes on disk', () => {
  it('include the home page', () => {
    expect(routes).toContain('/')
  })

  it('include every page the header offers', () => {
    for (const link of primaryNav) {
      expect(routes).toContain(routeOf(link.href))
    }
  })

  it('are all reachable from the header or the footer', () => {
    const linked = new Set(everyHref.map(routeOf).filter(Boolean))
    for (const route of routes) {
      expect(linked.has(route)).toBe(true)
    }
  })
})

describe('every internal link', () => {
  it('points at a page that exists', () => {
    const broken = everyHref
      .filter(isInternal)
      .filter((href) => !routes.includes(routeOf(href) as string))
    expect(broken).toEqual([])
  })

  it('starts with a slash rather than a bare word', () => {
    for (const href of everyHref) {
      expect(isInternal(href) || isExternal(href)).toBe(true)
    }
  })

  it('carries no trailing slash, so one spelling is used throughout', () => {
    for (const href of everyHref) {
      if (href === '/') continue
      expect(href.endsWith('/')).toBe(false)
    }
  })
})

describe('the footer service links', () => {
  it('every anchor names a service that exists', () => {
    const ids = serviceIds()
    for (const link of footerServices) {
      expect(ids).toContain(anchorOf(link.href))
    }
  })

  it('all point at the services page', () => {
    for (const link of footerServices) {
      expect(routeOf(link.href)).toBe('/services')
    }
  })

  it('names no service twice', () => {
    const hrefs = footerServices.map((link) => link.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })
})

describe('the header', () => {
  it('lists each destination once', () => {
    const hrefs = primaryNav.map((link) => link.href)
    expect(new Set(hrefs).size).toBe(hrefs.length)
  })

  it('gives every entry a label', () => {
    for (const link of primaryNav) {
      expect(link.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('leads with the home page', () => {
    expect(primaryNav[0].href).toBe('/')
  })
})

describe('the footer columns', () => {
  it('give the clinic column real destinations', () => {
    for (const link of footerCompany) {
      expect(routes).toContain(routeOf(link.href))
    }
  })

  it('give the legal column real destinations', () => {
    for (const link of legalNav) {
      expect(routes).toContain(routeOf(link.href))
    }
  })

  it('label every entry', () => {
    for (const link of [...footerCompany, ...legalNav, ...footerServices]) {
      expect(link.label.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('the social links', () => {
  it('all leave the site', () => {
    for (const link of socialLinks) {
      expect(isExternal(link.href)).toBe(true)
    }
  })

  it('are all https', () => {
    for (const link of socialLinks) {
      expect(link.href.startsWith('https://')).toBe(true)
    }
  })

  it('name an icon each', () => {
    for (const link of socialLinks) {
      expect(link.icon.length).toBeGreaterThan(0)
    }
  })

  it('appear once each', () => {
    const labels = socialLinks.map((link) => link.label)
    expect(new Set(labels).size).toBe(labels.length)
  })
})

describe('the app directory', () => {
  it('really is where the routes were read from', () => {
    expect(existsSync(APP_DIR)).toBe(true)
  })
})
