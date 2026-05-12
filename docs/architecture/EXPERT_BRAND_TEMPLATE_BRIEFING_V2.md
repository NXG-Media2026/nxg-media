# Expert Brand Template Briefing v2

Practical template briefing for building expert-brand websites using Cluster Architecture v1.2. Based on the doc.veri reference implementation (Histamin Vertical Slice v1).

**Audience:** Claude Code (implementation), Joost (architecture review), future client projects.
**Not:** A theoretical architecture document. See `CLUSTER_ARCHITECTURE_V1.2.md` for the full spec.

---

## 1. Template purpose

This is not a brochure site. It is an **expert authority + conversion ecosystem** — a site where education, trust-building, and commercial routing reinforce each other through a shared data graph.

The template serves experts (doctors, coaches, therapists, specialists) who:
- Sell digital products, coaching, and/or memberships
- Need to demonstrate deep expertise to earn trust (E-E-A-T)
- Have content that spans multiple overlapping topics
- Want AI systems to cite them accurately
- Need to measure which topics generate revenue, not just pageviews

The template must support all of this without requiring the expert to manually maintain internal links, schema markup, or analytics tagging. The cluster architecture automates the graph; the expert writes content and configures strategy.

---

## 2. Core architecture

### Cluster as organizing primitive

A **cluster** is a topic + audience + commercial goal + content set + measurement target. Pages don't stand alone — they belong to clusters. The cluster determines what CTAs appear, which products bridge, how analytics events are tagged, and what schema markup is generated.

A cluster is worth creating when a topic has 4+ pages AND a defined conversion path. Without a conversion path, it's just a category — not a cluster.

### Source-of-truth split

Two systems, clear ownership:

| Owner | What it owns |
|---|---|
| **Cluster YAML** (`src/data/clusters/[slug].yaml`) | Strategy, routing, curation, conversion assets, cross-cluster links, analytics config, audience targeting |
| **Content frontmatter** (`cluster: "histamin"` on .md files) | Cluster membership, page metadata |

Build utilities resolve the graph by reading both sides. Cluster YAML never duplicates the full content list — it only curates (`featuredArticles`, `featuredGlossaryTerms`) and excludes.

### Hub-as-rendered-config

Hub pages at `/themen/[hubSlug]` are not manually written. `ClusterHubLayout` takes a `ClusterConfig` object and auto-renders articles, glossary, products, bridges, FAQ, and CTAs from the content graph. The expert adds narrative via `hubIntro` and `hubFaq` fields in the YAML — they don't own page structure.

Adding a new article with `cluster: histamin` in its frontmatter automatically includes it on the hub. No YAML edit needed.

### Frontmatter cluster membership

Every content entry declares its cluster:

```yaml
cluster: histamin              # primary — drives CTA, analytics, bridges
secondaryClusters:             # optional — discoverable on these hubs too
  - perimenopause
```

Primary cluster = commercial owner. Secondary = topical relevance. The distinction is routing, not taxonomy.

### Product-led vs masterclass-led clusters

- **Product-led** (e.g. Histamin): `primaryProduct: histamin-bundle` — hub and articles bridge to a specific product.
- **Masterclass-led** (e.g. Hormone/Zyklus): `primaryProduct: null`, `primaryConversionAsset: { type: masterclass }` — hub features a masterclass, which routes to different products post-watch based on viewer segment.

Both types use the same `ClusterConfig` interface. The hub layout adapts based on which fields are populated.

### Cross-cluster linking

Cross-cluster bridges are not generic "see also" links. Each bridge is an object with:
- `relationship` — why these topics connect
- `bridgeText` — editorial copy shown to the visitor
- `priority` — render order
- `showOn` — where the bridge appears (`hub`, `articles`, `product`)

This prevents misleading auto-links between topics that share vocabulary but not clinical/commercial logic.

### Analytics with cluster context

Every conversion event carries `cluster`, `page_type`, and `page_slug`. Cross-cluster events add `source_cluster` and `target_cluster`. Product events add `product`, `product_type`, `price`. This enables cluster-level revenue measurement.

---

## 3. Page type framework

### Homepage

