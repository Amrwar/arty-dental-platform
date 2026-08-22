/**
 * Checking an appointment request before it is sent.
 *
 * The contact form was validating with `required` attributes alone, which
 * the browser enforces and nothing else does - a whitespace-only name got
 * through, and so did a phone number with no digits in it. The rules live
 * here so the form and anything else that takes a booking agree on them.
 */

import { isPublishableEmail, normalisePhone } from '@/lib/contact'
import { isOpenOn, isSlotOffered, parseIsoDate } from '@/lib/availability'
import { serviceIds } from '@/data/services'

export interface BookingRequest {
  name: string
  email: string
  phone: string
  /** A service id, or empty if the visitor did not choose one. */
  service: string
  /** The day asked for as `YYYY-MM-DD`, or empty for the first free one. */
  preferredDate: string
  /** The slot asked for as `HH:MM`, or empty. */
  preferredTime: string
  message: string
}

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>

/** The shortest a message can be and still say anything. */
const MIN_MESSAGE = 10

/** An empty request, for seeding the form. */
export function emptyBooking(): BookingRequest {
  return {
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  }
}

/**
 * Every problem with a request, keyed by field.
 *
 * All of them at once rather than the first: a form that reveals one fault
 * per submission is a form people give up on.
 */
export function validateBooking(request: BookingRequest): BookingErrors {
  const errors: BookingErrors = {}

  if (request.name.trim().length === 0) {
    errors.name = 'Please tell us your name.'
  } else if (request.name.trim().length < 2) {
    errors.name = 'That name looks too short.'
  }

  if (request.email.trim().length === 0) {
    errors.email = 'Please give us an email address.'
  } else if (!isPublishableEmail(request.email.trim())) {
    errors.email = 'That email address does not look right.'
  }

  const digits = normalisePhone(request.phone).replace(/\D/g, '')
  if (request.phone.trim().length === 0) {
    errors.phone = 'Please give us a phone number.'
  } else if (digits.length < 7) {
    errors.phone = 'That phone number is missing some digits.'
  }

  if (request.service.trim().length === 0) {
    errors.service = 'Please choose the treatment you need.'
  } else if (!serviceIds().includes(request.service)) {
    errors.service = 'Please choose one of the treatments listed.'
  }

  const wantsDate = request.preferredDate.trim().length > 0
  if (wantsDate) {
    if (parseIsoDate(request.preferredDate) === null) {
      errors.preferredDate = 'That date could not be read.'
    } else if (!isOpenOn(request.preferredDate)) {
      errors.preferredDate = 'The clinic is closed that day.'
    }
  }

  if (request.preferredTime.trim().length > 0) {
    if (!wantsDate) {
      errors.preferredTime = 'Please choose a day before a time.'
    } else if (
      !errors.preferredDate &&
      !isSlotOffered(request.preferredDate, request.preferredTime)
    ) {
      errors.preferredTime = 'The clinic is not open at that time.'
    }
  }

  if (request.message.trim().length === 0) {
    errors.message = 'Please tell us what you need.'
  } else if (request.message.trim().length < MIN_MESSAGE) {
    errors.message = 'A little more detail would help us book the right slot.'
  }

  return errors
}

/** Whether a request is ready to send. */
export function isBookable(request: BookingRequest): boolean {
  return Object.keys(validateBooking(request)).length === 0
}

/** The request with its text tidied, as it would be stored. */
export function normaliseBooking(request: BookingRequest): BookingRequest {
  return {
    name: request.name.trim().replace(/\s+/g, ' '),
    email: request.email.trim().toLowerCase(),
    phone: normalisePhone(request.phone),
    service: request.service.trim(),
    preferredDate: request.preferredDate.trim(),
    preferredTime: request.preferredTime.trim(),
    message: request.message.trim(),
  }
}
