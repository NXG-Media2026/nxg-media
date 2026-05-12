# I18N Implementation Plan v1

**Goal:** Add English as a second locale to the doc.veri site before full launch, with German remaining the default/root locale and English served under `/en/`.

**Governing spec:** Expert Brand Template Briefing v2, section 16 (Multilingual / International Expert Sites).

**Date:** 2026-05-13

---

## 1. Current route audit

All routes live under `src/pages/`. German is the only locale; all routes are at the root with no locale prefix.

### Static pages

| File | URL | Route group |
|---|---|---|
| `index.astro` | `/` | Homepage |
| `angebot.astro` | `/angebot` | Offers overview |
| `faq.astro` | `/faq` | FAQ |
| `kontakt.astro` | `/kontakt` | Contact |
| `ueber.astro` | `/ueber` | About |
| `mitgliedschaft.astro` | `/mitgliedschaft` | Membership |
| `quiz.astro` | `/quiz` | Quiz |
| `sichtbarkeit.astro` | `/sichtbarkeit` | Visibility/dashboard |
| `agb.astro` | `/agb` | Legal: terms |
| `datenschutz.astro` | `/datenschutz` | Legal: privacy |
| `impressum.astro` | `/impressum` | Legal: imprint |
| `masterclass/hormone-histamin-zyklus-superpower.astro` | `/masterclass/hormone-histamin-zyklus-superpower` | Masterclass (static slug) |

### Dynamic collection pages

| File | URL pattern | Collection | Route group |
|---|---|---|---|
| `produkte/index.astro` | `/produkte` | — | Products index |
| `produkte/[slug].astro` | `/produkte/:slug` | `produkte` | Product detail |
| `coaching/index.astro` | `/coaching` | — | Coaching index |
| `coaching/[slug].astro` | `/coaching/:slug` | `coaching` | Coaching detail |
| `blog/index.astro` | `/blog` | — | Blog index |
| `blog/[slug].astro` | `/blog/:slug` | `artikel` | Article detail |
| `themen/index.astro` | `/themen` | — | Topics index |
| `themen/[slug].astro` | `/themen/:slug` | clusters | Cluster hub |
| `glossar/index.astro` | `/glossar` | — | Glossary index |
| `glossar/[slug].astro` | `/glossar/:slug` | `glossar` | Glossary detail |
| `archetypen/[slug].astro` | `/archetypen/:slug` | `archetypen` | Archetype result |
| `lead-magnet/[slug].astro` | `/lead-magnet/:slug` | `leadMagnets` | Lead magnet |

### Route segment inventory

Current German segments that must be translated for English:

| Canonical key | DE segment | EN segment (proposed) |
|---|---|---|
| `angebot` | `angebot` | `offers` |
| `produkte` | `produkte` | `products` |
| `coaching` | `coaching` | `coaching` |
| `mitgliedschaft` | `mitgliedschaft` | `membership` |
| `about` | `ueber` | `about` |
| `contact` | `kontakt` | `contact` |
| `faq` | `faq` | `faq` |
| `blog` | `blog` | `blog` |
| `themen` | `themen` | `topics` |
| `glossar` | `glossar` | `glossary` |
| `quiz` | `quiz` | `quiz` |
| `archetypen` | `archetypen` | `archetypes` |
| `leadMagnet` | `lead-magnet` | `free-resources` |
| `masterclass` | `masterclass` | `masterclass` |
| `privacy` | `datenschutz` | `privacy` |
| `agb` | `agb` | `terms` |
| `impressum` | `impressum` | `legal-notice` |

### Total page count (current build): 40

---

## 2. Recommended locale strategy

**Pattern:** Default locale at root (per briefing section 16).

```
DE (default): /                                → German homepage
              /themen/histamin-und-hormone      → German cluster hub
              /produkte/histamin-bundle         → German product page

EN (secondary): /en/                           → English homepage
                /en/topics/histamine-and-hormones → English cluster hub
                /en/products/histamine-bundle     → English product page
```

### Why root for German

- German is the primary market with existing SEO equity.
- Existing backlinks, social shares, and bookmarks continue to work without redirects.
- Google already indexes root URLs as `de`. Moving them to `/de/` would require 301 redirects for every page and risk temporary ranking loss.

### Astro implementation approach

