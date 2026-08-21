/**
 * Small text helpers the pages share.
 *
 * Nothing here knows about React - they are the bits that were being done
 * inline, slightly differently, in three or four components.
 */

/** A url-safe id built from a title: `Pediatric Dentistry` becomes `pediatric-dentistry`. */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Shortens a blurb for a card, breaking on a word rather than mid-syllable. */
export function truncate(input: string, limit: number): string {
  const text = input.trim()
  if (limit <= 0) return ''
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  const body = lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  return `${body.replace(/[.,;:!?-]+$/, '')}…`
}

const TITLES = ['dr', 'prof', 'mr', 'mrs', 'ms']

/** Initials for an avatar: `Dr. Salwa Naguib` gives `SN`. */
export function initials(name: string): string {
  const words = name
    .split(/\s+/)
    // Punctuation comes off first. `Prof.` has to be reduced to `Prof`
    // before the title check, or the trailing dot survives the filter and
    // becomes the initial.
    .map((word) => word.replace(/[^A-Za-z]/g, ''))
    .filter((word) => word.length > 0)
    .filter((word) => !TITLES.includes(word.toLowerCase()))
  if (words.length === 0) return ''
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

/** Title case for a label typed in lower case. */
export function titleCase(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/** Joins names the way a sentence would: `a, b and c`. */
export function listSentence(items: string[]): string {
  const parts = items.map((item) => item.trim()).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}
