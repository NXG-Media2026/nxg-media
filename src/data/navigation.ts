import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isButton?: boolean;
}

export const navigation: Record<Locale, NavItem[]> = {
  nl: [
    { label: 'Coach Accelerator', href: '/coach-accelerator/' },
    { label: 'AI Vindbaarheid', href: '/ai-vindbaarheid/' },
    { label: 'Cases', href: '/cases/' },
    { label: 'Producten', href: '/producten/' },
    { label: 'Over Joost', href: '/over-joost/' },
    { label: 'Contact', href: '/contact/', isButton: true },
  ],
  en: [
    { label: 'Coach Accelerator', href: '/en/coach-accelerator/' },
    { label: 'AI Visibility', href: '/en/ai-visibility/' },
    { label: 'Cases', href: '/en/cases/' },
    { label: 'Products', href: '/en/products/' },
    { label: 'About Joost', href: '/en/about-joost/' },
    { label: 'Contact', href: '/en/contact/', isButton: true },
  ],
  es: [
    { label: 'Coach Accelerator', href: '/es/coach-accelerator/' },
    { label: 'Visibilidad IA', href: '/es/visibilidad-ia/' },
    { label: 'Casos', href: '/es/casos/' },
    { label: 'Productos', href: '/es/productos/' },
    { label: 'Sobre Joost', href: '/es/sobre-joost/' },
    { label: 'Contacto', href: '/es/contacto/', isButton: true },
  ],
};