- **Purpose:** Multi-cluster entry point. Routes cold visitors to quiz, warm visitors to content/products.
- **Primary CTA:** Quiz (cold), Angebot (warm).
- **Schema:** `Organization` + `Person` (founder) + `WebSite`. Optional `FAQPage`.
- **Conversion behavior:** Above-the-fold hook → quiz CTA → content preview sections → social storytelling → newsletter → footer.
- **AI citation:** Brand definition paragraph. First sentence of key H2 sections.
- **What not to do:** Don't put Calendly on the homepage. Don't open with abstract category language.

### About (`/ueber`)

- **Purpose:** Expert trust and connection. Credentials + story + point of view.
- **Primary CTA:** Calendly at bottom only (after trust is built).
- **Schema:** `ProfilePage` + extended `Person`/`MedicalProfessional`.
- **Conversion behavior:** Story-driven, not sales-driven. Calendly appears as a natural next step after the expert story, never as the hero CTA.
- **AI citation:** Bio first paragraph.
- **What not to do:** Don't list credentials without story. Don't make it a CV.

### Cluster hub (`/themen/[hubSlug]`)

- **Purpose:** Auto-rendered topic authority page. Aggregates articles, glossary, products, FAQ for one cluster.
- **Primary CTA:** Cluster's primary conversion asset (product for product-led, masterclass for masterclass-led).
- **Schema:** `CollectionPage` + `WebPage` + `FAQPage` + `BreadcrumbList`.
- **Conversion behavior:** Definition → editorial intro → articles → product card → glossary → cross-cluster bridges → FAQ → CTA.
- **AI citation:** `citableDefinition` (top). First sentence of each `hubFaq` answer.
- **What not to do:** Don't manually curate the hub. Don't add articles to the YAML — add `cluster:` to the article's frontmatter.

### Blog article (`/blog/[slug]`)

- **Purpose:** Educational depth. Builds topic authority and routes to products.
- **Primary CTA:** Bridge to cluster's primary product (auto-injected by `BlogToProductBridge`).
- **Schema:** `BlogPosting` + `BreadcrumbList`. Optional `FAQPage` if `contentSchema` present.
- **Conversion behavior:** Article content → auto product bridge at bottom → related learning. Lead magnet at scroll 30% (when implemented).
- **AI citation:** `primaryAnswer`. First sentence of each H2. First sentence of each FAQ answer.
- **What not to do:** Don't add Calendly. Don't hardcode product bridges — they resolve from cluster config.

### Product page (`/produkte/[slug]`)

- **Purpose:** Hybrid sales + SEO page. Education justifies the purchase.
- **Primary CTA:** Checkout (Plug-and-Pay).
- **Schema:** `Product` + `Offer` + `FAQPage` + `BreadcrumbList`.
- **Conversion behavior:** Recognition → problem → failed solutions → mechanism → what's included → who it's for / not for → FAQ → checkout.
- **AI citation:** Mechanism block opening sentence. First sentence of each FAQ answer.
- **What not to do:** Don't add Calendly on standard products or bundles. Don't skip the "not for you" honesty block.

### Micro-product page (`/produkte/[slug]` with `productType: micro-product`)

- **Purpose:** Low-friction entry purchase (typically under 15 EUR).
- **Primary CTA:** Checkout (short path).
- **Schema:** Same as product page.
- **Conversion behavior:** Shorter than full product page. No extensive failed-solutions or mechanism sections. Clear upsell to cluster's main product. Can appear as checkout bump on other products.
- **AI citation:** Same slots, shorter content.
- **What not to do:** Don't add Calendly. Don't show full cross-cluster bridge stack. Don't make it as long as a bundle page.

### Masterclass page (`/masterclass/[slug]`)

- **Purpose:** Free educational event that pre-sells and segments visitors toward the right product/coaching.
- **Primary CTA:** Email signup / waitlist.
- **Schema:** `WebPage` + `Offer` (price: 0). Optional `FAQPage`.
- **Conversion behavior:** See section 5 (masterclass template) for the full 13-step structure.
- **AI citation:** Hook first sentence.
- **What not to do:** Don't start with the expert or abstract topic — start with the moment the ICP is already living through. Don't add Calendly on the landing page. Don't embed the webinar platform before launch (use waitlist placeholder).

### Coaching / trajectory page (`/coaching/[slug]`)

