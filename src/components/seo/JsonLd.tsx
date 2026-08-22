interface JsonLdProps {
  /** Anything that survives `JSON.stringify`; the schema.org builders do. */
  data: unknown
}

/**
 * A block of structured data.
 *
 * Rendered on the server, so a crawler sees it in the page source without
 * running any of our JavaScript. The `<` is escaped because a `</script>`
 * appearing inside the data would otherwise close this element early.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\u003c'),
      }}
    />
  )
}
