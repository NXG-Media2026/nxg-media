import { siteConfig, type Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isButton?: boolean;
}

// Tijdelijk verborgen op de homepage; zet terug op true om te herstellen.
export const SHOW_HOME_PRICING = false;

export const navigation: Record<Locale, NavItem[]> = {
  nl: [
    { label: 'Diensten', href: '/#diensten', children: [
      { label: 'MKB · NXG AI-Search-systeem', href: '/landermkb' },
      { label: 'Coach Accelerator', href: '/coach-accelerator' },
    ]},
    ...(SHOW_HOME_PRICING ? [{ label: 'Pakketten', href: '/#pakketten' }] : []),
    { label: 'Cases', href: '/cases' },
    { label: 'Over Joost', href: '/over-joost' },
    { label: 'Kennis', href: '/guides' },
    { label: 'Contact', href: '/contact' },
    { label: 'Gratis AI-scan', href: siteConfig.external.scannerUrl },
    { label: 'Plan een gratis gesprek', href: '/contact', isButton: true },
  ],
  en: [
    { label: 'Services', href: '/en', children: [
      { label: 'SMB · NXG AI Search System', href: '/en/nxg-growth' },
      { label: 'Coach Accelerator', href: '/en/coach-accelerator' },
    ]},
    ...(SHOW_HOME_PRICING ? [{ label: 'Packages', href: '/en/#packages' }] : []),
    { label: 'Cases', href: '/en/cases' },
    { label: 'About', href: '/en/about-joost' },
    { label: 'Knowledge', href: '/en/guides' },
    { label: 'Contact', href: '/en/contact' },
    { label: 'Free AI scan', href: siteConfig.external.scannerUrl },
    { label: 'Book a free call', href: '/en/contact', isButton: true },
  ],
  es: [
    { label: 'Servicios', href: '/es', children: [
      { label: 'PYMES · Sistema NXG AI Search', href: '/es/nxg-growth' },
      { label: 'Coach Accelerator', href: '/es/coach-accelerator' },
    ]},
    ...(SHOW_HOME_PRICING ? [{ label: 'Paquetes', href: '/es/#paquetes' }] : []),
    { label: 'Casos', href: '/es/casos' },
    { label: 'Sobre Joost', href: '/es/sobre-joost' },
    { label: 'Guías', href: '/es/guias' },
    { label: 'Contacto', href: '/es/contacto' },
    { label: 'Escáner IA gratis', href: siteConfig.external.scannerUrl },
    { label: 'Reserva una llamada gratis', href: '/es/contacto', isButton: true },
  ],
};
