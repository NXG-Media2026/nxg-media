// ─── Build-time Visibility Metrics ──────────────────────────────────────
// Computes real structural metrics from content collections at build time.
// No external APIs. No database. Just counting what exists in the codebase.

import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

// ─── Types ──────────────────────────────────────────────────────────────

export type SourceType = 'build-measured' | 'manual-check' | 'placeholder' | 'external-pending';

export interface MetricEntry {
  label: string;
  value: number | string;
  source: SourceType;
}

export interface ContentInventory {
  articles: MetricEntry;
  products: MetricEntry;
  glossaryTerms: MetricEntry;
  archetypes: MetricEntry;
  pillars: MetricEntry;
  coaching: MetricEntry;
  leadMagnets: MetricEntry;
  membership: MetricEntry;
  clusters: MetricEntry;
  totalContentEntries: MetricEntry;
}

export interface BilingualCoverage {
  articlesWithTranslation: MetricEntry;
  productsWithTranslation: MetricEntry;
  glossaryWithTranslation: MetricEntry;
  archetypesWithTranslation: MetricEntry;
  coachingWithTranslation: MetricEntry;
  leadMagnetsWithTranslation: MetricEntry;
}

export interface ContentQuality {
  productsWithValueProp: MetricEntry;
  productsWithCtaBullets: MetricEntry;
  productsWithExpertPOV: MetricEntry;
  productsWithCluster: MetricEntry;
  contentWithFaq: MetricEntry;
  clusterFaqSets: MetricEntry;
}

export interface TechnicalChecks {
  sitemapExists: MetricEntry;
  robotsTxtExists: MetricEntry;
  robotsDisallowDashboard: MetricEntry;
  clusterYamlFiles: MetricEntry;
  hreflangPairsEstimate: MetricEntry;
}

export interface BuildMetrics {
  computedAt: string;
  inventory: ContentInventory;
  bilingual: BilingualCoverage;
  quality: ContentQuality;
  technical: TechnicalChecks;
  technicalScore: number;
  citabilityScore: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────

function countWithTranslationKey(entries: { data: { translationKey?: string } }[]): number {
  const keys = entries.filter(e => e.data.translationKey).map(e => e.data.translationKey);
  const unique = new Set(keys);
  // A translationKey that appears in 2+ entries = a bilingual pair
  let pairs = 0;
  for (const key of unique) {
    if (keys.filter(k => k === key).length >= 2) pairs++;
  }
  return pairs;
}

function countClusterYaml(): number {
  const dir = path.resolve('src/data/clusters');
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml')).length;
  } catch {
    return 0;
  }
}

function sitemapExists(): boolean {
  // After build, sitemap is in dist/. At build time, check if astro config generates it.
  // Simpler: check if @astrojs/sitemap is configured (it always runs for this project).
  try {
    const config = fs.readFileSync(path.resolve('astro.config.mjs'), 'utf-8');
    return config.includes('sitemap');
  } catch {
    return false;
  }
}

function robotsTxtExists(): boolean {
  try {
    return fs.existsSync(path.resolve('public/robots.txt'));
  } catch {
    return false;
  }
}

function robotsDisallowsDashboard(): boolean {
  try {
    const content = fs.readFileSync(path.resolve('public/robots.txt'), 'utf-8');
    return content.includes('Disallow: /sichtbarkeit');
  } catch {
    return false;
  }
}

function countClusterFaqSets(): number {
  const dir = path.resolve('src/data/clusters');
  let count = 0;
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      // Count both DE hubFaq and locale-override hubFaq blocks
      const matches = content.match(/hubFaq:/g);
      if (matches) count += matches.length;
    }
  } catch { /* skip */ }
  return count;
}

// ─── Main compute function ──────────────────────────────────────────────

