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

## 6. Editorial content formatting rules

Raw markdown is not acceptable as final visual output for expert sites. Every page type that renders markdown (blogs, products, coaching, masterclass, archetypes) must use the `@tailwindcss/typography` plugin with a brand-configured `prose` class.

### Typography baseline

| Property | Blog | Product |
|---|---|---|
| Base font size | 18px (`prose-lg`) | 18px (`prose-lg`) |
| Line height | 1.8 | 1.8 |
| Paragraph spacing | ~1.35em | ~1.35em |
| H2 margin-top | ~2.5em | ~2.5em + border-top separator |
| H3 margin-top | ~2em | ~2em |
| Max width | `max-w-3xl` (720px) | `max-w-3xl` (720px) |

### Heading hierarchy

- H2s are Playfair Display (serif heading font), large, with strong top margin. They create clear section boundaries.
- H3s are visually distinct from body text, smaller than H2 but still obviously headings.
- H4s may use accent color for sub-sections (especially in product pages).
- No heading should blend into body text.

### Lists

- Bullet and numbered lists have proper item spacing (not cramped single-spaced lines).
- Bullet color uses the accent color for visual interest.
- Long symptom lists, step lists, and "what to do" lists should be highly scannable.

### Blockquotes as callouts

Markdown blockquotes (`>`) must render as editorial callout boxes, not plain indented text:
- Light background (`bg-alt`)
- Left accent border (3px, `primary-light`)
- Rounded right corners
- Normal font-style (not italic)
- Used for: key insights, expert notes, reality checks, practical next steps, warnings/nuance.

### Product prose

Product markdown uses a `prose-product` modifier that adds:
- H2s with top border separator (visual section breaks for long sales pages)
- H4s in accent color (for sub-item headings like "1. Module Name (Wert: 37 €)")

Product pages should not render as one dense prose block. The structured sections (includes cards, for-you/not-for-you, FAQ) outside the markdown complement the prose content.

### Blog prose

Blog articles should feel like editorial guides. The prose plugin handles rhythm; the content author handles structure:
- Short paragraphs (max 3–4 visual lines)
- Frequent H2 section breaks
- Bulleted symptom/step lists instead of inline enumeration
- Blockquote callouts for key takeaways

### Implementation

All typography configuration lives in `tailwind.config.mjs` under the `typography` key. Brand colors, heading fonts, link styles, and spacing are centralized there — individual layouts only need `prose prose-lg max-w-none` (plus `prose-product` for product pages).

Additional callout/product styling lives in `global.css` under `@layer components`.

### Template rule

Every markdown-rendered content area must use the typography plugin's `prose` class. No layout should attempt to style markdown with manual utility classes — that approach breaks when the plugin handles the same properties.

### Blog expert-lens rules

In expert-brand sites, blog articles must not read like generic SEO encyclopedia entries. An article can be structurally correct, SEO-friendly, and AI-citable while still feeling generic if it lacks the expert's lived observations, client patterns, or point of view.

Every commercially relevant blog article should include at least one of:

- **Expert observation** — something the expert sees repeatedly that contradicts common assumptions
- **Personal mini-story** — a brief, specific moment from the expert's practice or athletic life
- **Client/patient pattern** — "What I keep seeing is…" framing that builds authority through specificity
- **Myth-to-reframe block** — names a common misconception, then reframes it with the expert's clinical lens
- **"What generic advice misses" section** — explicitly calls out what standard health content gets wrong for this audience
- **Recognition opening** — a felt moment the reader identifies with before the educational explanation begins

The article still needs AI-citable structure, clear H2/H3 headings, and factual definitions. The expert layer is what makes it belong to this expert rather than any other health site.

#### Recognition opening rule

Commercially relevant blog articles should not open like encyclopedia entries. Instead of:

> "Hormone beeinflussen viele Prozesse im weiblichen Körper…"

Start with a moment the reader recognizes:

> "Du machst eigentlich vieles richtig — isst gesund, trainierst, schläfst genug — und trotzdem bleibt die Müdigkeit."

Then move into the educational explanation. The recognition opening validates the reader's experience before explaining the biology.

#### Expert-lens callout

Where appropriate, articles should include a subtle editorial callout using the `personal-lens-callout` CSS class (rendered via `<aside>` in markdown). Suitable labels:

- "Verena's perspective" / "Verenas Perspektive" (default)
- "What I keep seeing" / "Was mir immer wieder auffällt"
- "What most advice misses" / "Was die meisten Ratgeber übersehen"
- "The reframe" / "Der andere Blickwinkel"
- "In practice" / "In der Praxis"

Use for: patient/client patterns, personal observations, myth-to-reframe moments, expert POV, anti-generic-advice framing. The callout should feel calm, premium, and editorial — not loud, salesy, or confessional.

In `.md` articles, use this HTML pattern:

```html
<aside class="personal-lens-callout" role="note">

**Verenas Perspektive:** Callout text here.

</aside>
```

In `.mdx` articles, import the `PersonalLensCallout.astro` component instead.

#### Blog conversion balance

Blogs should not become hard landing pages. The balance:

**Keep unchanged:**
- Educational depth and factual accuracy
- AI citation slots (definitions, structured answers)
- Schema.org Article markup
- Clear H2/H3 hierarchy
- Product bridge at the end (via `BlogToProductBridge` or `relatedProducts`)

**Strengthen with expert lens:**
- Recognition opening (felt moment → education)
- Expert point of view (what generic advice misses)
- Soft reframe (what the reader wrongly blames herself for)
- Anti-generic advice angle (why this topic is different for women)
- Soft product bridge (logical next step, not pressure)

A good expert-brand article should answer:

1. What does this expert see that generic advice misses?
2. What pattern does the expert notice repeatedly?
3. What does the reader wrongly blame herself for?
4. What is the calmer, more accurate reframe?
5. What is the logical next step if the reader wants structure?

#### Blog expert-lens anti-patterns

- Do not turn every article into a personal diary
- Do not add dramatic medical claims for attention
- Do not replace factual explanation with Instagram-style punchlines
- Do not use expert callouts as disguised sales blocks
- Do not remove AI-citable definitions or schema-relevant headings
- Do not rewrite articles entirely — layer the expert lens onto existing structure

The target tone balance: hooks/callouts are human, specific, and recognizable. Body copy is calm, medically grounded, and clear. CTAs and product bridges are practical and soft.

---

## 7. Product page templates

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

### Bundle upsell logic

If a standalone product is part of a larger bundle or naturally leads into a fuller product, the product page shows a clear bundle upsell block. This is different from generic related products.

- **Generic related products** answer: "What else might be relevant?"
- **Bundle upsell** answers: "Would the fuller package be a better next step?"

Use this for: mini-products, quick-start guides, single-topic products included in a larger bundle, entry offers that lead to a complete method.

Implementation:
- `partOfBundle` field in product frontmatter: `{ product, reason, label?, ctaLabel? }`
- `BundleUpsellBlock.astro` component — renders after "What's included", before target audience
- Resolves bundle product from content collection, renders nothing if target doesn't exist
- Does NOT render on the bundle page itself
- Analytics: `bundle_upsell_click` event with `target_product` property
- Localized URLs and copy via `product.bundleEyebrow`, `product.bundleHeadline`, `product.bundleCta`

Do not render bundle upsells when: the product IS the bundle, the target bundle does not exist, or the relationship is weak/artificial.

### High-ticket / trajectory page

For coaching packages or programs over ~500 EUR.

Rules:
- May use Calendly (this is where `calendlyContext: high-ticket-only` applies)
- Follows full persuasion sequence
- Emphasizes methodology and outcomes over product contents
- Proof section critical — high-ticket needs more trust

---

## 8. Expert E-E-A-T / About page

The About page is not a simple biography. For expert-brand websites, it is a core trust and authority page that directly affects conversion, AI citability, and E-E-A-T signals.

### Purpose

The About page answers:
1. Why should this expert be trusted?
2. What does this expert see that generic advice misses?
3. Why does this expert care about this problem?
4. What is their point of view?
5. What qualifies them to teach or guide this topic?
6. Where are the boundaries of their advice?

### Required sections

1. **Hero with positioning** — not just "about [name]", but why this expert is the right person for this topic
2. **Why the brand exists** — origin story: the pattern the expert kept seeing, what generic advice gets wrong
3. **What they noticed in practice** — patient/client patterns: real symptoms, normal lab values, self-blame, fragmented treatment
4. **Expert point of view** — specific beliefs and positions, not generic "passionate about helping" copy
5. **Medical/professional background** — credentials, qualifications, education. Only what is real and verifiable.
6. **Expertise areas** — cards or tags showing topic coverage
7. **How the method works** — 3-4 step framework: recognize patterns, understand mechanisms, choose next step, take action
8. **Personal / real-life lens** — the expert as a human: sport, life outside protocols, anti-overoptimization
9. **Boundaries / disclaimer** — educational content, not medical treatment. Coaching as complement, not replacement.
10. **CTA** — primary: quiz or offers. Secondary: coaching or contact. Locale-aware.

### Copy rules

Avoid generic expert-bio copy:
- "passionate about helping women"
- "empowering women to take control of their health"
- "holistic wellness journey"
- "unlock your potential"

Use specific expert-brand copy instead:
- what the expert repeatedly sees
- what generic advice misses
- what the reader wrongly blames themselves for
- what the expert believes should change
- why their approach is different

The About page should make the visitor feel: "This expert understands the problem more deeply than generic advice."

### Schema guidance

Required:
- `ProfilePage`
- `Person` or relevant professional subtype (`MedicalProfessional`)
- `BreadcrumbList`
- `sameAs` (social links if available)
- `knowsAbout` (expertise topics)
- `image`, `jobTitle`, `description`

Do not add fake credential schema. Only mark up credentials actually represented in the content.

---

## 9. Calendly rules

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

## 10. Lead capture architecture

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

## 11. Conversion asset visibility rules

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
- Do not place Calendly in the same visibility pattern as free assets — Calendly is for warm/hot leads only (see §8).
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

## 12. Social storytelling grid

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

## 13. Schema and AI citation rules

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
- Don't force ExpertPerson onto schema types that don't have an attribution property

---

## 14. Proof assets: testimonials, reviews and case studies

Expert-brand websites need proof assets to make trust concrete.

### Supported proof assets

- Short testimonials (name, text, rating, outcome)
- Product reviews (product-specific testimonials with star rating)
- Coaching/client quotes (featured testimonials)
- Transformation stories (before/after context)
- Case studies (deeper narrative)
- Expert credibility markers (qualifications, credentials)

### Where proof appears

| Page type | Proof function |
|---|---|
| **Homepage** | Broad trust and recognition (TestimonialSlider + Review schema) |
| **Product pages** | Product-specific proof (product testimonials via TestimonialSlider) |
| **Coaching pages** | Fit, trust and outcome proof (featured coaching testimonials) |
| **Masterclass pages** | Recognition and authority (inline blockquotes) |
| **Case study pages** | Deeper transformation stories (future content type) |

### Strong proof includes

- Before-state (what the person was struggling with)
- What the person had tried before
- What changed
- Why this method felt different
- Specific language from the ICP (ideal customer profile)

### Data model

Testimonials live in `src/data/testimonials.ts` with this interface:

```typescript
interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  photo?: string;
  text: string;
  rating?: number;
  productSlug?: string;
  featured?: boolean;
  locale?: Locale;
}
```

Product pages use `getProductTestimonials(slug, max, locale)` which returns product-specific reviews plus general coaching reviews to fill the section.

### Schema approach

- `Product` schema includes `Review` and `AggregateRating` when testimonials with ratings exist
- Homepage uses standalone `Review` schema objects referencing the Organization
- `Service` schema for coaching pages (testimonials are visual-only, no Review schema on Service yet)
- `FAQPage` only when visible FAQ accordion exists

### Case studies (future content type)

Case studies can be added as a content collection when the expert has deeper transformation stories. Recommended structure:

- Routes: `/erfahrungen/[slug]` (DE) / `/en/cases/[slug]` (EN)
- Schema: `Article` or `CreativeWork` + `BreadcrumbList`
- Content model: title, client (anonymized), before-state, intervention, outcome, timeline, quote

Do not overbuild this until real case study content exists.

---

## 15. Analytics event taxonomy

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

## 16. Implementation standards

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

11. **Offer card visual anchors.** `ServicesGrid` cards must use visual anchors that match the offer type: product mockups (cover fan or stack) for digital products, expert/client imagery for coaching, group/community imagery for memberships. Images must be local assets processed through Astro `<Image>` (WebP, density variants, lazy loading). Never use external runtime image sources (CDN URLs, hotlinked images, Instagram embeds). If no suitable image exists yet, the card renders text-only — don't use generic stock placeholders.

12. **Multilingual QA is mandatory.** Do not mark a locale complete after route creation only. Route parity, component localization, form localization, testimonial localization, journey/offer parity, schema language correctness, and a built-HTML audit for source-language leaks must all pass. Every `t()` call in shared components must receive the active locale. Global site data (`siteConfig.tagline`, founder credentials, navigation labels) must be locale-aware. See §17 for the full checklist and common leak sources.

13. **Anti-generic copy rule.** Avoid generic AI-style wellness copy. Do not use vague phrases like "unlock your full potential", "take control of your health", "balance your hormones naturally", "become the best version of yourself", "holistic wellness journey", "nourish your body and mind", "transform your life", or "optimize your health." Before accepting any headline, section intro, or product copy, ask: could this sentence appear on any generic women's health website? If yes, rewrite it with a concrete moment, the expert's point of view, or specific female physiology. The site should feel like a real person with a real opinion — not a template with wellness fill-in-the-blanks. Heroes and hooks should be human and recognizable. Body copy should be calm, medical, and clear. CTAs should be concrete, practical, and not pushy.

14. **Product pages should not create pressure.** Conversion blocks must not make the product feel like another system the visitor has to perform perfectly. The product should feel like clarity and structure — not another strict rulebook. Add copy that reassures: you don't need to do everything perfectly, this is practical and self-paced, the goal is understanding patterns, not controlling every detail.

15. **Mobile tap targets must be at least 44×44px.** Every interactive element (links, buttons, form inputs) must meet the 44×44px minimum tap target on viewports below `lg` (1024px). This applies to navigation links, language switcher items, icon buttons, footer links, and inline text links in mobile menus. Use `min-h-[44px] min-w-[44px]` or a responsive CSS class with a `@media (max-width: 1023px)` rule. Desktop can stay compact. Common offender: small utility links (language switcher, social icons, breadcrumbs) that render at `text-xs` with no padding — technically visible but impossible to tap accurately on a phone.

16. **SEO/GEO audit rules.** Run `node scripts/seo-audit.mjs` after every build that changes page structure, titles, descriptions, headings, or schema. The audit must pass with **0 critical issues**. Rules enforced:

    - **Titles:** Every page must have a unique `<title>` between 20–60 characters. Listing/index pages must include a keyword descriptor after the section name (e.g. "Produkte — Digitale Guides & Kurse | doc.veri", not just "Produkte | doc.veri"). Never duplicate the same title across DE/EN — the German page needs a German title.
    - **Descriptions:** Every public page must have a unique `<meta name="description">` between 50–155 characters. Don't use long `siteConfig` fields (like `founder.description`) as page descriptions — write a dedicated short version.
    - **Heading hierarchy:** Every page must have exactly one `<h1>`. Headings must not skip levels (H1→H3 or H1→H4 is invalid). Components that render headings (forms, cards, CTAs) must not use heading tags for decorative/label text — use `<p>` with heading-like styling instead. The `DefinitionBlock` component must render `<h1>`, not `<h2>`, since it's the only title on hub/topic pages.
    - **Canonicals:** Every page must have a `<link rel="canonical">` and a matching `<meta property="og:url">`. Layouts that set `noindex` still need canonicals.
    - **Hreflang:** Every page with a translation pair must have bidirectional `<link rel="alternate" hreflang>` tags. If page A links to page B, page B must link back to A.
    - **Structured data:** Every public content page must have at least one JSON-LD schema block. Legal/admin pages are exempt.
    - **`html lang`:** Must match the page's actual language (`de` or `en`).

---

## 17. Reference implementation

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

## 18. Multilingual / International Expert Sites

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

## 19. Multilingual QA and Localization Completeness

Multilingual implementation is not complete when translated routes exist. A locale is only complete when the full visitor experience is localized: routes, content, shared components, testimonials, forms, schema, CTAs, navigation and offer journeys.

Route parity is the first layer. Localization completeness is the second layer.

### 1. Route parity is not enough

A German and English page can both exist, but the English page is still incomplete if it contains:

- German testimonials or review copy
- German form placeholders
- German CTA labels
- German breadcrumbs
- German FAQ answers
- German product-card labels
- German global taglines
- German schema text
- missing offer blocks
- missing community/membership blocks
- broken or missing language switcher
- primary CTAs linking back to German pages