Astro does not have built-in i18n routing (no `getLocale()` middleware). The recommended approach for a static site:

**Option A — Duplicate page files under `src/pages/en/`:**
Create `src/pages/en/` with English page files that mirror the German structure but use translated route segments. Each English page imports the same layouts/components but passes `locale="en"` and loads English content.

**Option B — Dynamic locale prefix with `[...locale]/` catch-all:**
A single `src/pages/[...locale]/` catch-all that resolves locale from the URL prefix and renders the appropriate content. More DRY but harder to reason about and debug.

**Recommendation: Option A** (explicit page files per locale). It is simpler, gives full control over English-specific route segments, and avoids catch-all complexity. The duplication is manageable because page files are thin wrappers around shared layouts and components.

---

## 3. Required data model changes

### 3.1 Content collection schemas

Add two fields to every content collection in `content.config.ts`:

```typescript
locale: z.enum(['de', 'en']).default('de'),
translationKey: z.string().optional(),
```

- `locale` declares the language of the content entry.
- `translationKey` groups translations of the same content (e.g., the German and English versions of the same article share the same `translationKey`).

**Affected collections:** `produkte`, `coaching`, `artikel`, `pillars`, `archetypen`, `mitgliedschaft`, `glossar`, `leadMagnets`.

### 3.2 Site config

Expand `siteConfig` in `src/data/site.ts`:

```typescript
locales: ['de', 'en'] as const,
```

This activates the language switcher in the header (already gated on `siteConfig.locales.length > 1`).

### 3.3 Route segments

Expand `src/i18n/routes.ts` with English segments:

```typescript
export const routeSegments: Record<string, Record<string, string>> = {
  de: {
    angebot: 'angebot',
    produkte: 'produkte',
    // ... (existing)
  },
  en: {
    angebot: 'offers',
    produkte: 'products',
    coaching: 'coaching',
    mitgliedschaft: 'membership',
    about: 'about',
    contact: 'contact',
    faq: 'faq',
    blog: 'blog',
    themen: 'topics',
    glossar: 'glossary',
    quiz: 'quiz',
    privacy: 'privacy',
    agb: 'terms',
    impressum: 'legal-notice',
    leadMagnet: 'free-resources',
    masterclass: 'masterclass',
  },
};
```

### 3.4 UI strings

Add full `en` key to `src/i18n/ui.ts`:

```typescript
export const ui = {
  de: { /* existing */ },
  en: {
    'nav.home': 'Home',
    'nav.angebot': 'Offers',
    'nav.produkte': 'Products',
    'cta.learnMore': 'Learn more',
    'cta.buyNow': 'Buy now',
    // ... all keys translated
  },
};
```

### 3.5 i18n utility functions

The current functions in `src/i18n/utils.ts` are stubs. They must become functional:

```typescript
// getLocaleFromPath: detect /en/ prefix → 'en', else → 'de'
export function getLocaleFromPath(path: string): Locale {
  if (path.startsWith('/en/') || path === '/en') return 'en';
  return 'de';
}

// t: look up key in the active locale, fall back to German
export function t(key: UIKey, locale: Locale = 'de'): string {
  return ui[locale]?.[key] ?? ui.de[key] ?? key;
}

// getTranslatedPath: map a German path to its English equivalent (and vice versa)
// Uses routeSegments + content translationKey to resolve
export function getTranslatedPath(path: string, targetLocale: Locale): string {
  // Implementation: segment-by-segment translation + slug lookup
}

// getLocalizedUrl: prefix helper
export function getLocalizedUrl(path: string, locale: Locale): string {
  if (locale === 'de') return path;
  return `/en${path}`;
}
```

### 3.6 Navigation

Expand `src/data/navigation.ts` with an `en` entry:

```typescript
export const navigation: Record<Locale, NavItem[]> = {
  de: [ /* existing */ ],
  en: [
    { label: 'Home', href: '/en/' },
    {
      label: 'Offers',
      href: '/en/offers',
      children: [
        { label: 'Products', href: '/en/products' },
        { label: 'Coaching', href: '/en/coaching' },
        { label: 'Membership', href: '/en/membership' },
      ],
    },
    { label: 'Topics', href: '/en/topics' },
    { label: 'Blog', href: '/en/blog' },
    { label: 'Masterclass', href: '/en/masterclass/hormones-histamine-cycle-superpower' },
    { label: 'Quiz', href: '/en/quiz' },
    { label: 'About', href: '/en/about' },
    { label: 'FAQ', href: '/en/faq' },
    { label: 'Contact', href: '/en/contact' },
  ],
};
```

