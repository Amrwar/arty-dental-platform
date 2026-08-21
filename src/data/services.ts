/**
 * What the clinic treats.
 *
 * The `id` of each entry doubles as its anchor on `/services`, which is
 * what the footer and the home page link into. Renaming one without the
 * other is how the footer ended up pointing at sections that had never
 * existed, so the ids are the contract.
 */

export interface Service {
  /** Anchor on `/services`; also the key other pages link by. */
  id: string
  title: string
  description: string
  image: string
  features: string[]
  price: string
}

export const services: Service[] = [
  {
    id: 'general',
    title: 'General Dentistry',
    description:
      'Comprehensive preventive and restorative care to maintain your oral health.',
    image:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=500&fit=crop',
    features: [
      'Routine Dental Exams',
      'Professional Cleanings',
      'Dental Fillings',
      'Root Canal Therapy',
      'Tooth Extractions',
      'Gum Disease Treatment',
    ],
    price: 'From $75',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with our advanced aesthetic treatments.',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=500&fit=crop',
    features: [
      'Teeth Whitening',
      'Porcelain Veneers',
      'Dental Bonding',
      'Smile Makeovers',
      'Tooth Contouring',
      'Gum Reshaping',
    ],
    price: 'From $200',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description:
      'Straighten your teeth and correct bite issues for a healthier smile.',
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=500&fit=crop',
    features: [
      'Traditional Braces',
      'Clear Aligners',
      'Invisalign Treatment',
      'Retainers',
      'Early Orthodontics',
      'Adult Orthodontics',
    ],
    price: 'From $3,000',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description:
      'Permanent solutions for missing teeth that look and feel natural.',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=500&fit=crop',
    features: [
      'Single Tooth Implants',
      'Implant-Supported Bridges',
      'All-on-4 Implants',
      'Bone Grafting',
      'Sinus Lift Procedures',
      'Implant Restoration',
    ],
    price: 'From $1,500',
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    description: 'Gentle, kid-friendly dental care for your little ones.',
    image:
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&h=500&fit=crop',
    features: [
      "Children's Exams",
      'Fluoride Treatments',
      'Dental Sealants',
      'Space Maintainers',
      'Pediatric Crowns',
      'Habit Counseling',
    ],
    price: 'From $50',
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: '24/7 emergency dental services when you need them most.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=500&fit=crop',
    features: [
      'Same-Day Appointments',
      'Toothache Relief',
      'Broken Tooth Repair',
      'Lost Crown/Filling',
      'Dental Abscess Treatment',
      'Emergency Extractions',
    ],
    price: 'From $150',
  },
]

/** One service by its id, or undefined if nothing answers to that name. */
export function serviceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

/** The ids, in the order the page lays them out. */
export function serviceIds(): string[] {
  return services.map((service) => service.id)
}

/** The anchor a link should use to reach a service section. */
export function serviceHref(id: string): string {
  return `/services#${id}`
}
