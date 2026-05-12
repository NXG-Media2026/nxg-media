/**
 * Email capture abstraction layer.
 *
 * Unified interface for all email capture points (quiz, masterclass waitlist,
 * newsletter). Supports a provider interface so switching from placeholder
 * to MailerLite/Kit requires changing only this file + env vars.
 *
 * IMPORTANT: Do NOT expose API keys in frontend code.
 * When a real provider is configured, submissions must go through a
 * serverless endpoint (e.g. Cloudflare Worker, Astro API route) that
 * holds the API key server-side. See TODO markers below.
 *
 * Provider recommendation: MailerLite — best fit for this project because:
 * - Free tier covers 1,000 subscribers (enough for launch)
 * - Native German-language support
 * - Tag-based segmentation (maps directly to our tag schema)
 * - Simple REST API, no webhook complexity
 * - GDPR-compliant (EU data processing)
 * - Automation workflows for welcome sequences
 */

// ─── Types ───────────────────────────────────────────────────────

export type EmailProvider = 'placeholder' | 'mailerlite' | 'kit';

export type EmailSource =
  | 'newsletter_footer'
  | 'newsletter_inline'
  | 'quiz_email_gate'
  | 'masterclass_waitlist'
  | 'lead_magnet_download';

export interface EmailCapturePayload {
  /** Subscriber email address */
  email: string;
  /** Optional first name */
  firstName?: string;
  /** Where this capture happened */
  source: EmailSource;
  /** Tags for ESP segmentation */
  tags: string[];
  /** Cluster context if available */
  cluster?: string;
  /** Page route where signup happened */
  route?: string;
  /** Quiz archetype result if available */
  archetype?: string;
  /** Product slug if related to a product */
  product?: string;
  /** Masterclass slug if waitlist signup */
  masterclassSlug?: string;
}

export interface EmailCaptureResult {
  ok: boolean;
  /** True when using placeholder provider (no real ESP call) */
  placeholder: boolean;
  /** Error message if ok is false */
  error?: string;
}

// ─── Provider resolution ─────────────────────────────────────────

/**
 * Current provider — reads from env var at build time.
 *
 * TODO: Set VITE_EMAIL_PROVIDER in .env when ready:
 *   VITE_EMAIL_PROVIDER=mailerlite
 *
 * For MailerLite, also set (server-side only, NOT VITE_ prefixed):
 *   MAILERLITE_API_KEY=your_api_key
 *   MAILERLITE_GROUP_ID=your_default_group_id
 *
 * For Kit (ConvertKit), set:
 *   KIT_API_KEY=your_api_key
 *   KIT_FORM_ID=your_default_form_id
 */
function getProvider(): EmailProvider {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const env = (import.meta.env.VITE_EMAIL_PROVIDER || '').toLowerCase();
    if (env === 'mailerlite' || env === 'kit') return env;
  }
  return 'placeholder';
}

// ─── Payload builders ────────────────────────────────────────────

/**
 * Build payload for newsletter signup (footer or inline component).
 */
export function buildNewsletterPayload(
  email: string,
  opts: { route?: string; pageType?: string } = {},
): EmailCapturePayload {
  return {
    email,
    source: opts.route === 'footer' ? 'newsletter_footer' : 'newsletter_inline',
    tags: ['newsletter', `source_${opts.route === 'footer' ? 'footer' : 'inline'}`],
    route: opts.route,
  };
}

/**
 * Build payload for quiz email gate.
 */
export function buildQuizPayload(
  email: string,
  opts: { archetype?: string; cluster?: string } = {},
): EmailCapturePayload {
  const tags = ['quiz_lead'];
  if (opts.archetype) tags.push(`archetype_${opts.archetype}`);
  if (opts.cluster) tags.push(`cluster_${opts.cluster}`);
  return {
    email,
    source: 'quiz_email_gate',
    tags,
    archetype: opts.archetype,
    cluster: opts.cluster,
    route: '/quiz',
  };
}

/**
 * Build payload for masterclass waitlist.
 */
export function buildMasterclassPayload(
  email: string,
  opts: { masterclassSlug: string; cluster?: string } = { masterclassSlug: '' },
): EmailCapturePayload {
  const slugTag = opts.masterclassSlug.replace(/-/g, '_');
  return {
    email,
    source: 'masterclass_waitlist',
    tags: [`masterclass_${slugTag}`, 'source_masterclass_waitlist'],
    masterclassSlug: opts.masterclassSlug,
    cluster: opts.cluster,
    route: `/masterclass/${opts.masterclassSlug}`,
  };
}

// ─── Submission ──────────────────────────────────────────────────

/**
 * Submit an email capture payload to the configured provider.
 *
 * In placeholder mode: logs to console and returns success.
 * In real mode: would POST to a serverless endpoint.
 *
 * This function is safe to call from client-side code — it never
 * touches API keys directly. Real providers route through an endpoint.
 */
export async function submitEmailCapture(
  payload: EmailCapturePayload,
): Promise<EmailCaptureResult> {
  const provider = getProvider();

  switch (provider) {
    case 'mailerlite':
      return submitToEndpoint('/api/email-capture', payload);

    case 'kit':
      return submitToEndpoint('/api/email-capture', payload);

    case 'placeholder':
    default:
      // Log structured payload so it's visible in dev console
      if (typeof console !== 'undefined') {
        console.log(
          `[emailCapture:placeholder] ${payload.source}`,
          JSON.stringify(payload, null, 2),
        );
      }
      return { ok: true, placeholder: true };
  }
}

/**
 * POST payload to a serverless endpoint.
 *
 * TODO: Create the endpoint when ESP is configured:
 *   - Cloudflare Worker at /api/email-capture, OR
 *   - Astro API route at src/pages/api/email-capture.ts (SSR mode)
 *
 * The endpoint should:
 *   1. Validate email format
 *   2. Read API key from server env (NOT from request)
 *   3. Map payload.tags to ESP tags/groups
 *   4. Call MailerLite/Kit API
 *   5. Return { ok: boolean, error?: string }
 */
async function submitToEndpoint(
  endpoint: string,
  payload: EmailCapturePayload,
): Promise<EmailCaptureResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, placeholder: false, error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    return { ok: data.ok !== false, placeholder: false };
  } catch (err) {
    return {
      ok: false,
      placeholder: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

// ─── Client-side helper (for inline scripts) ─────────────────────

/**
 * Serialize a payload to a data attribute string for use in
 * inline scripts that can't import modules.
 *
 * Usage in Astro templates:
 *   data-email-payload={serializePayload(payload)}
 *
 * Then in inline script:
 *   const payload = JSON.parse(el.dataset.emailPayload);
 */
export function serializePayload(payload: EmailCapturePayload): string {
  return JSON.stringify(payload);
}
