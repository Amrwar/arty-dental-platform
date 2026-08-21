import { ArrowRight } from 'lucide-react'

import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { doctors } from '@/data/doctors'

/** A short introduction to the clinicians, linking on to the full page. */
export default function DoctorsPreview() {
  return (
    <Section background="white">
      <SectionHeader
        label="Our team"
        title="The people who will treat you"
        description="Three specialists, each seeing patients in their own field rather than referring them out."
      />
      <div className="grid md:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => (
          <Card
            key={doctor.slug}
            className={`text-center animate-slide-up stagger-${index + 1}`}
          >
            <Avatar
              name={doctor.name}
              src={doctor.image}
              className="w-24 h-24 mx-auto mb-4"
            />
            <h3 className="font-display text-xl font-semibold text-navy-900 mb-1">
              {doctor.name}
            </h3>
            <p className="text-accent-teal text-sm font-medium mb-3">
              {doctor.specialty}
            </p>
            <p className="text-navy-600 text-sm leading-relaxed">{doctor.role}</p>
          </Card>
        ))}
      </div>
      <div className="text-center mt-12">
        <Button href="/doctors" variant="outline" size="lg">
          Meet the team
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </Section>
  )
}
