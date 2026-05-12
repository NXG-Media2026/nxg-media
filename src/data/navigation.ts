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
  en: [
    { label: 'Home', href: '/en' },
    {
      label: 'Offers',
      href: '/en/offers',
      children: [
        { label: 'Products', href: '/en/products' },
        { label: 'Coaching', href: '/en/coaching' },
        { label: 'Membership', href: '/en/membership' },
      ],
    },
    { label: 'Topics', href: '/en/topics' },
    { label: 'Blog', href: '/en/blog' },
    { label: 'Masterclass', href: '/en/masterclass/hormones-histamine-cycle-superpower' },
    { label: 'Quiz', href: '/en/quiz' },
    { label: 'About', href: '/en/about' },
    { label: 'FAQ', href: '/en/faq' },
    { label: 'Contact', href: '/en/contact' },
  ],
};