- **Purpose:** High-intent conversion. Explain the coaching offer and route to Calendly.
- **Primary CTA:** Calendly discovery call.
- **Schema:** `Service` + `FAQPage`.
- **Conversion behavior:** Outcomes → methodology → what's included → FAQ → Calendly embed.
- **AI citation:** Outcomes block first sentence.
- **What not to do:** Don't put Calendly on every page — only coaching/trajectory/high-ticket pages.

### Quiz (`/quiz`)

- **Purpose:** Cold-traffic router. Maps visitor to archetype → cluster.
- **Primary CTA:** Answer questions → get result.
- **Schema:** `WebPage` + `BreadcrumbList`.
- **Conversion behavior:** Questions → email gate (optional) → archetype result with cluster bridge.
- **AI citation:** Not applicable (interactive component).
- **What not to do:** Don't fire `quiz_started` on every answer — only on the first.

### Archetype result page (`/archetypen/[slug]`)

- **Purpose:** Personalized result that bridges to the right cluster + products.
- **Primary CTA:** Cluster primary product. Cluster hub link for deeper learning.
- **Schema:** `WebPage` + `BreadcrumbList`. Optional `DefinedTerm` for archetype concept.
- **Conversion behavior:** Result explanation → recommended products → cluster bridge ("Vertiefe dein Ergebnis") → coaching suggestion for complex cases.
- **AI citation:** `shortDescription`. First sentence of explanation.
- **What not to do:** Don't force every archetype into a cluster. Only map archetypes to clusters where the connection is genuine.

### Glossary index (`/glossar`)

- **Purpose:** Authority signal. Demonstrates expertise breadth.
- **Primary CTA:** None (authority page). Links to individual terms.
- **Schema:** `DefinedTermSet`.
- **Conversion behavior:** Alphabetical navigation → term definitions → related term links. Content collection entries link to individual pages; static entries stay as anchors.
- **AI citation:** Each definition is citable.
- **What not to do:** Don't duplicate terms across static file and content collection.

### Glossary detail (`/glossar/[slug]`)

- **Purpose:** Individual term page. Deeper explanation, related terms, linked article.
- **Primary CTA:** Linked article or cluster hub.
- **Schema:** `DefinedTerm`.
- **Conversion behavior:** Definition → long description → linked article card → related terms → back to glossary.
- **AI citation:** `definition` (full). First sentence of `longDescription`.
- **What not to do:** Don't write marketing copy in definitions. Keep them factual, standalone, 25–50 words.

### FAQ / Legal / Dashboard

- **FAQ mega-page:** `FAQPage` schema. No primary CTA — informational.
- **Legal pages** (Datenschutz, Impressum, AGB): No schema, no analytics. Required by German law.
- **Dashboard** (`/sichtbarkeit` if implemented): Internal, `noindex`. No schema.

---

## 4. Conversion copy architecture

Every commercial or hybrid page follows this persuasion sequence:

```
Recognition → Problem → Failed Solutions → Expert Mechanism → Method → Offer → Proof → CTA
```

### Eight copy rules

**1. Above-the-fold rule.**
Hit four elements in the first viewport: hook (recognizable tension), value proposition (what the visitor gets), credibility (why this expert), CTA (next action). Don't open with abstract category language.

**2. Relatability rule.**
Include a recognition section near the top using concrete lived situations, not abstract problem labels. The visitor should feel "this describes me."

**3. Failed solutions rule.**
Explain what the ICP has already tried and why it didn't fully work. Common patterns: more discipline, generic meal plans, random supplements, strict food lists, treating symptoms individually.

**4. Expert mechanism rule.**
Provide the deeper explanation for why the problem persists. Formula: "Most people think the problem is [surface]. But in many cases, [deeper mechanism] is involved. That's why [method] focuses on [pillars]." Without a mechanism, the offer feels generic.

**5. Product as logical next step.**
Products must be introduced as the practical next step after the explanation, not as random offers. Formula: "If you recognize [problem] and want [outcome], [product] helps you [specific result] without [common frustration]."

**6. Expert story rule.**
Expert pages need more than credentials. Answer: Why does this expert care? What pattern did they see? What's their unique point of view? Why should the visitor stop blaming themselves? Credentials create trust; story creates connection; point of view creates differentiation.

