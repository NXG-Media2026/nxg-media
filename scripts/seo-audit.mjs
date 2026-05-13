import fs from 'fs';
import path from 'path';

// Collect all HTML files
function walkDir(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) results = results.concat(walkDir(full));
    else if (f === 'index.html') results.push(full);
  }
  return results;
}

const files = walkDir('dist');
console.log('Total HTML pages:', files.length);

const issues = [];
const warnings = [];
const pages = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative('dist', path.dirname(file)).replace(/\\/g, '/');
  const urlPath = rel ? '/' + rel : '/';
  const isEN = urlPath.startsWith('/en');
  const locale = isEN ? 'en' : 'de';

  const pg = { url: urlPath, locale };

  // 1. Title tag
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  pg.title = titleMatch ? titleMatch[1] : null;
  if (!pg.title) issues.push(urlPath + ' — MISSING <title>');
  else if (pg.title.length > 65) warnings.push(urlPath + ' — title too long (' + pg.title.length + '): ' + pg.title.substring(0, 60) + '...');
  else if (pg.title.length < 20) warnings.push(urlPath + ' — title very short (' + pg.title.length + '): ' + pg.title);

  // 2. Meta description
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  pg.desc = descMatch ? descMatch[1] : null;
  if (!pg.desc) issues.push(urlPath + ' — MISSING meta description');
  else if (pg.desc.length > 160) warnings.push(urlPath + ' — description too long (' + pg.desc.length + '): ' + pg.desc.substring(0, 60) + '...');
  else if (pg.desc.length < 50) warnings.push(urlPath + ' — description very short (' + pg.desc.length + ')');

  // 3. H1 count
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) issues.push(urlPath + ' — MISSING H1');
  else if (h1s > 1) issues.push(urlPath + ' — MULTIPLE H1s (' + h1s + ')');

  // 4. Canonical
  const canonMatch = html.match(/<link rel="canonical" href="([^"]*)"/);
  pg.canonical = canonMatch ? canonMatch[1] : null;
  if (!pg.canonical) issues.push(urlPath + ' — MISSING canonical');
  else {
    // Canonical should match the page URL
    const expectedCanonical = 'https://docveri.de' + urlPath;
    // Normalize trailing slash
    const normCanon = pg.canonical.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    const normExpected = expectedCanonical.replace(/\/$/, '');
    if (normCanon !== normExpected) {
      warnings.push(urlPath + ' — canonical mismatch: ' + pg.canonical + ' (expected ' + expectedCanonical + ')');
    }
  }

  // 5. OG tags
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/);
  const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/);
  const ogUrl = html.match(/<meta property="og:url" content="([^"]*)"/);
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/);
  const ogType = html.match(/<meta property="og:type" content="([^"]*)"/);
  const ogLocale = html.match(/<meta property="og:locale" content="([^"]*)"/);
  if (!ogTitle) issues.push(urlPath + ' — MISSING og:title');
  if (!ogDesc) issues.push(urlPath + ' — MISSING og:description');
  if (!ogUrl) issues.push(urlPath + ' — MISSING og:url');
  if (!ogImage) warnings.push(urlPath + ' — MISSING og:image');
  if (!ogType) warnings.push(urlPath + ' — MISSING og:type');
  if (ogLocale) {
    const expectedOgLocale = locale === 'de' ? 'de_DE' : 'en_US';
    if (ogLocale[1] !== expectedOgLocale) {
      issues.push(urlPath + ' — og:locale "' + ogLocale[1] + '" but expected "' + expectedOgLocale + '"');
    }
  }

  // 6. Hreflang
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  pg.hreflangCount = hreflangs.length;
  pg.hreflangs = hreflangs.map(h => ({ lang: h[1], href: h[2] }));
  if (hreflangs.length === 0) warnings.push(urlPath + ' — no hreflang tags');
  else {
    // Check self-referential
    const selfHreflang = hreflangs.find(h => h[1] === locale);
    if (!selfHreflang) issues.push(urlPath + ' — hreflang present but no self-referential for ' + locale);
    // Check x-default
    const xDefault = hreflangs.find(h => h[1] === 'x-default');
    if (!xDefault) warnings.push(urlPath + ' — hreflang present but no x-default');
  }

  // 7. Schema/JSON-LD
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  pg.schemaCount = schemas.length;
  const schemaTypes = [];
  for (const s of schemas) {
    try {
      const obj = JSON.parse(s[1]);
      const type = Array.isArray(obj['@type']) ? obj['@type'].join('+') : obj['@type'];
      schemaTypes.push(type);
    } catch (e) {
      issues.push(urlPath + ' — INVALID JSON-LD: ' + e.message);
    }
  }
  pg.schemaTypes = schemaTypes;

  // 8. Lang attribute
  const langMatch = html.match(/<html[^>]*lang="([^"]*)"/);
  pg.htmlLang = langMatch ? langMatch[1] : null;
  if (!pg.htmlLang) issues.push(urlPath + ' — MISSING html lang attribute');
  else if (pg.htmlLang !== locale) issues.push(urlPath + ' — html lang="' + pg.htmlLang + '" but expected "' + locale + '"');

  // 9. Images without alt
  const imgs = [...html.matchAll(/<img[^>]*>/g)];
  const imgsNoAlt = imgs.filter(i => !i[0].includes('alt='));
  if (imgsNoAlt.length > 0) warnings.push(urlPath + ' — ' + imgsNoAlt.length + ' image(s) without alt attribute');

  // 10. Twitter card
  const twCard = html.match(/<meta name="twitter:card" content="([^"]*)"/);
  if (!twCard) warnings.push(urlPath + ' — MISSING twitter:card');

  // 11. Viewport
  const viewport = html.match(/<meta name="viewport"/);
  if (!viewport) issues.push(urlPath + ' — MISSING viewport meta');

  // 12. Heading hierarchy (check for H3 before H2)
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>/g)].map(m => parseInt(m[1][1]));
  let lastLevel = 0;
  for (const h of headings) {
    if (h > lastLevel + 1 && lastLevel > 0) {
      warnings.push(urlPath + ' — heading skip: H' + lastLevel + ' → H' + h);
      break; // only report first skip
    }
    lastLevel = h;
  }

  pages.push(pg);
}

