import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import Rating from '@/components/ui/Rating'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'

/** What patients said, with the treatment each of them came in for. */
export default function TestimonialsSection() {
  return (
    <Section background="white" id="testimonials">
      <SectionHeader
        label="Testimonials"
        title="What Our Patients Say"
        description="Do not just take our word for it. Here is what our patients have to say about their experience."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.name}
            className={`animate-slide-up stagger-${index + 1}`}
          >
            <Rating value={testimonial.rating} className="mb-4" />
            <p className="text-navy-700 mb-6 leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
              <Avatar name={testimonial.name} />
              <div>
                <p className="font-semibold text-navy-800">{testimonial.name}</p>
                <p className="text-sm text-navy-500">{testimonial.treatment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
