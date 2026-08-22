/**
 * The appointment slots.
 *
 * Every date here is a fixed calendar day rather than one worked out from
 * the clock, so the suite says the same thing in June as it does in
 * December, and in any timezone.
 */

import { describe, expect, it } from 'vitest'

import type { OpeningHours } from '@/data/clinic'

import {
  dayOf,
  isOpenOn,
  isSlotOffered,
  parseIsoDate,
  slotLabel,
  slotsFor,
} from './availability'

/** 2026-08-22 is a Saturday, 2026-08-21 the Friday before it. */
const SATURDAY = '2026-08-22'
const FRIDAY = '2026-08-21'

const NINE_TO_FIVE: OpeningHours[] = [
  { days: 'Sat - Thu', hours: '9 AM - 5 PM' },
  { days: 'Friday', hours: 'Closed' },
]

describe('parseIsoDate', () => {
  it('reads a date the way a date field writes it', () => {
    expect(parseIsoDate('2026-08-22')?.getUTCDate()).toBe(22)
  })

  it('counts months from one, not from zero', () => {
    expect(parseIsoDate('2026-08-22')?.getUTCMonth()).toBe(7)
  })

  it('refuses a day that rolls into the next month', () => {
    expect(parseIsoDate('2026-02-31')).toBeNull()
  })

  it('accepts a leap day in a leap year', () => {
    expect(parseIsoDate('2024-02-29')).not.toBeNull()
  })

  it('refuses a leap day in a year that has none', () => {
    expect(parseIsoDate('2026-02-29')).toBeNull()
  })

  it('refuses a thirteenth month', () => {
    expect(parseIsoDate('2026-13-01')).toBeNull()
  })

  it('refuses a date written the other way round', () => {
    expect(parseIsoDate('22-08-2026')).toBeNull()
  })

  it('refuses an empty string', () => {
    expect(parseIsoDate('')).toBeNull()
  })

  it('ignores surrounding whitespace', () => {
    expect(parseIsoDate('  2026-08-22 ')).not.toBeNull()
  })

  it('reads the date in UTC, not the local timezone', () => {
    expect(parseIsoDate('2026-08-22')?.toISOString()).toBe(
      '2026-08-22T00:00:00.000Z',
    )
  })
})

describe('dayOf', () => {
  it('knows a Saturday', () => {
    expect(dayOf(SATURDAY)).toBe('Sat')
  })

  it('knows the Friday before it', () => {
    expect(dayOf(FRIDAY)).toBe('Fri')
  })

  it('knows a Sunday', () => {
    expect(dayOf('2026-08-23')).toBe('Sun')
  })

  it('has no day for a date it cannot read', () => {
    expect(dayOf('not a date')).toBeNull()
  })

  it('names the day the way the opening hours do', () => {
    expect(dayOf(SATURDAY)).toHaveLength(3)
  })
})

describe('isOpenOn', () => {
  it('is open on a Saturday', () => {
    expect(isOpenOn(SATURDAY)).toBe(true)
  })

  it('is shut on a Friday', () => {
    expect(isOpenOn(FRIDAY)).toBe(false)
  })

  it('is shut on a date it cannot read', () => {
    expect(isOpenOn('tomorrow')).toBe(false)
  })

  it('is shut on a day no row covers', () => {
    expect(isOpenOn(SATURDAY, [{ days: 'Monday', hours: '9 AM - 5 PM' }])).toBe(
      false,
    )
  })

  it('reads a schedule handed to it', () => {
    expect(isOpenOn(FRIDAY, [{ days: 'Friday', hours: '9 AM - 5 PM' }])).toBe(
      true,
    )
  })
})

describe('slotsFor', () => {
  it('offers slots on the hour', () => {
    for (const slot of slotsFor(SATURDAY)) {
      expect(slot).toMatch(/^\d{2}:00$/)
    }
  })

  it('starts at opening time', () => {
    expect(slotsFor(SATURDAY)[0]).toBe('17:00')
  })

  it('stops a full hour before closing', () => {
    const slots = slotsFor(SATURDAY)
    expect(slots[slots.length - 1]).toBe('21:00')
  })

  it('offers nothing on a day the clinic is shut', () => {
    expect(slotsFor(FRIDAY)).toEqual([])
  })

  it('offers nothing for a date it cannot read', () => {
    expect(slotsFor('soon')).toEqual([])
  })

  it('follows the hours it is given rather than the clinic\u0027s', () => {
    expect(slotsFor(SATURDAY, NINE_TO_FIVE)).toEqual([
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ])
  })

  it('offers nothing when the day is too short for one appointment', () => {
    expect(
      slotsFor(SATURDAY, [{ days: 'Sat - Thu', hours: '5 PM - 5 PM' }]),
    ).toEqual([])
  })

  it('offers exactly one slot for an hour-long day', () => {
    expect(
      slotsFor(SATURDAY, [{ days: 'Sat - Thu', hours: '5 PM - 6 PM' }]),
    ).toEqual(['17:00'])
  })

  it('lists the slots in order', () => {
    const slots = slotsFor(SATURDAY)
    expect([...slots].sort()).toEqual(slots)
  })

  it('names no slot twice', () => {
    const slots = slotsFor(SATURDAY)
    expect(new Set(slots).size).toBe(slots.length)
  })
})

describe('isSlotOffered', () => {
  it('accepts a slot the clinic offers', () => {
    expect(isSlotOffered(SATURDAY, '17:00')).toBe(true)
  })

  it('refuses a slot before the clinic opens', () => {
    expect(isSlotOffered(SATURDAY, '09:00')).toBe(false)
  })

  it('refuses the closing hour itself', () => {
    expect(isSlotOffered(SATURDAY, '22:00')).toBe(false)
  })

  it('refuses any slot on a closed day', () => {
    expect(isSlotOffered(FRIDAY, '17:00')).toBe(false)
  })

  it('refuses a time that is not a slot boundary', () => {
    expect(isSlotOffered(SATURDAY, '17:30')).toBe(false)
  })
})

describe('slotLabel', () => {
  it('writes an evening slot the way the form lists it', () => {
    expect(slotLabel('17:00')).toBe('5:00 PM')
  })

  it('writes a morning slot', () => {
    expect(slotLabel('09:30')).toBe('9:30 AM')
  })

  it('writes midday as twelve, not zero', () => {
    expect(slotLabel('12:00')).toBe('12:00 PM')
  })

  it('writes midnight as twelve AM', () => {
    expect(slotLabel('00:00')).toBe('12:00 AM')
  })

  it('hands back anything it cannot read', () => {
    expect(slotLabel('teatime')).toBe('teatime')
  })

  it('labels every slot the clinic offers', () => {
    for (const slot of slotsFor(SATURDAY)) {
      expect(slotLabel(slot)).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/)
    }
  })
})
