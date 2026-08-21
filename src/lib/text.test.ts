import { describe, expect, it } from 'vitest'

import { initials, listSentence, slugify, titleCase, truncate } from './text'

describe('slugify', () => {
  it('lowercases and hyphenates a title', () => {
    expect(slugify('Pediatric Dentistry')).toBe('pediatric-dentistry')
  })

  it('drops an apostrophe rather than hyphenating around it', () => {
    expect(slugify("Children's Exams")).toBe('childrens-exams')
  })

  it('collapses punctuation into a single hyphen', () => {
    expect(slugify('Lost Crown / Filling')).toBe('lost-crown-filling')
  })

  it('leaves no hyphen at either end', () => {
    expect(slugify('  Emergency Care!  ')).toBe('emergency-care')
  })

  it('is stable when run twice', () => {
    const once = slugify('All-on-4 Implants')
    expect(slugify(once)).toBe(once)
  })
})

describe('truncate', () => {
  it('leaves a short blurb alone', () => {
    expect(truncate('Gentle care', 40)).toBe('Gentle care')
  })

  it('breaks on a word rather than mid-word', () => {
    expect(truncate('Comprehensive preventive and restorative care', 20)).toBe(
      'Comprehensive…'
    )
  })

  it('drops the punctuation it would otherwise strand', () => {
    expect(truncate('Whitening, veneers and bonding', 12)).toBe('Whitening…')
  })

  it('returns nothing for a limit of zero', () => {
    expect(truncate('anything', 0)).toBe('')
  })

  it('keeps a string exactly at the limit whole', () => {
    expect(truncate('12345', 5)).toBe('12345')
  })
})

describe('initials', () => {
  it('takes the first letters of a name', () => {
    expect(initials('Salwa Naguib')).toBe('SN')
  })

  it('ignores a title', () => {
    expect(initials('Dr. Maie Magdy')).toBe('MM')
  })

  it('ignores a professorial title too', () => {
    expect(initials('Prof. Dr. Mohamed M. Dohiem')).toBe('MM')
  })

  it('stops at two letters however long the name', () => {
    expect(initials('Mohammed E. Moussa Farid')).toBe('ME')
  })

  it('is empty for an empty name', () => {
    expect(initials('   ')).toBe('')
  })
})

describe('titleCase', () => {
  it('capitalises each word', () => {
    expect(titleCase('general dentistry')).toBe('General Dentistry')
  })

  it('brings shouted text back down', () => {
    expect(titleCase('EMERGENCY CARE')).toBe('Emergency Care')
  })

  it('collapses the spacing', () => {
    expect(titleCase('  root   canal ')).toBe('Root Canal')
  })
})

describe('listSentence', () => {
  it('joins three items the way a sentence would', () => {
    expect(listSentence(['a', 'b', 'c'])).toBe('a, b and c')
  })

  it('joins two with just an and', () => {
    expect(listSentence(['a', 'b'])).toBe('a and b')
  })

  it('leaves one alone', () => {
    expect(listSentence(['a'])).toBe('a')
  })

  it('is empty for nothing', () => {
    expect(listSentence([])).toBe('')
  })

  it('ignores blank entries', () => {
    expect(listSentence(['a', '  ', 'b'])).toBe('a and b')
  })
})
