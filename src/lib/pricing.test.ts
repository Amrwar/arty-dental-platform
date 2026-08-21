import { describe, expect, it } from 'vitest'

import { services } from '@/data/services'

import { cheapest, formatPrice, parsePrice, priceAmount } from './pricing'

describe('parsePrice', () => {
  it('reads a starting price', () => {
    expect(parsePrice('From $75')).toEqual({ from: true, currency: '$', amount: 75 })
  })

  it('reads a fixed price', () => {
    expect(parsePrice('$200')).toEqual({ from: false, currency: '$', amount: 200 })
  })

  it('reads a thousands separator', () => {
    expect(parsePrice('From $3,000')?.amount).toBe(3000)
  })

  it('ignores the case of the word from', () => {
    expect(parsePrice('from $75')?.from).toBe(true)
  })

  it('tolerates padding', () => {
    expect(parsePrice('  From $75  ')?.amount).toBe(75)
  })

  it('is null for something that is not a price', () => {
    expect(parsePrice('Call us')).toBeNull()
  })

  it('is null for an empty label', () => {
    expect(parsePrice('')).toBeNull()
  })
})

describe('priceAmount', () => {
  it('gives the figure', () => {
    expect(priceAmount('From $150')).toBe(150)
  })

  it('sorts an unreadable price last rather than first', () => {
    expect(priceAmount('Ask at reception')).toBe(Number.POSITIVE_INFINITY)
  })
})

describe('formatPrice', () => {
  it('writes a starting price the way the catalogue does', () => {
    expect(formatPrice({ from: true, currency: '$', amount: 75 })).toBe('From $75')
  })

  it('writes a fixed price without the word from', () => {
    expect(formatPrice({ from: false, currency: '$', amount: 200 })).toBe('$200')
  })

  it('puts the separator back into thousands', () => {
    expect(formatPrice({ from: true, currency: '$', amount: 3000 })).toBe('From $3,000')
  })

  it('round-trips every price in the catalogue', () => {
    for (const service of services) {
      const parsed = parsePrice(service.price)
      expect(parsed).not.toBeNull()
      expect(formatPrice(parsed!)).toBe(service.price)
    }
  })
})

describe('cheapest', () => {
  it('finds the lowest', () => {
    expect(cheapest(['From $200', 'From $75', 'From $150'])).toBe('From $75')
  })

  it('ignores the ones it cannot read', () => {
    expect(cheapest(['Ask us', 'From $150'])).toBe('From $150')
  })

  it('is null when nothing parses', () => {
    expect(cheapest(['Ask us', 'Call'])).toBeNull()
  })

  it('is null for an empty list', () => {
    expect(cheapest([])).toBeNull()
  })
})

describe('the catalogue prices', () => {
  it('are all written in a form the site can read', () => {
    for (const service of services) {
      expect(parsePrice(service.price)).not.toBeNull()
    }
  })

  it('all quote the same currency', () => {
    const currencies = new Set(
      services.map((service) => parsePrice(service.price)?.currency)
    )
    expect(currencies.size).toBe(1)
  })

  it('are all above zero', () => {
    for (const service of services) {
      expect(priceAmount(service.price)).toBeGreaterThan(0)
    }
  })
})
