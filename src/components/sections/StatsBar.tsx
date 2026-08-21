import Section from '@/components/ui/Section'
import { stats } from '@/data/testimonials'

/** The figures band. */
export default function StatsBar() {
  return (
    <Section background="navy">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center animate-slide-up stagger-${index + 1}`}
          >
            <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              {stat.value}
            </p>
            <p className="text-navy-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
