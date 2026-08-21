interface BadgeProps {
  children: React.ReactNode
  tone?: 'teal' | 'gold' | 'navy' | 'mint'
  className?: string
}

/** A small pill for a label, a price or a specialty. */
export default function Badge({
  children,
  tone = 'teal',
  className = '',
}: BadgeProps) {
  const tones = {
    teal: 'bg-accent-mint text-accent-teal',
    gold: 'bg-amber-50 text-amber-700',
    navy: 'bg-navy-100 text-navy-700',
    mint: 'bg-accent-mint text-navy-700',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
