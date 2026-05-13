/**
 * FAQ/Schema coverage audit script.
 * Checks every built HTML page for:
 * - Visible FAQ content (details/summary elements)
 * - FAQPage JSON-LD schema presence
 * - Match between visible FAQ and schema
 * - All schema types present
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

function getFiles(dir) {
  const results = [];
  function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const fp = path.join(d, f);
      if (fs.statSync(fp).isDirectory()) walk(fp);
      else if (f.endsWith('.html')) results.push(fp);
    }
  }
  walk(dir);
  return results;
}

const files = getFiles(DIST);
const results = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace('/index.html', '');

  // Count visible FAQ items — only <details> whose <summary> contains an <h3>
  // (FAQ accordion pattern). Excludes nav/header <details> which use <span>.
  const detailsCount = (html.match(/<details[\s\S]*?<summary[\s\S]*?<h3[\s\S]*?<\/details>/g) || []).length;

  // Extract schema types
  const schemaBlocks = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
  const schemaTypes = [];
  for (const block of schemaBlocks) {
    const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(json);
      if (data['@type']) schemaTypes.push(data['@type']);
      if (data['@graph']) data['@graph'].forEach(n => { if (n['@type']) schemaTypes.push(n['@type']); });
    } catch (e) { /* skip malformed */ }
  }

  const hasFaqSchema = schemaTypes.includes('FAQPage');

  results.push({
    path: rel,
    visibleFaq: detailsCount,
    faqSchema: hasFaqSchema,
    schemas: schemaTypes,
  });
}

// Categorize pages
const categories = {
  'Homepage': r => r.path === '/' || r.path === '/en',
  'Product pages': r => (r.path.startsWith('/produkte/') && r.path !== '/produkte') || (r.path.startsWith('/en/products/') && r.path !== '/en/products'),
  'Product listing': r => r.path === '/produkte' || r.path === '/en/products',
  'Coaching detail': r => (r.path.startsWith('/coaching/') && r.path !== '/coaching') || (r.path.startsWith('/en/coaching/') && r.path !== '/en/coaching'),
  'Coaching listing': r => r.path === '/coaching' || r.path === '/en/coaching',
  'Masterclass': r => r.path.includes('masterclass'),
  'Cluster hub': r => (r.path.startsWith('/themen/') && r.path !== '/themen') || (r.path.startsWith('/en/topics/') && r.path !== '/en/topics'),
  'Topic listing': r => r.path === '/themen' || r.path === '/en/topics',
  'Blog article': r => (r.path.startsWith('/blog/') && r.path !== '/blog') || (r.path.startsWith('/en/blog/') && r.path !== '/en/blog'),
  'Blog listing': r => r.path === '/blog' || r.path === '/en/blog',
  'Glossary detail': r => (r.path.startsWith('/glossar/') && r.path !== '/glossar') || (r.path.startsWith('/en/glossary/') && r.path !== '/en/glossary'),
  'Glossary listing': r => r.path === '/glossar' || r.path === '/en/glossary',
  'FAQ page': r => r.path === '/faq' || r.path === '/en/faq',
  'Membership': r => r.path === '/mitgliedschaft' || r.path === '/en/membership',
  'About': r => r.path === '/ueber' || r.path === '/en/about',
  'Archetype': r => r.path.includes('archetypen') || r.path.includes('archetypes'),
  'Lead magnet': r => r.path.includes('lead-magnet') || r.path.includes('free-resources'),
  'Angebot/Offers': r => r.path === '/angebot' || r.path === '/en/offers',
  'Quiz': r => r.path === '/quiz' || r.path === '/en/quiz',
};

let issueCount = 0;

for (const [cat, filter] of Object.entries(categories)) {
  const items = results.filter(filter);
  if (items.length === 0) continue;

  console.log(`\n=== ${cat} (${items.length} pages) ===`);

  for (const item of items) {
    let status;
    if (item.visibleFaq > 0 && item.faqSchema) {
      status = '✅ MATCH';
    } else if (item.visibleFaq > 0 && !item.faqSchema) {
      status = '⚠️  MISSING SCHEMA';
      issueCount++;
    } else if (item.visibleFaq === 0 && item.faqSchema) {
      status = '⚠️  SCHEMA WITHOUT VISIBLE FAQ';
      issueCount++;
    } else {
      status = '— no FAQ';
    }

    console.log(`  ${item.path}`);
    console.log(`    Visible FAQ items: ${item.visibleFaq} | FAQPage schema: ${item.faqSchema ? 'yes' : 'no'} → ${status}`);
    console.log(`    All schemas: ${item.schemas.length > 0 ? item.schemas.join(', ') : 'none'}`);
  }
}

// Summary
console.log('\n============================================================');
console.log('SUMMARY');
console.log('============================================================');
const withFaq = results.filter(r => r.visibleFaq > 0);
const withSchema = results.filter(r => r.faqSchema);
const matched = results.filter(r => r.visibleFaq > 0 && r.faqSchema);
const missingSchema = results.filter(r => r.visibleFaq > 0 && !r.faqSchema);
const orphanSchema = results.filter(r => r.visibleFaq === 0 && r.faqSchema);

console.log(`  Pages with visible FAQ: ${withFaq.length}`);
console.log(`  Pages with FAQPage schema: ${withSchema.length}`);
console.log(`  Matched (visible + schema): ${matched.length}`);
console.log(`  Missing schema (visible but no schema): ${missingSchema.length}`);
if (missingSchema.length > 0) {
  missingSchema.forEach(r => console.log(`    ⚠️  ${r.path}`));
}
console.log(`  Orphan schema (schema but no visible): ${orphanSchema.length}`);
if (orphanSchema.length > 0) {
  orphanSchema.forEach(r => console.log(`    ⚠️  ${r.path}`));
}
console.log(`  Total issues: ${issueCount}`);
