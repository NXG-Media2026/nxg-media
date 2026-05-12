/**
 * Cluster data layer — reads cluster YAML configs and resolves
 * content graph relationships at build time.
 *
 * Based on CLUSTER_ARCHITECTURE_V1.2.md §3.1
 *
 * Source-of-truth split:
 * - Cluster YAML owns: strategy, routing, conversion assets, analytics, audience
 * - Content frontmatter owns: cluster membership (cluster: "histamin")
 * - This module resolves the graph by reading both sides
 */

import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { getCollection } from 'astro:content';
import type { Locale } from '../data/site';

// ─── Types ───────────────────────────────────────────────────────

export interface ClusterFaqItem {
  question: string;
  answer: string;
}

export interface CrossClusterLink {
  cluster: string;
  relationship: string;
  bridgeText: string;
  priority: number;
  showOn: Array<'hub' | 'articles' | 'product'>;
}

export interface LeadMagnet {
  slug: string;
  type: string;
  title: string;
  deliveryUrl: string;
  emailTag: string;
}

export interface ClusterAudience {
  primaryICP: string;
  metaPixelEvent: string;
  emailListTag: string;
  retargetingAudienceId: string;
}

export interface ClusterAnalytics {
  primarySuccessEvent: string;
  secondarySuccessEvents: string[];
  funnelOrder: string[];
}

export interface ClusterLocaleOverrides {
  hubSlug: string;
  title: string;
  shortTitle: string;
  citableDefinition: string;
  hubIntro: string;
  hubFaq: ClusterFaqItem[];
}

export interface ClusterConfig {
  // Identity
  slug: string;
  hubSlug: string;
  title: string;
  shortTitle: string;
  heroImage: string;
  citableDefinition: string;
  hubIntro: string;

  // Content curation
  featuredArticles: string[];
  featuredGlossaryTerms: string[];
  excludeFromHub: string[];

  // Hub FAQ
  hubFaq: ClusterFaqItem[];

  // Commercial
  primaryProduct: string;
  secondaryProducts: string[];
  crossSellProducts: string[];

  // Conversion assets
  leadMagnets: {
    primary: LeadMagnet;
  };

  // Cross-cluster linking
  crossClusters: CrossClusterLink[];

  // Funnel routing
  calendlyContext: string;

  // Audience
  audience: ClusterAudience;

  // Analytics
  analytics: ClusterAnalytics;

  // Locale overrides (optional)
  locales?: Partial<Record<string, Partial<ClusterLocaleOverrides>>>;
}

// ─── YAML loading ────────────────────────────────────────────────

const CLUSTERS_DIR = path.join(process.cwd(), 'src', 'data', 'clusters');

/** Cache to avoid re-reading files during a single build */
const clusterCache = new Map<string, ClusterConfig>();

/**
 * Load and parse a single cluster YAML config by slug.
 * Returns null if the file doesn't exist.
 */
