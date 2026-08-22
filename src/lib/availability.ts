/**
 * Which appointment slots the clinic can actually offer.
 *
 * The booking form used to list five evening times whatever day you picked,
 * including Friday, when the clinic is shut. The opening hours already say
 * all of this, so the slots are worked out from them instead of typed out
 * a second time.
 *
 * Dates are handled in UTC throughout. A date field gives a bare calendar
 * day with no timezone attached, and reading it in local time moves it
 * across a boundary for anyone west of Greenwich.
 */

import { clinic, type OpeningHours } from '@/data/clinic'
import { daysCovered, timeRange, type Day } from '@/lib/hours'

/** Appointments start on the hour. */
export const SLOT_MINUTES = 60

/** `Date.getUTCDay()` counts from Sunday; the clinic's week starts Saturday. */
const BY_WEEKDAY: Day[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 * A `YYYY-MM-DD` string as a date, or null if it is not one. Rolled-over
 * dates such as `2026-02-31` are rejected rather than quietly becoming the
 * first of March.
 */
export function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  const rolled =
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  return rolled ? null : date
}

/** The day of the week a date falls on, named as the clinic names its days. */
export function dayOf(value: string): Day | null {
  const date = parseIsoDate(value)
  return date ? BY_WEEKDAY[date.getUTCDay()] : null
}

/** The opening-hours row covering a date, if any row does. */
export function rowFor(
  value: string,
  rows: OpeningHours[] = clinic.openingHours,
): OpeningHours | null {
  const day = dayOf(value)
  if (!day) return null
  return rows.find((row) => daysCovered(row).includes(day)) ?? null
}

/** Whether the clinic opens at all on a date. */
export function isOpenOn(
  value: string,
  rows: OpeningHours[] = clinic.openingHours,
): boolean {
  const row = rowFor(value, rows)
  return row !== null && timeRange(row) !== null
}

/**
 * The slots offered on a date, on the hour, in `HH:MM`.
 *
 * The last one starts a full slot before closing time: an appointment that
 * begins as the door is locked is not an appointment.
 */
export function slotsFor(
  value: string,
  rows: OpeningHours[] = clinic.openingHours,
): string[] {
  const row = rowFor(value, rows)
  const range = row ? timeRange(row) : null
  if (!range) return []
  const opens = minutesOf(range.opens)
  const closes = minutesOf(range.closes)
  const slots: string[] = []
  for (let at = opens; at + SLOT_MINUTES <= closes; at += SLOT_MINUTES) {
    slots.push(clockOf(at))
  }
  return slots
}

/** Whether a slot is one the clinic offers on that date. */
export function isSlotOffered(
  value: string,
  slot: string,
  rows: OpeningHours[] = clinic.openingHours,
): boolean {
  return slotsFor(value, rows).includes(slot)
}

/** `17:00` as `5:00 PM`, the way the form lists it. */
export function slotLabel(slot: string): string {
  const at = minutesOf(slot)
  if (!Number.isFinite(at)) return slot
  const hour = Math.floor(at / 60)
  const minute = at % 60
  const meridiem = hour < 12 ? 'AM' : 'PM'
  const shown = hour % 12 === 0 ? 12 : hour % 12
  return `${shown}:${String(minute).padStart(2, '0')} ${meridiem}`
}

function minutesOf(clock: string): number {
  const [hour, minute] = clock.split(':').map(Number)
  return hour * 60 + minute
}

function clockOf(minutes: number): string {
  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
