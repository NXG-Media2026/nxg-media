import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isButton?: boolean;
}

export const navigation: Record<Locale, NavItem[]> = {
  nl: [
    { label: 'Diensten', href: '/#diensten', children: [
      { label: 'NXG Growth', href: '/landermkb/' },
      { label: 'Websites', href: '/website-abonnement/' },
      { label: 'AI Vindbaarheid', href: '/ai-vindbaarheid-traject-b/' },
      { label: 'Coach Accelerator', href: '/coach-accelerator/' },
    ]},
    { label: 'Pakketten', href: '/#pakketten' },
    { label: 'Cases', href: '/cases/' },
    { label: 'Over Joost', href: '/over-joost/' },
    { label: 'Kennis', href: '/guides/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Plan een gratis gesprek', href: '/contact/', isButton: true },
  ],
  en: [
    { label: 'Services', href: '/en/', children: [{label:'AI visibility',href:'/en/ai-visibility/'},{label:'Websites',href:'/en/website-subscription/'},{label:'Coach Accelerator',href:'/en/coach-accelerator/'}] },
    { label: 'Cases', href: '/en/cases/' },
    { label: 'About', href: '/en/about-joost/' },
    { label: 'Knowledge', href: '/en/guides/' },
    { label: 'Contact', href: '/en/contact/', isButton: true },
  ],
  es: [
    { label: 'Servicios', href: '/es/', children: [{label:'Visibilidad IA',href:'/es/visibilidad-ia/'},{label:'Sitios web',href:'/es/suscripcion-web/'},{label:'Coach Accelerator',href:'/es/coach-accelerator/'}] },
    { label: 'Casos', href: '/es/casos/' },
    { label: 'Sobre Joost', href: '/es/sobre-joost/' },
    { label: 'Contacto', href: '/es/contacto/', isButton: true },
  ],
};
