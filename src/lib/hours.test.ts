import { describe, expect, it } from 'vitest'

import { clinic } from '@/data/clinic'

import {
  coversWholeWeek,
  daysCovered,
  isClosed,
  overlappingDays,
  shortDay,
  WEEK,
} from './hours'

describe('shortDay', () => {
  it('shortens a full day name', () => {
    expect(shortDay('Friday')).toBe('Fri')
  })

  it('leaves an already-short day alone', () => {
    expect(shortDay('Sat')).toBe('Sat')
  })

  it('ignores case', () => {
    expect(shortDay('thursday')).toBe('Thu')
  })

  it('hands back something it does not know', () => {
    expect(shortDay('Caturday')).toBe('Caturday')
  })
})

describe('isClosed', () => {
  it('reads a closed row', () => {
    expect(isClosed({ days: 'Friday', hours: 'Closed' })).toBe(true)
  })

  it('ignores case and padding', () => {
    expect(isClosed({ days: 'Friday', hours: '  closed ' })).toBe(true)
  })

  it('does not call an open row closed', () => {
    expect(isClosed({ days: 'Sat - Thu', hours: '5 PM - 10 PM' })).toBe(false)
  })
})

describe('daysCovered', () => {
  it('expands a range across the week', () => {
    expect(daysCovered({ days: 'Sat - Thu', hours: '5 PM - 10 PM' })).toEqual([
      'Sat',
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
    ])
  })

  it('reads a single day', () => {
    expect(daysCovered({ days: 'Friday', hours: 'Closed' })).toEqual(['Fri'])
  })

  it('reads a range written without spaces', () => {
    expect(daysCovered({ days: 'Sat-Sun', hours: '5 PM - 10 PM' })).toEqual([
      'Sat',
      'Sun',
    ])
  })

  it('covers nothing when the range runs backwards', () => {
    expect(daysCovered({ days: 'Thu - Sat', hours: '5 PM' })).toEqual([])
  })

  it('covers nothing for a day it cannot place', () => {
    expect(daysCovered({ days: 'Someday', hours: '5 PM' })).toEqual([])
  })
})

describe('the published schedule', () => {
  it('accounts for all seven days', () => {
    expect(coversWholeWeek(clinic.openingHours)).toBe(true)
  })

  it('names no day twice', () => {
    expect(overlappingDays(clinic.openingHours)).toEqual([])
  })

  it('is open on more days than it is shut', () => {
    const open = clinic.openingHours
      .filter((row) => !isClosed(row))
      .flatMap(daysCovered)
    expect(open.length).toBeGreaterThan(WEEK.length / 2)
  })

  it('closes on Friday, as the clinic advertises', () => {
    const closed = clinic.openingHours.filter(isClosed).flatMap(daysCovered)
    expect(closed).toEqual(['Fri'])
  })

  it('gives every open row an hours range rather than a bare time', () => {
    for (const row of clinic.openingHours.filter((r) => !isClosed(r))) {
      expect(row.hours).toMatch(/-/)
    }
  })
})

describe('coversWholeWeek', () => {
  it('is false when a day is missing', () => {
    expect(coversWholeWeek([{ days: 'Sat - Wed', hours: '5 PM - 10 PM' }])).toBe(
      false
    )
  })
})

describe('overlappingDays', () => {
  it('reports a day claimed by two rows', () => {
    expect(
      overlappingDays([
        { days: 'Sat - Mon', hours: '5 PM - 10 PM' },
        { days: 'Mon', hours: '6 PM - 9 PM' },
      ])
    ).toEqual(['Mon'])
  })
})
