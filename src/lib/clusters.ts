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
export async function getClusterArticles(clusterSlug: string) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const articles = await getCollection('artikel');

  // Match articles by explicit cluster membership in frontmatter
  const matched = articles.filter((article) => {
    const data = article.data as Record<string, unknown>;
    // Primary cluster membership
    if (data.cluster === clusterSlug) return true;
    // Secondary cluster membership
    if (Array.isArray(data.secondaryClusters) && data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });

  // Exclude items explicitly excluded from hub
  const excluded = new Set(cluster.excludeFromHub);
  const filtered = matched.filter((a) => !excluded.has(a.data.pageSlug));

  // Sort featured articles first
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
export async function getClusterGlossary(clusterSlug: string) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const glossarEntries = await getCollection('glossar');
  if (!glossarEntries || glossarEntries.length === 0) return [];

  // Match by primary or secondary cluster membership
  const matched = glossarEntries.filter((entry) => {
    if (entry.data.cluster === clusterSlug) return true;
    if (Array.isArray(entry.data.secondaryClusters) && entry.data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });

  // Sort featured terms first (per cluster YAML ordering)
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
export async function getClusterPrimaryProduct(clusterSlug: string) {
  const cluster = getCluster(clusterSlug);
  if (!cluster?.primaryProduct) return null;

  const products = await getCollection('produkte');
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
 * Get the hub FAQ items for a cluster.
 */
export function getClusterFaq(clusterSlug: string): ClusterFaqItem[] {
  const cluster = getCluster(clusterSlug);
  return cluster?.hubFaq ?? [];
}
