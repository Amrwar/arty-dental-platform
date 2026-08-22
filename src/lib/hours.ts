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

/**
 * A clock time written the way the site writes it — `5 PM`, `9:30 AM` — on
 * the 24-hour clock, or null if it is not a time at all. Noon and midnight
 * are the two that catch people out: 12 PM is midday, 12 AM is midnight.
 */
export function to24Hour(label: string): string | null {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i.exec(label.trim())
  if (!match) return null
  const hour = Number(match[1])
  const minute = match[2] ?? '00'
  if (hour < 1 || hour > 12 || Number(minute) > 59) return null
  const pm = match[3].toLowerCase() === 'pm'
  const onTheDay = hour === 12 ? (pm ? 12 : 0) : pm ? hour + 12 : hour
  return `${String(onTheDay).padStart(2, '0')}:${minute}`
}

/**
 * The times a row opens and closes, or null when it is shut or the hours
 * are not written as a range.
 */
export function timeRange(
  row: OpeningHours,
): { opens: string; closes: string } | null {
  if (isClosed(row)) return null
  const parts = row.hours.split('-').map((part) => part.trim())
  if (parts.length !== 2) return null
  const opens = to24Hour(parts[0])
  const closes = to24Hour(parts[1])
  return opens && closes ? { opens, closes } : null
}
