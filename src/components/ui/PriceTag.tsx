import Badge from '@/components/ui/Badge'
import { parsePrice } from '@/lib/pricing'

interface PriceTagProps {
  /** A catalogue price, e.g. `From $75`. */
  label: string
  /** Passed through to the badge it renders in. */
  tone?: 'teal' | 'gold' | 'navy' | 'mint'
  className?: string
}

/**
 * A price, with the "from" said quietly.
 *
 * Showing `From $75` at one weight reads as the price; separating the two
 * makes it clear the figure is where the treatment starts.
 */
export default function PriceTag({
  label,
  tone = 'teal',
  className = '',
}: PriceTagProps) {
  const price = parsePrice(label)

  if (!price) {
    return (
      <Badge tone={tone} className={className}>
        {label}
      </Badge>
    )
  }

  return (
    <Badge tone={tone} className={className}>
      {price.from && <span className="text-xs opacity-70">From</span>}
      <span className="font-semibold">
        {price.currency}
        {price.amount.toLocaleString('en-US')}
      </span>
    </Badge>
  )
}
