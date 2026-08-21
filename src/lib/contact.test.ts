import { describe, expect, it } from 'vitest'

import {
  formatPhone,
  isPublishableEmail,
  mailtoHref,
  normalisePhone,
  telHref,
  whatsappHref,
} from './contact'

describe('normalisePhone', () => {
  it('keeps the digits and drops the spacing', () => {
    expect(normalisePhone('+20 100 384 3828')).toBe('+201003843828')
  })

  it('keeps a leading plus when the number carries one', () => {
    expect(normalisePhone('+201003843828')).toBe('+201003843828')
  })

  it('does not invent a plus for a local number', () => {
    expect(normalisePhone('01003843828')).toBe('01003843828')
  })

  it('strips brackets, dashes and dots', () => {
    expect(normalisePhone('+20 (100) 384-38.28')).toBe('+201003843828')
  })

  it('tolerates padding around the number', () => {
    expect(normalisePhone('  +20 100 384 3828  ')).toBe('+201003843828')
  })
})

describe('formatPhone', () => {
  it('spaces an Egyptian mobile into three, three and four', () => {
    expect(formatPhone('+201003843828')).toBe('+20 100 384 3828')
  })

  it('is stable when the number is already spaced', () => {
    expect(formatPhone('+20 100 384 3828')).toBe('+20 100 384 3828')
  })

  it('hands back anything it does not recognise untouched', () => {
    expect(formatPhone('+1 415 555 0100')).toBe('+1 415 555 0100')
  })

  it('leaves a number of the wrong length alone', () => {
    expect(formatPhone('+2010038438')).toBe('+2010038438')
  })
})

describe('telHref', () => {
  it('builds a dialable link', () => {
    expect(telHref('+20 100 384 3828')).toBe('tel:+201003843828')
  })

  it('never leaves a space in the href', () => {
    expect(telHref('+20 100 384 3828')).not.toContain(' ')
  })
})

describe('mailtoHref', () => {
  it('builds a plain mailto', () => {
    expect(mailtoHref('artydentalclinic@gmail.com')).toBe(
      'mailto:artydentalclinic@gmail.com'
    )
  })

  it('encodes a subject so spaces survive the trip', () => {
    expect(mailtoHref('a@b.com', 'Appointment request')).toBe(
      'mailto:a@b.com?subject=Appointment%20request'
    )
  })

  it('omits the query when no subject is given', () => {
    expect(mailtoHref('a@b.com')).not.toContain('?')
  })
})

describe('whatsappHref', () => {
  it('drops the plus, which wa.me will not accept', () => {
    expect(whatsappHref('+201003843828')).toBe('https://wa.me/201003843828')
  })

  it('encodes a prefilled message', () => {
    expect(whatsappHref('+201003843828', 'Hello Arty')).toBe(
      'https://wa.me/201003843828?text=Hello%20Arty'
    )
  })

  it('never leaves a plus in the path', () => {
    expect(whatsappHref('+20 100 384 3828')).not.toContain('+')
  })
})

describe('isPublishableEmail', () => {
  it('accepts the clinic address', () => {
    expect(isPublishableEmail('artydentalclinic@gmail.com')).toBe(true)
  })

  it('rejects an address with no at sign', () => {
    expect(isPublishableEmail('artydentalclinic.gmail.com')).toBe(false)
  })

  it('rejects a domain with no dot', () => {
    expect(isPublishableEmail('someone@localhost')).toBe(false)
  })

  it('rejects two at signs', () => {
    expect(isPublishableEmail('a@b@c.com')).toBe(false)
  })

  it('rejects an empty local part', () => {
    expect(isPublishableEmail('@gmail.com')).toBe(false)
  })

  it('rejects a stray space', () => {
    expect(isPublishableEmail('arty dental@gmail.com')).toBe(false)
  })

  it('rejects untrimmed padding rather than silently fixing it', () => {
    expect(isPublishableEmail(' a@b.com ')).toBe(false)
  })

  it('rejects a domain that ends in a dot', () => {
    expect(isPublishableEmail('a@b.com.')).toBe(false)
  })
})