**7. Proof rule.**
Select testimonials for recognition, not just praise. Strong proof includes: before-state, what they'd already tried, what changed, why it felt different.

**8. CTA temperature rule.**
Match CTA to funnel temperature:
- Cold (just landed): Quiz, free guide, masterclass
- Warm (engaged, returning): Product, bundle, membership
- Hot / complex (high intent): Calendly, coaching

---

## 5. Masterclass page template

Based on the proven 13-step conversion framework. The critical rule: **masterclass pages should not start with the expert or abstract topic. They should start with the moment the ICP is already living through.**

### Structure

1. **Situational hook** — A recognizable moment. Not the topic name. Not the expert. The visitor's lived experience right now.
   > "Du machst eigentlich vieles richtig — und fühlst dich trotzdem nicht wie du selbst."

2. **Emotional tension / internal doubt** — Name the self-doubt and frustration the ICP won't say out loud.

3. **Reality check / consequence if ignored** — What happens if nothing changes. Not fear-mongering — honest observation.

4. **Reframe** — The shift in perspective. "It's not your fault. The problem isn't discipline — it's understanding how [mechanism] works."

5. **Masterclass promise** — What the visitor will understand/be able to do after watching. Concrete outcomes, not vague learning.

6. **Practical details** — Duration, format, cost (free), what to expect.

7. **What you'll learn** — 4–8 specific learning blocks. Each with a title and one-sentence description.

8. **Expert authority + personal story** — Why this expert. What they noticed. Their point of view. Photo. Credentials as supporting evidence, not the lead.

9. **Proof / testimonial** — Recognition-based testimonials. If not yet available, use placeholder content marked clearly in code.

10. **Optional stats / credibility markers** — Numbers if available (years, clients, certifications). Skip if forcing it.

11. **Recognition quotes** — Short quotes that reflect the ICP's inner voice. "Du merkst, dass dein Körper anders reagiert als früher."

12. **FAQ** — 4–6 questions addressing practical objections and expectations.

13. **Final CTA** — Email/waitlist form with clear value proposition. Anchor link from hero CTA should scroll here.

---

## 6. Product page templates

### Full / bundle product page

Hybrid sales + SEO. The longest, most persuasive page type.

