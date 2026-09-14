import type { ImageMetadata } from 'astro';
import type { Locale } from './site';

import joostLaptop from '../assets/images/founder/joost-sitting-laptop-looking-working.webp';
import joostFront from '../assets/images/founder/joost-sitting-laptop-lookingfront.webp';
import joostPlayful from '../assets/images/founder/joost-standing-playfull.webp';
import joostRelaxed from '../assets/images/founder/joost-standing-relaxed.webp';
import joostWorking from '../assets/images/founder/joost-standing-workinglaptop.webp';
import joostPortrait from '../assets/images/founder/joost-profielfoto-portrait.webp';

export interface SocialPost {
  id: string;
  title: string;
  type: 'reel' | 'carousel' | 'post' | 'story';
  url: string;
  image: ImageMetadata;
}

const titles: Record<string, Record<Locale, string>> = {
  'funnel-converteert-niet': {
    nl: 'Waarom je funnel niet converteert',
    en: 'Why your funnel isn\'t converting',
    es: 'Por qué tu funnel no convierte',
  },
  'ai-vindbaarheid-lagen': {
    nl: '3 lagen van AI-vindbaarheid',
    en: '3 layers of AI visibility',
    es: '3 capas de visibilidad IA',
  },
  'nul-naar-10k': {
    nl: 'Van 0 naar €10k/mnd productomzet',
    en: 'From 0 to €10k/mo product revenue',
    es: 'De 0 a €10k/mes en productos',
  },
  'chatgpt-concurrent': {
    nl: 'ChatGPT noemt je concurrent, niet jou',
    en: 'ChatGPT mentions your competitor, not you',
    es: 'ChatGPT menciona a tu competencia, no a ti',
  },
  'mini-producten-kwalificatie': {
    nl: 'Mini-producten als kwalificatiemachine',
    en: 'Mini-products as a qualification engine',
    es: 'Mini-productos como motor de cualificación',
  },
  'systeem-30000-leads': {
    nl: 'Het systeem achter 30.000 leads',
    en: 'The system behind 30,000 leads',
    es: 'El sistema detrás de 30.000 leads',
  },
};

const basePosts = [
  { id: 'funnel-converteert-niet', type: 'reel' as const, image: joostLaptop },
  { id: 'ai-vindbaarheid-lagen', type: 'carousel' as const, image: joostFront },
  { id: 'nul-naar-10k', type: 'post' as const, image: joostPlayful },
  { id: 'chatgpt-concurrent', type: 'reel' as const, image: joostRelaxed },
  { id: 'mini-producten-kwalificatie', type: 'carousel' as const, image: joostWorking },
  { id: 'systeem-30000-leads', type: 'post' as const, image: joostPortrait },
];

export function getSocialPosts(max: number = 6, locale: Locale = 'nl'): SocialPost[] {
  return basePosts.slice(0, max).map((p) => ({
    ...p,
    title: titles[p.id]?.[locale] ?? titles[p.id]?.nl ?? p.id,
    url: 'https://www.instagram.com/joostvanputten',
  }));
}

// Default export for backward compatibility
export const socialPosts: SocialPost[] = getSocialPosts(6, 'nl');
