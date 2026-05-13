// ─── Internal Visibility Dashboard — Static Data ────────────────────────
// Contains manually-maintained data and external-pending placeholders.
// Build-time metrics are computed separately in src/lib/visibilityMetrics.ts.
// This file only holds data that CANNOT be computed from the codebase.

import type { SourceType } from '../lib/visibilityMetrics';

export interface TrafficMonth {
  month: string;   // YYYY-MM
  value: number;
}

export interface TopPage {
  page: string;
  title: string;
  clicks: number;
  impressions: number;
  trend: 'up' | 'stable' | 'down' | 'new';
}

export interface PageVisibilityEntry {
  page: string;
  targetQuery: string;
  googleStatus: 'ranking' | 'not_yet';
  aiStatus: 'cited' | 'not_found';
}

export interface ConversionEvents {
  period: string;
  product_cta_clicks: number;
  coaching_cta_clicks: number;
  newsletter_signups: number;
  lead_magnet_downloads: number;
  quiz_completions: number;
  discovery_calls: number;
}

export interface CompletedAction {
  date: string;   // YYYY-MM-DD
  action: string;
}

export interface NextPriority {
  priority: string;
  status: 'done' | 'in_progress' | 'planned';
}

export interface ManualVisibilityData {
  updatedAt: string;
  reportMonth: string;
  authorityScore: {
    value: number;
    previousValue: number;
    source: SourceType;
    note: string;
  };
  organicTraffic: {
    source: SourceType;
    sourceLabel: string;
    clicks: TrafficMonth[];
  };
  topPages: {
    source: SourceType;
    sourceLabel: string;
    entries: TopPage[];
  };
  pageVisibility: {
    googleSource: SourceType;
    googleSourceLabel: string;
    aiSource: SourceType;
    aiSourceLabel: string;
    entries: PageVisibilityEntry[];
  };
  conversionEvents: {
    source: SourceType;
    sourceLabel: string;
    current: ConversionEvents;
    previousMonth: ConversionEvents;
  };
  completedActions: CompletedAction[];
  nextPriorities: NextPriority[];
}

// ─── Manual / external data ─────────────────────────────────────────────
// These values require real integrations or manual checks.
// Update them as integrations come online.

const manualData: ManualVisibilityData = {
  updatedAt: '2026-05-13',
  reportMonth: 'May 2026',

  // Authority stays manual until real backlinks, citations, reviews exist
  authorityScore: {
    value: 15,
    previousValue: 0,
    source: 'manual-check',
    note: 'No backlinks, external citations or reviews measured yet',
  },

  organicTraffic: {
    source: 'external-pending',
    sourceLabel: 'Pending Search Console setup',
    clicks: [
      { month: '2026-05', value: 0 },
    ],
  },

  topPages: {
    source: 'external-pending',
    sourceLabel: 'Pending Search Console setup',
    entries: [
      { page: '/',                              title: 'Homepage',                 clicks: 0, impressions: 0, trend: 'new' },
      { page: '/themen/hormone',                title: 'Hormone (Pillar)',         clicks: 0, impressions: 0, trend: 'new' },
      { page: '/blog/hormonbalance-grundlagen', title: 'Hormonbalance Grundlagen', clicks: 0, impressions: 0, trend: 'new' },
      { page: '/glossar',                       title: 'Glossar',                  clicks: 0, impressions: 0, trend: 'new' },
      { page: '/quiz',                          title: 'Hormon-Typ Quiz',          clicks: 0, impressions: 0, trend: 'new' },
    ],
  },

  pageVisibility: {
    googleSource: 'external-pending',
    googleSourceLabel: 'Pending Search Console setup',
    aiSource: 'manual-check',
    aiSourceLabel: 'Manual AI visibility checks',
    entries: [
      { page: 'Hormone (Pillar)',         targetQuery: 'hormone frauen balance',           googleStatus: 'not_yet', aiStatus: 'not_found' },
      { page: 'Hormonbalance Grundlagen', targetQuery: 'hormonbalance frauen grundlagen',  googleStatus: 'not_yet', aiStatus: 'not_found' },
      { page: 'Glossar',                  targetQuery: 'glossar frauen gesundheit hormone', googleStatus: 'not_yet', aiStatus: 'not_found' },
      { page: 'Hormon-Typ Quiz',          targetQuery: 'hormon typ quiz frauen',           googleStatus: 'not_yet', aiStatus: 'not_found' },
    ],
  },

  conversionEvents: {
    source: 'placeholder',
    sourceLabel: 'Placeholder until GA4 is connected',
    current: {
      period: '2026-05',
      product_cta_clicks: 0,
      coaching_cta_clicks: 0,
      newsletter_signups: 0,
      lead_magnet_downloads: 0,
      quiz_completions: 0,
      discovery_calls: 0,
    },
    previousMonth: {
      period: '—',
      product_cta_clicks: 0,
      coaching_cta_clicks: 0,
      newsletter_signups: 0,
      lead_magnet_downloads: 0,
      quiz_completions: 0,
      discovery_calls: 0,
    },
  },

  completedActions: [
    { date: '2026-05-01', action: 'Website launch: all pages live' },
    { date: '2026-05-01', action: 'Hormone pillar page published' },
    { date: '2026-05-01', action: 'First article: Hormonbalance Grundlagen' },
    { date: '2026-05-01', action: 'Glossary created with 12 terms' },
    { date: '2026-05-01', action: 'Hormone type quiz live with 4 archetypes' },
    { date: '2026-05-12', action: 'Cluster architecture: 5 clusters configured' },
    { date: '2026-05-12', action: 'Bundle upsell system live' },
    { date: '2026-05-12', action: 'About/E-E-A-T pages expanded (DE + EN)' },
    { date: '2026-05-13', action: 'Visibility dashboard: build-time metrics wired' },
  ],

  nextPriorities: [
    { priority: 'Set up Google Search Console and submit sitemap',    status: 'planned' },
    { priority: 'Configure GA4 Measurement ID',                      status: 'planned' },
    { priority: 'Publish 3 more articles',                           status: 'planned' },
    { priority: 'Create 2 more pillar pages (Training, Nutrition)',   status: 'planned' },
    { priority: 'Connect email provider (e.g. Kit / ConvertKit)',     status: 'planned' },
    { priority: 'Run first manual AI visibility check',              status: 'planned' },
  ],
};

export default manualData;
