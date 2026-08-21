import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { initials, slugify } from '@/lib/text'

import { doctorBySlug, doctors, founder, specialties } from './doctors'

const PUBLIC_DIR = join(process.cwd(), 'public')

describe('the clinicians', () => {
  it('are listed at all', () => {
    expect(doctors.length).toBeGreaterThan(0)
  })

  it('are each named', () => {
    for (const doctor of doctors) {
      expect(doctor.name.trim().length).toBeGreaterThan(0)
    }
  })

  it('are named once each', () => {
    const names = doctors.map((doctor) => doctor.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('carry a slug that matches the name it was made from', () => {
    for (const doctor of doctors) {
      expect(doctor.slug).toBe(slugify(doctor.name.replace(/^Dr\.\s*/, '')))
    }
  })

  it('carry a slug each, used once', () => {
    const slugs = doctors.map((doctor) => doctor.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('state a role and a specialty', () => {
    for (const doctor of doctors) {
      expect(doctor.role.trim().length).toBeGreaterThan(0)
      expect(doctor.specialty.trim().length).toBeGreaterThan(0)
    }
  })

  it('have a photo path rooted in public', () => {
    for (const doctor of doctors) {
      expect(doctor.image.startsWith('/')).toBe(true)
    }
  })

  it('have a photo that is really on disk', () => {
    for (const doctor of doctors) {
      expect(existsSync(join(PUBLIC_DIR, doctor.image))).toBe(true)
    }
  })

  it('do not share a photo between two people', () => {
    const images = doctors.map((doctor) => doctor.image)
    expect(new Set(images).size).toBe(images.length)
  })

  it('have a biography long enough to be worth reading', () => {
    for (const doctor of doctors) {
      expect(doctor.bio.trim().length).toBeGreaterThan(80)
    }
  })

  it('end the biography as a sentence', () => {
    for (const doctor of doctors) {
      expect(doctor.bio.trim().endsWith('.')).toBe(true)
    }
  })

  it('list some training', () => {
    for (const doctor of doctors) {
      expect(doctor.education.length).toBeGreaterThan(0)
    }
  })

  it('never repeat a line of training', () => {
    for (const doctor of doctors) {
      expect(new Set(doctor.education).size).toBe(doctor.education.length)
    }
  })

  it('give initials that fit an avatar', () => {
    for (const doctor of doctors) {
      expect(initials(doctor.name)).toHaveLength(2)
    }
  })
})

describe('doctorBySlug', () => {
  it('finds a clinician', () => {
    expect(doctorBySlug('maie-magdy')?.name).toBe('Dr. Maie Magdy')
  })

  it('is undefined for someone who does not work here', () => {
    expect(doctorBySlug('nobody')).toBeUndefined()
  })
})

describe('specialties', () => {
  it('names each specialty once', () => {
    const list = specialties()
    expect(new Set(list).size).toBe(list.length)
  })

  it('covers every clinician', () => {
    for (const doctor of doctors) {
      expect(specialties()).toContain(doctor.specialty)
    }
  })
})

describe('the founder', () => {
  it('is named, with the role he holds', () => {
    expect(founder.name.trim().length).toBeGreaterThan(0)
    expect(founder.role.trim().length).toBeGreaterThan(0)
  })

  it('names a specialty worth printing', () => {
    expect(founder.specialty.trim().length).toBeGreaterThan(0)
  })

  it('has a photo that is really on disk', () => {
    expect(existsSync(join(PUBLIC_DIR, founder.image))).toBe(true)
  })

  it('does not borrow a photo from one of the clinicians', () => {
    expect(doctors.some((doctor) => doctor.image === founder.image)).toBe(false)
  })

  it('has a biography that ends as a sentence', () => {
    expect(founder.bio.trim().endsWith('.')).toBe(true)
  })

  it('is not duplicated in the clinician list', () => {
    expect(doctors.some((doctor) => doctor.name === founder.name)).toBe(false)
  })
})
