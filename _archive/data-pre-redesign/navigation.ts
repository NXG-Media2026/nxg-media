import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isButton?: boolean;
}

export const navigation: Record<Locale, NavItem[]> = {
  nl: [
    { label: 'Diensten', href: '/diensten/', children: [
      { label: 'AI Vindbaarheid', href: '/ai-vindbaarheid-traject-b/' },
      { label: 'Coach Accelerator', href: '/coach-accelerator/' },
    ]},
    { label: 'Pakketten', href: '/pakketten/' },
    { label: 'Cases', href: '/cases/' },
    { label: 'Over ons', href: '/over-joost/' },
    { label: 'Kennis', href: '/guides/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Plan een gratis gesprek', href: '/contact/', isButton: true },
  ],
  en: [
    { label: 'Services', href: '/en/services/' },
    { label: 'Cases', href: '/en/cases/' },
    { label: 'About', href: '/en/about-joost/' },
    { label: 'Knowledge', href: '/en/guides/' },
    { label: 'Contact', href: '/en/contact/', isButton: true },
  ],
  es: [
    { label: 'Servicios', href: '/es/servicios/' },
    { label: 'Casos', href: '/es/casos/' },
    { label: 'Sobre Joost', href: '/es/sobre-joost/' },
    { label: 'Contacto', href: '/es/contacto/', isButton: true },
  ],
};
