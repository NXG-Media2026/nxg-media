# Fork & Adapt Execution Protocol

How Claude Code must work when adapting this template for a new client or niche.

Companion docs:
- `FORK_AND_ADAPT_PLAYBOOK.md` — what to change per client/niche
- `UNIVERSAL_VS_NICHE.md` — what's portable vs niche-specific
- `CLUSTER_ARCHITECTURE_V1.2.md` — cluster system design

---

## Non-negotiable rule

A successful `npm run build` is not a finished website.

A green build means **technical baseline complete**. It does not mean launch-ready, content-complete, legally compliant, visually polished, tracking-ready, or conversion-ready.

Never report "done" without qualifying the level of completion.

---

## Completion levels

After every major phase, report one of these statuses:

| Level | Meaning |
|---|---|
| `Architecture adapted` | Collections, routes, i18n, schema, clusters restructured. Build passes. Old niche references removed. |
| `Technical build complete` | All pages render. Layouts, components, data layer working. No runtime errors. |
| `Content draft complete` | Seed content in place. Placeholders clearly marked. No fake claims published. |
| `Asset integration complete` | Real images, logos, screenshots supplied and wired. No broken image paths. |
| `Legal/tracking complete` | Privacy, terms, cookie consent, analytics IDs, newsletter ESP, checkout URLs all live. |
| `Launch-ready` | Full launch-readiness audit passed. All blockers resolved. |

---

## Execution phases

### Phase 0 — Intake audit

Before writing any code, scan the brief and existing codebase. Produce a **required-input checklist** of everything the human must supply.

Categories:
- Brand assets (logo, favicon, OG image, founder photo, hero images)
- Business details (name, address, KVK/tax, email, phone)
- Case/proof assets (client names, logos, permission, screenshots)
- Legal content (privacy policy text, terms text, cookie preferences)
- CTA destinations (Calendly URL, scanner URL, checkout URLs)
- Tracking IDs (GA4, GSC, Meta Pixel, newsletter ESP credentials)
- Content (real case studies, real testimonials, real product descriptions)

Do not assume placeholder values are acceptable for launch. Flag them immediately.

Output format:

```
| Category | Item | Status | Blocking? | Needed from user |
```

### Phase 1 — Architecture adaptation

Adapt collections, routes, clusters, i18n, schema, navigation, data layer.

Definition of done:
- Build passes with 0 errors
- All routes exist for all configured locales
- No references to old niche (German routes, old brand names, old domain)
- Schema.org types match new niche
- i18n keys complete for all locales

### Phase 2 — Component adaptation

Adapt layouts and components. Delete obsolete files. Wire new conversion routes.

Definition of done:
- All layouts render with seed content
- Dead components removed (verified via import scan)
- Conversion flow works: Hero CTA → section → Calendly/checkout
- Footer links resolve
- Mobile CTA works

### Phase 3 — Content seeding

Seed real content where available, clear placeholders where not.

Definition of done:
- All pages render with no fake claims
- Placeholder content is visually distinguishable or explicitly listed
- Draft products show "Coming soon" badge with contact fallback
- No invented testimonials, case studies, or credentials

### Phase 4 — Post-build audit

After the first clean build, run three mandatory audits before any visual polish.

#### 4a. Brief compliance audit

Re-read the adapt brief section by section. For each requirement, verify:
- Is it implemented?
- Does it match the spec (not just "something exists")?
- Are edge cases handled (empty collections, draft products, missing locales)?

#### 4b. Missing-input audit

Produce a table of everything the human still needs to supply:

```
| Category | Missing item | Required for launch? | File path | Needed from user | Notes |
```

Categories: brand assets, founder images, hero images, case screenshots, client logos, business details, contact details, legal pages, privacy/cookies, CTA links, Calendly, scanner links, checkout URLs, newsletter provider, analytics IDs, consent/tracking, OG images, favicons, robots.txt, llms.txt, sitemap.

#### 4c. Placeholder report

Any value containing `TBD`, `placeholder`, `coming soon`, fake image paths, missing checkout URLs, dummy analytics IDs, or incomplete legal copy must be reported:

```
| File path | Placeholder value | Blocks launch? | Recommended replacement |
```

Do not continue to visual polish until all three audits are delivered.

### Phase 5 — Asset integration

Wire real images, logos, screenshots once the human supplies them.

Definition of done:
- No broken image paths
- OG image renders in social preview
- Favicon displays in browser tab
- Founder/team photos render on about page

### Phase 6 — Legal & tracking setup

Create or wire privacy, terms, cookie consent, analytics, newsletter, forms.

