export interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  photo?: string;
  text: string;
  rating?: number;
  productSlug?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  // ─── Coaching ───
  {
    id: 'coaching-sarah',
    name: 'Sarah M.',
    text: 'Das Coaching mit Dr. Verena hat mir endlich geholfen, meine Hormonprobleme zu verstehen. Nach Jahren voller Arztbesuche ohne Ergebnis hatte ich zum ersten Mal das Gefühl, wirklich gehört zu werden.',
    rating: 5,
    outcome: '1:1 Coaching — Hormonbalance',
    featured: true,
  },
  {
    id: 'coaching-nina',
    name: 'Nina K.',
    text: 'Ich war skeptisch, ob ein Online-Coaching wirklich etwas bringt. Aber Verena hat mich komplett überzeugt — praxisnah, empathisch und wissenschaftlich fundiert. Meine Schlafprobleme sind deutlich besser geworden.',
    rating: 5,
    outcome: '1:1 Coaching — Schlaf & Regeneration',
  },

  // ─── Hormon-Reset Guide ───
  {
    id: 'hormon-reset-julia',
    name: 'Julia R.',
    text: 'Der Hormon-Reset Guide hat mir die Augen geöffnet. Endlich verstehe ich, warum ich mich die letzten Jahre so anders gefühlt habe. Die Checklisten und der Ernährungsplan sind Gold wert.',
    rating: 5,
    outcome: 'Hormon-Reset Guide Kundin',
    productSlug: 'hormon-reset-guide',
  },

  // ─── Erste Hilfe Histamin ───
  {
    id: 'histamin-lena',
    name: 'Lena W.',
    text: 'Nach dem Kurs konnte ich endlich zuordnen, warum ich vor meiner Periode immer Migräne und Hautausschläge hatte. Die Audio-Module sind perfekt für unterwegs — ich habe sie beim Spaziergang gehört.',
    rating: 5,
    outcome: 'Erste Hilfe bei Histamin Kundin',
    productSlug: 'erste-hilfe-histamin',
  },

  // ─── Perimenopause Protocol ───
  {
    id: 'peri-anna',
    name: 'Anna B.',
    text: 'Mit 38 hat mir meine Ärztin gesagt, ich sei zu jung für Wechseljahre. Das Perimenopause Protocol hat mir gezeigt, dass ich mir nicht alles einbilde. Der 6-Wochen-Plan ist super strukturiert.',
    rating: 5,
    outcome: 'Perimenopause Protocol Kundin',
    productSlug: 'perimenopause-protocol',
  },

  // ─── Food Guide ───
  {
    id: 'food-kathrin',
    name: 'Kathrin S.',
    text: 'Das Ampelsystem ist genial — endlich muss ich nicht bei jedem Rezept googeln, ob es histaminarm ist. Die Einkaufslisten spare ich mir direkt aufs Handy. Meal Prep war noch nie so einfach.',
    rating: 4,
    outcome: 'Food Guide Kundin',
    productSlug: 'food-guide',
  },

  // ─── Smoothie-Guide ───
  {
    id: 'smoothie-marie',
    name: 'Marie H.',
    text: 'Morgens fehlt mir immer die Zeit fürs Frühstück. Die Smoothies sind in 5 Minuten fertig und halten mich bis mittags satt. Mein Favorit: der Beeren-Protein-Smoothie. Meine Kinder lieben ihn auch!',
    rating: 5,
    outcome: 'Smoothie-Guide Kundin',
    productSlug: 'smoothie-guide',
  },

  // ─── Runners Guide ───
  {
    id: 'runners-stefanie',
    name: 'Stefanie L.',
    text: 'Ich wollte immer laufen, wusste aber nie, wie ich anfangen soll. Der 12-Wochen-Plan hat mich von Null auf 10km gebracht — und das zyklusbewusst. Keine Verletzungen, kein Übertraining.',
    rating: 5,
    outcome: 'Von Null auf 10km Kundin',
    productSlug: 'runners-guide',
  },

  // ─── Histamin-Bundle ───
  {
    id: 'bundle-claudia',
    name: 'Claudia F.',
    text: 'Das Bundle war die beste Investition. Audio-Module für unterwegs, der Food Guide für die Woche und die Smoothies für den Morgen. Alles passt zusammen — nach 3 Wochen ging es mir spürbar besser.',
    rating: 5,
    outcome: 'Histamin-Bundle Kundin',
    productSlug: 'histamin-bundle',
  },
];

export function getTestimonials(opts: {
  featuredOnly?: boolean;
  productSlug?: string;
} = {}): Testimonial[] {
  let result = testimonials;

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
export function getProductTestimonials(productSlug: string, max = 4): Testimonial[] {
  const productReviews = testimonials.filter((t) => t.productSlug === productSlug);
  const generalReviews = testimonials.filter(
    (t) => !t.productSlug && !productReviews.some((pr) => pr.id === t.id),
  );
  return [...productReviews, ...generalReviews].slice(0, max);
}