A multilingual site must pass both checks:

1. **Route parity** — every important public page has a counterpart.
2. **Content and journey parity** — the translated experience contains the same core sections, CTAs, trust elements and offer paths.

### 2. Shared components must be locale-aware

Every shared component must accept or infer `locale`.

This includes:

- Header
- Footer
- Newsletter forms
- CTA bands
- Product cards
- Blog-to-product bridges
- Product layouts
- Hybrid product layouts
- Coaching layouts
- Testimonial sliders
- FAQ accordions
- Breadcrumbs
- Language switcher
- Social/storytelling grids
- Lead magnet forms
- Masterclass forms
- Calendly embed
- Quiz email gate

Do not hardcode German or English strings inside reusable components.

Every `t()` call inside a shared component must receive the active locale:

```ts
t('newsletter.placeholder', locale)   // correct
```

Avoid this inside shared components:

```ts
t('newsletter.placeholder')           // wrong — defaults to source language
```

because it will usually default to the source language and leak German into English pages.

### 3. Global site data must be localized

Global objects such as `siteConfig`, founder data, taglines, credentials and navigation labels must be locale-aware.

Common leak sources:

- `siteConfig.tagline`
- `siteConfig.founder.role`
- `siteConfig.founder.description`
- `siteConfig.founder.qualifications`
- global footer text
- global schema descriptions
- organization/founder schema
- navigation data

Allowed patterns:

```ts
tagline: {
  de: "Frauen-Gesundheit — wissenschaftlich fundiert, ohne Bro-Science",
  en: "Women's health — evidence-based, practical and without bro-science"
}
```

or locale-specific override objects for founder/about content.

### 4. Testimonials and reviews must be locale-aware

Testimonials must be localized.

Allowed patterns:
- separate testimonial sets per locale
- testimonial objects with a `locale` field
- translated placeholder testimonials for demo/template sites

Rules:
- German pages show German testimonials.
- English pages show English testimonials.
- Do not show German reviews on English pages unless explicitly labelled as original-language reviews.
- Do not remove testimonials from one locale if the other locale has them, unless there is a strategic reason.
- Product layouts and homepage testimonial sliders must pass the active locale into testimonial getters.

Example:

```ts
getProductTestimonials(productSlug, locale)
getTestimonials(locale)
```

### 5. Forms must be fully localized

All form UI must be localized:

- input placeholders
- labels, including screen-reader-only labels
- button labels
- loading states
- success messages
- error messages
- consent text
- helper text

Example:

DE:
```
Deine E-Mail-Adresse
Anmelden
Einen Moment…
Danke!
Ein Fehler ist aufgetreten.
```

EN:
```
Your email address
Sign up
One moment…
Thank you!
Something went wrong.
```

This applies to:
- Footer newsletter form
- NewsletterSignup component
- Masterclass waitlist form
- Lead magnet form
- Quiz email gate
- Contact forms
- Checkout/email capture forms

If inline scripts change button text during submission, pass localized text via a data attribute instead of hardcoding the source language.

Example:

```html
<form data-sending-text={t('form.sending', locale)}>
```

### 6. Offer and journey parity

If an offer appears in one locale's homepage, navigation or offer page, it should appear in the other locale too unless intentionally excluded.

Check parity for:
- product cards
- coaching cards
- membership/community cards
- quiz cards
- masterclass cards
- lead magnet cards
- footer resource links
- navigation entries
- homepage offer grids
- `/angebot` / `/en/offers`
- `/mitgliedschaft` / `/en/membership`

Do not silently remove a major offer from one locale.

Example: if the German homepage shows Produkte, Coaching and Mitgliedschaft, the English homepage should show Products, Coaching and Membership unless there is a documented strategic reason not to.

### 7. Homepage parity

For multilingual expert-brand sites, the translated homepage must not become a simplified or structurally different MVP page once full parity is the goal.

The homepage is usually the primary routing layer of the site. If its section order or CTA hierarchy differs between locales, the funnel logic becomes inconsistent.

When full multilingual parity is required, every locale homepage should follow the same journey architecture unless a strategic reason is documented.

Check parity for:

- hero CTA hierarchy
- trust bar
- approach / methodology section
- offer cards
- founder preview
- testimonials
- quiz section
- masterclass section
- social storytelling grid
- FAQ
- final CTA
- newsletter/footer

#### Hero CTA parity

Hero CTAs must preserve the same funnel logic across locales.

Example:

DE:
- Primary: Angebot entdecken
- Secondary: Quiz starten

EN:
- Primary: Explore offers
- Secondary: Take the quiz

Do not replace a quiz CTA with a masterclass CTA in one locale unless the funnel strategy intentionally differs.

#### Conversion asset visibility parity

If a conversion asset is important in one locale, it should not disappear in another locale.

Check especially:

- quiz CTA sections
- masterclass CTA sections
- lead magnets
- membership/community offer cards
- coaching cards
- product cards

A translated homepage should not silently remove quiz, masterclass, community, testimonials or founder trust sections.

#### Shared homepage components must be locale-aware

Homepage components often contain hidden hardcoded strings.

Audit these components for locale leaks:

- FounderPreview
- TestimonialSlider
- SocialStorytellingGrid
- FAQAccordion
- ServicesGrid
- TrustBar
- CTABand
- NewsletterSignup

Every shared homepage component must accept or infer `locale` and pass it to:

- `t()` translation calls
- localized route helpers
- analytics events
- CTA labels
- link URLs

#### Homepage parity QA

Before marking a multilingual homepage complete:

1. Compare section order across locales.
2. Verify hero CTA targets.
3. Verify all conversion assets appear in the same funnel role.
4. Verify no source-language UI strings remain.
5. Verify all internal links resolve.
6. Verify hreflang works both ways.
7. Verify analytics includes the active locale.
8. Verify the original locale homepage did not regress.

