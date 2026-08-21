/**
 * The questions the front desk answers most often.
 *
 * Kept as data so the contact page and the services page can show the same
 * answers without either drifting from the other.
 */

export interface Faq {
  question: string
  answer: string
  /** Which service section this belongs under, if any. */
  service?: string
}

export const faqs: Faq[] = [
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer:
      'Walk-ins are seen when there is a gap, but the evening hours fill quickly. Calling ahead means you are seen at a time rather than after one.',
  },
  {
    question: 'What happens in a first visit?',
    answer:
      'An examination, any x-rays that are needed, and a written plan with costs before anything is booked. Nothing is treated on the first visit unless you are in pain.',
    service: 'general',
  },
  {
    question: 'Is a root canal painful?',
    answer:
      'The procedure is done under local anaesthetic and most patients describe it as no worse than a filling. The pain people remember is usually the infection that brought them in.',
    service: 'orthodontics',
  },
  {
    question: 'How early should a child first see a dentist?',
    answer:
      'Around the first birthday, or whenever the first teeth appear. Early visits are short and are mostly about making the chair familiar.',
    service: 'pediatric',
  },
  {
    question: 'Do you see emergencies outside opening hours?',
    answer:
      'Call the clinic number for anything urgent. Same-day slots are kept back for pain, swelling and broken teeth.',
    service: 'emergency',
  },
  {
    question: 'How long do implants last?',
    answer:
      'A well-placed implant is a permanent fixture, and the crown on top is usually replaced once in a couple of decades. Both depend on keeping the gum healthy.',
    service: 'implants',
  },
]

/** The questions filed under one service. */
export function faqsForService(serviceId: string): Faq[] {
  return faqs.filter((faq) => faq.service === serviceId)
}

/** The questions that belong to no particular treatment. */
export function generalFaqs(): Faq[] {
  return faqs.filter((faq) => faq.service === undefined)
}
