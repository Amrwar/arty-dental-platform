import { describe, expect, it } from 'vitest'

import {
  emptyBooking,
  isBookable,
  normaliseBooking,
  validateBooking,
  type BookingRequest,
} from './booking'

const good: BookingRequest = {
  name: 'Nour Adel',
  email: 'nour@example.com',
  phone: '+20 100 384 3828',
  service: 'general',
  message: 'I would like a check-up and a cleaning, evenings if possible.',
}

const withField = (field: keyof BookingRequest, value: string): BookingRequest => ({
  ...good,
  [field]: value,
})

describe('emptyBooking', () => {
  it('starts every field blank', () => {
    expect(Object.values(emptyBooking()).every((value) => value === '')).toBe(true)
  })

  it('is not bookable as it stands', () => {
    expect(isBookable(emptyBooking())).toBe(false)
  })

  it('faults every required field at once rather than one at a time', () => {
    const errors = validateBooking(emptyBooking())
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'phone'])
  })
})

describe('a complete request', () => {
  it('passes', () => {
    expect(validateBooking(good)).toEqual({})
  })

  it('is bookable', () => {
    expect(isBookable(good)).toBe(true)
  })

  it('is still bookable with no treatment chosen', () => {
    expect(isBookable(withField('service', ''))).toBe(true)
  })
})

describe('the name', () => {
  it('is required', () => {
    expect(validateBooking(withField('name', '')).name).toBeDefined()
  })

  it('is not satisfied by spaces', () => {
    expect(validateBooking(withField('name', '   ')).name).toBeDefined()
  })

  it('has to be more than one letter', () => {
    expect(validateBooking(withField('name', 'A')).name).toBeDefined()
  })

  it('accepts a short real name', () => {
    expect(validateBooking(withField('name', 'Ali')).name).toBeUndefined()
  })
})

describe('the email', () => {
  it('is required', () => {
    expect(validateBooking(withField('email', '')).email).toBeDefined()
  })

  it('has to look like an address', () => {
    expect(validateBooking(withField('email', 'nour.example.com')).email).toBeDefined()
  })

  it('is accepted with surrounding spaces, which are trimmed', () => {
    expect(validateBooking(withField('email', '  nour@example.com ')).email).toBeUndefined()
  })
})

describe('the phone', () => {
  it('is required', () => {
    expect(validateBooking(withField('phone', '')).phone).toBeDefined()
  })

  it('has to carry enough digits to dial', () => {
    expect(validateBooking(withField('phone', '+20 100')).phone).toBeDefined()
  })

  it('is not satisfied by punctuation alone', () => {
    expect(validateBooking(withField('phone', '+-- () --')).phone).toBeDefined()
  })

  it('accepts a local number without a country code', () => {
    expect(validateBooking(withField('phone', '01003843828')).phone).toBeUndefined()
  })
})

describe('the treatment', () => {
  it('may be left unchosen', () => {
    expect(validateBooking(withField('service', '')).service).toBeUndefined()
  })

  it('has to be one the clinic offers', () => {
    expect(validateBooking(withField('service', 'astrology')).service).toBeDefined()
  })

  it('accepts a real service id', () => {
    expect(validateBooking(withField('service', 'pediatric')).service).toBeUndefined()
  })
})

describe('the message', () => {
  it('is required', () => {
    expect(validateBooking(withField('message', '')).message).toBeDefined()
  })

  it('asks for more than a word', () => {
    expect(validateBooking(withField('message', 'hi')).message).toBeDefined()
  })

  it('is not satisfied by padding a short message with spaces', () => {
    expect(validateBooking(withField('message', 'hi        ')).message).toBeDefined()
  })
})

describe('normaliseBooking', () => {
  it('trims and collapses the name', () => {
    expect(normaliseBooking(withField('name', '  Nour   Adel ')).name).toBe('Nour Adel')
  })

  it('lowercases the email', () => {
    expect(normaliseBooking(withField('email', 'Nour@Example.COM')).email).toBe(
      'nour@example.com'
    )
  })

  it('reduces the phone to something dialable', () => {
    expect(normaliseBooking(good).phone).toBe('+201003843828')
  })

  it('trims the message', () => {
    expect(normaliseBooking(withField('message', '  hello there  ')).message).toBe(
      'hello there'
    )
  })

  it('leaves an already-tidy request unchanged', () => {
    const tidy = normaliseBooking(good)
    expect(normaliseBooking(tidy)).toEqual(tidy)
  })
})
