/**
 * The bits of metadata that are derived rather than typed out.
 *
 * The site is small enough that a sitemap can be built from the navigation
 * tree, which means a page that is added to the nav is a page that gets
 * listed - rather than a page somebody forgets to add here.
 */

import { clinic } from '@/data/clinic'
import { navigation } from '@/data/navigation'
import { collectHrefs, isInternal, routeOf } from '@/lib/links'

/** Where the site is served from, overridable for previews. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://artydentalclinic.com'

/** A page title with the clinic's name after it. */
export function pageTitle(title?: string): string {
  return title ? `${title} | ${clinic.name}` : clinic.name
}

/** An absolute url for a route on this site. */
export function absoluteUrl(route: string): string {
  const path = route.startsWith('/') ? route : `/${route}`
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

/**
 * Every route the navigation links to, each once, home page first and the
 * rest in alphabetical order so the sitemap is stable between builds.
 */
export function sitemapRoutes(): string[] {
  const routes = new Set<string>()
  for (const href of collectHrefs(navigation)) {
    if (!isInternal(href)) continue
    const route = routeOf(href)
    if (route) routes.add(route)
  }
  routes.add('/')
  const rest = Array.from(routes)
    .filter((route) => route !== '/')
    .sort()
  return ['/', ...rest]
}

/** Search-engine description for a page, falling back to the clinic's. */
export function pageDescription(description?: string): string {
  return description ?? clinic.tagline
}
