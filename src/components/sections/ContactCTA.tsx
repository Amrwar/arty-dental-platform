import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import { clinic } from '@/data/clinic'
import { formatPhone, telHref } from '@/lib/contact'

/** The closing ask, on the home page and at the foot of the services page. */
export default function ContactCTA() {
  return (
    <Section background="gradient" padding="lg">
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-accent-teal/20 rounded-full blur-3xl" />
        <h2 className="text-display-md text-navy-900 mb-6 relative">
          Ready to Transform Your Smile?
        </h2>
        <p className="text-body-lg text-navy-600 mb-8 max-w-2xl mx-auto">
          Schedule your appointment today and take the first step towards the
          smile you have always wanted. New patients receive a complimentary
          consultation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button href="/contact" size="lg">
            Schedule Appointment
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href={telHref(clinic.phone)} variant="outline" size="lg">
            Call {formatPhone(clinic.phone)}
          </Button>
        </div>
      </div>
    </Section>
  )
}
