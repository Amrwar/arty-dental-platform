import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

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

describe('the sitemap against the pages that actually exist', () => {
  /**
   * Walks `src/app` for route segments holding a page, which is the same
   * thing Next does when it decides what to build. A page added without a
   * link to it would otherwise never reach the sitemap.
   */
  const routesOnDisk = (): string[] => {
    const appDir = fileURLToPath(new URL('../app', import.meta.url))
    const found: string[] = []
    const walk = (dir: string, prefix: string): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          // Route groups and private folders are not routes of their own.
          if (entry.name.startsWith('_') || entry.name.startsWith('(')) continue
          walk(join(dir, entry.name), `${prefix}/${entry.name}`)
        } else if (entry.name === 'page.tsx') {
          found.push(prefix === '' ? '/' : prefix)
        }
      }
    }
    walk(appDir, '')
    return found.sort()
  }

  it('finds the pages on disk at all, so the check is not vacuous', () => {
    expect(routesOnDisk().length).toBeGreaterThan(4)
  })

  it('lists every page that exists', () => {
    const listed = new Set(sitemapRoutes())
    for (const route of routesOnDisk()) {
      expect(listed.has(route), `${route} is missing from the sitemap`).toBe(
        true,
      )
    }
  })

  it('lists nothing that is not a page', () => {
    const onDisk = new Set(routesOnDisk())
    for (const route of sitemapRoutes()) {
      expect(onDisk.has(route), `${route} is in the sitemap but has no page`).toBe(
        true,
      )
    }
  })

  it('puts the home page first', () => {
    expect(sitemapRoutes()[0]).toBe('/')
  })

  it('lists each route once', () => {
    const routes = sitemapRoutes()
    expect(new Set(routes).size).toBe(routes.length)
  })
})

describe('the page titles', () => {
  /** Every metadata title written in the app directory. */
  const titlesInApp = (): { file: string; title: string }[] => {
    const appDir = fileURLToPath(new URL('../app', import.meta.url))
    const found: { file: string; title: string }[] = []
    const walk = (dir: string, depth: number): void => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name)
        if (entry.isDirectory()) {
          walk(full, depth + 1)
          continue
        }
        if (!entry.name.endsWith('.tsx')) continue
        // The root layout is where the template lives, so its own defaults
        // are supposed to name the clinic.
        if (depth === 0 && entry.name === 'layout.tsx') continue
        const source = readFileSync(full, 'utf8')
        for (const match of Array.from(source.matchAll(/^\s*title: (.+),$/gm))) {
          found.push({ file: entry.name, title: match[1] })
        }
      }
    }
    walk(appDir, 0)
    return found
  }

  it('finds titles at all, so the check is not vacuous', () => {
    expect(titlesInApp().length).toBeGreaterThan(3)
  })

  it('never repeats the clinic name, which the root template appends', () => {
    // `About | Arty Dental Clinic` under the template renders the clinic
    // name twice. Pages carry the short title and nothing more.
    for (const { file, title } of titlesInApp()) {
      if (title.includes('template')) continue
      expect(title.includes('clinic.name'), `${file}: ${title}`).toBe(false)
    }
  })
})
