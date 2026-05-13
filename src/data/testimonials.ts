import type { Locale } from './site';

export interface Testimonial {
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

export const testimonials: Testimonial[] = [
  // ─── DE: Coaching ───
  {
    id: 'coaching-sarah',
    name: 'Sarah M.',
    text: 'Das Coaching mit Dr. Verena hat mir endlich geholfen, meine Hormonprobleme zu verstehen. Nach Jahren voller Arztbesuche ohne Ergebnis hatte ich zum ersten Mal das Gefühl, wirklich gehört zu werden.',
    rating: 5,
    outcome: '1:1 Coaching — Hormonbalance',
    featured: true,
    locale: 'de',
  },
  {
    id: 'coaching-nina',
    name: 'Nina K.',
    text: 'Ich war skeptisch, ob ein Online-Coaching wirklich etwas bringt. Aber Verena hat mich komplett überzeugt — praxisnah, empathisch und wissenschaftlich fundiert. Meine Schlafprobleme sind deutlich besser geworden.',
    rating: 5,
    outcome: '1:1 Coaching — Schlaf & Regeneration',
    locale: 'de',
  },

  // ─── DE: Hormon-Reset Guide ───
  {
    id: 'hormon-reset-julia',
    name: 'Julia R.',
    text: 'Der Hormon-Reset Guide hat mir die Augen geöffnet. Endlich verstehe ich, warum ich mich die letzten Jahre so anders gefühlt habe. Die Checklisten und der Ernährungsplan sind Gold wert.',
    rating: 5,
    outcome: 'Hormon-Reset Guide Kundin',
    productSlug: 'hormon-reset-guide',
    locale: 'de',
  },

  // ─── DE: Erste Hilfe Histamin ───
  {
    id: 'histamin-lena',
    name: 'Lena W.',
    text: 'Nach dem Kurs konnte ich endlich zuordnen, warum ich vor meiner Periode immer Migräne und Hautausschläge hatte. Die Audio-Module sind perfekt für unterwegs — ich habe sie beim Spaziergang gehört.',
    rating: 5,
    outcome: 'Erste Hilfe bei Histamin Kundin',
    productSlug: 'erste-hilfe-histamin',
    locale: 'de',
  },

  // ─── DE: Perimenopause Protocol ───
  {
    id: 'peri-anna',
    name: 'Anna B.',
    text: 'Mit 38 hat mir meine Ärztin gesagt, ich sei zu jung für Wechseljahre. Das Perimenopause Protocol hat mir gezeigt, dass ich mir nicht alles einbilde. Der 6-Wochen-Plan ist super strukturiert.',
    rating: 5,
    outcome: 'Perimenopause Protocol Kundin',
    productSlug: 'perimenopause-protocol',
    locale: 'de',
  },

  // ─── DE: Food Guide ───
  {
    id: 'food-kathrin',
    name: 'Kathrin S.',
    text: 'Das Ampelsystem ist genial — endlich muss ich nicht bei jedem Rezept googeln, ob es histaminarm ist. Die Einkaufslisten spare ich mir direkt aufs Handy. Meal Prep war noch nie so einfach.',
    rating: 4,
    outcome: 'Food Guide Kundin',
    productSlug: 'food-guide',
    locale: 'de',
  },

  // ─── DE: Smoothie-Guide ───
  {
    id: 'smoothie-marie',
    name: 'Marie H.',
    text: 'Morgens fehlt mir immer die Zeit fürs Frühstück. Die Smoothies sind in 5 Minuten fertig und halten mich bis mittags satt. Mein Favorit: der Beeren-Protein-Smoothie. Meine Kinder lieben ihn auch!',
    rating: 5,
    outcome: 'Smoothie-Guide Kundin',
    productSlug: 'smoothie-guide',
    locale: 'de',
  },

  // ─── DE: Runners Guide ───
  {
    id: 'runners-stefanie',
    name: 'Stefanie L.',
    text: 'Ich wollte immer laufen, wusste aber nie, wie ich anfangen soll. Der 12-Wochen-Plan hat mich von Null auf 10km gebracht — und das zyklusbewusst. Keine Verletzungen, kein Übertraining.',
    rating: 5,
    outcome: 'Von Null auf 10km Kundin',
    productSlug: 'runners-guide',
    locale: 'de',
  },

  // ─── DE: Histamin-Bundle ───
  {
    id: 'bundle-claudia',
    name: 'Claudia F.',
    text: 'Das Bundle war die beste Investition. Audio-Module für unterwegs, der Food Guide für die Woche und die Smoothies für den Morgen. Alles passt zusammen — nach 3 Wochen ging es mir spürbar besser.',
    rating: 5,
    outcome: 'Histamin-Bundle Kundin',
    productSlug: 'histamin-bundle',
    locale: 'de',
  },

  // ═══════════════════════════════════════════════════════
  // EN testimonials (placeholder / demo translations)
  // ═══════════════════════════════════════════════════════

  // ─── EN: Coaching ───
  {
    id: 'coaching-sarah-en',
    name: 'Sarah M.',
    text: 'Coaching with Dr. Verena finally helped me understand my hormone issues. After years of doctor visits without answers, I felt truly heard for the first time.',
    rating: 5,
    outcome: '1:1 Coaching — Hormone Balance',
    featured: true,
    locale: 'en',
  },
  {
    id: 'coaching-nina-en',
    name: 'Nina K.',
    text: 'I was sceptical whether online coaching could really make a difference. But Verena convinced me completely — practical, empathetic, and evidence-based. My sleep issues have improved dramatically.',
    rating: 5,
    outcome: '1:1 Coaching — Sleep & Recovery',
    locale: 'en',
  },

  // ─── EN: Hormone Reset Guide ───
  {
    id: 'hormon-reset-julia-en',
    name: 'Julia R.',
    text: 'The Hormone Reset Guide was an eye-opener. I finally understand why I have been feeling so different these past years. The checklists and meal plan are worth their weight in gold.',
    rating: 5,
    outcome: 'Hormone Reset Guide client',
    productSlug: 'hormone-reset-guide',
    locale: 'en',
  },

  // ─── EN: First Aid Histamine ───
  {
    id: 'histamin-lena-en',
    name: 'Lena W.',
    text: 'After the course I could finally connect the dots on why I always got migraines and skin flare-ups before my period. The audio modules are perfect for on the go.',
    rating: 5,
    outcome: 'First Aid Histamine client',
    productSlug: 'first-aid-histamine',
    locale: 'en',
  },

  // ─── EN: Perimenopause Protocol ───
  {
    id: 'peri-anna-en',
    name: 'Anna B.',
    text: "At 38, my doctor told me I was too young for menopause. The Perimenopause Protocol showed me I wasn't imagining things. The 6-week plan is brilliantly structured.",
    rating: 5,
    outcome: 'Perimenopause Protocol client',
    productSlug: 'perimenopause-protocol',
    locale: 'en',
  },

  // ─── EN: Food Guide ───
  {
    id: 'food-kathrin-en',
    name: 'Kathrin S.',
    text: "The traffic-light system is genius — I no longer have to look up every recipe to check whether it's low-histamine. I save the shopping lists straight to my phone. Meal prep has never been easier.",
    rating: 4,
    outcome: 'Food Guide client',
    productSlug: 'food-guide',
    locale: 'en',
  },

  // ─── EN: Smoothie Guide ───
  {
    id: 'smoothie-marie-en',
    name: 'Marie H.',
    text: "I never have time for breakfast in the morning. These smoothies are ready in 5 minutes and keep me full until lunch. My favourite: the berry protein smoothie. My kids love it too!",
    rating: 5,
    outcome: 'Smoothie Guide client',
    productSlug: 'smoothie-guide',
    locale: 'en',
  },

  // ─── EN: Runners Guide ───
  {
    id: 'runners-stefanie-en',
    name: 'Stefanie L.',
    text: "I always wanted to run but never knew how to start. The 12-week plan took me from zero to 10 km — cycle-aware the whole way. No injuries, no overtraining.",
    rating: 5,
    outcome: 'Zero to 10 km client',
    productSlug: 'runners-guide',
    locale: 'en',
  },

  // ─── EN: Histamine Bundle ───
  {
    id: 'bundle-claudia-en',
    name: 'Claudia F.',
    text: "The bundle was the best investment. Audio modules for on the go, the Food Guide for the week, and the smoothies for the morning. Everything fits together — after 3 weeks I felt noticeably better.",
    rating: 5,
    outcome: 'Histamine Bundle client',
    productSlug: 'histamine-bundle',
    locale: 'en',
  },
];

export function getTestimonials(opts: {
  featuredOnly?: boolean;
  productSlug?: string;
  locale?: Locale;
} = {}): Testimonial[] {
  const targetLocale = opts.locale ?? 'de';
  let result = testimonials.filter((t) => (t.locale ?? 'de') === targetLocale);

  if (opts.productSlug) {
    result = result.filter((t) => t.productSlug === opts.productSlug);
  }

  if (opts.featuredOnly) {
    result = result.filter((t) => t.featured);
  }

  return result;
}

/**
 * Get testimonials for a product page — returns product-specific reviews
 * plus general coaching reviews to fill up the section.
 */
export function getProductTestimonials(productSlug: string, max = 4, locale: Locale = 'de'): Testimonial[] {
  const localeTestimonials = testimonials.filter((t) => (t.locale ?? 'de') === locale);
  const productReviews = localeTestimonials.filter((t) => t.productSlug === productSlug);
  const generalReviews = localeTestimonials.filter(
    (t) => !t.productSlug && !productReviews.some((pr) => pr.id === t.id),
  );
  return [...productReviews, ...generalReviews].slice(0, max);
}
