export type EventName =
  | 'newsletter_signup'
  | 'lead_magnet_download'
  | 'product_cta_click'
  | 'coaching_cta_click'
  | 'community_cta_click'
  | 'quiz_started'
  | 'quiz_email_captured'
  | 'quiz_completed'
  | 'faq_expand'
  | 'external_link_click'
  | 'discovery_call_click'
  | 'social_card_click'
  | 'masterclass_waitlist_signup'
  | 'masterclass_cta_click'
  | 'cross_cluster_link_click';

export type PageType =
  | 'homepage'
  | 'product'
  | 'coaching'
  | 'membership'
  | 'pillar'
  | 'article'
  | 'archetype'
  | 'quiz'
  | 'lead_magnet'
  | 'glossary'
  | 'faq'
  | 'about'
  | 'contact'
  | 'masterclass'
  | 'dashboard'
  | 'page';

export type CTALocation =
  | 'hero'
  | 'sticky_mobile'
  | 'inline'
  | 'footer'
  | 'sidebar'
  | 'product_bottom'
  | 'header';

export interface EventProperties {
  page_type: PageType;
  page_slug: string;
  locale: string;
  cta_location?: CTALocation;
  provider?: string;
  // Cluster-enhanced properties (CLUSTER_ARCHITECTURE_V1.2 §6)
  product?: string;
  product_type?: string;
  product_cluster?: string;
  source_page_type?: PageType;
  source_cluster?: string;
  target_cluster?: string;
  masterclass_slug?: string;
}

export function getTrackingScript(): string {
  return [
    'window.trackEvent=function(n,p){',
    "if(location.hostname==='localhost'||location.hostname==='127.0.0.1'){",
    "console.log('[Analytics]',n,p);return}",
    "if(typeof gtag==='function'){gtag('event',n,p)}",
    '};',
  ].join('');
}

export function getGA4Script(measurementId: string): string {
  if (!measurementId) return '';

  return (
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>` +
    '<script>window.dataLayer=window.dataLayer||[];' +
    'function gtag(){dataLayer.push(arguments)}' +
    "gtag('js',new Date());" +
    `gtag('config','${measurementId}');</script>`
  );
}

export function trackOnClick(name: EventName, props: EventProperties): string {
  return `trackEvent('${name}',${JSON.stringify(props)})`;
}
