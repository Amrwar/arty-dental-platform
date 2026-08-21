'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'

import Button from '@/components/ui/Button'
import ClinicMark from '@/components/ui/ClinicMark'
import { clinic } from '@/data/clinic'
import { primaryNav } from '@/data/navigation'
import { formatPhone, telHref } from '@/lib/contact'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ClinicMark
              className="w-12 h-12 bg-navy-800 text-white group-hover:scale-105 group-hover:rotate-3"
              withPulse
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl font-semibold text-navy-800">
                {clinic.shortName}
              </span>
              <span className="block text-xs text-navy-500 tracking-widest uppercase">
                Clinic
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-navy-700 font-medium transition-colors hover:text-navy-900 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-teal transition-all duration-300 group-hover:w-6" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={telHref(clinic.phone)}
              className="flex items-center gap-2 text-navy-600 hover:text-navy-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{formatPhone(clinic.phone)}</span>
            </a>
            <Button href="/contact">Book Appointment</Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-navy-800 hover:bg-navy-50 rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {isOpen && (
          <div className="lg:hidden mobile-menu-enter">
            <div className="mt-4 p-6 bg-white rounded-3xl shadow-xl border border-navy-100">
              <div className="space-y-1">
                {primaryNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-navy-700 font-medium rounded-xl hover:bg-navy-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-navy-100">
                <a
                  href={telHref(clinic.phone)}
                  className="flex items-center gap-3 px-4 py-3 text-navy-600"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{formatPhone(clinic.phone)}</span>
                </a>
                <div className="mt-4">
                  <Button href="/contact" fullWidth>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
