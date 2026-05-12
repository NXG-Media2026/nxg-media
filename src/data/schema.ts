import { siteConfig } from './site';
import type { Testimonial } from './testimonials';

const founderUrl = `${siteConfig.url}/ueber#${siteConfig.founder.slug}`;
const orgId = `${siteConfig.url}#org`;

function baseSameAs(): string[] {
  return Object.values(siteConfig.socials).filter((url): url is string => Boolean(url));
}

export function generateFounderPerson() {
  const { founder } = siteConfig;
  const fullImage = founder.image
    ? (founder.image.startsWith('http') ? founder.image : `${siteConfig.url}${founder.image}`)
    : undefined;

  const hasCredential = (founder.credentials && founder.credentials.length > 0)
    ? founder.credentials.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        ...(c.issuer && { recognizedBy: { '@type': 'Organization', name: c.issuer } }),
        ...(c.year && c.year > 0 && { dateCreated: String(c.year) }),
      }))
    : founder.qualifications.map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: q,
      }));

  const alumniOf = founder.education
    ?.filter((e) => e.institution)
    .map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
    })) ?? [];

  const memberOf = founder.memberships
    ?.filter(Boolean)
    .map((m) => ({
      '@type': 'Organization',
      name: m,
    })) ?? [];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['Person', 'MedicalProfessional'],
    '@id': founderUrl,
    name: founder.name,
    url: founderUrl,
    jobTitle: founder.role,
    description: founder.description,
    worksFor: { '@id': orgId },
    hasCredential,
    ...(alumniOf.length > 0 && { alumniOf }),
    ...(memberOf.length > 0 && { memberOf }),
    ...(founder.languages.length > 0 && { knowsLanguage: [...founder.languages] }),
    ...(founder.knowsAbout.length > 0 && { knowsAbout: [...founder.knowsAbout] }),
    ...(fullImage && { image: fullImage }),
  });
}

export function generateOrganization() {
  const sameAs = baseSameAs();
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: siteConfig.name,
    description: siteConfig.tagline,
    url: siteConfig.url,
    founder: { '@id': founderUrl },
    ...(sameAs.length > 0 && { sameAs }),
  });
}

export function generateWebSite() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'de',
  });
}

export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generateFAQPage(faqs: Array<{ q: string; a: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  });
}

export function generateProduct(product: {
  name: string;
  description: string;
  url: string;
  price: string;
  currency?: string;
  image?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/[^0-9.,]/g, ''),
      priceCurrency: product.currency ?? 'EUR',
      availability: 'https://schema.org/InStock',
    },
    ...(product.image && {
      image: product.image.startsWith('http') ? product.image : `${siteConfig.url}${product.image}`,
    }),
  });
}

export function generateService(service: {
  name: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { '@id': orgId },
  });
}

export function generateArticle(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    inLanguage: 'de',
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
    author: { '@id': founderUrl },
    publisher: { '@id': orgId },
    ...(article.image && {
      image: article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}`,
    }),
  });
}

export function generateDefinedTermSet(terms: Array<{
  term: string;
  definition: string;
  slug: string;
}>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossar der Frauen-Gesundheit',
    url: `${siteConfig.url}/glossar`,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${siteConfig.url}/glossar#${t.slug}`,
    })),
  });
}

export function generateProfilePage() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': founderUrl },
  });
}

export function generateCollectionPage(collection: {
  name: string;
  url: string;
  description: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    url: collection.url,
    description: collection.description,
  });
}

export function generateReviewArray(set: Testimonial[]): string[] {
  return set.map((t) =>
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `${siteConfig.url}#review-${t.id}`,
      itemReviewed: { '@id': orgId },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.text,
    }),
  );
}

export function generatePerson(member: {
  slug?: string;
  name: string;
  role: string;
  description?: string;
  qualifications: readonly string[];
  credentials?: readonly { name: string; issuer: string; year?: number }[];
  education?: readonly { institution: string; degree: string; year?: number }[];
  languages?: readonly string[];
  memberships?: readonly string[];
  image?: string;
}) {
  const personUrl = member.slug ? `${siteConfig.url}/ueber#${member.slug}` : `${siteConfig.url}/ueber`;
  const fullImage = member.image
    ? (member.image.startsWith('http') ? member.image : `${siteConfig.url}${member.image}`)
    : undefined;

  const hasCredential = (member.credentials && member.credentials.length > 0)
    ? member.credentials.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        ...(c.issuer && { recognizedBy: { '@type': 'Organization', name: c.issuer } }),
        ...(c.year && c.year > 0 && { dateCreated: String(c.year) }),
      }))
    : member.qualifications.map((q) => ({
        '@type': 'EducationalOccupationalCredential',
        name: q,
      }));

  const alumniOf = member.education
    ?.filter((e) => e.institution)
    .map((e) => ({ '@type': 'EducationalOrganization', name: e.institution })) ?? [];

  const memberOf = member.memberships
    ?.filter(Boolean)
    .map((m) => ({ '@type': 'Organization', name: m })) ?? [];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personUrl,
    name: member.name,
    url: personUrl,
    jobTitle: member.role,
    ...(member.description && { description: member.description }),
    worksFor: { '@id': orgId },
    hasCredential,
    ...(alumniOf.length > 0 && { alumniOf }),
    ...(memberOf.length > 0 && { memberOf }),
    ...(member.languages && member.languages.length > 0 && { knowsLanguage: [...member.languages] }),
    ...(fullImage && { image: fullImage }),
  });
}
