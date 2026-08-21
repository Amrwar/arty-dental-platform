/**
 * What patients have said, and the numbers the home page leads with.
 *
 * Ratings are whole stars out of five; a test pins the range, because a
 * six-star review renders as a broken row rather than an error.
 */

export interface Testimonial {
  name: string
  treatment: string
  quote: string
  /** Whole stars, 1 to 5. */
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Nour A.',
    treatment: 'Root Canal Treatment',
    quote:
      'I had put off a root canal for two years because I was dreading it. Dr. Maie talked me through every step and I felt nothing. I wish I had come sooner.',
    rating: 5,
  },
  {
    name: 'Karim S.',
    treatment: 'Cosmetic Dentistry',
    quote:
      'The whitening and two veneers changed how I smile in photographs. They were honest about what would and would not suit my teeth, which I appreciated.',
    rating: 5,
  },
  {
    name: 'Mona F.',
    treatment: 'Pediatric Dentistry',
    quote:
      'My daughter is six and used to cry in waiting rooms. Dr. Salwa let her hold the mirror and count her own teeth. Now she asks when we are going back.',
    rating: 5,
  },
  {
    name: 'Ahmed T.',
    treatment: 'Dental Implants',
    quote:
      'A single implant, done over a few visits with no rush. Everything was explained before it happened and the cost never moved from the estimate.',
    rating: 4,
  },
]

export interface ClinicStat {
  label: string
  value: string
}

/** The figures the home page puts under the hero. */
export const stats: ClinicStat[] = [
  { label: 'Years of practice', value: '15+' },
  { label: 'Patients treated', value: '8,000+' },
  { label: 'Specialists', value: '3' },
  { label: 'Evening hours', value: '6 days' },
]

/** The average review, to one decimal place. */
export function averageRating(): number {
  if (testimonials.length === 0) return 0
  const total = testimonials.reduce((sum, entry) => sum + entry.rating, 0)
  return Math.round((total / testimonials.length) * 10) / 10
}
