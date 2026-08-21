import { ArrowRight, Award, CheckCircle2, Star } from 'lucide-react'

import Button from '@/components/ui/Button'
import { founder } from '@/data/doctors'

/** The first screen: the promise, the two calls to action, and the founder. */
export default function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient pattern-overlay overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl animate-pulse-soft" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl animate-pulse-soft"
        style={{ animationDelay: '1s' }}
      />
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-card mb-6">
              <Award className="w-4 h-4 text-accent-gold" />
              <span className="text-sm font-medium text-navy-700">
                Award-Winning Dental Care
              </span>
            </span>
            <h1 className="text-display-lg text-navy-900 mb-6">
              Your Journey to a <span className="text-gradient">Perfect Smile</span>{' '}
              Starts Here
            </h1>
            <p className="text-body-lg text-navy-600 mb-8 max-w-lg">
              Experience exceptional dental care in a warm, welcoming environment.
              Our expert team combines cutting-edge technology with a gentle touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button href="/contact" size="lg">
                Book Your Visit
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-navy-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold text-navy-600"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-sm text-navy-600">
                  <span className="font-semibold">500+</span> 5-star reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up stagger-2">
            <div className="relative z-10">
              <div className="relative rounded-4xl overflow-hidden shadow-2xl">
                <img
                  src="/doctors/main_doctor_1.avif"
                  alt={`${founder.name} - Founder of Arty Dental Clinic`}
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-xl font-semibold">
                    {founder.name}
                  </p>
                  <p className="text-white/80 text-sm">
                    {founder.role} | {founder.specialty}
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent-mint rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-accent-teal" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">
                      {founder.awards.join(' & ')}
                    </p>
                    <p className="text-sm text-navy-500">International Standards</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full bg-navy-800 rounded-4xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
