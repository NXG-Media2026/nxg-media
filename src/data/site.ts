const ga4Id = import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '';
const gscId = import.meta.env.PUBLIC_GSC_VERIFICATION_ID ?? '';
const metaPixelId = import.meta.env.PUBLIC_META_PIXEL_ID ?? '';
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL ?? '';
const emailProvider = import.meta.env.PUBLIC_EMAIL_PROVIDER ?? 'placeholder';

export const siteConfig = {
  name: 'NXG Media',
  shortName: 'NXG Media',
  tagline: {
    nl: 'Bouw een online groeisysteem rond jouw expertise.',
    en: 'Build an online growth system around your expertise.',
    es: 'Construye un sistema de crecimiento online alrededor de tu experiencia.',
  },
  url: 'https://nxg-media.com',
  defaultLocale: 'nl' as const,
  locales: ['nl', 'en', 'es'] as const,
  languageSwitcherEnabled: true,

  analytics: {
    ga4MeasurementId: ga4Id,
    gscVerificationId: gscId,
    metaPixelId,
    plausible: '',
    gtm: '',
  },

  email: 'info@nxg-media.com',
  phone: '',

  socials: {
    linkedin: 'https://www.linkedin.com/in/joost-van-putten/',
    instagram: 'https://www.instagram.com/joostvanputten',
    youtube: '',
  },

  founder: {
    slug: 'joost-van-putten',
    name: 'Joost van Putten',
    role: 'Founder & Online Growth Strategist',
    bio: {
      nl: 'Founder van NXG Media. 7+ jaar ervaring in online groeisystemen. Meer dan €5 miljoen aan advertentiebudget beheerd voor coaches en experts. Bouwt systemen die gemiddeld 5-7x return on ad spend opleveren — met storytelling, productladders, emailflows, ads en AI-vindbaarheid als kern.',
      en: 'Founder of NXG Media. 7+ years of experience in online growth systems. Over €5 million in ad spend managed for coaches and experts. Builds systems that deliver an average 5-7x return on ad spend — with storytelling, product ladders, email flows, ads and AI visibility at the core.',
      es: 'Fundador de NXG Media. Más de 7 años de experiencia en sistemas de crecimiento online. Más de €5 millones en presupuesto publicitario gestionado para coaches y expertos. Construye sistemas que generan un retorno de 5-7x en inversión publicitaria — con storytelling, escaleras de productos, flujos de email, anuncios y visibilidad ante IA como base.',
    },
    description: {
      nl: 'Joost van Putten is de oprichter van NXG Media en heeft 7+ jaar ervaring in het bouwen van online groeisystemen voor coaches, kennisondernemers en lokale praktijken. Hij heeft meer dan €5 miljoen aan advertentiebudget beheerd en werkt met 50+ coaches aan systemen die gemiddeld 5-7x return on ad spend realiseren. Daarnaast bouwt NXG Media aan AI-vindbaarheid voor lokale praktijken en MKB.',
      en: 'Joost van Putten is the founder of NXG Media with 7+ years of experience building online growth systems for coaches, knowledge entrepreneurs and local practices. He has managed over €5 million in ad spend and works with 50+ coaches on systems that deliver an average 5-7x return on ad spend. NXG Media also builds AI visibility for local practices and SMBs.',
      es: 'Joost van Putten es el fundador de NXG Media con más de 7 años de experiencia construyendo sistemas de crecimiento online para coaches, emprendedores del conocimiento y negocios locales. Ha gestionado más de €5 millones en presupuesto publicitario y trabaja con más de 50 coaches en sistemas que generan un retorno promedio de 5-7x. NXG Media también construye visibilidad ante IA para clínicas y PYMES.',
    },
    qualifications: {
      nl: [
        '7+ jaar ervaring in online marketing & funnelstrategie',
        '50+ coaches en experts begeleid naar voorspelbare leadflow',
        '€5M+ aan Meta Ads budget beheerd',
        'Gemiddeld 5-7x ROAS voor klanten',
      ],
      en: [
        '7+ years of experience in online marketing & funnel strategy',
        '50+ coaches and experts guided toward predictable lead flow',
        '€5M+ in Meta Ads budget managed',
        'Average 5-7x ROAS for clients',
      ],
      es: [
        'Más de 7 años de experiencia en marketing online y estrategia de funnels',
        'Más de 50 coaches y expertos guiados hacia un flujo de leads predecible',
        'Más de €5M en presupuesto de Meta Ads gestionado',
        'Promedio de 5-7x ROAS para clientes',
      ],
    },
    credentials: [
      { name: 'Facebook Certified Media Buying Professional', issuer: 'Meta', year: 2019 },
      { name: 'Google Analytics Academy', issuer: 'Google', year: 2019 },
    ] as Array<{ name: string; issuer: string; year: number }>,
    education: [] as Array<{ institution: string; degree: string; year: number }>,
    languages: ['Nederlands', 'Engels', 'Spaans'],
    memberships: [] as string[],
    publications: [] as string[],
    knowsAbout: {
      nl: [
        'Online groeisystemen voor experts',
        'Storytelling & content strategie',
        'Mini-producten & productladders',
        'Email marketing automatisering',
        'Meta Ads voor coaches en experts',
        'AI-vindbaarheid & citeerbaarheid',
        'Lokale vindbaarheid voor praktijken',
      ],
      en: [
        'Online growth systems for experts',
        'Storytelling & content strategy',
        'Mini-products & product ladders',
        'Email marketing automation',
        'Meta Ads for coaches and experts',
        'AI visibility & citability',
        'Local visibility for practices',
      ],
      es: [
        'Sistemas de crecimiento online para expertos',
        'Storytelling y estrategia de contenido',
        'Mini-productos y escaleras de productos',
        'Automatización de email marketing',
        'Meta Ads para coaches y expertos',
        'Visibilidad ante IA y citabilidad',
        'Visibilidad local para negocios',
      ],
    },
    image: '/images/joost-portrait.webp',
  },

  locations: ['Valencia, ES', 'Nederland'],

  external: {
    calendlyUrl,
    scannerUrl: 'https://scanner.nxg-media.com',
  },

  newsletter: {
    provider: emailProvider as 'placeholder' | 'mailerlite' | 'kit',
  },

  legal: {
    businessName: 'NXG-Media',
    responsiblePerson: 'Joost van Putten',
    street: 'Amendijk 1',
    postalCode: '3829DS',
    city: 'Hooglanderveen',
    country: 'Nederland',
    registerNumber: 'KVK 78318122',
    taxId: 'NL003318346B95',
    email: 'info@nxg-media.com',
    phone: '+34 645 80 73 02',
  },

  expertPersonId: 'https://nxg-media.com/#joost-van-putten',
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
