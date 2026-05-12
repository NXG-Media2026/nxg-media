import type { Locale } from './site';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: Record<Locale, NavItem[]> = {
  de: [
    { label: 'Home', href: '/' },
    {
      label: 'Angebot',
      href: '/angebot',
      children: [
        { label: 'Produkte', href: '/produkte' },
        { label: 'Coaching', href: '/coaching' },
        { label: 'Mitgliedschaft', href: '/mitgliedschaft' },
      ],
    },
    { label: 'Themen', href: '/themen' },
    { label: 'Blog', href: '/blog' },
    { label: 'Masterclass', href: '/masterclass/hormone-histamin-zyklus-superpower' },
    { label: 'Quiz', href: '/quiz' },
    { label: 'Über mich', href: '/ueber' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
};
