/**
 * The clinic's own details.
 *
 * These used to be typed out again in the footer, on the contact page and
 * in the home page's call-to-action, which meant a change of phone number
 * was three edits and one of them was always missed. They live here now.
 */

export interface OpeningHours {
  /** The days this row covers, as written on the site. */
  days: string
  /** The hours those days are open, or 'Closed'. */
  hours: string
}

export interface Clinic {
  name: string
  shortName: string
  tagline: string
  /** Dialable form, E.164. Use `formatPhone` for anything on screen. */
  phone: string
  email: string
  address: string
  mapsUrl: string
  openingHours: OpeningHours[]
}

export const clinic: Clinic = {
  name: 'Arty Dental Clinic',
  shortName: 'Arty Dental',
  tagline:
    'Providing exceptional dental care with a gentle touch. Your smile is our passion.',
  phone: '+201003843828',
  email: 'artydentalclinic@gmail.com',
  address: 'Cairo, Egypt',
  mapsUrl: 'https://maps.google.com',
  openingHours: [
    { days: 'Sat - Thu', hours: '5 PM - 10 PM' },
    { days: 'Friday', hours: 'Closed' },
  ],
}