### 8. Language switcher rule

The language switcher should only appear when the current page has a valid alternate in the other locale.

For translated page pairs:
- DE page must link to EN counterpart.
- EN page must link back to DE counterpart.
- The switcher must not disappear on one side of a translated pair.
- The switcher must never link to a missing page.
- `translationKey` must be set on both content entries.

Common issue:

```yaml
# EN article has translationKey
translationKey: perimenopause-erkennen

# DE article missing translationKey
# result: no hreflang, no language switcher
```

Every translated content pair must share the same `translationKey`.

### 9. Schema must use the active locale

Schema must not leak source-language text into translated pages.

Check:
- `inLanguage`
- `headline`
- `description`
- `BreadcrumbList`
- `FAQPage`
- `Product`
- `Offer`
- `BlogPosting`
- `DefinedTerm`
- `Organization`
- `Person` / founder schema

The global `@id` can remain stable, but text fields should match the active locale when used on localized pages.

Common issue:

```json
"inLanguage": "de"
```

on an English article page.

### 10. Built HTML localization audit

After adding or updating a locale, run a built-output scan for source-language leaks.

For German → English projects, scan `/en/` HTML for strings such as:

```
Mehr erfahren
Jetzt kaufen
Anmelden
Deine E-Mail-Adresse
Einen Moment
Danke
Ein Fehler
Häufig
Über mich
Kundinnen
Das sagen
Bereit
Kostenlos
Zum Produkt
Weiterlesen
Sprache
Alle ansehen
Termin
Erstgespräch
Postfach
Geschafft
```

Some proper nouns are allowed, but UI copy should not leak.

Also scan for source-language text inside JSON-LD schema if SEO completeness matters.

### 11. QA checklist before enabling a locale

Before exposing a new locale or enabling the language switcher:

- Build passes.
- Zero broken internal links.
- No mixed-language primary CTAs.
- No German UI strings on English pages.
- Reviews/testimonials are localized.
- Forms are localized.
- Header/footer are localized.
- Offer blocks match across locales.
- Membership/community visibility matches across locales.
- Language switcher works both ways on translated pairs.
- Hreflang only points to existing pages.
- Canonical URLs are correct.
- Schema uses the active locale.
- Analytics events include `locale`.
- Content collections are filtered by locale, so EN entries do not generate under DE routes and vice versa.

### 12. Implementation standard

Do not mark a locale complete after route creation only.

A locale is complete only when all of the following pass:

1. route parity
2. content parity
3. component localization
4. form localization
5. testimonial localization
6. journey/offer parity
7. language switcher QA
8. hreflang/canonical QA
9. schema language QA
10. built-output source-language leak audit

---

## 20. Pre-launch external integration readiness

The site must be launch-ready without external accounts already existing. Every client project will have missing pieces at launch time (no GA, no Meta Pixel, no ESP, no payment pages, no real reviews). The template handles this through env-driven configuration and conditional rendering.

### Principle

**No external service should block the site from being deployed.** Empty env vars = silent no-op. Placeholder URLs = safe fallback. Demo content = clearly marked.

### Environment variable architecture

All external service configuration lives in `.env` (gitignored) with a documented `.env.example`. Two categories:

| Category | Prefix | Where used | Example |
|---|---|---|---|
| **Public** | `PUBLIC_` | `site.ts`, components, layouts | `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_CALENDLY_URL` |
| **Server-only** | no prefix | Serverless functions only | `MAILERLITE_API_KEY`, `PLUGANDPAY_WEBHOOK_SECRET` |

**Never put API keys, tokens, or secrets in `site.ts` or any frontend-accessible file.** Only public IDs and URLs belong in the frontend config. Server-only secrets are read by Cloudflare Workers / API routes at runtime.

### Conditional script rendering

External scripts must only render when their env var is set:

- **GA4:** `siteConfig.analytics.ga4MeasurementId && ...` — no ID, no gtag script in HTML
- **Meta Pixel:** `siteConfig.analytics.metaPixelId && ...` — no ID, no fbevents script in HTML
- **GSC verification:** `siteConfig.analytics.gscVerificationId && ...` — no ID, no meta tag
- **Calendly:** `siteConfig.external.calendlyUrl && ...` — empty URL hides the booking section on contact pages. The `CalendlyEmbed` component on coaching pages has its own URL (separate refactor when client has their own Calendly account).
- **Webinar:** `siteConfig.external.webinarUrl` — empty means masterclass stays in waitlist-only mode

### Payment URL fallbacks

Product checkout CTAs detect placeholder URLs (`example.com`, `#`, empty) and swap to a contact-page fallback:

```
isPlaceholderCheckout = url.includes('example.com') || url === '#' || !url
→ CTA links to /kontakt (DE) or /en/contact (EN)
→ Button text changes to "Kontakt aufnehmen" / "Get in touch"
→ No broken external links in the rendered HTML
```

This is locale-aware and applies to all CTA positions (hero, mid-page, bottom). When real Plug&Pay URLs are added to product frontmatter, the buy button automatically switches back.

### Email capture placeholder mode

The `emailCapture.ts` abstraction supports a `placeholder` provider that logs submissions to the console instead of calling an external API. This is the default when `PUBLIC_EMAIL_PROVIDER` is unset. Switching to a real ESP (MailerLite, Kit) requires:

1. Set `PUBLIC_EMAIL_PROVIDER=mailerlite` in `.env`
2. Create a serverless endpoint at `/api/email-capture` that reads `MAILERLITE_API_KEY` server-side
3. No frontend code changes needed — the abstraction handles routing

### Testimonial/review placeholder rules