### 3.7 Locale-aware internal links

Every component that generates internal links must use locale-aware helpers instead of hardcoded paths. Key areas:

| Component / module | Current pattern | Required change |
|---|---|---|
| `Footer.astro` | `href="/themen"` | Use `getLocalizedUrl('/topics', locale)` or locale-aware route builder |
| `Header.astro` | `href="/angebot"` | Already uses `navigation[locale]` — CTA href must also be locale-aware |
| `BlogToProductBridge.astro` | `href="/produkte/${slug}"` | Must resolve English product slug |
| `BreadcrumbNav.astro` | Receives `items` prop | Parents must pass locale-aware hrefs |
| `CTABand.astro` | `ctaHref="/angebot"` | Callers must pass locale-aware href |
| Cluster hub page | Links to `/blog/${slug}`, `/glossar/${slug}` | Must use locale-prefixed, translated segments |

### 3.8 Locale in analytics events

Already in place. `EventProperties` includes `locale: string` and all `trackOnClick` calls pass `locale`. No structural change needed — just ensure English pages pass `locale: 'en'`.

### 3.9 Locale-aware SEO metadata

- `BaseLayout.astro` already accepts `locale` and sets `<html lang={locale}>`.
- `SEOHead.astro` already accepts `hreflang` array and renders alternates + `x-default`.
- **Change needed:** Every page must compute and pass `hreflang` entries when a translation exists.

---

## 4. Cluster config strategy

### Current format (flat, German-only)

```yaml
slug: histamin
hubSlug: histamin-und-hormone
title: "Histamin & Hormone"
shortTitle: "Histamin"
citableDefinition: "Histamin ist ein koerpereigener Botenstoff..."
hubFaq:
  - question: "Was ist eine Histaminintoleranz?"
    answer: "..."
```

### Proposed format (locale-aware, backwards-compatible)

Add a `locales` block. Keep the existing top-level fields as the German defaults to avoid breaking the current build.

```yaml
slug: histamin

# German defaults (existing — unchanged)
hubSlug: histamin-und-hormone
title: "Histamin & Hormone"
shortTitle: "Histamin"
citableDefinition: "Histamin ist ein koerpereigener Botenstoff..."
hubIntro: ""
hubFaq:
  - question: "Was ist eine Histaminintoleranz?"
    answer: "..."

# Locale overrides (new)
locales:
  en:
    hubSlug: histamine-and-hormones
    title: "Histamine & Hormones"
    shortTitle: "Histamine"
    citableDefinition: "Histamine is a natural signaling molecule..."
    hubIntro: ""
    hubFaq:
      - question: "What is histamine intolerance?"
        answer: "..."
```

### Resolution logic in `clusters.ts`

Add a locale-aware getter:

```typescript
export function getClusterLocalized(slug: string, locale: Locale = 'de'): ClusterConfig {
  const base = getCluster(slug);
  if (!base) return null;
  if (locale === 'de' || !base.locales?.[locale]) return base;

  // Merge: locale overrides on top of base
  return { ...base, ...base.locales[locale] };
}
```

This ensures:
- Existing German code continues to work without changes.
- English pages call `getClusterLocalized(slug, 'en')` and get translated hub slugs, titles, FAQ.
- Commercial strategy (`primaryProduct`, `crossClusters`, `analytics`, `calendlyContext`) stays shared.
- If an English locale block doesn't exist yet, German is returned as fallback.

### Type extension

```typescript
export interface ClusterConfig {
  // ... existing fields
  locales?: Partial<Record<string, Partial<ClusterLocaleOverrides>>>;
}

interface ClusterLocaleOverrides {
  hubSlug: string;
  title: string;
  shortTitle: string;
  citableDefinition: string;
  hubIntro: string;
  hubFaq: ClusterFaqItem[];
}
```

---

## 5. English MVP scope

The smallest useful English slice mirrors the Histamin vertical slice.

### Pages to build

