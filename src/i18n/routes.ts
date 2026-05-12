import type { Locale } from '../data/site';

export const routeSegments: Record<Locale, Record<string, string>> = {
  de: {
    angebot: 'angebot',
    produkte: 'produkte',
    coaching: 'coaching',
    mitgliedschaft: 'mitgliedschaft',
    about: 'ueber',
    contact: 'kontakt',
    faq: 'faq',
    blog: 'blog',
    themen: 'themen',
    glossar: 'glossar',
    quiz: 'quiz',
    archetypen: 'archetypen',
    masterclass: 'masterclass',
    privacy: 'datenschutz',
    agb: 'agb',
    impressum: 'impressum',
    leadMagnet: 'lead-magnet',
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
    archetypen: 'archetypes',
    masterclass: 'masterclass',
    privacy: 'privacy',
    agb: 'terms',
    impressum: 'legal-notice',
    leadMagnet: 'free-resources',
  },
};

type RouteKey = keyof typeof routeSegments.de;

const reverseMap = new Map<string, { key: RouteKey; locale: Locale }>();
for (const [locale, segments] of Object.entries(routeSegments)) {
  for (const [key, segment] of Object.entries(segments)) {
    reverseMap.set(`${locale}:${segment}`, { key: key as RouteKey, locale: locale as Locale });
  }
}

export function getRouteKey(segment: string, locale: Locale): RouteKey | null {
  const entry = reverseMap.get(`${locale}:${segment}`);
  return entry?.key ?? null;
}

export function getRouteSegment(key: string, locale: Locale): string {
  return routeSegments[locale]?.[key] ?? routeSegments.de[key] ?? key;
}
