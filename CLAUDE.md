# NXG Media — Project Guide for Claude Code

## What this is

NXG Media (nxg-media.com) is a marketing agency website built with Astro + Tailwind CSS. It serves two audiences:
1. **Coaches & experts** — online growth systems (Coach Accelerator)
2. **Local practices & SMBs** — AI visibility audits

The site is trilingual: Dutch (default), English, Spanish.

## Tech stack

- **Framework:** Astro 5.x (static SSG)
- **Styling:** Tailwind CSS with custom design tokens
- **Content:** Astro Content Collections with Zod schemas (YAML + Markdown)
- **Images:** Astro `<Image>` component, all source images as `.webp` in `src/assets/images/`
- **Fonts:** Self-hosted Playfair Display + Inter Variable (woff2, preloaded)
- **Analytics:** GA4 + Meta Pixel (consent-gated via CookieConsent)
- **Email:** MailerLite (configurable via `siteConfig.newsletter.provider`)
- **Payments:** Plug & Pay (external checkout links)
- **Scheduling:** Calendly (lazy-loaded via IntersectionObserver)

## Key directories

```
src/
  assets/images/       # Source images (Astro optimizes these)
    Founder/           # Joost photos (capital F on disk)
    cases/             # Case study screenshots
    logos/             # Client logos
    products/          # Product cover images
    testimonials/      # Video testimonial thumbnails
  components/          # Astro components
  content/             # Content collections (services, cases, guides, products)
  data/                # TypeScript data (site config, schema, navigation, testimonials)
    clusters/          # Cluster YAML configs
    schema.ts          # All Schema.org generators
    site.ts            # Central site configuration
    navigation.ts      # Nav items per locale
  i18n/                # Translations and locale utilities
    ui.ts              # UI string translations (nl/en/es)
    hreflang.ts        # Hreflang tag builders
    routes.ts          # Route segment translations
    utils.ts           # localizePath, getCollectionBasePath, t()
  layouts/             # Page layouts (Base, Service, Case, ClusterHub)
  pages/               # File-based routing
    en/                # English pages
    es/                # Spanish pages
    diensten/          # NL service detail pages (dynamic [slug])
  styles/global.css    # Tailwind base + font-face
  docs/                # Architecture docs and execution protocol
public/
  fonts/               # Self-hosted font files
  videos/              # Static video files
  llms.txt             # AI-readable site map (manually maintained)
  robots.txt           # Crawler directives
```

## Critical configuration

| File | What it controls |
|---|---|
| `astro.config.mjs` | Site domain (`https://nxg-media.com`), sitemap i18n (`nl`/`en`/`es`), trailing slash |
| `src/data/site.ts` | Brand name, tagline, founder data, socials, legal info, analytics IDs |
| `src/data/schema.ts` | All Schema.org structured data generators |
| `src/data/navigation.ts` | Main nav items per locale |
| `src/i18n/ui.ts` | All UI translation strings |

## Brand identity

- **Primary:** `#1F4E5F` (dark teal)
- **Accent:** `#C17B5A` (warm copper)
- **Background:** `#F5EFE6` (warm cream)
- **Fonts:** Playfair Display (headings), Inter (body)

## Localization rules

- Dutch is the default locale (routes without prefix: `/over-joost/`)
- English uses `/en/` prefix: `/en/about-joost/`
- Spanish uses `/es/` prefix: `/es/sobre-joost/`
- Locale-keyed data in `siteConfig` uses `{ nl: ..., en: ..., es: ... }` objects
- Route translation: use `getCollectionBasePath()` for translated slugs, `localizePath()` for prefix-only
- All three locales must have parity: same nav items, same page sections, same schema types

## Schema.org types in use

| Type | Where | Generator |
|---|---|---|
| Organization | Homepage | `generateOrganization()` — includes contactPoint, address, sameAs |
| Person | Homepage, About | `generateFounderPerson(locale)` — locale-aware description/knowsAbout |
| WebSite | Homepage | `generateWebSite(locale)` |
| Service | Service detail pages | `generateService()` — includes areaServed |
| HowTo | Service detail pages | `generateHowTo()` — from method steps |
| FAQPage | Homepage, service pages | `generateFAQPage()` |
| Product | Product pages | `generateProduct()` — with Offer, AggregateRating, Review |
| BreadcrumbList | All non-home pages | `generateBreadcrumbs()` |
| BlogPosting | Guide/article pages | `generateArticle()` |
| VideoObject | Video testimonial carousel | Inline in VideoTestimonialCarousel.astro |
| ProfilePage | About pages | `generateProfilePage()` |
| CollectionPage | Index/list pages | `generateCollectionPage()` |

## Trading names

Marketing met Joost is onderdeel van NXG-Media. KVK 78318122. This is displayed in the footer.

## Build & deploy

```bash
npm run build    # Production build (static)
npm run dev      # Dev server with HMR
```

Build target: 66 pages, ~4s. No warnings expected (glob-loader duplicate ID warnings are pre-existing and harmless).

## Content architecture docs

- `docs/architecture/EXPERT_BRAND_TEMPLATE_BRIEFING_V2.md` — The expert.md rules: copy rules, page structure, AI citation slots, FAQ rules
- `docs/architecture/CLUSTER_ARCHITECTURE_V1.2.md` — Cluster system design
- `src/docs/EXECUTION_PROTOCOL.md` — Build protocol with hard-won lessons from this project

## Hard rules

1. **Never start FAQ answers with "Yes", "No", "It depends", or a pronoun** — first sentence must be standalone and citable (expert.md §21)
2. **H2 first sentences must start with a topic noun** — not "Dit is", "It's", "We" (expert.md §13)
3. **Cookie consent must gate ALL tracking scripts** — GA4 and Meta Pixel load only after consent
4. **Calendly loads via IntersectionObserver** — never on page render
5. **Never run `npm audit fix --force`** — breaks Astro across major versions
6. **Homepage section parity** — all three locales must have the same sections
7. **About page requires 10 sections** per expert.md §8
8. **`llms.txt` must match actual routes** — verify after any route changes