| English URL | Source | Priority |
|---|---|---|
| `/en/` | New English homepage | Required |
| `/en/topics/histamine-and-hormones` | Cluster hub (from `histamin.yaml` `locales.en`) | Required |
| `/en/blog/histamine-and-hormones` | Translated article content | Required |
| `/en/products/histamine-bundle` | Translated product content | Required |
| `/en/glossary/histamine` | Translated glossary entry | Required |
| `/en/glossary/dao` | Translated glossary entry | Required |
| `/en/coaching` | Coaching index (translated) | Required |
| `/en/masterclass/hormones-histamine-cycle-superpower` | Translated masterclass page | Required |
| `/en/quiz` | See note below | Deferred |
| `/en/about` | Translated about page | Nice to have |
| `/en/faq` | Translated FAQ page | Nice to have |
| `/en/contact` | Translated contact page | Nice to have |
| `/en/privacy` | Translated legal page | Nice to have |
| `/en/terms` | Translated legal page | Nice to have |
| `/en/legal-notice` | Translated legal page | Nice to have |

### Quiz decision

The quiz component (`src/components/Quiz.tsx`) is a React client component with hardcoded German question/answer strings. Translating it requires:
- Externalizing all quiz strings to a data file.
- Passing locale to the React component.
- Translating archetype result pages.

**Recommendation:** Defer quiz to a second iteration. For the English MVP, the homepage secondary CTA links to `/en/topics/histamine-and-hormones` instead of the quiz. Add the quiz in Phase 3 after the core English funnel is proven.

### Content to create

| Content type | File to create | `translationKey` |
|---|---|---|
| Article | `src/content/artikel/histamine-and-hormones.md` | `histamin-und-hormone-article` |
| Product | `src/content/produkte/histamine-bundle.md` | `histamin-bundle-product` |
| Glossary | `src/content/glossar/histamine.en.yaml` | — (matched by slug) |
| Glossary | `src/content/glossar/dao.en.yaml` | — (matched by slug) |

Content entries must include `locale: 'en'` and matching `translationKey` to enable hreflang resolution.

---

## 6. Hreflang / canonical strategy

### Self-canonical per locale

Every page gets a self-referencing canonical:

```
DE: <link rel="canonical" href="https://docveri.de/themen/histamin-und-hormone" />
EN: <link rel="canonical" href="https://docveri.de/en/topics/histamine-and-hormones" />
```

Never canonical an English page back to its German equivalent. Each translation is an independent indexable page.

### Hreflang alternates

When a translation exists, both pages emit hreflang tags pointing to each other:

```html
<!-- On the German page -->
<link rel="alternate" hreflang="de" href="https://docveri.de/themen/histamin-und-hormone" />
<link rel="alternate" hreflang="en" href="https://docveri.de/en/topics/histamine-and-hormones" />
<link rel="alternate" hreflang="x-default" href="https://docveri.de/themen/histamin-und-hormone" />

<!-- On the English page -->
<link rel="alternate" hreflang="de" href="https://docveri.de/themen/histamin-und-hormone" />
<link rel="alternate" hreflang="en" href="https://docveri.de/en/topics/histamine-and-hormones" />
<link rel="alternate" hreflang="x-default" href="https://docveri.de/themen/histamin-und-hormone" />
```

### x-default

`x-default` points to German (the default locale). This tells search engines: "if the user's language preference doesn't match any hreflang, serve German."

### When a translation does not exist

- The page that exists emits only a self-referencing hreflang (no alternate for the missing language).
- No hreflang tag should ever point to a URL that returns 404.
- The LanguageSwitcher hides or disables the link to the missing locale.

### Implementation

Build a helper function:

```typescript
function getHreflangEntries(translationKey: string, locale: Locale): HreflangEntry[] {
  // Query content collections for entries with same translationKey
  // Return array of { lang, href } for all locales that have a published translation
}
```

Pages pass this to `BaseLayout` via the existing `hreflang` prop. `SEOHead` already renders the tags.

---

## 7. Internal linking rules

### Primary rule

English pages link to English targets. German pages link to German targets. No silent language mixing.

### When an English target does not exist

Three strategies, in order of preference:

1. **Hide the link entirely.** If a blog article references a glossary term that has no English glossary page, omit the link. The text can remain; just don't make it a hyperlink.

