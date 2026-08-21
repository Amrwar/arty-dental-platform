/**
 * Reading the links the site points at.
 *
 * Every navigation entry is a plain string, and a rebrand once left the
 * footer pointing at `/services#endodontics` when no such section had ever
 * existed. Splitting a href into its route and its anchor is what lets a
 * test walk the whole navigation and say so.
 */

/** Whether a href stays on this site. */
export function isInternal(href: string): boolean {
  return href.startsWith('/')
}

/** Whether a href is a link off the site (or a `tel:`/`mailto:`). */
export function isExternal(href: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(href)
}

/**
 * The route part of a href: `/services#general` is the `/services` page.
 * A bare anchor like `#testimonials` belongs to whatever page it sits on,
 * so it has no route of its own.
 */
export function routeOf(href: string): string | null {
  if (!isInternal(href)) return null
  const withoutQuery = href.split('?')[0]
  const route = withoutQuery.split('#')[0]
  if (route === '') return null
  return route.length > 1 && route.endsWith('/') ? route.slice(0, -1) : route
}

/** The anchor a href asks for, without the `#`, or null if it asks for none. */
export function anchorOf(href: string): string | null {
  const hash = href.split('#')[1]
  if (hash === undefined) return null
  const anchor = hash.split('?')[0]
  return anchor === '' ? null : anchor
}

/** Every href a nav tree holds, however deeply it is nested. */
export function collectHrefs(input: unknown): string[] {
  const found: string[] = []
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    if (node && typeof node === 'object') {
      for (const value of Object.values(node as Record<string, unknown>)) {
        if (typeof value === 'string') continue
        walk(value)
      }
      const href = (node as Record<string, unknown>).href
      if (typeof href === 'string') found.push(href)
    }
  }
  walk(input)
  return found
}