Sections:
1. Hero with recognition hook + CTA
2. Problem recognition block (lived situations)
3. Failed solutions (what they've tried)
4. Expert mechanism (why the problem persists)
5. What's included (modules/chapters with outcomes)
6. Who it's for / Who it's NOT for (honesty block)
7. Product details (format, price, delivery)
8. Testimonials/proof
9. FAQ
10. Final CTA

Rules:
- Schema: `Product` + `Offer` + `FAQPage`
- No Calendly
- Auto-bridges from cluster articles via `BlogToProductBridge`

### Micro-product page

Short, low-friction. For products under ~15 EUR.

Sections:
1. Hero with clear value proposition + CTA
2. Brief problem framing (1–2 paragraphs)
3. What's included
4. Price + checkout
5. Upsell to cluster's full product
6. Brief FAQ (2–3 items)

Rules:
- No Calendly
- No extensive failed-solutions or mechanism sections
- No full cross-cluster bridge stack
- Clear upsell path to the cluster's main product
- Can be referenced as checkout bump from other products

### High-ticket / trajectory page

For coaching packages or programs over ~500 EUR.

Rules:
- May use Calendly (this is where `calendlyContext: high-ticket-only` applies)
- Follows full persuasion sequence
- Emphasizes methodology and outcomes over product contents
- Proof section critical — high-ticket needs more trust

---

## 7. Calendly rules

### Strict placement

Calendly appears ONLY on:
- Coaching / trajectory pages (always)
- High-ticket product pages (when `calendlyContext` allows)
- Quiz result pages — only for "complex-case" archetype (segment override)
- Masterclass thank-you — only for "complex-case" segment (segment override)

Calendly does NOT appear on:
- Homepage hero
- Blog articles
- Glossary pages
- Footer (as global CTA)
- Community / membership pages
- Micro-product pages
- Standard bundle / simple product pages

### Default for doc.veri-class sites

```yaml
calendlyContext: "coaching-only"
```

### Available options

| Option | Where Calendly appears |
|---|---|
| `off` | Never in this cluster |
| `coaching-only` | Only coaching/trajectory pages (default) |
| `high-ticket-only` | Only 500+ EUR product pages + coaching |
| `complex-case-only` | Only when quiz/masterclass routes to complex-case segment |
| `warm-only` | Coaching, quiz-results, masterclass-thankyou, /ueber bottom |
| `always` | Every page in cluster (rarely justified) |

### Segment overrides

Quiz archetypes and masterclass post-watch segments can override the cluster default for their specific page only. This is surgical — it doesn't change the cluster-wide setting.

---

## 8. Lead capture architecture

### Email capture abstraction (`src/lib/emailCapture.ts`)

One unified interface for all email capture points. Four capture sources:

| Source | Builder | Submit method |
|---|---|---|
| Quiz email gate | `buildQuizPayload(email, {archetype})` | `submitEmailCapture()` — direct import (React) |
| Masterclass waitlist | `buildMasterclassPayload(email, {masterclassSlug})` | `data-email-payload` → inline script (Astro) |
| Newsletter footer | `buildNewsletterPayload(email, {route})` | `data-email-payload` → inline script (Astro) |
| Newsletter inline | `buildNewsletterPayload(email, {route})` | `data-email-payload` → inline script (Astro) |

### Payload structure

Every submission carries:
```
email, source, tags[], cluster?, route?, archetype?, product?, masterclassSlug?
```

Tags are auto-generated per source (e.g. `quiz_lead`, `archetype_die-perimenopausale`, `source_footer`).

### Provider pattern

- **Now:** Placeholder mode. Logs structured payload to console.
- **Future:** Set `VITE_EMAIL_PROVIDER=mailerlite` in `.env`. Client-side `submitEmailCapture()` POSTs to `/api/email-capture`. Serverless endpoint holds API key, maps tags, calls ESP API.
- **Hard rule:** Never expose ESP API keys in frontend code.

### UX states

Every form has three states:
1. **Loading** — Button text changes to "Einen Moment...", input + button disabled
2. **Success** — Form hidden, success message shown
3. **Error** — Button re-enabled, error message shown

---

## 9. Conversion asset visibility rules

A conversion asset is not finished when the page exists. It is finished when visitors can discover it from the right places in the site journey.

This applies to:
- Quiz
- Masterclass
- Lead magnets
- Micro-products
- Coaching/trajectory offers
- Free resources

### Rule of thumb

Every major conversion asset should have at least three discovery surfaces:

1. **One navigation-level surface** — main nav link, sub-menu item, or persistent header element.
2. **One homepage or hub surface** — a dedicated section or card on the homepage or the relevant cluster hub.
3. **One contextual content surface** — inline mention, bridge card, or CTA inside related articles.

### Masterclass visibility

A masterclass page must be discoverable from:

1. **Main navigation** — a clear nav link such as "Masterclass" or under a "Kostenlos" / "Free resources" menu.
2. **Homepage** — a dedicated section or card explaining the masterclass promise and linking to the masterclass page.
3. **Relevant cluster hubs** — if the masterclass is the primary conversion asset for a cluster, the hub must feature it prominently.
4. **Relevant articles** — articles in related clusters may bridge to the masterclass when the visitor is still cold/warm and not yet product-ready.
5. **Footer or resource area** — a subtle footer/resource link is allowed for free assets like masterclasses and quizzes.

### What not to do

- Do not create hidden conversion pages that are only accessible by direct URL.
- Do not rely only on paid ads to send traffic to a masterclass.
- Do not place Calendly in the same visibility pattern as free assets — Calendly is for warm/hot leads only (see §7).
- Do not show every asset everywhere; match visibility to funnel temperature.

### CTA tracking

Discovery clicks to conversion assets should have their own analytics events. A CTA click and a form submit are different events.

Example:

```js
trackEvent('masterclass_cta_click', {
  source_page_type: 'homepage',
  source_page_slug: 'home',
  masterclass_slug: 'hormone-histamin-zyklus-superpower'
})
```

Do not use signup events for link clicks.

---

## 10. Social storytelling grid

### What it is

A curated grid of 3–6 Instagram-style cards on the homepage. Each card links to a specific Instagram post/reel. NOT a live Instagram embed.

### Why curated, not live

Live Instagram embeds hurt performance, introduce third-party tracking (GDPR friction in DE/EU), and give zero visual control. Curated cards achieve the same trust signal without the cost.

### Post mix

- 2 expert posts (educational, demonstrate authority)
- 2 relatable/story posts (everyday moments, build connection)
- 1 behind-the-scenes post (humanity, transparency)
- 1 soft commercial post (product or lead magnet)

### Implementation

`SocialStorytellingGrid.astro` reads from `src/data/socialPosts.ts`. Each post has: title, image path, external URL, post type badge. Cards open externally. Click fires `social_card_click` analytics event.

### Placement

```
... content sections → Social storytelling → Newsletter → Footer
```

### Rules

- No live Instagram embed
- No Instagram scripts loaded
- No false implication of being a real embed
- External links with `rel="noopener noreferrer"`

---

## 11. Schema and AI citation rules

### Schema types used

| Schema | Where |
|---|---|
| `Organization` + `Person` (founder) + `WebSite` | Homepage |
| `ProfilePage` + `Person`/`MedicalProfessional` | About page |
| `CollectionPage` + `FAQPage` + `BreadcrumbList` | Cluster hub |
| `BlogPosting` + `BreadcrumbList` | Articles |
| `Product` + `Offer` + `FAQPage` + `BreadcrumbList` | Product pages |
| `Service` + `FAQPage` | Coaching pages |
| `DefinedTerm` | Individual glossary pages |
| `DefinedTermSet` | Glossary index |
| `FAQPage` | Any page with FAQ accordion |

### ExpertPerson global node

Defined once as `@id` reference. Every page schema that needs expert attribution references it via the appropriate property (`author`, `creator`, `provider`, `founder`).

### AI citation slots

Three fixed positions per page where text must be AI-extractable:

| Position | Slot |
|---|---|
| **Slot 1** | Citable definition or primary answer (top of page) |
| **Slot 2** | First sentence of each H2 section |
| **Slot 3** | First sentence of each FAQ answer |

Outside these slots: human prose. Not everything needs to be "optimized."

### Citable text rules

- Stands alone (no "as we discussed earlier")
- Definitions: 25–50 words. Inline sentences: 15–35 words.
- Subject-verb-object structure, no leading subordinate clause
- Includes the topic noun explicitly (not "it" or "this")
- Factual claim, not opinion or marketing copy
- If one sentence isn't enough, use two short sentences instead of one long one

### Anti-patterns

- Don't stack `HowTo` on every article — only when explicit numbered steps exist
- Don't add `Review` schema without real reviews
- Don't force ExpertPerson onto schema types that don't have an attribution property

---

## 12. Analytics event taxonomy

### Core events

| Event | When | Key props |
|---|---|---|
| `cluster_pageview` | Any cluster-context page loads | cluster, page_type, page_slug |
| `product_cta_click` | Buy button clicked | product, product_type, product_cluster, source_page_type |
| `cross_cluster_link_click` | Cross-cluster bridge clicked | source_cluster, target_cluster |
| `social_card_click` | Social grid card clicked | platform, post_url |
| `masterclass_waitlist_signup` | Waitlist form submitted | masterclass_slug, page_type |
| `quiz_started` | First answer submitted (fires once) | page_type |
| `quiz_completed` | Final question answered | archetype, cluster |
| `quiz_email_captured` | Email gate submitted | archetype, provider |
| `discovery_call_click` | Calendly widget viewed/clicked | source_page_type, source_cluster |
| `newsletter_signup` | Newsletter form submitted | page_type, page_slug, locale |

### Future events (require webhooks/server)

| Event | Source | When |
|---|---|---|
| `product_checkout_completed` | Plug-and-Pay webhook | Purchase confirmed |
| `coaching_booked` | Calendly webhook | Booking confirmed |
| `masterclass_watched` | Webinargeek / client-side | Video reached 75%+ |
| `masterclass_segment_assigned` | Thank-you page | Viewer self-selects post-watch segment |

### Rules

- Every event carries `cluster` context when available
- Cross-cluster events carry both `source_cluster` and `target_cluster`
- Client-side events are reliable for pageviews/clicks, unreliable for purchases
- Webhook events are source of truth for revenue and bookings

---

## 13. Implementation standards

Hard rules for Claude Code and future implementers.

1. **No duplicate source of truth.** Cluster YAML owns strategy. Content frontmatter owns membership. Don't put article lists in YAML. Don't put routing logic in frontmatter.

2. **No hardcoded pillar-to-cluster shortcuts.** Use `getClusterArticles()`, `getClusterGlossary()`, etc. Don't query by pillar slug to find cluster content.

3. **No broken links.** Every internal link must resolve to a built page. Verify with build + link check after each slice.

4. **No Calendly leakage.** Calendly must only appear on pages allowed by `calendlyContext`. Verify by grep across all built pages after changes.

5. **No live Instagram embed.** Social storytelling grid uses curated cards with external links. No Instagram SDK, no embedded iframes.

6. **No fake schema stacking.** Only stack schema types the page's content actually justifies. No `HowTo` without numbered steps. No `Review` without real reviews.

7. **Build must pass after each slice.** Zero errors. Check page count (should only increase when adding new routes).

8. **Prefer vertical slices over broad refactors.** Build one cluster end-to-end before starting the next. Don't scatter half-finished features across the site.

9. **Graceful fallbacks.** Components must render nothing (not crash) when referenced content doesn't exist yet. This enables building incrementally.

10. **No API keys in frontend.** Email capture, analytics, and third-party integrations that need secrets must route through a serverless endpoint.

---

## 14. Reference implementation

The Histamin Vertical Slice is the first proven implementation of this template. It demonstrates the full funnel:

```
/quiz
  → /archetypen/die-perimenopausale (cluster bridge: "Vertiefe dein Ergebnis")
    → /themen/histamin-und-hormone (cluster hub: auto-rendered from YAML)
      → /blog/histamin-und-hormone (article with BlogToProductBridge)
        → /produkte/histamin-bundle (hybrid product page)
```

Supporting routes: 3 glossary detail pages, masterclass waitlist placeholder, micro-product, Calendly on coaching only.

Proven principles: source-of-truth split, hub-as-rendered-config, strict Calendly placement, cluster analytics props, micro-product handling, AI citation/DefinedTerm layer, email capture without API key exposure.

**40 pages built, zero errors.** See `HISTAMIN_VERTICAL_SLICE_V1.md` for the full file inventory.

---

## 15. Multilingual / International Expert Sites

The current doc.veri implementation is German-only, but the expert-brand template must support multilingual sites (e.g. Joost's own future site in Dutch, Spanish, and English).

### Core principle

Cluster strategy is language-independent. Page copy, route slugs, SEO metadata, schema text, CTA labels, and internal links are locale-dependent.

The stable cluster ID stays the same across languages:

```yaml
slug: geo-local-seo
```

But every locale can have its own:
- Route segment and `hubSlug`
- `title`, `shortTitle`, `citableDefinition`, `hubIntro`
- SEO title and description
- FAQ copy
- CTA labels
- Product/service copy
- Glossary definitions
- Testimonials/proof (if market-specific)

### Example cluster config

```yaml
slug: geo-local-seo

locales:
  nl:
    hubSlug: ai-vindbaarheid-lokale-bedrijven
    title: "AI-vindbaarheid voor lokale bedrijven"
    citableDefinition: "..."
  es:
    hubSlug: visibilidad-ai-negocios-locales
    title: "Visibilidad en IA para negocios locales"
    citableDefinition: "..."
  en:
    hubSlug: ai-visibility-for-local-businesses
    title: "AI Visibility for Local Businesses"
    citableDefinition: "..."
```

Commercial strategy can stay shared unless the market requires different positioning:
- `primaryProduct` / `primaryService`
- `leadMagnets`
- `crossClusters`
- `analytics`
- `calendlyContext`
- Conversion routes

Copy and routes are always locale-specific.

### Route patterns

The template must support both patterns:

**Default locale at root:**
```
/             (default locale, e.g. NL)
/es/          (secondary)
/en/          (secondary)
```
Useful when one market is primary.

**All locales prefixed:**
```
/nl/
/es/
/en/
```
Useful when all languages are equally important or the root acts as a language selector.

Do not hardcode German route segments like `/themen`, `/produkte`, `/glossar`. Route segments must be configurable per locale.

```
DE: /themen/histamin-und-hormone
NL: /nl/themas/histamine-en-hormonen
EN: /en/topics/histamine-and-hormones
ES: /es/temas/histamina-y-hormonas
```

### Content collection rules

Localized content entries should include:

```yaml
locale: nl
translationKey: histamin-und-hormone-article
cluster: histamin
secondaryClusters:
  - perimenopause
```

- Pages with the same `translationKey` are alternates of each other.
- The `cluster` slug remains stable across languages.
- The `translationKey` groups translated versions of the same page.

### Hreflang

Every translated page should output hreflang alternates for all available language versions:
- `hreflang="nl"`
- `hreflang="es"`
- `hreflang="en"`
- `hreflang="x-default"` where appropriate

Do not forget hreflang on: homepage, cluster hubs, articles, products/services, glossary detail pages, masterclass pages, coaching pages.

### Canonical

Each translated page should have a self-canonical. Do not canonical all translated pages back to the default language — that tells search engines the translated pages are not independent indexable pages.

### Internal linking

Internal links must stay within the current locale by default. A Spanish article should link to Spanish hubs, services, products, and glossary pages when those translations exist.

If a translated target does not exist:
- Hide the link, or
- Clearly fall back to a default-language page with an explicit language indicator

Do not silently mix languages in primary navigation, product CTAs, or content bridges.

### Schema

Schema is locale-aware. Translate:
- `headline`, `description`
- FAQ questions and answers
- Breadcrumb labels
- Product/service descriptions
- Article snippets
- Glossary definitions

The global `ExpertPerson` or `Organization` `@id` can remain stable across locales:

```json
{
  "@id": "https://example.com/#expert"
}
```

But page-level schema URLs, names, and descriptions should match the active locale.

### Analytics

Every analytics event should include `locale`:

```js
trackEvent('product_cta_click', {
  cluster: 'geo-local-seo',
  locale: 'es',
  product: 'geo-deep-dive',
  source_page_type: 'article'
})
```

This allows dashboards to compare cluster performance per language.

### What not to do

- Do not create unrelated cluster systems per language. One cluster, multiple locales.
- Do not hardcode German (or any language's) route segments into the reusable template.
- Do not mix languages in primary CTAs or navigation.
- Do not duplicate commercial strategy across languages unless the market positioning truly differs.
- Do not forget hreflang, canonical, and locale-aware schema.
- Do not assume every page must be translated immediately. It is acceptable to translate only priority pages first, as long as fallbacks are explicit and links do not break.

---

## 16. Future rollout order

Recommended sequence after the Histamin slice is stable:

**For multilingual client sites:** Decide default locale, secondary locales, route pattern, and translation scope during intake — before building the first cluster.

1. **Replace temporary integrations**
   - Real ESP integration (MailerLite/Kit) via `/api/email-capture` serverless endpoint
   - Replace NXG-Media Calendly URL with client's own Calendly
   - Add Webinargeek embed to masterclass page

2. **Replace placeholder content**
   - Real Instagram post URLs in `socialPosts.ts`
   - Real OG image for Glutenfrei Superpower
   - Real testimonials on masterclass page (currently marked ⚠ PLACEHOLDER)

3. **Build Hormone/Zyklus cluster**
   - New `hormone-zyklus.yaml` (masterclass-led, different routing pattern)
   - Tag existing hormone/zyklus articles
   - Hub auto-renders

4. **Build Perimenopause cluster**
   - New `perimenopause.yaml`
   - Tag existing perimenopause content
   - Cross-cluster bridges from Histamin already defined in YAML

5. **Build Ernährung cluster**
   - Only when enough content exists (currently just the micro-product)
   - `ernaehrung.yaml` placeholder exists as TODO reminder

6. **Polish**
   - `discovery_call_click` → real Calendly booking callback
   - Dashboard / visibility page if needed
   - Webhook integrations (Plug-and-Pay, Calendly) for server-side revenue events

Each cluster follows the same vertical-slice pattern: YAML → hub → tag content → verify funnel → verify build. Don't start the next cluster until the current one is stable.