Definition of done:
- Privacy page exists for all locales (binding version in primary locale)
- Terms page exists
- Cookie consent mechanism active
- GA4 fires on page load (verify in browser devtools)
- Newsletter form submits to real ESP (or is removed)
- Product checkout URLs resolve (or products are hidden/marked draft)

### Phase 7 — Visual polish

Only after assets and legal are in place.

- Responsive check on mobile, tablet, desktop — all locales
- Font loading (no FOUT on real connection)
- Image lazy loading works
- Lighthouse mobile: target 95+ all categories
- No `console.error` in browser devtools

### Phase 8 — Final launch audit

Full launch-readiness check:

- [ ] All routes render (spot-check every locale)
- [ ] Schema validates (Rich Results Test on homepage + 1 service + 1 case)
- [ ] Sitemap entry count matches built page count
- [ ] robots.txt allows crawlers, includes sitemap directive
- [ ] llms.txt is curated and reachable
- [ ] hreflang/canonical correct (verify 1 page per locale)
- [ ] OG tags render in social preview tool
- [ ] Forms submit successfully
- [ ] CTAs link to correct destinations
- [ ] Legal pages linked from footer
- [ ] Analytics fires (GA4 realtime view)
- [ ] No placeholder values remain in production output

---

## Required output after every major phase

Every phase completion message must include:

1. **Changed files** — table of files created, modified, or deleted
2. **Build result** — page count, errors, warnings
3. **Known placeholders** — list of remaining placeholder values
4. **Missing user inputs** — what the human needs to supply next
5. **Completion level** — which level from the table above
6. **Next recommended action** — what should happen next

---

## Universal baseline assets

These are not optional for any site built from this template:

| Asset | Path | Purpose |
|---|---|---|
| robots.txt | `public/robots.txt` | Crawler directives + sitemap reference |
| llms.txt | `public/llms.txt` | Curated AI-readable site map |
| Sitemap | Auto-generated via `@astrojs/sitemap` | Search engine discovery |
| OG image | `public/images/og/default.jpg` | Social sharing fallback |
| Favicon | `public/favicon.svg` | Browser tab + bookmarks |
| Privacy page | Per-locale pages | GDPR compliance |
| Schema.org | Via `src/data/schema.ts` | Structured data for search + AI |

For sites that sell AI visibility services: `llms.txt` is a credibility baseline, not a nice-to-have. If you claim AI visibility expertise and your own site lacks `llms.txt`, that's incongruent.

---

## What "launch-ready" means

A site is launch-ready when:

1. `npm run build` passes with 0 errors, 0 warnings
2. All eight phases above are completed
3. The final launch audit checklist is fully ticked
4. No placeholder values remain in production output
5. The human has confirmed all business details, legal text, and assets
6. The deploy URL renders correctly on a real device

If any of these are not met, report the completion level honestly and list what's missing.

---

## Hard-won lessons (NXG Media build, May 2025)

These specific mistakes occurred during real builds and must be prevented in every future adaptation.

### Route translation: localizePath() vs getCollectionBasePath()

`localizePath('/privacy', 'es')` returns `/es/privacy` — it does NOT translate the URL segment.
For translated slugs (privacy → privacidad, voorwaarden → terms), use `getCollectionBasePath()` or `getRouteSegment()`.

**Affected areas:** Footer legal links, breadcrumbs, any cross-locale navigation.
**Validation:** Click every footer link in every language. If a legal page 404s, this is the cause.

When adding new route-translated paths, remember to:
1. Add the route key to `routeSegments` in `src/i18n/routes.ts`
2. Expand the `getCollectionBasePath()` type union in `src/i18n/utils.ts`
3. Use `getCollectionBasePath()` in Footer.astro, not `localizePath()`

### Cookie consent must gate ALL tracking scripts

Analytics and marketing scripts (GA4, Meta Pixel) must NOT appear in BaseLayout `<head>`.
They must load ONLY via the CookieConsent component AFTER the user clicks "Accept all".

Pattern:
- BaseLayout `<head>`: only `getTrackingScript()` (the `window.trackEvent` wrapper — fires to console, no external requests)
- CookieConsent: on accept, dynamically creates `<script>` elements for GA4 and Meta Pixel
- On reload: checks `localStorage` for prior consent before loading any tracking

If you find GA4 or Meta Pixel `<script>` tags in BaseLayout, that's a GDPR violation.

### Click-to-load for third-party embeds

Calendly, YouTube, Vimeo, and any other third-party widget must NOT load on page render.
Show a placeholder button. On click: remove the button, create the widget container, dynamically load the script.

