/**
 * Turning the clinic's contact details into the links a browser understands.
 *
 * The numbers are stored once, dialable, in `data/clinic`. Everything a
 * visitor actually sees or taps is derived here, so a number that changes
 * changes in exactly one place.
 */

/** Strips a number down to its digits, keeping a leading `+` if it had one. */
export function normalisePhone(phone: string): string {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')
  return trimmed.startsWith('+') ? `+${digits}` : digits
}

/**
 * The on-screen spelling of a number: `+20 100 384 3828`.
 *
 * Egyptian mobiles are twelve digits with the country code, and read as
 * three, three, then four. Anything that is not one of those is handed
 * back untouched rather than mangled into a shape it does not have.
 */
export function formatPhone(phone: string): string {
  const digits = normalisePhone(phone).replace(/^\+/, '')
  if (digits.length === 12 && digits.startsWith('20')) {
    const national = digits.slice(2)
    return `+20 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`
  }
  return phone
}

/** `tel:` link for a phone number. */
export function telHref(phone: string): string {
  return `tel:${normalisePhone(phone)}`
}

/** `mailto:` link, with an optional pre-filled subject. */
export function mailtoHref(email: string, subject?: string): string {
  const address = email.trim()
  if (!subject) return `mailto:${address}`
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`
}

/**
 * WhatsApp deep link. wa.me wants the number without a `+` and without
 * spaces, and refuses anything else.
 */
export function whatsappHref(phone: string, message?: string): string {
  const digits = normalisePhone(phone).replace(/^\+/, '')
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/**
 * Whether an address is plausible enough to publish.
 *
 * Deliberately not a full grammar - it catches the mistakes that actually
 * happen when someone edits the data file: a missing `@`, a domain with no
 * dot, stray spaces.
 */
export function isPublishableEmail(email: string): boolean {
  if (email !== email.trim() || /\s/.test(email)) return false
  const parts = email.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (local.length === 0 || domain.length === 0) return false
  if (!domain.includes('.')) return false
  return !domain.startsWith('.') && !domain.endsWith('.')
}