// === REPORT ===
console.log('\n' + '='.repeat(60));
console.log('CRITICAL ISSUES (' + issues.length + ')');
console.log('='.repeat(60));
issues.forEach(i => console.log('  ❌', i));
if (issues.length === 0) console.log('  ✅ None');

console.log('\n' + '='.repeat(60));
console.log('WARNINGS (' + warnings.length + ')');
console.log('='.repeat(60));
warnings.forEach(w => console.log('  ⚠️ ', w));
if (warnings.length === 0) console.log('  ✅ None');

// Duplicate titles
console.log('\n' + '='.repeat(60));
console.log('DUPLICATE TITLES');
console.log('='.repeat(60));
const titleMap = {};
pages.forEach(p => { if (p.title) { (titleMap[p.title] = titleMap[p.title] || []).push(p.url); } });
let dupTitles = 0;
Object.entries(titleMap).filter(([t, urls]) => urls.length > 1).forEach(([t, urls]) => {
  console.log('  ⚠️  "' + t.substring(0, 70) + '" →', urls.join(', '));
  dupTitles++;
});
if (dupTitles === 0) console.log('  ✅ All titles unique');

// Duplicate descriptions
console.log('\n' + '='.repeat(60));
console.log('DUPLICATE DESCRIPTIONS');
console.log('='.repeat(60));
const descMap = {};
pages.forEach(p => { if (p.desc) { (descMap[p.desc] = descMap[p.desc] || []).push(p.url); } });
let dupDescs = 0;
Object.entries(descMap).filter(([d, urls]) => urls.length > 1).forEach(([d, urls]) => {
  console.log('  ⚠️  "' + d.substring(0, 70) + '" →', urls.join(', '));
  dupDescs++;
});
if (dupDescs === 0) console.log('  ✅ All descriptions unique');

// Hreflang bidirectional check
console.log('\n' + '='.repeat(60));
console.log('HREFLANG BIDIRECTIONAL CHECK');
console.log('='.repeat(60));
let hreflangIssues = 0;
for (const pg of pages) {
  for (const hl of pg.hreflangs) {
    if (hl.lang === 'x-default' || hl.lang === pg.locale) continue;
    // Find the target page
    const targetUrl = hl.href.replace('https://docveri.de', '');
    const targetPage = pages.find(p => p.url === targetUrl || p.url === targetUrl.replace(/\/$/, ''));
    if (!targetPage) {
      issues.push(pg.url + ' — hreflang points to non-existent page: ' + hl.href);
      hreflangIssues++;
      continue;
    }
    // Check if target page links back
    const backLink = targetPage.hreflangs.find(h => h.lang === pg.locale);
    if (!backLink) {
      issues.push(pg.url + ' → ' + targetUrl + ' — hreflang NOT bidirectional (target has no ' + pg.locale + ' hreflang)');
      hreflangIssues++;
    }
  }
}
if (hreflangIssues === 0) console.log('  ✅ All hreflang links are bidirectional');
else console.log('  ❌', hreflangIssues, 'bidirectional issues found');

