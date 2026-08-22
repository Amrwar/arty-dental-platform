import Image from 'next/image'

import { initials } from '@/lib/text'

interface AvatarProps {
  /** The person's name; the initials are taken from it. */
  name: string
  /** A photo, if there is one. Falls back to the initials when absent. */
  src?: string
  className?: string
}

/**
 * A round portrait, or the person's initials when there is no photo.
 *
 * Both the testimonial cards and the doctors list were building this by
 * hand, and each did the initials slightly differently - one of them kept
 * the `Dr.` and rendered it as a `D`.
 */
export default function Avatar({ name, src, className = 'w-12 h-12' }: AvatarProps) {
  if (src) {
    return (
      <span className={`${className} relative inline-block shrink-0`}>
        <Image
          src={src}
          alt={name}
          fill
          sizes="96px"
          className="rounded-full object-cover object-top"
        />
      </span>
    )
  }

  return (
    <div
      className={`${className} bg-navy-100 rounded-full flex items-center justify-center text-navy-600 font-semibold`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