Demo testimonials are clearly marked with a TODO comment in `src/data/testimonials.ts`. Rules:

- Demo testimonials are acceptable for design/staging but must be replaced with real ones before paid traffic or official public launch
- Each real testimonial requires explicit consent and attribution
- Never use `Review` schema on pages with demo testimonials — only add structured review data when reviews are genuine
- The `TestimonialSlider` component renders nothing when the testimonials array is empty (graceful fallback)

### Launch checklist

Before sending paid traffic or announcing publicly:

- [ ] Replace `example.com` checkout URLs with real Plug&Pay links
- [ ] Replace demo testimonials with real, consented testimonials
- [ ] Set `PUBLIC_GA_MEASUREMENT_ID` in `.env`
- [ ] Set `PUBLIC_META_PIXEL_ID` in `.env` (if running Meta ads)
- [ ] Set `PUBLIC_CALENDLY_URL` in `.env` (if offering coaching calls)
- [ ] Configure real ESP: set `PUBLIC_EMAIL_PROVIDER`, deploy serverless endpoint
- [ ] Replace NXG-Media Calendly in `CalendlyEmbed.astro` with client's own URL
- [ ] Set custom domain and update `siteConfig.url`
- [ ] Verify no `example.com` URLs remain in built HTML
- [ ] Run SEO audit (`node scripts/seo-audit.mjs`) — 0 critical issues

---

## 21. FAQ and schema coverage rules

### Four-layer FAQ strategy

FAQ content serves four distinct purposes. Every FAQ item must fit at least one layer:

| Layer | Purpose | Where |
|---|---|---|
| **Conversion / objection** | Remove purchase hesitation | Product pages, coaching, masterclass |
| **SEO / AI authority** | Citable answers for search and LLM systems | Cluster hubs, site-wide FAQ, product pages |
| **Trust / safety** | Build credibility and reduce risk perception | About, site-wide FAQ, coaching |
| **Product clarity** | Explain what's included, formats, access | Product pages |

### FAQ content rules

1. **First sentence must be standalone and citeable.** It should make sense without reading the question. AI systems extract the first sentence as the answer — never start with "Yes", "No", "It depends", or a pronoun.
2. **2–5 sentences per answer.** Long FAQ answers dilute authority and hurt scannability.
3. **Include the topic noun explicitly.** Write "The Hormone Reset Guide covers..." not "It covers..."
4. **No marketing fluff.** FAQ answers are factual, not persuasive. They should feel like doctor-patient Q&A.
5. **Each product page: 5–8 FAQ items.** Micro-products can have 4–6.
6. **Coaching pages: 5–6 FAQ items.** Must include pricing/logistics/trust objections.
7. **Site-wide FAQ: organized by category.** Categories: General, Products, Coaching, Trust & Safety, Hormones & Cycle, Nutrition & Training.

### Schema coverage rules

- `FAQPage` schema **only** on pages that have visible FAQ content (accordion details/summary elements)
- `FAQPage` schema must match visible FAQ exactly — same questions, same answers
- Never add `FAQPage` schema to pages without visible FAQ (orphan schema)
- Product pages: `Product` + `Offer` + `FAQPage` + `BreadcrumbList`
- Coaching pages: `Service` + `FAQPage` + `BreadcrumbList`
- Masterclass: `BreadcrumbList` + `FAQPage`
- Cluster hubs: `CollectionPage` + `FAQPage` + `BreadcrumbList`

### Audit tooling

`scripts/faq-audit.mjs` checks all built pages for:
- Visible FAQ items (details/summary with h3 headings)
- FAQPage JSON-LD schema presence
- Match between visible FAQ count and schema
- Orphan schemas (schema without visible FAQ)

Run after every content change: `node scripts/faq-audit.mjs`

### Anti-patterns

- Don't add 20 FAQ items to every page — premium brands are concise
- Don't duplicate FAQ items across product pages (each product has unique questions)
- Don't use FAQ for marketing copy disguised as questions
- Don't start answers with "Ja!" / "Yes!" — start with the substantive statement
- Don't use the `<details>` element for non-FAQ content (navigation, disclaimers) — the audit script counts them

---

## 22. Cluster rollout patterns

Five clusters are now live. Each follows one of three patterns. Use these when creating new clusters for other expert-brand projects.

### Pattern A: Product-led cluster (reference)

**Examples:** `histamin` (primaryProduct: histamin-bundle), `perimenopause` (primaryProduct: perimenopause-protocol)

- `primaryProduct` is set — the hub CTA drives to a product page
- Secondary products exist for cross-sell
- `calendlyContext` typically `"coaching-only"` — coaching is positioned as upsell, not default entry point
- Hub FAQ: 5–8 items combining SEO/authority + conversion objections
- Cross-cluster bridges: 2–4, linking to related topic clusters

### Pattern B: Masterclass-led cluster

**Example:** `hormone-zyklus` (primaryProduct: "", primaryConversionAsset.type: masterclass)

- No primary product — the masterclass is the conversion asset
- `primaryConversionAsset.type: masterclass` with slug, title, and CTA text
- Products listed under `secondaryProducts` or `crossSellProducts` for post-masterclass follow-up
- `calendlyContext: "complex-case-only"` — coaching only for edge cases
- Hub FAQ: 5–8 items, heavier on education and authority

### Pattern C: Light / support cluster

**Examples:** `ernaehrung` (primaryProduct: food-guide), `training` (primaryProduct: runners-guide)

- Minimal content footprint — 1–2 articles, 1–2 products
- Serves as product-support context, not standalone conversion funnel
- `calendlyContext: "off"` — no coaching routing
- Hub FAQ: 4–6 items, focused on product scope and audience fit
- Cross-cluster bridges: 2–3, linking back to heavier clusters
- Fine to defer or keep light until enough content exists to justify a full cluster

