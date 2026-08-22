# Arty Dental Clinic

The clinic's website: services, the dentists, a gallery of work, opening
hours and an appointment request form. Next.js 14 on the App Router, styled
with Tailwind, rendered statically.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build; every route prerenders |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint, on the Next core-web-vitals rules |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest, watching |
| `npm run test:run` | Vitest, once |

CI runs lint, typecheck, tests and the build on every push and pull request
against `main`.

## How the source is arranged

```
src/
├── app/                  routes; each folder with a page.tsx is one
│   ├── layout.tsx        shell, site metadata, local-business markup
│   ├── icon.svg          favicon
│   ├── manifest.ts       web app manifest
│   ├── robots.ts         robots.txt
│   ├── sitemap.ts        sitemap.xml
│   ├── loading.tsx       skeleton shown between navigations
│   └── error.tsx         last resort when a page throws
├── components/
│   ├── layout/           navbar and footer
│   ├── sections/         the blocks pages are assembled from
│   ├── seo/              structured-data rendering
│   └── ui/               buttons, cards, badges, form errors
├── data/                 the clinic's own content, typed
└── lib/                  the logic, with the tests beside it
```

Nothing under `data/` is fetched — the clinic's details, services, dentists,
testimonials and questions are typed content, imported directly. The rule
that keeps this manageable is that a fact is written once: the phone number,
the address and the opening hours live in `data/clinic.ts` and everything
else derives from them, including the schema.org markup and the appointment
slots the booking form offers.

## The logic worth knowing about

- **`lib/hours.ts`** reads the published opening hours — which days a row
  covers, whether it says closed, and the times on a 24-hour clock.
- **`lib/availability.ts`** turns those hours into appointment slots for a
  given date. Friday offers none, because the clinic is shut.
- **`lib/booking.ts`** validates an appointment request, reporting every
  fault at once rather than one per submission.
- **`lib/seo.ts`** and **`lib/jsonld.ts`** build the canonical URLs, the
  sitemap routes and the structured data.

## Tests

Vitest, in a node environment, with each suite next to what it covers:

```bash
npm run test:run
```

They cover the logic rather than the markup. Two of them are guards rather
than unit tests: one checks the sitemap against the route folders that
actually exist on disk, and one checks the opening-hours markup never names
a day twice.

## Design notes

Navy `#0a1f44` through `#1e3a5f` carries the brand, teal `#00a5a8` marks
anything actionable, and gold `#c9a86c` is used sparingly. Headings are
Playfair Display, body text DM Sans; both are pulled in from `globals.css`.
Cards are rounded at `1.5rem` and sections share a single `Section` wrapper
so vertical rhythm stays consistent.
