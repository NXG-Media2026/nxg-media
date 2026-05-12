import { getCollection } from 'astro:content';
import { siteConfig, type Locale } from '../data/site';
import { getCollectionBasePath } from './utils';

type CollectionType = 'artikel' | 'produkte' | 'coaching' | 'glossar';

interface HreflangEntry {
  lang: string;
  href: string;
}

export async function getHreflangForContent(
  translationKey: string | undefined,
  collection: CollectionType,
  routeCollection: 'blog' | 'produkte' | 'coaching' | 'glossar',
): Promise<HreflangEntry[]> {
  if (!translationKey) return [];

  const entries = await getCollection(collection);
  const siblings = entries.filter((e: any) => e.data.translationKey === translationKey);
  if (siblings.length < 2) return [];

  return siblings.map((entry: any) => {
    const locale: Locale = entry.data.locale ?? 'de';
    const slug = collection === 'glossar' ? entry.data.slug : entry.data.pageSlug;
    const basePath = getCollectionBasePath(routeCollection, locale);
    return {
      lang: locale,
      href: `${siteConfig.url}${basePath}/${slug}`,
    };
  });
}

export function getHreflangForCluster(
  deHubSlug: string,
  enHubSlug: string | undefined,
): HreflangEntry[] {
  if (!enHubSlug) return [];

  const deTopicsBase = getCollectionBasePath('themen', 'de');
  const enTopicsBase = getCollectionBasePath('themen', 'en');
  return [
    { lang: 'de', href: `${siteConfig.url}${deTopicsBase}/${deHubSlug}` },
    { lang: 'en', href: `${siteConfig.url}${enTopicsBase}/${enHubSlug}` },
  ];
}

export function buildHreflangPair(
  dePath: string,
  enPath: string,
): HreflangEntry[] {
  return [
    { lang: 'de', href: `${siteConfig.url}${dePath}` },
    { lang: 'en', href: `${siteConfig.url}${enPath}` },
  ];
}