2. **Fall back to German with an explicit indicator.** If hiding the link removes important functionality (e.g., the coaching CTA in the footer), link to the German page with a visible language tag:
   ```html
   <a href="/coaching/eins-zu-eins">1-on-1 Coaching <span class="text-xs">(DE)</span></a>
   ```

3. **Never silently cross-link.** A user clicking a CTA on an English page must not land on a German page without warning.

### Areas requiring locale-aware link resolution

| Area | Current behavior | Required behavior |
|---|---|---|
| Header navigation | Uses `navigation[locale]` | Already locale-aware if `navigation.en` exists |
| Footer links | Hardcoded German paths | Must use locale-aware paths |
| `BlogToProductBridge` | Resolves product by cluster | Must resolve to locale-matched product slug |
| `CTABand` / `HeroSection` | Receives `ctaHref` prop | Callers must pass locale-aware href |
| Breadcrumbs | Built per-page | Must use translated segment labels and paths |
| Glossary `[slug].astro` | Links to `/blog/${slug}` | Must resolve to English article path |
| Cluster hub | Links to articles, glossary, products | Must use locale-prefixed paths with translated segments |

### Link resolution helper

```typescript
function resolveLocalizedHref(
  collection: string,
  slug: string,
  locale: Locale
): string | null {
  // Look up content entry by translationKey + locale
  // Return locale-prefixed path with translated segment
  // Return null if no translation exists
}
```

---

## 8. Schema requirements

### Per-page schema must use the active locale

| Schema type | Fields that must be localized |
|---|---|
| `WebSite` | `inLanguage` (currently hardcoded to `'de'`) |
| `BlogPosting` | `headline`, `description`, `inLanguage`, `url` |
| `Product` + `Offer` | `name`, `description`, `url` |
| `FAQPage` | `name` (questions), `text` (answers) |
| `BreadcrumbList` | `name` (labels), `item` (URLs) |
| `DefinedTerm` | `name`, `description`, `url` |
| `DefinedTermSet` | `name`, `url` |
| `Service` | `name`, `description`, `url` |
| `CollectionPage` | `name`, `description`, `url` |

### Global IDs that stay stable

| Schema | `@id` | Rationale |
|---|---|---|
| `Organization` | `https://docveri.de#org` | One org, one ID |
| `Person` (founder) | `https://docveri.de/ueber#dr-verena` | One person, one ID |

### Changes to `src/data/schema.ts`

1. `generateWebSite()` — Accept `locale` parameter, use it for `inLanguage`.
2. `generateArticle()` — Accept `locale`, use for `inLanguage`.
3. `generateDefinedTermSet()` — Accept `locale`, translate `name` ("Glossar der Frauen-Gesundheit" → "Women's Health Glossary"), use locale-prefixed URLs.
4. `generateDefinedTerm()` — Accept `locale`, use locale-prefixed URL.
5. All URL-generating functions — Accept and use locale-prefixed URLs when `locale !== 'de'`.

### OG locale tag

Add `og:locale` to `SEOHead.astro`:

```html
<meta property="og:locale" content="de_DE" />  <!-- or en_US -->
```

---

## 9. Implementation phases

### Phase 1: i18n infrastructure (no visible changes)

**Goal:** Make the i18n helpers functional without changing any routes or visible output.

- Expand `siteConfig.locales` to `['de', 'en']` but keep LanguageSwitcher hidden until English pages exist.
- Add `en` route segments to `routes.ts`.
- Add `en` UI strings to `ui.ts`.
- Implement `getLocaleFromPath()`, `t()` with locale fallback, `getTranslatedPath()`, `getLocalizedUrl()`.
- Add `locale` and `translationKey` fields to all content collection schemas in `content.config.ts` (with `default('de')` so existing content is unaffected).
- Add `en` navigation to `navigation.ts`.
- **Verify:** Build passes. Page count unchanged. No visible changes on the German site.

### Phase 2: Locale-aware layouts and shared components

**Goal:** Make layouts and components capable of rendering in English, without creating English pages yet.

- Update `BaseLayout.astro` to compute hreflang from `translationKey` when available.
- Add `og:locale` to `SEOHead.astro`.
- Update `Footer.astro` to use locale-aware paths instead of hardcoded German paths.
- Update `Header.astro` CTA href to be locale-aware.
- Update `LanguageSwitcher.astro` to render actual locale links (resolve translated path for current page).
- Add `locale` parameter to schema generators that need it (`generateWebSite`, `generateArticle`, `generateDefinedTerm`, `generateDefinedTermSet`).
- **Verify:** Build passes. German site unchanged. Components accept `locale="en"` without errors.

