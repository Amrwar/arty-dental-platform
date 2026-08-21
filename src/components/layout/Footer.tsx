import Link from 'next/link'
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'

import ClinicMark from '@/components/ui/ClinicMark'
import { clinic } from '@/data/clinic'
import {
  footerCompany,
  footerServices,
  legalNav,
  socialLinks,
} from '@/data/navigation'
import { formatPhone, mailtoHref, telHref } from '@/lib/contact'

const icons = { Facebook, Instagram, Twitter }

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <ClinicMark className="w-12 h-12 bg-white text-navy-800" />
              <div>
                <span className="font-display text-xl font-semibold">
                  {clinic.shortName}
                </span>
                <span className="block text-xs text-navy-300 tracking-widest uppercase">
                  Clinic
                </span>
              </div>
            </Link>
            <p className="text-navy-300 leading-relaxed mb-6">{clinic.tagline}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = icons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center text-navy-300 hover:bg-accent-teal hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Clinic</h4>
            <ul className="space-y-3">
              {footerCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Get in touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={clinic.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-navy-300 hover:text-white transition-colors group"
                >
                  <MapPin className="w-5 h-5 mt-0.5 text-accent-teal flex-shrink-0" />
                  <span>{clinic.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={telHref(clinic.phone)}
                  className="flex items-center gap-3 text-navy-300 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span>{formatPhone(clinic.phone)}</span>
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref(clinic.email)}
                  className="flex items-center gap-3 text-navy-300 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent-teal flex-shrink-0" />
                  <span>{clinic.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-navy-300">
                  <Clock className="w-5 h-5 mt-0.5 text-accent-teal flex-shrink-0" />
                  <div>
                    {clinic.openingHours.map((row) => (
                      <p key={row.days}>
                        {row.days}: {row.hours}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-navy-400">
            <p>
              © {year} {clinic.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