CalendlyEmbed.astro pattern:
- Renders a `<button>` with calendar icon and locale-aware label
- On click: removes button, creates `.calendly-inline-widget` div, appends `<script src="assets.calendly.com/assets/external/widget.js">`

### NEVER run npm audit fix --force

`npm audit fix --force` upgrades Astro across major versions and breaks the build. The error looks like:
`require is not defined in ES module scope` at `tailwind.config.mjs`

Fix: `git checkout -- package.json package-lock.json && rm -rf node_modules && npm install`

Prevention: tell the human/VA explicitly that npm audit warnings are normal and should be ignored.

### Homepage language parity

Adding a section to one locale's homepage and forgetting the others is the #1 recurring regression across all builds.

After any homepage change, compare section counts across all locales. Each locale's homepage should have the same sections in the same order (translated, not identical).

### Content collection cache

Astro caches content collections in `node_modules/.astro/`. After adding a new collection or renaming one, the dev server may show 0 entries.

Fix: delete `node_modules/.astro/` and restart.

### Git worktree confusion

When working in `.claude/worktrees/<name>/`, all changes are local to the worktree. Changes must be committed AND pushed from the worktree. Running `git status` from the main project will not show worktree changes.

Before pushing to a new repo, always verify that all NXG Media / client-specific changes are committed (not just the original template code).

### Legal pages: binding version pattern

Privacy and Terms pages follow this pattern:
- Primary language: FULL legal text (this is the binding version)
- Secondary languages: summary/translation with a link back to the primary-language binding version

Example: `<a href="/voorwaarden/">/voorwaarden/</a>` from EN/ES terms pages.

### llms.txt is required for AI visibility businesses

If the business sells AI visibility services and its own site lacks `llms.txt`, that's a credibility gap. Treat it as a launch blocker, not a nice-to-have.

### llms.txt must match actual routes

The `public/llms.txt` file is manually maintained. When pages are renamed, routes change, or new pages are added, `llms.txt` URLs will silently go stale. After any route restructuring, verify every URL in `llms.txt` matches an actual built page.

Example mistake: `llms.txt` referenced `/expert-growth-accelerator/` but the actual page was `/coach-accelerator/`.

### astro.config.mjs site URL must match production domain

The `site` field in `astro.config.mjs` drives ALL canonical URLs, sitemap entries, and hreflang tags. When forking from another project, this is the #1 critical field to update. A wrong domain here makes the entire sitemap, all canonicals, and all OG URLs point to the wrong site — breaking SEO completely while the build still passes green.

Also update the `i18n` config inside the sitemap integration: `defaultLocale` and `locales` must match `siteConfig.locales`. The old docveri.de template used `de`/`en`; NXG Media uses `nl`/`en`/`es`.

### SEOHead.astro fallback locale

The OG locale fallback in `SEOHead.astro` was `de_DE` from the docveri.de template. When forking, change the fallback to match the new default locale (e.g., `nl_NL`).

### Hero images must have descriptive alt text

Background/hero images with `alt=""` are a common oversight. These images are the most prominent visual on the page and should have keyword-rich alt text describing what is shown, not empty strings. Each locale should have a locale-appropriate alt text.

### Navigation parity across locales

When NL has a nav item (e.g., "Producten"), EN and ES must also have the equivalent link. Missing nav items in one locale mean those pages are only reachable via direct URL — effectively orphaned for that locale's users.

### About page: expert.md §8 requires 10 sections

The About page is not a short bio + Calendly. Per expert.md §8, it requires: (1) Hero with positioning, (2) Origin story, (3) Client patterns, (4) Expert POV, (5) Professional background, (6) Expertise areas, (7) Method framework, (8) Personal lens, (9) Boundaries/disclaimer, (10) CTA. A thin About page is a critical audit finding.

### Breadcrumbs on all non-home pages

Every non-homepage should have both visual breadcrumbs (`BreadcrumbNav`) and a `BreadcrumbList` schema. Pages commonly missed: About, Contact, service landing pages.

### Service schema needs areaServed

The `generateService()` function should include `areaServed` with the countries the business serves. A bare Service schema (name + description + provider) misses geo-targeting signals.

### Organization schema needs ContactPoint and address

`generateOrganization()` should include `contactPoint` (email, phone, languages) and `address` (structured PostalAddress). These are required for local SEO and help AI systems provide accurate contact information.

### VideoObject uploadDate must be realistic

Hardcoded dates like `2025-01-01` for all videos signal low data quality to search engines. Each video should have an approximate real upload date.

### HowTo schema on service method steps

Service pages with step-by-step methods benefit from HowTo schema. This enables rich results for "how to" queries and makes the service methodology visible in SERP.

