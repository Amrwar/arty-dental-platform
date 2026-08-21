import { Clock, Heart, Shield, Users } from 'lucide-react'

import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import { clinic } from '@/data/clinic'

/** The four reassurances under the hero. */
const features = [
  {
    icon: Shield,
    title: 'Safe & Sterile',
    description: 'State-of-the-art sterilization and safety protocols',
  },
  {
    icon: Heart,
    title: 'Gentle Care',
    description: 'Compassionate treatment for anxious patients',
  },
  {
    icon: Clock,
    title: 'Evening Hours',
    // Read off the published schedule, so the strip cannot advertise hours
    // the footer has since changed.
    description: clinic.openingHours
      .filter((row) => row.hours.toLowerCase() !== 'closed')
      .map((row) => `Open ${row.hours}, ${row.days}`)
      .join(' · '),
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Welcoming patients of all ages',
  },
]

export default function FeatureStrip() {
  return (
    <Section background="white" padding="md">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className={`text-center animate-slide-up stagger-${index + 1}`}
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-accent-mint rounded-2xl flex items-center justify-center">
              <feature.icon className="w-7 h-7 text-accent-teal" />
            </div>
            <h3 className="font-display font-semibold text-navy-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-navy-500">{feature.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
