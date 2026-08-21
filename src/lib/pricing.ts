/**
 * Reading the prices in the service catalogue.
 *
 * They are written the way the page shows them - `From $75` - because that
 * is what a patient reads. Anything that needs the number itself (sorting,
 * a "from" badge, a cheapest-first list) parses it here rather than each
 * caller inventing its own slice.
 */

export interface Price {
  /** True when the figure is a starting point rather than a fixed fee. */
  from: boolean
  currency: string
  amount: number
}

/** Parses a catalogue price, or null if it is not written as one. */
export function parsePrice(label: string): Price | null {
  const text = label.trim()
  const match = text.match(/^(from\s+)?([^\d\s]+)\s*([\d,]+)$/i)
  if (!match) return null
  const amount = Number(match[3].replace(/,/g, ''))
  if (!Number.isFinite(amount)) return null
  return {
    from: Boolean(match[1]),
    currency: match[2],
    amount,
  }
}

/** The number in a price, for sorting. Unparseable prices sort last. */
export function priceAmount(label: string): number {
  return parsePrice(label)?.amount ?? Number.POSITIVE_INFINITY
}

/** Writes a price back out the way the catalogue spells it. */
export function formatPrice(price: Price): string {
  const figure = `${price.currency}${price.amount.toLocaleString('en-US')}`
  return price.from ? `From ${figure}` : figure
}

/** The cheapest of a set of catalogue prices, or null if none parse. */
export function cheapest(labels: string[]): string | null {
  const parsed = labels.filter((label) => parsePrice(label) !== null)
  if (parsed.length === 0) return null
  return parsed.reduce((low, label) =>
    priceAmount(label) < priceAmount(low) ? label : low
  )
}
