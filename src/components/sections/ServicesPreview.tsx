import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { serviceHref, services } from '@/data/services'

/** How many treatments the home page previews before sending you on. */
const PREVIEW_COUNT = 3

/**
 * The taster on the home page. It reads the same catalogue `/services`
 * renders, so a treatment that is renamed is renamed in both places and the
 * "Learn more" link lands on the right section rather than the top of the page.
 */
export default function ServicesPreview() {
  return (
    <Section background="light" id="services-preview">
      <SectionHeader
        label="Our Services"
        title="Comprehensive Dental Care"
        description="From routine checkups to advanced procedures, we offer a full range of dental services to keep your smile healthy and beautiful."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {services.slice(0, PREVIEW_COUNT).map((service, index) => (
          <Card
            key={service.id}
            padding="none"
            className={`overflow-hidden animate-slide-up stagger-${index + 1}`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover gallery-img"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">
                {service.title}
              </h3>
              <p className="text-navy-600 mb-4">{service.description}</p>
              <Button href={serviceHref(service.id)} variant="ghost" size="sm">
                Learn More <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button href="/services" size="lg">
          View All Services
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </Section>
  )
}