### Cluster creation checklist

For every new cluster, complete in order:

1. **YAML config** — Create `src/data/clusters/{slug}.yaml` following the reference pattern. Include `locales.en` block if the site is multilingual.
2. **Content tagging** — Add `cluster: "{slug}"` and `secondaryClusters` to all articles, products, and glossary entries that belong.
3. **Cross-cluster bridges** — Update both the new YAML and existing cluster YAMLs with bidirectional bridge objects.
4. **Hub FAQ** — Write 4–8 curated FAQ items for the hub page (DE + EN if multilingual).
5. **Build verification** — Run `npm run build` and confirm the hub route generates at `/themen/{hubSlug}` (DE) and `/en/topics/{hubSlug}` (EN).
6. **FAQ audit** — Run `node scripts/faq-audit.mjs` and confirm hub pages show correct FAQ count and schema.
7. **No pillar collision** — Verify that `hubSlug` doesn't match any existing pillar `pageSlug`.

### Current cluster inventory

| Cluster | Pattern | Primary product / asset | Hub DE | Hub EN |
|---|---|---|---|---|
| `histamin` | Product-led | histamin-bundle | `/themen/histamin-und-hormone` | `/en/topics/histamine-and-hormones` |
| `hormone-zyklus` | Masterclass-led | masterclass | `/themen/hormone-und-zyklus` | `/en/topics/hormones-and-cycle` |
| `perimenopause` | Product-led | perimenopause-protocol | `/themen/perimenopause-erkennen` | `/en/topics/perimenopause` |
| `ernaehrung` | Light | food-guide | `/themen/ernaehrung` | `/en/topics/nutrition` |
| `training` | Light | runners-guide | `/themen/zyklusbewusstes-training` | `/en/topics/cycle-aware-training` |

---

## 23. Future rollout order

**For multilingual client sites:** Decide default locale, secondary locales, route pattern, and translation scope during intake — before building the first cluster.

1. **Replace temporary integrations**
   - Real ESP integration (MailerLite/Kit) via `/api/email-capture` serverless endpoint
   - Replace NXG-Media Calendly URL with client's own Calendly
   - Add Webinargeek embed to masterclass page

2. **Replace placeholder content**
   - Real Instagram post URLs in `socialPosts.ts`
   - Real OG image for Glutenfrei Superpower
   - Real testimonials with consent before production launch

3. **Polish**
   - `discovery_call_click` → real Calendly booking callback
   - Dashboard / visibility page if needed
   - Webhook integrations (Plug-and-Pay, Calendly) for server-side revenue events

Each cluster follows the same vertical-slice pattern: YAML → hub → tag content → verify funnel → verify build. Don't start the next cluster until the current one is stable.

---

## 24. Internal visibility dashboard

### Purpose

Expert-brand websites can include an optional internal visibility dashboard. This is not a public marketing page — it is an internal reporting layer for the expert, client, or agency to track progress across technical SEO, content citability, brand authority, and conversion events.

### When to include

Recommended for any Expert Brand OS / SEO / AI visibility project. The dashboard makes the system feel measurable and professional from day one, even before real integrations are connected.

### Why noindex

The dashboard shows internal metrics, source labels, and pending-integration status. None of this is for search engines or public visitors. The route must be `noindex` and excluded from `robots.txt` (via `Disallow`). It should never appear in public navigation, sitemaps, or internal linking.

### Why English-only

The dashboard is an internal/agency reporting layer, not public marketing content. English is the standard working language for SEO/analytics reporting across international projects. The dashboard always renders in English regardless of the site's public locale(s).

### Data architecture

Two data sources work together:

1. **`src/lib/visibilityMetrics.ts`** — Build-time metrics computed automatically from content collections, cluster configs, and filesystem checks. No manual maintenance needed.
2. **`src/data/visibility.ts`** — Manually maintained data for things that cannot be computed: authority scores, organic traffic, conversion events, completed actions, next priorities.

Build-time metrics include:
- Content inventory (articles, products, glossary, archetypes, pillars, coaching, lead magnets, clusters)
- Bilingual coverage (translation pairs per content type)
- Content quality signals (value propositions, CTA bullets, expert POV, FAQ coverage, cluster membership)
- Technical infrastructure (sitemap, robots.txt, dashboard blocked, hreflang pairs)

Manual/external data includes:
- `updatedAt` — last manual update date
- `reportMonth` — human-readable period label
- `authorityScore` — manually assessed until real backlinks/citations exist
- `organicTraffic` — monthly click data (requires Search Console)
- `topPages` — page performance (requires Search Console)
- `pageVisibility` — Google ranking + AI citation status (Google: external, AI: manual)
- `conversionEvents` — current + previous month (requires GA4/webhooks)
- `completedActions` — timestamped action log (manual)
- `nextPriorities` — upcoming tasks with status (manual)

### Build-time visibility scores

Technical and Citability scores are computed from the codebase at build time. This means they update automatically as content is added, clusters are configured, and the site structure grows.

**Technical score (0–100)** — Structural readiness. Weighted checklist:
- Sitemap configured, robots.txt exists, dashboard blocked
- Content volume and diversity (multiple content types)
- Cluster configuration coverage
- Bilingual content pairs and hreflang coverage
- Product-to-cluster membership

**Citability score (0–100)** — Content depth for AI/search extraction:
- Glossary terms, pillar pages, archetypes
- FAQ coverage (content-level + cluster hub FAQs)
- Expert POV, value propositions, CTA bullets on products
- Cluster definitions

**Authority score** — Remains manual/placeholder until real backlinks, external citations, reviews, or AI visibility results exist.

**Overall score** — Weighted average: Technical 35% + Citability 35% + Authority 30%.