### Phase 3: English Histamin vertical slice

**Goal:** Ship the English MVP funnel.

- Add `locales.en` block to `histamin.yaml`.
- Create English content entries:
  - `src/content/artikel/histamine-and-hormones.md` (with `locale: 'en'`, `translationKey`)
  - `src/content/produkte/histamine-bundle.md` (with `locale: 'en'`, `translationKey`)
  - `src/content/glossar/histamine.en.yaml`
  - `src/content/glossar/dao.en.yaml`
- Create English page files under `src/pages/en/`:
  - `src/pages/en/index.astro` (homepage)
  - `src/pages/en/topics/[slug].astro` (cluster hub)
  - `src/pages/en/blog/[slug].astro` (article)
  - `src/pages/en/products/[slug].astro` (product)
  - `src/pages/en/glossary/index.astro`
  - `src/pages/en/glossary/[slug].astro`
  - `src/pages/en/coaching/index.astro`
  - `src/pages/en/masterclass/hormones-histamine-cycle-superpower.astro`
- Update `getStaticPaths()` in English dynamic pages to filter by `locale: 'en'`.
- Update `getStaticPaths()` in German dynamic pages to filter by `locale: 'de'` (or absence of locale).
- **Verify:** Build passes. New page count = 40 + ~10 English pages. German pages unchanged.

### Phase 4: Hreflang, canonical, schema validation

**Goal:** Ensure correct SEO signals on all bilingual pages.

- Wire up hreflang entries on all pages that have a translation counterpart.
- Validate every English page has self-canonical (not pointing to German).
- Validate schema `inLanguage` matches page locale.
- Validate breadcrumb schema uses translated labels and locale-prefixed URLs.
- Activate LanguageSwitcher (set `siteConfig.locales` visible check).
- **Verify:** Build passes. HTML validator on sample English and German pages. Manual check of `<head>` on both locale versions of the same page.

### Phase 5: Link and build audit

**Goal:** Catch every broken or mixed-language link before launch.

- Run full link checker on the built site (all internal links must resolve).
- Grep all English pages for hardcoded German paths (`/themen/`, `/produkte/`, `/glossar/`, `/ueber`, `/kontakt`, etc.).
- Grep all English pages for German UI strings that leaked through untranslated `t()` keys.
- Verify analytics events on English pages include `locale: 'en'`.
- Verify no German CTA text appears on English pages.
- Verify footer, header, and mobile nav render correctly in English.
- **Verify:** Zero broken links. Zero mixed-language CTAs. Zero untranslated strings on English pages.

---

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Broken internal links** — English pages link to German paths or non-existent English paths | High | High (404s, bad UX) | Phase 5 link audit. Grep for hardcoded German segments in English page files. |
| **Mixed-language CTAs** — German button text on English pages, or English CTA leading to German landing page | High | Medium (confusing UX, wasted conversions) | All CTA labels come from `t()`. All CTA hrefs from locale-aware helpers. Phase 5 string audit. |
| **Duplicate content without hreflang** — Both locale versions indexed as competing pages | Medium | High (SEO cannibalization) | Phase 4 hreflang validation. Automated check in CI. |
| **Cluster YAML breaking German routes** — Adding `locales` block introduces a parsing error or changes existing field resolution | Medium | Critical (breaks live German site) | Keep existing top-level fields as German defaults. `locales` is additive. Build verification after every YAML change. |
| **Wrong canonical** — English page canonicalized to German URL | Medium | High (English page deindexed) | Explicit self-canonical per page. Phase 4 canonical validation. |
| **Quiz in English** — Quiz component has hardcoded German strings; partial translation would be worse than no translation | Low | Medium (incomplete English funnel) | Defer quiz to post-MVP. English homepage routes around it. |
| **Content drift** — German content is updated but English translation is not kept in sync | High (over time) | Medium (stale English content) | `translationKey` enables a "translation freshness" check: compare `lastReviewedDate` across locales. Add a build-time warning for stale translations (future). |
| **Navigation/footer hardcoded paths** — Footer has several hardcoded German paths that would break English context | High | Medium | Phase 2 converts all Footer/Header links to locale-aware. Phase 5 audits for remaining hardcoded paths. |
| **Schema language mismatch** — Schema says `inLanguage: 'de'` on an English page | Medium | Low (minor SEO signal loss) | Phase 4 schema validation. |
| **Performance regression** — Doubled page count increases build time | Low | Low | Static generation is fast. 80 pages still builds in under 10 seconds. |

