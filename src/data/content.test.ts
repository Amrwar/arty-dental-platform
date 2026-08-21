/**
 * The written content: reviews, the figures beside them, and the questions
 * the front desk answers. All of it ends up on a page verbatim, so the
 * checks here are about what would look wrong rather than what would throw.
 */

import { describe, expect, it } from 'vitest'

import { serviceIds } from './services'
import { averageRating, stats, testimonials } from './testimonials'
import { faqs, faqsForService, generalFaqs } from './faqs'

describe('the testimonials', () => {
  it('exist', () => {
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('attribute every quote', () => {
    for (const entry of testimonials) {
      expect(entry.name.trim().length).toBeGreaterThan(0)
    }
  })

  it('name the treatment each patient had', () => {
    for (const entry of testimonials) {
      expect(entry.treatment.trim().length).toBeGreaterThan(0)
    }
  })

  it('rate between one and five stars', () => {
    for (const entry of testimonials) {
      expect(entry.rating).toBeGreaterThanOrEqual(1)
      expect(entry.rating).toBeLessThanOrEqual(5)
    }
  })

  it('rate in whole stars, since half a star has nothing to render it', () => {
    for (const entry of testimonials) {
      expect(Number.isInteger(entry.rating)).toBe(true)
    }
  })

  it('quote enough to be worth the space', () => {
    for (const entry of testimonials) {
      expect(entry.quote.trim().length).toBeGreaterThan(60)
    }
  })

  it('do not repeat a reviewer', () => {
    const names = testimonials.map((entry) => entry.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('are not all identical five-star copy', () => {
    const ratings = new Set(testimonials.map((entry) => entry.rating))
    expect(ratings.size).toBeGreaterThan(1)
  })
})

describe('averageRating', () => {
  it('sits inside the range it averages', () => {
    expect(averageRating()).toBeGreaterThan(1)
    expect(averageRating()).toBeLessThanOrEqual(5)
  })

  it('is given to one decimal place', () => {
    const rounded = Math.round(averageRating() * 10) / 10
    expect(averageRating()).toBe(rounded)
  })
})

describe('the headline figures', () => {
  it('are published', () => {
    expect(stats.length).toBeGreaterThan(0)
  })

  it('label every figure', () => {
    for (const stat of stats) {
      expect(stat.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('put a number in every value', () => {
    for (const stat of stats) {
      expect(stat.value).toMatch(/\d/)
    }
  })

  it('label each figure once', () => {
    const labels = stats.map((stat) => stat.label)
    expect(new Set(labels).size).toBe(labels.length)
  })
})

describe('the questions', () => {
  it('are asked as questions', () => {
    for (const faq of faqs) {
      expect(faq.question.trim().endsWith('?')).toBe(true)
    }
  })

  it('are answered', () => {
    for (const faq of faqs) {
      expect(faq.answer.trim().length).toBeGreaterThan(40)
    }
  })

  it('are asked once each', () => {
    const questions = faqs.map((faq) => faq.question)
    expect(new Set(questions).size).toBe(questions.length)
  })

  it('file every tagged answer under a service that exists', () => {
    const ids = serviceIds()
    for (const faq of faqs) {
      if (faq.service === undefined) continue
      expect(ids).toContain(faq.service)
    }
  })

  it('leave some answers general rather than tying them all to a treatment', () => {
    expect(generalFaqs().length).toBeGreaterThan(0)
  })
})

describe('faqsForService', () => {
  it('returns the questions filed under a service', () => {
    for (const faq of faqsForService('pediatric')) {
      expect(faq.service).toBe('pediatric')
    }
  })

  it('is empty for a service nobody asked about', () => {
    expect(faqsForService('cosmetic')).toEqual([])
  })

  it('is empty rather than throwing for an unknown service', () => {
    expect(faqsForService('nonsense')).toEqual([])
  })
})
