import { AlertCircle } from 'lucide-react'

interface FieldErrorProps {
  /** The message, or nothing when the field is fine. */
  message?: string
  /** Matches the field's `aria-describedby`. */
  id: string
}

/**
 * The message under a form field that failed validation.
 *
 * It renders nothing at all when there is no message, so a field that is
 * fine does not leave an empty element for a screen reader to announce.
 */
export default function FieldError({ message, id }: FieldErrorProps) {
  if (!message) return null

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-sm text-red-600"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  )
}