---

## 11. Recommendation

### Should we do this before full live launch?

**Yes, but only Phase 1 and Phase 2.** These phases make the infrastructure i18n-ready without adding any English pages. The German site remains unchanged, and the codebase is prepared for English content to be added at any time.

**Phase 3 (English content) can launch alongside or shortly after the German go-live**, depending on whether English content is ready. The infrastructure should not block the German launch.

### Smallest safe implementation step

**Phase 1** is the smallest safe step. It touches only data/utility files (`routes.ts`, `ui.ts`, `utils.ts`, `content.config.ts`, `navigation.ts`). It produces zero visible changes. It can be merged and deployed with no risk to the live German site.

After Phase 1, any future session can pick up Phase 2+ without needing to redo foundation work.

### Estimated effort per phase

| Phase | Scope | Estimated effort |
|---|---|---|
| Phase 1 | i18n helpers, schemas, config | 1 session |
| Phase 2 | Locale-aware layouts/components | 1 session |
| Phase 3 | English content + page files | 1-2 sessions (depends on content translation) |
| Phase 4 | Hreflang/canonical/schema | 1 session |
| Phase 5 | Audit | 0.5 session |

**Total: 4-5 sessions to full English MVP.**

---

## Appendix A: Files requiring changes by phase

### Phase 1

| File | Change |
|---|---|
| `src/data/site.ts` | Add `'en'` to `locales` |
| `src/i18n/routes.ts` | Add `en` route segments |
| `src/i18n/ui.ts` | Add `en` UI string translations |
| `src/i18n/utils.ts` | Implement `getLocaleFromPath`, `t` with fallback, `getTranslatedPath`, `getLocalizedUrl` |
| `src/content.config.ts` | Add `locale` and `translationKey` to all collection schemas |
| `src/data/navigation.ts` | Add `en` navigation structure |

### Phase 2

| File | Change |
|---|---|
| `src/layouts/BaseLayout.astro` | Compute hreflang from translationKey |
| `src/components/SEOHead.astro` | Add `og:locale` |
| `src/components/Footer.astro` | Replace hardcoded German paths with locale-aware helpers |
| `src/components/Header.astro` | Locale-aware CTA href |
| `src/components/LanguageSwitcher.astro` | Render actual locale switcher links |
| `src/data/schema.ts` | Add `locale` parameter to `generateWebSite`, `generateArticle`, `generateDefinedTerm`, `generateDefinedTermSet` |
| `src/lib/clusters.ts` | Add `getClusterLocalized()` function |
| `src/data/clusters/histamin.yaml` | No change yet (Phase 3) |

### Phase 3

| File | Change |
|---|---|
| `src/data/clusters/histamin.yaml` | Add `locales.en` block |
| `src/content/artikel/histamine-and-hormones.md` | New file |
| `src/content/produkte/histamine-bundle.md` | New file |
| `src/content/glossar/histamine.en.yaml` | New file |
| `src/content/glossar/dao.en.yaml` | New file |
| `src/pages/en/index.astro` | New file |
| `src/pages/en/topics/[slug].astro` | New file |
| `src/pages/en/blog/[slug].astro` | New file |
| `src/pages/en/products/[slug].astro` | New file |
| `src/pages/en/glossary/index.astro` | New file |
| `src/pages/en/glossary/[slug].astro` | New file |
| `src/pages/en/coaching/index.astro` | New file |
| `src/pages/en/masterclass/hormones-histamine-cycle-superpower.astro` | New file |
| Existing German `getStaticPaths()` pages | Add `locale: 'de'` filter |

### Phase 4

| File | Change |
|---|---|
| All page files with `translationKey` content | Pass `hreflang` to BaseLayout |
| `src/components/SEOHead.astro` | Verify x-default logic |
| Schema calls across all pages | Pass `locale` parameter |

### Phase 5

No file changes. Audit only.
