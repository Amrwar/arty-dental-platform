import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { clinic } from '@/data/clinic'
import { mailtoHref } from '@/lib/contact'

export const metadata = {
  title: 'Privacy Policy',
  description: `How ${clinic.name} handles the information you share with us.`,
}

const sections = [
  {
    heading: 'What we collect',
    body: 'When you book or enquire we take your name, phone number, email address and whatever you tell us about your reason for visiting. In the clinic we also keep the clinical notes, x-rays and treatment history that your care depends on.',
  },
  {
    heading: 'Why we hold it',
    body: 'Contact details are used to arrange and confirm appointments and to reach you about your treatment. Clinical records are kept because dentistry is a continuing relationship and the next visit depends on the last one.',
  },
  {
    heading: 'Who sees it',
    body: 'Your records are seen by the clinicians treating you and by the reception staff arranging your visits. We do not sell your details, and we do not pass them to anyone else except where a referral you have agreed to requires it, or where the law obliges us.',
  },
  {
    heading: 'How long we keep it',
    body: 'Clinical records are retained for as long as professional guidance requires. Enquiries that never became appointments are cleared once they are plainly no longer live.',
  },
  {
    heading: 'Your choices',
    body: 'You can ask what we hold about you, ask for a correction, or ask us to stop contacting you, at any time. Ask at reception or write to us and we will confirm what has been done.',
  },
]

export default function PrivacyPage() {
  return (
    <Section background="white" padding="lg">
      <SectionHeader
        label="Privacy"
        title="Privacy Policy"
        description={`How ${clinic.name} handles the information you share with us.`}
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
            Asking us about this
          </h2>
          <p className="text-navy-600 leading-relaxed">
            Write to{' '}
            <a
              href={mailtoHref(clinic.email, 'Privacy enquiry')}
              className="text-accent-teal font-semibold hover:underline"
            >
              {clinic.email}
            </a>{' '}
            and we will answer.
          </p>
        </div>
      </div>
    </Section>
  )
}
