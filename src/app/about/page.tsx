import { Award, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

import DoctorsPreview from '@/components/sections/DoctorsPreview'
import FaqSection from '@/components/sections/FaqSection'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { clinic } from '@/data/clinic'
import { doctors, founder } from '@/data/doctors'
import { stats } from '@/data/testimonials'
import { listSentence } from '@/lib/text'

export const metadata = {
  title: 'About',
  description: clinic.tagline,
}

const values = [
  {
    icon: HeartHandshake,
    title: 'Unhurried care',
    description:
      'Appointments are booked with room to answer questions. Nobody is moved through a chair to make a slot.',
  },
  {
    icon: ShieldCheck,
    title: 'Written estimates',
    description:
      'You see the plan and its cost before anything is booked, and the number does not move afterwards.',
  },
  {
    icon: Sparkles,
    title: 'Prevention first',
    description:
      'The cheapest treatment is the one avoided. Cleanings and check-ups get the same attention as the big work.',
  },
  {
    icon: Award,
    title: 'Specialists in house',
    description: `Endodontics, pedodontics and general practice under one roof, so referrals stay in the building.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <Section background="gradient" padding="lg">
        <SectionHeader
          label="About us"
          title={clinic.name}
          description={clinic.tagline}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-semibold text-navy-800">
                {stat.value}
              </p>
              <p className="text-sm text-navy-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section background="white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent-teal text-sm font-semibold tracking-widest uppercase">
              {founder.role}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3 mb-2">
              {founder.name}
            </h2>
            <p className="text-navy-500 mb-6">{founder.specialty}</p>
            <p className="text-navy-600 leading-relaxed">{founder.bio}</p>
          </div>
          <div className="bg-navy-50 rounded-3xl p-8 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-navy-900 mb-4">
              Who you will see
            </h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              The clinic is run by{' '}
              {listSentence(doctors.map((doctor) => doctor.name))}, covering{' '}
              {listSentence(
                Array.from(new Set(doctors.map((doctor) => doctor.specialty)))
              )}
              .
            </p>
            <Button href="/doctors" variant="outline">
              Meet the team
            </Button>
          </div>
        </div>
      </Section>

      <Section background="light">
        <SectionHeader
          label="How we work"
          title="What the clinic holds itself to"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title}>
              <value.icon className="w-10 h-10 text-accent-teal mb-4" />
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
                {value.title}
              </h3>
              <p className="text-navy-600 leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <DoctorsPreview />

      <FaqSection />
    </>
  )
}