export function getCluster(slug: string): ClusterConfig | null {
  if (clusterCache.has(slug)) {
    return clusterCache.get(slug)!;
  }

  const filePath = path.join(CLUSTERS_DIR, `${slug}.yaml`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const config = parseYaml(raw) as ClusterConfig;
  clusterCache.set(slug, config);
  return config;
}

/**
 * Load a cluster config with locale-specific overrides applied.
 * Falls back to the base (German) fields if no locale override exists.
 */
export function getClusterLocalized(slug: string, locale: Locale = 'de'): ClusterConfig | null {
  const base = getCluster(slug);
  if (!base) return null;
  if (locale === 'de' || !base.locales?.[locale]) return base;

  const overrides = base.locales[locale]!;
  return {
    ...base,
    ...(overrides.hubSlug !== undefined && { hubSlug: overrides.hubSlug }),
    ...(overrides.title !== undefined && { title: overrides.title }),
    ...(overrides.shortTitle !== undefined && { shortTitle: overrides.shortTitle }),
    ...(overrides.citableDefinition !== undefined && { citableDefinition: overrides.citableDefinition }),
    ...(overrides.hubIntro !== undefined && { hubIntro: overrides.hubIntro }),
    ...(overrides.hubFaq !== undefined && { hubFaq: overrides.hubFaq }),
  };
}

/**
 * Load all cluster configs from the clusters directory.
 */
export function getAllClusters(): ClusterConfig[] {
  if (!fs.existsSync(CLUSTERS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CLUSTERS_DIR).filter((f) => f.endsWith('.yaml'));

  return files.map((file) => {
    const slug = file.replace('.yaml', '');
    return getCluster(slug)!;
  }).filter(Boolean);
}

// ─── Content graph resolution ────────────────────────────────────

/**
 * Get all articles belonging to a cluster.
 * Resolves from content frontmatter where `cluster` matches the cluster slug.
 *
 * Source-of-truth: content frontmatter owns cluster membership.
 * - `cluster: "histamin"` → primary membership, shown in hub article grid
 * - `secondaryClusters: ["histamin"]` → secondary membership, also shown
 * - `pillarSlug` is NOT used — pillars and clusters are independent concepts
 *
 * featuredArticles in cluster YAML controls ordering/highlighting only,
 * never membership.
 */
export async function getClusterArticles(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const articles = await getCollection('artikel');

  const matched = articles.filter((article) => {
    const data = article.data as Record<string, unknown>;
    if (locale && data.locale && data.locale !== locale) return false;
    if (data.cluster === clusterSlug) return true;
    if (Array.isArray(data.secondaryClusters) && data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });

  const excluded = new Set(cluster.excludeFromHub);
  const filtered = matched.filter((a) => !excluded.has(a.data.pageSlug));

  const featuredSlugs = cluster.featuredArticles;
  return filtered.sort((a, b) => {
    const aIdx = featuredSlugs.indexOf(a.data.pageSlug);
    const bIdx = featuredSlugs.indexOf(b.data.pageSlug);
    const aWeight = aIdx >= 0 ? aIdx : 999;
    const bWeight = bIdx >= 0 ? bIdx : 999;
    return aWeight - bWeight;
  });
}

/**
 * Get glossary terms belonging to a cluster.
 * Reads from the glossar content collection (type: 'data', YAML files).
 */
export async function getClusterGlossary(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const glossarEntries = await getCollection('glossar');
  if (!glossarEntries || glossarEntries.length === 0) return [];

  const matched = glossarEntries.filter((entry) => {
    if (locale && entry.data.locale && entry.data.locale !== locale) return false;
    if (entry.data.cluster === clusterSlug) return true;
    if (Array.isArray(entry.data.secondaryClusters) && entry.data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });

  const featuredSlugs = cluster.featuredGlossaryTerms;
  return matched.sort((a, b) => {
    const aIdx = featuredSlugs.indexOf(a.data.slug);
    const bIdx = featuredSlugs.indexOf(b.data.slug);
    return (aIdx >= 0 ? aIdx : 999) - (bIdx >= 0 ? bIdx : 999);
  });
}

/**
 * Get the primary product for a cluster.
 * Returns the product collection entry or null.
 */
export async function getClusterPrimaryProduct(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster?.primaryProduct) return null;

  const products = await getCollection('produkte');

  // Direct match by pageSlug
  const directMatch = products.find(
    (p) => p.data.pageSlug === cluster.primaryProduct && (!locale || !p.data.locale || p.data.locale === locale),
  );
  if (directMatch) return directMatch;

  // Cross-locale: find DE product, then look up translated version via translationKey
  if (locale && locale !== 'de') {
    const deProduct = products.find((p) => p.data.pageSlug === cluster.primaryProduct);
    if (deProduct?.data.translationKey) {
      const translated = products.find(
        (p) => (p.data as Record<string, unknown>).translationKey === deProduct.data.translationKey
          && (p.data as Record<string, unknown>).locale === locale,
      );
      if (translated) return translated;
    }
  }

  return products.find((p) => p.data.pageSlug === cluster.primaryProduct) ?? null;
}

/**
 * Get cross-cluster links for a specific page context.
 * Filters by showOn to only return relevant bridges.
 */
export function getClusterBridges(
  clusterSlug: string,
  pageType: 'hub' | 'articles' | 'product',
): CrossClusterLink[] {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  return cluster.crossClusters
    .filter((link) => link.showOn.includes(pageType))
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Get the hub FAQ items for a cluster, with locale support.
 */
export function getClusterFaq(clusterSlug: string, locale: Locale = 'de'): ClusterFaqItem[] {
  const cluster = getClusterLocalized(clusterSlug, locale);
  return cluster?.hubFaq ?? [];
}
