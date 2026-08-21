import { Star } from 'lucide-react'

interface RatingProps {
  /** Whole stars to fill, 1 to 5. */
  value: number
  /** Total stars to draw; the rest are left empty. */
  outOf?: number
  className?: string
}

/**
 * A row of stars.
 *
 * Drawing only the filled ones, as the home page used to, makes a four-star
 * review look like a shorter row rather than a lower score. This draws the
 * whole row and fills what was earned.
 */
export default function Rating({ value, outOf = 5, className = '' }: RatingProps) {
  const filled = Math.max(0, Math.min(outOf, Math.round(value)))
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`${filled} out of ${outOf} stars`}
    >
      {Array.from({ length: outOf }).map((_, index) => (
        <Star
          key={index}
          className={
            index < filled
              ? 'w-5 h-5 fill-accent-gold text-accent-gold'
              : 'w-5 h-5 text-navy-200'
          }
        />
      ))}
    </div>
  )
}
