/**
 * The clinicians, and the founder the clinic is built around.
 *
 * `image` points at a file under `public/`, and a test checks that each one
 * is really there - a renamed photo is otherwise a broken face on the page
 * that nobody sees until a patient does.
 */

export interface Doctor {
  /** Stable key for lists and anchors, derived from the name. */
  slug: string
  name: string
  role: string
  specialty: string
  /** Path under `public/`, so it begins with a slash. */
  image: string
  bio: string
  education: string[]
  awards: string[]
}

export const doctors: Doctor[] = [
  {
    slug: 'mohammed-e-moussa',
    name: 'Dr. Mohammed E. Moussa',
    role: 'Content Director & General Dentist',
    specialty: 'General Dentistry',
    image: '/doctors/doc_mohammed_EMoussa.avif',
    bio: 'Dr. Mohammed E. Moussa leads Arty Dental Clinic with a commitment to excellence and patient education. With international training and a dedication to staying current with the latest dental advancements, he provides comprehensive general dentistry services with a focus on preventive care and patient comfort.',
    education: [
      'National Dental Examining Board of Canada Candidate',
      'Continuing Education, Harvard Medical School',
      'General Dentistry Practice',
    ],
    awards: ['International Training', 'Patient Education'],
  },
  {
    slug: 'maie-magdy',
    name: 'Dr. Maie Magdy',
    role: 'Endodontics Specialist',
    specialty: 'Root Canal Treatment',
    image: '/doctors/Dr__Maie_Magdy.avif',
    bio: 'Dr. Maie Magdy is a skilled Endodontics Specialist dedicated to saving teeth through expert root canal therapy. As an Assistant Lecturer at Future University in Egypt, she combines clinical excellence with academic knowledge, ensuring patients receive the most advanced and pain-free endodontic treatments available.',
    education: [
      'Endodontics Specialist',
      'Asst. Lecturer of Endodontics, FUE',
      'Advanced Root Canal Techniques',
    ],
    awards: ['Academic Excellence', 'Pain-Free Treatment'],
  },
  {
    slug: 'salwa-naguib',
    name: 'Dr. Salwa Naguib',
    role: 'Pedodontics Specialist',
    specialty: 'Children Dentistry',
    image: '/doctors/Dr__Salwa_Naguib.avif',
    bio: 'Dr. Salwa Naguib specializes in pediatric dentistry, creating positive dental experiences for children of all ages. With a gentle approach and child-friendly techniques, she helps young patients develop healthy dental habits that last a lifetime, making every visit comfortable and even fun.',
    education: [
      'Pedodontics Specialist',
      'Child Psychology in Dentistry',
      'Preventive Pediatric Care',
    ],
    awards: ['Child-Friendly Care', 'Gentle Approach'],
  },
]

/**
 * The founder, kept apart from the list because both the doctors page and
 * the about page lead with him rather than showing him as one card among
 * several.
 */
export const founder: Doctor = {
  slug: 'mohamed-m-dohiem',
  name: 'Prof. Dr. Mohamed M. Dohiem',
  role: 'Founder & CEO',
  specialty: 'Prosthodontics & Implantology',
  image: '/doctors/main_doctor_2.avif',
  bio: 'Prof. Dr. Mohamed M. Dohiem is the visionary founder and CEO of Arty Dental Clinic. As a leading consultant in Prosthodontics and Implantology, he brings world-class expertise and international standards to every patient interaction. His commitment to excellence and innovation has established Arty Dental as a premier destination for advanced dental care.',
  education: [
    'Consultant in Prosthodontics & Implantology',
    'Lecturer of Prosthodontics & Implantology, FUE',
    'Member, German Society of Oral Implantology (DGOI)',
    'Member, International Congress of Oral Implantologists (ICOI)',
  ],
  awards: ['DGOI Member', 'ICOI Member'],
}

/** The founder and the clinicians together, for anything that lists everyone. */
export function everyone(): Doctor[] {
  return [founder, ...doctors]
}

/** One clinician by slug. */
export function doctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.slug === slug)
}

/** The specialties on offer, each named once. */
export function specialties(): string[] {
  return Array.from(new Set(doctors.map((doctor) => doctor.specialty)))
}
