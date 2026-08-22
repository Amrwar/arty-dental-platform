'use client'

import { useEffect } from 'react'

import Button from '@/components/ui/Button'
import { clinic } from '@/data/clinic'
import { telHref } from '@/lib/contact'

/**
 * The last resort when a page throws.
 *
 * Someone hitting this may well be in pain and looking for a phone number,
 * so the number is on the page rather than behind another navigation.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-custom py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent-teal">
        Something went wrong
      </p>
      <h1 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
        This page did not load
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-navy-600">
        Try again in a moment. If you need an appointment now, call the clinic
        on {clinic.phone} and we will book you in over the phone.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button href={telHref(clinic.phone)} variant="outline">
          Call the clinic
        </Button>
      </div>
    </div>
  )
}
