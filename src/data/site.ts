export const siteConfig = {
  name: 'doc.veri',
  shortName: 'doc.veri',
  tagline: 'Frauen-Gesundheit — wissenschaftlich fundiert, ohne Bro-Science',
  url: 'https://docveri.de',
  defaultLocale: 'de' as const,
  locales: ['de'] as const,

  analytics: {
    ga4MeasurementId: '',
    gscVerificationId: '',
  },

  email: 'info@docveri.de',

  socials: {
    instagram: 'https://www.instagram.com/doc.veri/',
    linkedin: 'https://www.linkedin.com/in/dr-verena-anna-mann/',
    youtube: '',
  },

  founder: {
    slug: 'dr-verena',
    name: 'Dr. Verena Mann',
    role: 'Notärztin & Ausdauer-Athletin',
    bio: 'Notärztin, Ironman-Athletin und Gründerin von doc.veri. Dr. Verena Mann verbindet medizinisches Fachwissen mit praktischer Erfahrung im Ausdauersport, um Frauen zu helfen, ihre Gesundheit selbst in die Hand zu nehmen.',
    description: 'Dr. Verena Mann ist eine approbierte Ärztin und Notärztin sowie leidenschaftliche Ausdauer-Athletin. Sie hat doc.veri gegründet, um Frauen wissenschaftlich fundiertes Wissen über Hormone, Training, Ernährung und Zyklus-bewusste Lebensführung zugänglich zu machen — ohne Bro-Science, ohne Schwurbel.',
    qualifications: [
      'Approbierte Ärztin',
      'Notärztin',
    ],
    credentials: [
      { name: 'Approbation als Ärztin', issuer: '', year: 0 },
      { name: 'Zusatzbezeichnung Notfallmedizin', issuer: '', year: 0 },
    ],
    education: [
      { institution: '', degree: 'Staatsexamen Medizin', year: 0 },
    ],
    languages: ['Deutsch', 'Englisch'],
    memberships: [],
    publications: [],
    knowsAbout: [
      'Frauengesundheit',
      'Hormonbalance',
      'Ausdauertraining für Frauen',
      'Zyklus-bewusstes Training',
      'RED-S (Relatives Energiedefizit im Sport)',
      'Perimenopause',
      'Ernährung für Sportlerinnen',
    ],
    image: '/images/founder/portrait-doctor.jpg',
  },

  external: {
    plugandpayBase: '',
    calendlyUrl: '',
    skoolUrl: '',
  },

  newsletter: {
    provider: 'placeholder' as const,
    listId: '',
  },

  legal: {
    businessName: 'NXG-Media',
    responsiblePerson: 'Joost van Putten',
    street: 'Amendijk 1',
    postalCode: '3829DS',
    city: 'Hooglanderveen',
    country: 'Niederlande',
    registerNumber: 'KVK 78318122',
    taxId: 'NL003318346B95',
    email: 'info@nxg-media.com',
    phone: '+34 645 80 73 02',
    contentResponsible: {
      name: 'Dr. Verena Mann',
      role: 'Inhaltlich Verantwortliche gemäß § 55 Abs. 2 RStV',
    },
  },

  medicalContentReview: {
    reviewerSlug: 'dr-verena',
    lastReviewedDate: '2026-05-01',
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
