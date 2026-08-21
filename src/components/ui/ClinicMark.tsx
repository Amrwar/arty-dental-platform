/**
 * The tooth mark used as the clinic's logo.
 *
 * The path was pasted into both the header and the footer, which meant the
 * two drifted apart the first time it was adjusted. Colours stay with the
 * caller through `className`, since the header sits on white and the footer
 * on navy.
 */

interface ClinicMarkProps {
  /** Sizing and colour, e.g. `w-12 h-12 bg-navy-800 text-white`. */
  className?: string
  /** Draws the small teal dot the header uses. */
  withPulse?: boolean
}

export default function ClinicMark({
  className = 'w-12 h-12 bg-navy-800 text-white',
  withPulse = false,
}: ClinicMarkProps) {
  return (
    <div className="relative">
      <div
        className={`rounded-2xl flex items-center justify-center transform transition-transform ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-7 h-7"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            d="M12 2C9.5 2 7.5 3.5 7 5.5C6.5 7.5 7 9 7 10C7 11 6.5 12 6 13C5 15 6 18 7 20C7.5 21 8 22 9 22C10 22 10.5 21.5 11 20.5C11.3 19.8 11.6 19 12 19C12.4 19 12.7 19.8 13 20.5C13.5 21.5 14 22 15 22C16 22 16.5 21 17 20C18 18 19 15 18 13C17.5 12 17 11 17 10C17 9 17.5 7.5 17 5.5C16.5 3.5 14.5 2 12 2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {withPulse && (
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-teal rounded-full animate-pulse-soft" />
      )}
    </div>
  )
}