### FAQ expansion: 10 items per service

Per expert.md §21, major services should have 8-10 FAQ items covering conversion objections, trust/safety, and product clarity. Three items is too thin for AI citation and FAQ rich snippets.

### siteConfig founder data must be locale-keyed

Founder fields (bio, description, qualifications, knowsAbout) should be `{ nl: ..., en: ..., es: ... }` objects, not flat strings. All consumers (pages, schema.ts) must use `[locale]` access. Flat strings leak Dutch content into EN/ES pages.

### Image handling for SEO & AI visibility

Images are not decoration — they are structured data that AI crawlers and search engines index. Every image on the site must follow these rules. Do not wait for the human to ask; apply them by default on every build.

**Filenames**
- Descriptive, kebab-case, keyword-rich: `coach-josine-eetgids-resultaat.webp` not `IMG_3847.webp`
- Include the subject AND context: `joost-van-putten-founder-portrait.webp` not `portrait.webp`
- Never use generic names like `image1`, `screenshot`, `photo`, `banner`

**Alt text**
- Every image MUST have a meaningful `alt` attribute — this is how AI "sees" your images
- Describe WHAT is shown AND WHY it matters: `"Joost van Putten — founder NXG Media, bouwt online groeisystemen voor coaches"` not `"foto van Joost"`
- Product images: include product name + key benefit: `"AI Vindbaarheid Complete Kit — 3 praktische kits voor ChatGPT-zichtbaarheid"`
- Case screenshots: include client name + what is proven: `"Coach Josine — 600 eetgidsen verkocht in week 1, Plug & Pay dashboard"`
- Logo images: just the company name: `"Happy With Yoga"` or `"ANWB"`
- Decorative images (dividers, patterns): use `alt=""` with `aria-hidden="true"`

**Loading strategy**
- Above-the-fold images (hero, founder on about page, product cover): `loading="eager"`
- Everything else: `loading="lazy"` — this includes case screenshots, logo bars, footer images
- Never lazy-load the first visible image on a page — causes layout shift and hurts LCP

**Format & sizing**
- All images in `src/assets/images/` as WebP — Astro's `<Image>` component handles optimization
- Use `widths` + `sizes` for responsive images (hero, full-width): `widths={[400, 800, 1200]} sizes="100vw"`
- Use `width` + fixed dimensions for constrained images (logos, thumbnails)
- Source images must be at least as large as the largest `width` you specify — Astro does not upscale
- OG images stay in `public/images/og/` as JPG at 1200×630

**Schema.org image fields**
- Product schema: always include the `image` field with the product cover URL
- Person schema: always include the `image` field with the founder portrait URL
- Article/BlogPosting schema: include `image` if a featured image exists
- Use absolute URLs in schema: `https://domain.com/images/...`

**Checklist (apply on every build)**
- [ ] Every `<Image>` and `<img>` tag has a descriptive `alt`
- [ ] Above-the-fold images use `loading="eager"`, rest use `loading="lazy"`
- [ ] All image filenames are descriptive kebab-case (no IMG_, DSC_, screenshot_)
- [ ] Product cover images are wired into both frontmatter (`cover` field) and page template
- [ ] Case study screenshots are listed in frontmatter and rendered in CaseLayout
- [ ] Founder portrait exists in both `src/assets/images/founder/` (for pages) and `public/images/` (for JSON-LD)
- [ ] Schema.org `image` fields are populated for Product, Person, and Article types
- [ ] No broken image references (build will catch missing imports, but check public/ paths manually)

### Case-sensitive import paths break on Linux/Cloudflare

Windows is case-insensitive; Linux (Cloudflare Pages, GitHub Actions) is case-sensitive. If git tracks a directory as `founder/` (lowercase), importing from `Founder/` (capital) works locally on Windows but breaks on deploy.

**Prevention:** Always match the exact case that `git ls-tree -r HEAD --name-only` reports. After any file or directory rename, grep all imports for the old casing.

Example mistake: `import from '../../assets/images/Founder/joost-sitting-laptop-looking-working.webp'` — git tracked the directory as `founder/`. Build passed on Windows, failed on Cloudflare.

### Video carousel: overflow-hidden blocks horizontal scroll

A parent element with `overflow-hidden` clips the horizontal scroll of child elements with `overflow-x-auto`. This makes carousels appear stuck even though the scroll container is technically scrollable.

Additionally, carousels need visual scroll affordances: navigation arrows on desktop, dot indicators, and grab-to-drag behavior. A hidden scrollbar with no arrows makes the carousel appear non-interactive.
