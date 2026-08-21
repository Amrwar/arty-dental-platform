import { ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Section from '@/components/ui/Section'
import PriceTag from '@/components/ui/PriceTag'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/data/services'


export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 hero-gradient pattern-overlay overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl animate-pulse-soft" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <span className="inline-block px-4 py-1.5 bg-accent-mint rounded-full text-accent-teal text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-display-lg text-navy-900 mb-6">
              Comprehensive Dental Care for{' '}
              <span className="text-gradient">Every Smile</span>
            </h1>
            <p className="text-body-lg text-navy-600 mb-8">
              From routine checkups to advanced procedures, we offer a full range of dental services using the latest technology and techniques.
            </p>
            <Button href="/contact" size="lg">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <Section background="white">
        <div className="space-y-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                </div>
                {/* Price Badge */}
                <div className="absolute -bottom-4 -right-4 bg-navy-800 text-white px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-sm text-navy-300">Starting</span>
                  <PriceTag label={service.price} tone="mint" />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <h2 className="text-display-sm text-navy-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-body-md text-navy-600 mb-8">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-navy-700"
                    >
                      <div className="w-6 h-6 bg-accent-mint rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-accent-teal" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button href="/contact">
                  Book This Service
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Insurance Section */}
      <Section background="light">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            label="Insurance & Payment"
            title="Flexible Payment Options"
            description="We accept most major insurance plans and offer flexible financing options to make dental care accessible to everyone."
          />

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">
                Insurance Accepted
              </h3>
              <p className="text-navy-600">
                We work with most major dental insurance providers to maximize your benefits.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">
                Payment Plans
              </h3>
              <p className="text-navy-600">
                Interest-free financing available with CareCredit and other providers.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-xl font-semibold text-navy-800 mb-2">
                Membership Plans
              </h3>
              <p className="text-navy-600">
                No insurance? Join our membership plan for discounted rates on all services.
              </p>
            </Card>
          </div>

          <Button href="/contact" size="lg">
            Contact Us for Details
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  )
}