// Pages without hreflang
console.log('\n' + '='.repeat(60));
console.log('PAGES WITHOUT HREFLANG (no translation pair)');
console.log('='.repeat(60));
const noHreflang = pages.filter(p => p.hreflangCount === 0);
if (noHreflang.length > 0) {
  noHreflang.forEach(p => console.log('  ⚠️ ', p.url));
} else {
  console.log('  ✅ All pages have hreflang');
}

// Schema coverage by page type
console.log('\n' + '='.repeat(60));
console.log('SCHEMA COVERAGE');
console.log('='.repeat(60));
for (const pg of pages) {
  const types = pg.schemaTypes.join(', ') || 'NONE';
  if (pg.schemaCount === 0) {
    console.log('  ⚠️ ', pg.url, '— no JSON-LD');
  }
}
const withSchema = pages.filter(p => p.schemaCount > 0).length;
console.log('  ' + withSchema + '/' + pages.length + ' pages have JSON-LD schema');

// GEO: Article pages should have Article schema
console.log('\n' + '='.repeat(60));
console.log('GEO: ARTICLE SCHEMA CHECK');
console.log('='.repeat(60));
const blogPages = pages.filter(p => p.url.includes('/blog/') && p.url !== '/blog' && p.url !== '/en/blog');
for (const bp of blogPages) {
  const hasArticle = bp.schemaTypes.some(t => t === 'Article' || t === 'BlogPosting' || t === 'MedicalWebPage');
  if (!hasArticle) {
    warnings.push(bp.url + ' — blog article without Article/BlogPosting schema (has: ' + bp.schemaTypes.join(', ') + ')');
    console.log('  ⚠️ ', bp.url, '— missing Article schema (has:', bp.schemaTypes.join(', '), ')');
  } else {
    console.log('  ✅', bp.url, '→', bp.schemaTypes.join(', '));
  }
}

// GEO: Product pages should have Product schema
console.log('\n' + '='.repeat(60));
console.log('GEO: PRODUCT SCHEMA CHECK');
console.log('='.repeat(60));
const productPages = pages.filter(p => p.url.includes('/produkte/') || p.url.includes('/products/'));
for (const pp of productPages) {
  if (pp.url === '/produkte' || pp.url === '/en/products') continue;
  const hasProduct = pp.schemaTypes.some(t => t === 'Product' || t === 'DigitalDocument' || t === 'Course');
  console.log(hasProduct ? '  ✅' : '  ⚠️ ', pp.url, '→', pp.schemaTypes.join(', ') || 'NONE');
}

// GEO: FAQ pages/sections
console.log('\n' + '='.repeat(60));
console.log('GEO: FAQ SCHEMA CHECK');
console.log('='.repeat(60));
const faqPages = pages.filter(p => p.schemaTypes.includes('FAQPage'));
console.log('  Pages with FAQPage schema:', faqPages.length);
faqPages.forEach(p => console.log('    ✅', p.url));

// GEO: Person/Expert schema
console.log('\n' + '='.repeat(60));
console.log('GEO: EXPERT/PERSON SCHEMA');
console.log('='.repeat(60));
const personPages = pages.filter(p => p.schemaTypes.some(t => t && (t.includes('Person') || t.includes('MedicalProfessional'))));
console.log('  Pages with Person/MedicalProfessional:', personPages.length);
if (personPages.length < 5) personPages.forEach(p => console.log('    ✅', p.url));

// Final summary
console.log('\n' + '='.repeat(60));
console.log('FINAL SUMMARY');
console.log('='.repeat(60));
console.log('  Total pages:', pages.length);
console.log('  DE pages:', pages.filter(p => p.locale === 'de').length);
console.log('  EN pages:', pages.filter(p => p.locale === 'en').length);
console.log('  Critical issues:', issues.length);
console.log('  Warnings:', warnings.length);
console.log('  Duplicate titles:', dupTitles);
console.log('  Duplicate descriptions:', dupDescs);
console.log('  Pages with schema:', withSchema);
console.log('  Pages without hreflang:', noHreflang.length);
console.log('  Hreflang bidirectional issues:', hreflangIssues);
