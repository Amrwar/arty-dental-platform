import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { clinic } from '@/data/clinic'
import { formatPhone, telHref } from '@/lib/contact'

export const metadata = {
  title: 'Terms of Service',
  description: `The terms on which ${clinic.name} books and provides treatment.`,
}

const sections = [
  {
    heading: 'Appointments',
    body: 'A booking holds a named slot with a named clinician. Arriving late may mean the work planned for that slot no longer fits, in which case we will do what the remaining time allows and rebook the rest.',
  },
  {
    heading: 'Cancellations',
    body: 'Let us know at least twenty-four hours ahead and the slot can be offered to someone else. Repeated missed appointments without notice may mean we ask for the slot to be confirmed by phone in future.',
  },
  {
    heading: 'Estimates and fees',
    body: 'Prices shown on this site are starting points, not quotations. You are given a written estimate for your own treatment before it begins, and it stands unless the treatment plan itself changes and you agree to the change.',
  },
  {
    heading: 'Emergencies',
    body: 'Same-day slots are held back for pain, swelling and broken teeth. They are allocated by clinical need rather than by order of calling.',
  },
  {
    heading: 'This website',
    body: 'The material here describes the treatments we offer. It is general information about dentistry and not advice about your own teeth, which needs an examination first.',
  },
]

export default function TermsPage() {
  return (
    <Section background="white" padding="lg">
      <SectionHeader
        label="Terms"
        title="Terms of Service"
        description={`The terms on which ${clinic.name} books and provides treatment.`}
      />
      <div className="max-w-3xl mx-auto space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-2xl font-semibold text-navy-900 mb-3">
              {section.heading}
            </h2>
            <p className="text-navy-600 leading-relaxed">{section.body}</p>
          </div>
        ))}
        <div className="border-t border-navy-100 pt-8">
          <h2 className="font-display text-2xl font-semibold text-navy-900 mb-3">
            Questions
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Call the clinic on{' '}
            <a
              href={telHref(clinic.phone)}
              className="text-accent-teal font-semibold hover:underline"
            >
              {formatPhone(clinic.phone)}
            </a>{' '}
            and we will talk it through.
          </p>
        </div>
      </div>
    </Section>
  )
}