### Source type system

Every dashboard metric declares its source type:

| Source type        | Meaning                                        | Badge color |
|--------------------|------------------------------------------------|-------------|
| `build-measured`   | Computed from codebase at build time           | Green       |
| `manual-check`     | Verified manually (e.g. AI visibility)         | Blue        |
| `placeholder`      | Demo/zero data, not yet measured               | Amber       |
| `external-pending` | Requires integration not yet connected         | Amber       |

Source labels are visible in the dashboard UI on every section header. This prevents anyone from mistaking placeholder data for real measured performance.

### Metrics shown

| Section                 | Source type        | What it tracks                                  |
|-------------------------|--------------------|-------------------------------------------------|
| Visibility scores       | build-measured / manual | Overall, Technical, Citability, Authority (0–100) |
| Content inventory       | build-measured     | Articles, products, glossary, archetypes, pillars, coaching, lead magnets, clusters |
| Bilingual coverage      | build-measured     | Translation pairs per content type              |
| Content quality signals | build-measured     | Value props, CTA bullets, expert POV, FAQ coverage, cluster membership |
| Technical infrastructure| build-measured     | Sitemap, robots.txt, dashboard blocked, cluster configs, hreflang pairs |
| Organic traffic         | external-pending   | Monthly organic clicks from Search Console      |
| Top pages               | external-pending   | Pages ranked by clicks, impressions, trend      |
| Page visibility         | external + manual  | Per-page Google ranking + AI citation status     |
| Conversion events       | placeholder        | Product CTAs, Coaching CTAs, Newsletter, Lead magnets, Quiz completions, Discovery calls |
| Completed actions       | manual             | Timestamped log of what was done                |
| Next priorities         | manual             | Upcoming tasks with status                      |

### Future integration points

The dashboard is designed to later connect to:

- Google Search Console (organic clicks, impressions, ranking data)
- GA4 (conversion events, traffic sources)
- Meta Pixel / events
- Email capture provider (newsletter signups)
- Payment webhooks (Plug-and-Pay, Stripe)
- Calendly webhooks (discovery call bookings)
- Manual AI visibility checks (ChatGPT, Perplexity, Gemini)
- Rank tracking tools

### What not to claim

Do not display data as "measured" or "tracked" when it is manually entered or placeholder. Every section must show its source type badge. The dashboard should be honest about what is real vs. what is aspirational structure. Build-measured metrics are real and update automatically — external metrics require real integrations before they can show real numbers.

---

## 25. Final SEO/GEO polish pass

Pre-publish checklist for search and AI citation readiness. Run this pass after all content, clusters, i18n, and schema are in place.

### SEO title and meta description rules

| Requirement | Standard |
|---|---|
| Title structure | `Topic — Qualifier | brand` (e.g. "Perimenopause Protocol — 6-Week Plan for Women 35+ | doc.veri") |
| Title length | Under 60 characters preferred, max 70 |
| Description length | 120-155 characters, explain value not just topic |
| Product descriptions | Must include: what's inside (page count, modules, recipes), format, and author attribution |
| Content descriptions | Must include: who it's for, what the core topic is, author attribution |
| Legal pages | Minimal: `Page Type | brand` |

### AI-citable opening paragraphs

Every article and content page must have an **entity-mentioning first paragraph** before the first H2. This paragraph:
- Names the core topic/entity explicitly in the first sentence
- Is standalone and factual (AI systems can extract it without surrounding context)
- Is 1-2 sentences, under 50 words
- Does NOT replace the existing editorial narrative — it precedes it

Example pattern:
```
---
(frontmatter)
---

Cycle-aware training adapts your exercise to the four phases of your
menstrual cycle — matching intensity, volume and recovery to your
hormonal fluctuations instead of ignoring them.

## Why most training plans don't work for women

(narrative hook continues...)
```

### Schema coverage per page type

| Page type | Required schemas |
|---|---|
| Homepage | Organization, Person/MedicalProfessional, WebSite, FAQPage |
| About | ProfilePage, Person/MedicalProfessional, BreadcrumbList |
| Cluster hub | BreadcrumbList, DefinedTerm, FAQPage (if FAQ exists) |
| Article | BlogPosting, BreadcrumbList |
| Product | Product/Offer (with brand ref), BreadcrumbList, FAQPage |
| Glossary index | DefinedTermSet, BreadcrumbList |
| Glossary term | DefinedTerm, BreadcrumbList |
| Collection pages | CollectionPage, BreadcrumbList |
| Coaching | Service, BreadcrumbList |

### Internal linking requirements

- Every article must have `cluster` membership in frontmatter
- Every article must have `relatedProductSlugs` (1-3 products)
- Every article must have `relatedArticleSlugs` (0-2 articles, never empty for articles with a natural pair)
- Every product must have `relatedProductSlugs` (2-3 products)
- BlogToProductBridge auto-renders for cluster-aware articles
- Cluster hubs auto-aggregate articles + glossary + primary product

### Language parity checks

- All shared components (Header, BlogToProductBridge, etc.) must use locale-conditional strings for aria-labels and UI text
- No hardcoded German strings in components that render on EN pages
- DashboardLayout must pass `locale="en"` to SEOHead
- EN and DE article pairs must have matching `relatedArticleSlugs` structure (EN slugs for EN, DE slugs for DE)

### What NOT to do

- Do NOT keyword-stuff: titles use natural topic + qualifier, not keyword lists
- Do NOT make copy generic: every description should reference specific content (page counts, module counts, recipe counts)
- Do NOT add inline links to article markdown body — internal linking is handled by layout components (BlogToProductBridge, relatedProducts, CTA bands)
- Do NOT invent Verena's editorial voice — hubIntro and expertPOV fields are written by the founder
