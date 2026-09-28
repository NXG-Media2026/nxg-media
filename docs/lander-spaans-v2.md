# Spanish conversion landing page v2

Route: `/lander-spaans-v2`. Original `/es/nxg-growth` is unchanged.

Reuses the existing landing-page CSS, real case screenshots, Joost photo, client logos, five local testimonial videos, CookieConsent and the exact Spanish Cal.com booking destination. Calendar loads on an explicit click; the external fallback is always available. Booking events use `lander-spaans-v2` and respect analytics/marketing consent.

## Assets still needed

- Group photo supplied and integrated: `public/lander-assets/proof/joost-fleur-equipo-nxg.avif` (454 × 322, original transparency preserved).
- Campaign example video and poster (replace EJEMPLO DE CAMPAÑA).
- Spanish subtitles/transcripts for the five existing original-language testimonial videos, if available.

No invented portraits, quotations, ratings or new customer metrics. Existing case metrics are reused from the repository.

This campaign draft uses noindex while visible placeholders remain. It is excluded from the sitemap and intentionally not added to llms.txt. Before launch, replace placeholders and confirm the written guarantee conditions. The calendar's duration is owned by Cal.com; the page does not introduce a conflicting duration.

## Validation

- Production build: 83 pages. Initial normal build passed. After a dev-server dependency scan hit Windows sandbox ancestor-directory restrictions, final build was verified from an identical source copy with Vite dependency prebundling disabled in a temporary validation-only config. Production repository config is unchanged apart from the new route's sitemap exclusion.
- Internal anchors, local linked routes and referenced assets: no missing targets.
- Mobile layouts inspected at 320px and 390px; no horizontal overflow.
- Direct Cal.com booking destination opens and displays available appointment slots. Inline embed remained loading in the test browser; the direct link is visible above it. No appointment was submitted.
- Original Spanish route and shared landing stylesheet remain unchanged.

## Positioning revision

NXG AI Search now runs through the hero, three-pillar formula, case introductions, booking copy and final CTA. The found/chosen/enquiry method is restored directly after the cases, with a ChatGPT Ads teaser. The standalone Fleur card and Claire/Andrew quotations were removed; the joint team placeholder remains. ChatGPT Ads copy avoids unconditional account-access promises. Official context: https://openai.com/index/chatgpt-ads-expands-across-europe/

## Spanish copy review — Conchín

Applied relevant suggestions from Sugerencias_Conchín.pdf to v2: natural closing CTA (ya te está buscando), concrete hero wording, Google/AI answer visibility, clearer Costa Blanca case, tu web instead of fundamento, Spain-oriented present-perfect logo heading, and a natural AI/competitor question in booking copy. Retained 15 solicitudes cualificadas, the 90-day window, existing case results and guarantee. The PDF’s isolated 14 was not adopted. Consultorios/consultorías and the old homepage scanner text do not occur in v2; other pages were not changed.

## Trust and booking refinement

User-supplied trust claims: Spanish-speaking team, 50+ companies helped, 100% qualified enquiries (clarified as guarantee qualification criteria). Green checkmarks. Compact single joint team photo; Joost portrait used only in hero. Two reusable booking cards with independent Cal namespaces; iframe origin corrected to cal.com. Both inline calendars rendered the appointment and availability during browser verification. Earlier inline-loading limitation above is resolved.
