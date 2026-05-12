# Histamin Vertical Slice v1

First working reference implementation of **Cluster Architecture v1.2**.

## Working funnel route

```
/quiz
  → /archetypen/die-perimenopausale (cluster bridge)
    → /themen/histamin-und-hormone (cluster hub)
      → /blog/histamin-und-hormone (article)
        → /produkte/histamin-bundle (hybrid product page)
```

Supporting routes:
- `/glossar/histamin`, `/glossar/dao`, `/glossar/oestrogen` — individual term pages
- `/glossar` — merged index (content collection + static terms)
- `/masterclass/hormone-histamin-zyklus-superpower` — waitlist placeholder
- `/coaching/eins-zu-eins` — Calendly embed (only page with Calendly)
- `/produkte/glutenfrei-superpower` — micro-product (cluster: histamin)

## Built parts

| Component | What it does |
|---|---|
| Cluster YAML | `src/data/clusters/histamin.yaml` — strategy, routing, curation, FAQ, analytics |
| Cluster hub | `ClusterHubLayout.astro` — auto-rendered from YAML + content graph |
| Hybrid product page | `HybridProductLayout.astro` — product + editorial, "not for you" honesty block |
| BlogToProductBridge | `BlogToProductBridge.astro` — contextual product card inside articles |
| Quiz → cluster bridge | `ArchetypeLayout.astro` — "Vertiefe dein Ergebnis" section with cluster links |
| Glossary collection | `type: 'data'` YAML collection + `/glossar/[slug]` detail pages |
| Social storytelling grid | `SocialStorytellingGrid.astro` — Instagram-style grid for homepage |
| Masterclass placeholder | Full 12-step conversion page, waitlist-only, no Webinargeek |
| Email capture abstraction | `emailCapture.ts` — unified payloads for quiz, newsletter, masterclass, waitlist |
| Calendly scoping | `CalendlyEmbed.astro` — strictly coaching pages only |

## Files by category

### New files

**Layouts:**
- `src/layouts/ClusterHubLayout.astro`
- `src/layouts/HybridProductLayout.astro`

**Components:**
- `src/components/BlogToProductBridge.astro`
- `src/components/CalendlyEmbed.astro`
- `src/components/SocialStorytellingGrid.astro`

**Libraries:**
- `src/lib/clusters.ts` — cluster YAML loader + content graph resolution
- `src/lib/emailCapture.ts` — ESP abstraction layer

**Data:**
- `src/data/clusters/histamin.yaml`
- `src/data/socialPosts.ts`

**Content:**
- `src/content/glossar/histamin.yaml`
- `src/content/glossar/dao.yaml`
- `src/content/glossar/oestrogen.yaml`
- `src/content/produkte/glutenfrei-superpower.md`

**Pages:**
- `src/pages/glossar/[slug].astro`
- `src/pages/glossar/index.astro` (moved from `glossar.astro`)
- `src/pages/masterclass/hormone-histamin-zyklus-superpower.astro`

### Modified files

**Content (cluster membership added):**
- `src/content/artikel/histamin-und-hormone.md` — `cluster: histamin`
- `src/content/produkte/histamin-bundle.md` — `cluster: histamin`, `productType: bundle`
- `src/content/archetypen/die-perimenopausale.md` — `recommendedClusterSlugs: ["histamin"]`
- `src/content/coaching/eins-zu-eins.md` — `ctaUrl: "#calendly"`

**Schemas & config:**
- `src/content.config.ts` — added `glossar` collection, `recommendedClusterSlugs` to archetypen
- `src/data/schema.ts` — added `generateDefinedTerm()`, updated `generateDefinedTermSet()`
- `src/data/glossar.ts` — removed oestrogen (migrated to collection)

**Layouts (cluster features):**
- `src/layouts/ArchetypeLayout.astro` — cluster bridge section
- `src/layouts/ArticleLayout.astro` — BlogToProductBridge integration
- `src/layouts/CoachingLayout.astro` — CalendlyEmbed placement

**Pages (routing):**
- `src/pages/themen/[slug].astro` — dual source: pillar + cluster
- `src/pages/themen/index.astro` — cluster hubs in topic index
- `src/pages/produkte/[slug].astro` — hybrid layout routing
- `src/pages/index.astro` — SocialStorytellingGrid on homepage

**Infrastructure:**
- `src/lib/analytics.ts` — cluster events, masterclass events
- `src/lib/newsletter.ts` — deprecated (→ emailCapture.ts)
- `src/i18n/ui.ts` — breadcrumb, newsletter loading/error strings
- `src/components/Footer.astro` — email capture abstraction + UX states
- `src/components/NewsletterSignup.astro` — email capture abstraction + UX states
- `src/components/Quiz.tsx` — quiz_started fix, email capture, cluster bridge

## Architecture principles proven

### Source-of-truth split
- **Cluster YAML** owns strategy: routing, curation, conversion assets, analytics config, audience
- **Content frontmatter** owns membership: `cluster: "histamin"` on articles/products
- **Build utilities** resolve the graph by reading both sides

### Hub-as-rendered-config
`ClusterHubLayout.astro` takes a `ClusterConfig` object and renders the entire hub — no markdown, no manual curation. Content graph is resolved at build time via `getClusterArticles()`, `getClusterGlossary()`, `getClusterPrimaryProduct()`.

### Strict Calendly placement
Calendly appears on exactly 1 page (`/coaching/eins-zu-eins`). No homepage, no products, no blog, no footer. Verified by grep across all 40 built pages.

### Cluster analytics props
All cluster-aware components pass `cluster` to analytics events. Cross-cluster links fire `cross_cluster_link_click` with `target_cluster`. Masterclass fires `masterclass_waitlist_signup`.

### Micro-product handling
`glutenfrei-superpower` uses `HybridProductLayout` with `productType: micro-product`. Same layout as bundles but routed through the product type field.

### AI citation / DefinedTerm glossary layer
Glossary definitions follow citation rules (25–50 words, standalone sentences, no leading clauses). Individual pages carry `DefinedTerm` schema.org markup. Index carries `DefinedTermSet`.

### Email capture without API key exposure
Client-side forms serialize structured payloads (`EmailCapturePayload`) with source, tags, cluster context. Placeholder mode logs to console. Real mode will POST to `/api/email-capture` serverless endpoint that holds the API key.

## Remaining TODOs

| TODO | Where | Priority |
|---|---|---|
| Real ESP integration (MailerLite) | `emailCapture.ts` + new `/api/email-capture` endpoint | High — needed for launch |
| Real Webinargeek embed | Masterclass page | High — needed for launch |
| Replace NXG-Media Calendly URL | `CalendlyEmbed.astro` | High — temporary embed code |
| Replace placeholder Instagram links | `socialPosts.ts` | Medium — cosmetic |
| Replace placeholder OG image for Glutenfrei | `public/images/og/products/` | Medium — cosmetic |
| Add perimenopause cluster | New YAML + content tagging | Later — next vertical slice |
| Add hormone cluster | New YAML + content tagging | Later |
| Add ernährung cluster | New YAML + content tagging | Later |
| Real testimonials | Masterclass page (marked ⚠ PLACEHOLDER) | Later — when available |
| `discovery_call_click` → real Calendly callback | `CalendlyEmbed.astro` | Low — currently fires on scroll-into-view |

## Build stats

- **40 pages** generated (up from 30 pre-cluster)
- **Zero build errors**
- Quiz bundle: 10.31 kB (includes emailCapture)
