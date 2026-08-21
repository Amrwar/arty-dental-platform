/**
 * Reading the opening hours.
 *
 * The clinic keeps evening hours and closes on Friday, so "is it open now"
 * is not the usual nine-to-five question. The rows are written the way the
 * site displays them; everything else is derived.
 */

import type { OpeningHours } from '@/data/clinic'

/** The days of the week, as the clinic writes them. */
export const WEEK = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

export type Day = (typeof WEEK)[number]

/** Whether a row says the clinic is shut on those days. */
export function isClosed(row: OpeningHours): boolean {
  return row.hours.trim().toLowerCase() === 'closed'
}

/**
 * The days a row covers. `Sat - Thu` is a run through the week as the
 * clinic counts it, starting on Saturday; `Friday` is just itself.
 */
export function daysCovered(row: OpeningHours): Day[] {
  const label = row.days.trim()
  const range = label.split('-').map((part) => part.trim())
  if (range.length === 2) {
    const from = WEEK.indexOf(shortDay(range[0]) as Day)
    const to = WEEK.indexOf(shortDay(range[1]) as Day)
    if (from === -1 || to === -1) return []
    const out: Day[] = []
    for (let i = from; i <= to; i += 1) out.push(WEEK[i])
    return out
  }
  const single = shortDay(label)
  return WEEK.includes(single as Day) ? [single as Day] : []
}

/** `Friday` and `Fri` are the same day. */
export function shortDay(name: string): string {
  const trimmed = name.trim()
  const match = WEEK.find(
    (day) => day.toLowerCase() === trimmed.slice(0, 3).toLowerCase()
  )
  return match ?? trimmed
}

/**
 * Whether the whole week is spoken for. A schedule that forgets a day is a
 * schedule that will one day be asked about that day.
 */
export function coversWholeWeek(rows: OpeningHours[]): boolean {
  const seen = new Set<string>()
  for (const row of rows) {
    for (const day of daysCovered(row)) seen.add(day)
  }
  return WEEK.every((day) => seen.has(day))
}

/** The days a schedule names more than once. */
export function overlappingDays(rows: OpeningHours[]): Day[] {
  const counts = new Map<string, number>()
  for (const row of rows) {
    for (const day of daysCovered(row)) {
      counts.set(day, (counts.get(day) ?? 0) + 1)
    }
  }
  return WEEK.filter((day) => (counts.get(day) ?? 0) > 1)
}
