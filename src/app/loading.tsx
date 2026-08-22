/**
 * Shown while a route segment is still being fetched.
 *
 * The pages are static, so this is mostly seen on a slow connection during
 * the first navigation. It mirrors the page rhythm - a heading block, then
 * cards - rather than showing a spinner in the middle of nothing.
 */
export default function Loading() {
  return (
    <div className="container-custom py-24" role="status" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="mx-auto max-w-xl space-y-4">
        <div className="h-4 w-32 mx-auto rounded-full bg-navy-100 animate-pulse" />
        <div className="h-10 rounded-2xl bg-navy-100 animate-pulse" />
        <div className="h-4 w-3/4 mx-auto rounded-full bg-navy-100 animate-pulse" />
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((card) => (
          <div
            key={card}
            className="h-64 rounded-3xl bg-navy-50 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
