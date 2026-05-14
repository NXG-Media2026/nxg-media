import type { Locale } from './site';

export interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  website?: string;
  logo?: string; // filename in /src/assets/images/logos/
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
    website: 'https://www.happywithyoga.com',
    logo: 'happywithyoga-logo.webp',
    photo: 'rolf-profile-photo-happywithyoga.png',
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
    website: 'https://www.youlife.nl',
    logo: 'youlife-logo.avif',
    photo: 'tessa-youlife-profile-photo.png',
    text: 'We zijn in vier maanden van nul naar zo\'n €10.000 per maand aan online productomzet gegaan. Zes producten gelanceerd en gemiddeld tien coachingklanten per maand die binnenkomen via de productleads. Het systeem draait nu grotendeels automatisch.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'josine-coachjosine',
    name: 'Josine',
    outcome: 'Coach Josine',
    website: 'https://www.coachjosine.nl',
    logo: 'coachjosine-logo.avif',
    photo: 'coachjosine-profile-photo.png',
    text: 'Mijn eerste digitale product — de Eetstrijdguide — was in de eerste week al 600 keer verkocht. Daarnaast 80 aanmeldingen voor de masterclass. Ik had niet verwacht dat het zo snel zou gaan met de juiste lanceringsstructuur.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'claire-ikrouwvanje',
    name: 'Claire',
    outcome: 'ikrouwvanje.nl',
    website: 'https://www.ikrouwvanje.nl',
    logo: 'ikrouwvanje-logo.webp',
    photo: 'claire-profile-photo.png',
    text: '+25% meer klanten. Vanaf maand 3 werd het verschil echt duidelijk — en het mooiste: ik ben veel minder afhankelijk geworden van betaald adverteren.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'andrew-coreprogression',
    name: 'Andrew',
    outcome: 'Core Progression',
    text: 'Joost heeft ons geholpen om een compleet online traject neer te zetten. Van content strategie tot ads — alles werkt nu als één systeem. De resultaten spreken voor zich.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },

  // ── English translations ──
  {
    id: 'rolf-happywithyoga',
    name: 'Rolf',
    outcome: 'Happy With Yoga',
    website: 'https://www.happywithyoga.com',
    logo: 'happywithyoga-logo.webp',
    photo: 'rolf-profile-photo-happywithyoga.png',
    text: 'Joost built a complete system that turns our visitors into paying members step by step. From quiz funnel to webinar to mini-course — everything works together. We now have 30,000+ leads and 2,000 paying platform members.',
    rating: 5,
    featured: true,
    locale: 'en',
    cluster: 'expert-growth',
  },
  {
    id: 'tessa-youlife',
    name: 'Tessa',
    outcome: 'Youlife',
    website: 'https://www.youlife.nl',
    logo: 'youlife-logo.avif',
    photo: 'tessa-youlife-profile-photo.png',
    text: 'We went from zero to roughly €10,000 per month in online product revenue in four months. Six products launched and an average of ten coaching clients per month coming in through product leads. The system now runs mostly on autopilot.',
    rating: 5,
    locale: 'en',
    cluster: 'expert-growth',
  },
  {
    id: 'josine-coachjosine',
    name: 'Josine',
    outcome: 'Coach Josine',
    website: 'https://www.coachjosine.nl',
    logo: 'coachjosine-logo.avif',
    photo: 'coachjosine-profile-photo.png',
    text: 'My first digital product — the Eating Struggle Guide — sold 600 copies in the first week. Plus 80 masterclass signups. I didn\'t expect it to move so fast with the right launch structure.',
    rating: 5,
    locale: 'en',
    cluster: 'expert-growth',
  },
  {
    id: 'claire-ikrouwvanje',
    name: 'Claire',
    outcome: 'ikrouwvanje.nl',
    website: 'https://www.ikrouwvanje.nl',
    logo: 'ikrouwvanje-logo.webp',
    photo: 'claire-profile-photo.png',
    text: '+25% more clients. From month 3 the difference became really clear — and the best part: I became much less dependent on paid advertising.',
    rating: 5,
    locale: 'en',
    cluster: 'expert-growth',
  },
  {
    id: 'andrew-coreprogression',
    name: 'Andrew',
    outcome: 'Core Progression',
    text: 'Joost helped us set up a complete online programme. From content strategy to ads — everything now works as one system. The results speak for themselves.',
    rating: 5,
    locale: 'en',
    cluster: 'expert-growth',
  },

  // ── Spanish translations ──
  {
    id: 'rolf-happywithyoga',
    name: 'Rolf',
    outcome: 'Happy With Yoga',
    website: 'https://www.happywithyoga.com',
    logo: 'happywithyoga-logo.webp',
    photo: 'rolf-profile-photo-happywithyoga.png',
    text: 'Joost construyó un sistema completo que convierte a nuestros visitantes en miembros de pago paso a paso. Desde quiz funnel hasta webinar y mini-curso — todo funciona en conjunto. Ahora tenemos más de 30.000 leads y 2.000 miembros de pago.',
    rating: 5,
    featured: true,
    locale: 'es',
    cluster: 'expert-growth',
  },
  {
    id: 'tessa-youlife',
    name: 'Tessa',
    outcome: 'Youlife',
    website: 'https://www.youlife.nl',
    logo: 'youlife-logo.avif',
    photo: 'tessa-youlife-profile-photo.png',
    text: 'Pasamos de cero a aproximadamente €10.000 al mes en ingresos de productos online en cuatro meses. Seis productos lanzados y un promedio de diez clientes de coaching por mes que llegan a través de los leads de productos.',
    rating: 5,
    locale: 'es',
    cluster: 'expert-growth',
  },
  {
    id: 'josine-coachjosine',
    name: 'Josine',
    outcome: 'Coach Josine',
    website: 'https://www.coachjosine.nl',
    logo: 'coachjosine-logo.avif',
    photo: 'coachjosine-profile-photo.png',
    text: 'Mi primer producto digital — la Guía Eetstrijdguide — se vendió 600 veces en la primera semana. Además, 80 inscripciones para la masterclass. No esperaba que fuera tan rápido con la estructura de lanzamiento correcta.',
    rating: 5,
    locale: 'es',
    cluster: 'expert-growth',
  },
  {
    id: 'claire-ikrouwvanje',
    name: 'Claire',
    outcome: 'ikrouwvanje.nl',
    website: 'https://www.ikrouwvanje.nl',
    logo: 'ikrouwvanje-logo.webp',
    photo: 'claire-profile-photo.png',
    text: '+25% más clientes. A partir del mes 3 la diferencia se hizo realmente clara — y lo mejor: me volví mucho menos dependiente de la publicidad pagada.',
    rating: 5,
    locale: 'es',
    cluster: 'expert-growth',
  },
  {
    id: 'andrew-coreprogression',
    name: 'Andrew',
    outcome: 'Core Progression',
    text: 'Joost nos ayudó a montar un programa online completo. Desde estrategia de contenido hasta anuncios — todo funciona ahora como un solo sistema. Los resultados hablan por sí mismos.',
    rating: 5,
    locale: 'es',
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