export async function computeBuildMetrics(): Promise<BuildMetrics> {
  // Fetch all collections
  const articles = await getCollection('artikel');
  const products = await getCollection('produkte');
  const glossary = await getCollection('glossar');
  const archetypes = await getCollection('archetypen');
  const pillars = await getCollection('pillars');
  const coaching = await getCollection('coaching');
  const leadMagnets = await getCollection('leadMagnets');
  const membership = await getCollection('mitgliedschaft');

  const clusterCount = countClusterYaml();
  const clusterFaqSets = countClusterFaqSets();

  // ── Content inventory ─────────────────────────────────────────────
  const totalEntries = articles.length + products.length + glossary.length +
    archetypes.length + pillars.length + coaching.length + leadMagnets.length + membership.length;

  const inventory: ContentInventory = {
    articles:             { label: 'Articles',          value: articles.length,    source: 'build-measured' },
    products:             { label: 'Products',          value: products.length,    source: 'build-measured' },
    glossaryTerms:        { label: 'Glossary terms',    value: glossary.length,    source: 'build-measured' },
    archetypes:           { label: 'Archetypes',        value: archetypes.length,  source: 'build-measured' },
    pillars:              { label: 'Pillar pages',      value: pillars.length,     source: 'build-measured' },
    coaching:             { label: 'Coaching offers',   value: coaching.length,    source: 'build-measured' },
    leadMagnets:          { label: 'Lead magnets',      value: leadMagnets.length, source: 'build-measured' },
    membership:           { label: 'Membership',        value: membership.length,  source: 'build-measured' },
    clusters:             { label: 'Topic clusters',    value: clusterCount,       source: 'build-measured' },
    totalContentEntries:  { label: 'Total content entries', value: totalEntries,   source: 'build-measured' },
  };

  // ── Bilingual coverage ────────────────────────────────────────────
  const bilingual: BilingualCoverage = {
    articlesWithTranslation:    { label: 'Article translation pairs',    value: countWithTranslationKey(articles),    source: 'build-measured' },
    productsWithTranslation:    { label: 'Product translation pairs',    value: countWithTranslationKey(products),    source: 'build-measured' },
    glossaryWithTranslation:    { label: 'Glossary translation pairs',   value: countWithTranslationKey(glossary as any), source: 'build-measured' },
    archetypesWithTranslation:  { label: 'Archetype translation pairs',  value: countWithTranslationKey(archetypes), source: 'build-measured' },
    coachingWithTranslation:    { label: 'Coaching translation pairs',   value: countWithTranslationKey(coaching),   source: 'build-measured' },
    leadMagnetsWithTranslation: { label: 'Lead magnet translation pairs', value: countWithTranslationKey(leadMagnets), source: 'build-measured' },
  };

  // ── Content quality ───────────────────────────────────────────────
  const productsWithVP = products.filter(p => p.data.valueProposition).length;
  const productsWithCTA = products.filter(p => p.data.ctaBullets && p.data.ctaBullets.length > 0).length;
  const productsWithPOV = products.filter(p => p.data.expertPOV).length;
  const productsWithCluster = products.filter(p => p.data.cluster).length;
  const contentWithFaq = [
    ...products.filter(p => p.data.faq && p.data.faq.length > 0),
    ...coaching.filter(c => c.data.faq && c.data.faq.length > 0),
    ...archetypes.filter(a => a.data.faq && a.data.faq.length > 0),
    ...pillars.filter(p => p.data.faq && p.data.faq.length > 0),
  ].length;

  const quality: ContentQuality = {
    productsWithValueProp:  { label: 'Products with value proposition', value: productsWithVP,       source: 'build-measured' },
    productsWithCtaBullets: { label: 'Products with CTA bullets',       value: productsWithCTA,      source: 'build-measured' },
    productsWithExpertPOV:  { label: 'Products with expert POV',        value: productsWithPOV,      source: 'build-measured' },
    productsWithCluster:    { label: 'Products in a cluster',           value: productsWithCluster,  source: 'build-measured' },
    contentWithFaq:         { label: 'Content entries with FAQ',        value: contentWithFaq,       source: 'build-measured' },
    clusterFaqSets:         { label: 'Cluster hub FAQ sets',            value: clusterFaqSets,       source: 'build-measured' },
  };

  // ── Technical checks ──────────────────────────────────────────────
  const hasSitemap = sitemapExists();
  const hasRobots = robotsTxtExists();
  const dashboardBlocked = robotsDisallowsDashboard();

  // Estimate hreflang pairs from bilingual content
  const totalBilingualPairs =
    (bilingual.articlesWithTranslation.value as number) +
    (bilingual.productsWithTranslation.value as number) +
    (bilingual.glossaryWithTranslation.value as number) +
    (bilingual.archetypesWithTranslation.value as number) +
    (bilingual.coachingWithTranslation.value as number) +
    (bilingual.leadMagnetsWithTranslation.value as number);

  const technical: TechnicalChecks = {
    sitemapExists:             { label: 'Sitemap configured',         value: hasSitemap ? 'Yes' : 'No',       source: 'build-measured' },
    robotsTxtExists:           { label: 'robots.txt exists',          value: hasRobots ? 'Yes' : 'No',        source: 'build-measured' },
    robotsDisallowDashboard:   { label: 'Dashboard blocked in robots', value: dashboardBlocked ? 'Yes' : 'No', source: 'build-measured' },
    clusterYamlFiles:          { label: 'Cluster YAML configs',       value: clusterCount,                     source: 'build-measured' },
    hreflangPairsEstimate:     { label: 'Bilingual content pairs',    value: totalBilingualPairs,              source: 'build-measured' },
  };

  // ── Score computation ─────────────────────────────────────────────

  // Technical score (0–100): structural readiness
  // Weighted checklist — each check contributes points
  let techPoints = 0;
  const techMax = 100;

  // Sitemap (10 pts)
  if (hasSitemap) techPoints += 10;
  // robots.txt (10 pts)
  if (hasRobots) techPoints += 10;
  // Dashboard blocked (5 pts)
  if (dashboardBlocked) techPoints += 5;
  // Content exists (15 pts) — at least 5 content entries
  if (totalEntries >= 5) techPoints += 10;
  if (totalEntries >= 20) techPoints += 5;
  // Clusters configured (15 pts)
  if (clusterCount >= 1) techPoints += 5;
  if (clusterCount >= 3) techPoints += 5;
  if (clusterCount >= 5) techPoints += 5;
  // Bilingual coverage (15 pts)
  if (totalBilingualPairs >= 1) techPoints += 5;
  if (totalBilingualPairs >= 5) techPoints += 5;
  if (totalBilingualPairs >= 10) techPoints += 5;
  // Products have clusters (10 pts)
  if (products.length > 0 && productsWithCluster / products.length >= 0.5) techPoints += 5;
  if (products.length > 0 && productsWithCluster / products.length >= 0.9) techPoints += 5;
  // Content diversity (10 pts) — multiple content types present
  const typesPresent = [articles, products, glossary, archetypes, pillars, coaching, leadMagnets]
    .filter(c => c.length > 0).length;
  if (typesPresent >= 3) techPoints += 5;
  if (typesPresent >= 5) techPoints += 5;
  // Hreflang (10 pts) — bilingual pairs match content
  const bilingualRatio = totalEntries > 0
    ? (totalBilingualPairs * 2) / totalEntries  // *2 because each pair = 2 entries
    : 0;
  if (bilingualRatio >= 0.3) techPoints += 5;
  if (bilingualRatio >= 0.6) techPoints += 5;

  const technicalScore = Math.min(techPoints, techMax);

  // Citability score (0–100): content depth for AI/search extraction
  let citePoints = 0;
  const citeMax = 100;

  // Glossary terms (15 pts)
  if (glossary.length >= 1) citePoints += 5;
  if (glossary.length >= 5) citePoints += 5;
  if (glossary.length >= 10) citePoints += 5;
  // FAQ coverage (20 pts)
  if (contentWithFaq >= 1) citePoints += 5;
  if (contentWithFaq >= 5) citePoints += 5;
  if (contentWithFaq >= 10) citePoints += 5;
  if (clusterFaqSets >= 3) citePoints += 5;
  // Expert POV on products (15 pts)
  if (products.length > 0 && productsWithPOV / products.length >= 0.3) citePoints += 5;
  if (products.length > 0 && productsWithPOV / products.length >= 0.6) citePoints += 5;
  if (products.length > 0 && productsWithPOV / products.length >= 0.9) citePoints += 5;
  // Value propositions (15 pts)
  if (products.length > 0 && productsWithVP / products.length >= 0.3) citePoints += 5;
  if (products.length > 0 && productsWithVP / products.length >= 0.6) citePoints += 5;
  if (products.length > 0 && productsWithVP / products.length >= 0.9) citePoints += 5;
  // Cluster definitions (10 pts)
  if (clusterCount >= 1) citePoints += 5;
  if (clusterCount >= 3) citePoints += 5;
  // Archetypes (10 pts) — structured personas for AI extraction
  if (archetypes.length >= 2) citePoints += 5;
  if (archetypes.length >= 4) citePoints += 5;
  // Pillar pages (10 pts)
  if (pillars.length >= 1) citePoints += 5;
  if (pillars.length >= 3) citePoints += 5;
  // CTA bullets (5 pts) — structured commercial content
  if (products.length > 0 && productsWithCTA / products.length >= 0.5) citePoints += 5;

  const citabilityScore = Math.min(citePoints, citeMax);

  return {
    computedAt: new Date().toISOString().split('T')[0],
    inventory,
    bilingual,
    quality,
    technical,
    technicalScore,
    citabilityScore,
  };
}
