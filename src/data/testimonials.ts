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
  cluster?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'rolf-happywithyoga',
    name: 'Rolf',
    outcome: 'Happy With Yoga',
    text: 'Joost heeft een compleet systeem gebouwd dat onze bezoekers stap voor stap omzet in betalende leden. Van quiz-funnel tot webinar tot mini-cursus — alles werkt samen. We zitten nu op 30.000+ leads en 2.000 betalende platformleden.',
    rating: 5,
    featured: true,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'tessa-youlife',
    name: 'Tessa',
    outcome: 'Youlife',
    text: 'We zijn in vier maanden van nul naar zo\'n €10.000 per maand aan online productomzet gegaan. Zes producten gelanceerd en gemiddeld tien coachingklanten per maand die binnenkomen via de productleads. Het systeem draait nu grotendeels automatisch.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'josine-coachjosine',
    name: 'Josine',
    outcome: 'Coach Josine',
    text: 'Mijn eerste digitale product — de Eetstrijdguide — was in de eerste week al 600 keer verkocht. Daarnaast 80 aanmeldingen voor de masterclass. Ik had niet verwacht dat het zo snel zou gaan met de juiste lanceringsstructuur.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'mark-tandarts',
    name: 'Mark',
    outcome: 'Tandartspraktijk, regio Utrecht',
    text: 'Sinds de optimalisatie worden we daadwerkelijk genoemd door ChatGPT als iemand zoekt naar een tandarts in onze regio. Dat was voorheen ondenkbaar — en het levert ons nu echt nieuwe patiënten op.',
    rating: 5,
    locale: 'nl',
    cluster: 'ai-vindbaarheid',
  },
  {
    id: 'sandra-advocatenkantoor',
    name: 'Sandra',
    outcome: 'Advocatenkantoor, Amsterdam',
    text: 'De AI-vindbaarheidsscan maakte pijnlijk duidelijk waar we stonden: nergens. Na de aanpassingen worden we nu wél geciteerd in AI-antwoorden. Concreet en meetbaar resultaat, precies wat ik zocht.',
    rating: 5,
    locale: 'nl',
    cluster: 'ai-vindbaarheid',
  },
  {
    id: 'kim-fitnesscoach',
    name: 'Kim',
    outcome: 'Fitness coach',
    text: 'Het masterclass-systeem draait nu volledig. 90 aanmeldingen, 350 verkochte gidsen en een conversie van 8% naar mijn trajecten — in twee maanden. Eindelijk een voorspelbare instroom.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
];

export function getTestimonials(opts: {
  featuredOnly?: boolean;
  productSlug?: string;
  locale?: Locale;
  cluster?: string;
} = {}): Testimonial[] {
  const targetLocale = opts.locale ?? 'nl';
  let result = testimonials.filter((t) => (t.locale ?? 'nl') === targetLocale);

  if (opts.productSlug) {
    result = result.filter((t) => t.productSlug === opts.productSlug);
  }

  if (opts.cluster) {
    result = result.filter((t) => t.cluster === opts.cluster);
  }

  if (opts.featuredOnly) {
    result = result.filter((t) => t.featured);
  }

  return result;
}

export function getProductTestimonials(productSlug: string, max = 4, locale: Locale = 'nl'): Testimonial[] {
  const localeTestimonials = testimonials.filter((t) => (t.locale ?? 'nl') === locale);
  const productReviews = localeTestimonials.filter((t) => t.productSlug === productSlug);
  const generalReviews = localeTestimonials.filter(
    (t) => !t.productSlug && !productReviews.some((pr) => pr.id === t.id),
  );
  return [...productReviews, ...generalReviews].slice(0, max);
}
