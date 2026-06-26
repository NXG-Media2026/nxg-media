interface Env {
  META_CAPI_TOKEN: string;
  META_PIXEL_ID: string;
  META_TEST_CODE?: string;
}

interface CapiEvent {
  event_name: string;
  event_id: string;
  event_time?: number;
  event_source_url?: string;
  action_source?: string;
  user_data?: Record<string, string>;
  custom_data?: Record<string, unknown>;
}

interface RequestBody {
  events: CapiEvent[];
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://nxg-media.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const token = context.env.META_CAPI_TOKEN;
  const pixelId = context.env.META_PIXEL_ID;

  if (!token || !pixelId) {
    return new Response(JSON.stringify({ error: 'not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: RequestBody;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid json' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!body.events?.length) {
    return new Response(JSON.stringify({ error: 'no events' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const ip = context.request.headers.get('cf-connecting-ip') || context.request.headers.get('x-forwarded-for') || '';
  const ua = context.request.headers.get('user-agent') || '';
  const now = Math.floor(Date.now() / 1000);

  const enrichedEvents = body.events.map((evt) => ({
    event_name: evt.event_name,
    event_id: evt.event_id,
    event_time: evt.event_time || now,
    event_source_url: evt.event_source_url || context.request.headers.get('referer') || '',
    action_source: 'website',
    user_data: {
      client_ip_address: ip,
      client_user_agent: ua,
      ...(evt.user_data || {}),
    },
    custom_data: evt.custom_data || {},
  }));

  const metaPayload: Record<string, unknown> = { data: enrichedEvents };
  if (context.env.META_TEST_CODE) {
    metaPayload.test_event_code = context.env.META_TEST_CODE;
  }

  const metaUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`;

  try {
    const metaRes = await fetch(metaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metaPayload),
    });

    const metaBody = await metaRes.json();

    return new Response(JSON.stringify({ success: metaRes.ok, meta: metaBody }), {
      status: metaRes.ok ? 200 : 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'meta api failed' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://nxg-media.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};
