import { Clock } from 'lucide-react'

import { clinic } from '@/data/clinic'
import { isClosed } from '@/lib/hours'

interface OpeningHoursCardProps {
  className?: string
}

/**
 * The published schedule.
 *
 * Closed days are shown rather than left out - somebody who does not see
 * Friday assumes the clinic is open on it.
 */
export default function OpeningHoursCard({
  className = '',
}: OpeningHoursCardProps) {
  return (
    <div className={`bg-navy-50 rounded-3xl p-6 md:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-accent-mint rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-accent-teal" />
        </div>
        <h3 className="font-display text-xl font-semibold text-navy-900">
          Opening hours
        </h3>
      </div>
      <dl className="space-y-3">
        {clinic.openingHours.map((row) => (
          <div key={row.days} className="flex items-baseline justify-between gap-4">
            <dt className="text-navy-700">{row.days}</dt>
            <dd
              className={
                isClosed(row) ? 'text-navy-400' : 'text-navy-900 font-medium'
              }
            >
              {row.hours}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
