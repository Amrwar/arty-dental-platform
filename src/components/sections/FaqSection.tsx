import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { faqs, type Faq } from '@/data/faqs'
import { serviceById } from '@/data/services'

interface FaqSectionProps {
  /** Show only the questions filed under this service, if given. */
  service?: string
  background?: 'white' | 'light'
}

/** The questions the front desk answers most often. */
export default function FaqSection({
  service,
  background = 'light',
}: FaqSectionProps) {
  const shown: Faq[] = service
    ? faqs.filter((faq) => faq.service === service)
    : faqs

  if (shown.length === 0) return null

  return (
    <Section background={background}>
      <SectionHeader
        label="Questions"
        title={
          service
            ? `About ${serviceById(service)?.title ?? 'this treatment'}`
            : 'Before you come in'
        }
      />
      <div className="max-w-3xl mx-auto divide-y divide-navy-100">
        {shown.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex items-center justify-between cursor-pointer list-none font-display text-lg font-semibold text-navy-900">
              {faq.question}
              <span className="ml-4 text-accent-teal transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-navy-600 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
