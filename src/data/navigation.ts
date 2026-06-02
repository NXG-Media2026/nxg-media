import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isButton?: boolean;
}

export const navigation: Record<Locale, NavItem[]> = {
  nl: [
    { label: 'Expert Groei', href: '/ai-expert-groei-traject/', children: [
      { label: 'Expert Groei Traject', href: '/ai-expert-groei-traject/' },
    ]},
    { label: 'AI Vindbaarheid', href: '/ai-vindbaarheid/', children: [
      { label: 'Wat is AI vindbaarheid?', href: '/ai-vindbaarheid/' },
      { label: '90-dagen traject', href: '/ai-vindbaarheid-traject/' },
    ]},
    { label: 'Cases', href: '/cases/' },
    { label: 'Producten', href: '/producten/' },
    { label: 'Over Joost', href: '/over-joost/' },
    { label: 'Contact', href: '/contact/', isButton: true },
  ],
  en: [
    { label: 'Expert Growth', href: '/en/ai-expert-growth/' },
    { label: 'AI Visibility', href: '/en/ai-visibility/' },
    { label: 'Cases', href: '/en/cases/' },
    { label: 'Products', href: '/en/products/' },
    { label: 'About Joost', href: '/en/about-joost/' },
    { label: 'Contact', href: '/en/contact/', isButton: true },
  ],
  es: [
    { label: 'Crecimiento Experto', href: '/es/crecimiento-experto-ia/' },
    { label: 'Visibilidad IA', href: '/es/visibilidad-ia/' },
    { label: 'Casos', href: '/es/casos/' },
    { label: 'Productos', href: '/es/productos/' },
    { label: 'Sobre Joost', href: '/es/sobre-joost/' },
    { label: 'Contacto', href: '/es/contacto/', isButton: true },
  ],
};
