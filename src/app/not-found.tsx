import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import { clinic } from '@/data/clinic'
import { primaryNav } from '@/data/navigation'
import { formatPhone, telHref } from '@/lib/contact'

export const metadata = {
  title: `Page not found | ${clinic.name}`,
}

export default function NotFound() {
  return (
    <Section background="light" padding="lg">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent-teal text-sm font-semibold tracking-widest uppercase mb-3">
          404
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
          We could not find that page
        </h1>
        <p className="text-navy-600 leading-relaxed mb-8">
          The link may be out of date. Everything on the site is one of these,
          or you can call the clinic on{' '}
          <a
            href={telHref(clinic.phone)}
            className="text-accent-teal font-semibold hover:underline"
          >
            {formatPhone(clinic.phone)}
          </a>
          .
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {primaryNav.map((link) => (
            <Button key={link.href} href={link.href} variant="outline" size="sm">
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </Section>
  )
}
