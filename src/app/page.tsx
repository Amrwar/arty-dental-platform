import ContactCTA from '@/components/sections/ContactCTA'
import FeatureStrip from '@/components/sections/FeatureStrip'
import Hero from '@/components/sections/Hero'
import ServicesPreview from '@/components/sections/ServicesPreview'
import StatsBar from '@/components/sections/StatsBar'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ServicesPreview />
      <StatsBar />
      <TestimonialsSection />
      <ContactCTA />
    </>
  )
}
