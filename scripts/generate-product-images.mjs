import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), 'src/assets/images/products');
const WIDTH = 1200;
const HEIGHT = 750;

const products = [
  {
    slug: 'hormon-reset-guide',
    title: 'Hormon-Reset Guide',
    subtitle: 'E-Book · 80+ Seiten',
    price: '€49',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" stroke="#C17B5A" stroke-width="3"/>
      <path d="M28 44c4-12 8-18 12-18s8 6 12 18" stroke="#C17B5A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="28" r="4" fill="#C17B5A" opacity="0.3"/>
      <path d="M26 52h28" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M30 58h20" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #C17B5A 0%, #D4956E 100%)',
    bgPattern: 'radial-gradient(circle at 80% 20%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
  {
    slug: 'erste-hilfe-histamin',
    title: 'Erste Hilfe bei Histamin',
    subtitle: '7 Audio-Module · E-Book',
    price: '€37',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="56" height="56" rx="12" stroke="#C17B5A" stroke-width="3"/>
      <path d="M40 24v32M24 40h32" stroke="#C17B5A" stroke-width="4" stroke-linecap="round"/>
      <circle cx="40" cy="40" r="8" stroke="#C17B5A" stroke-width="2" opacity="0.3"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #D4956E 0%, #C17B5A 100%)',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
  {
    slug: 'perimenopause-protocol',
    title: 'Perimenopause Protocol',
    subtitle: '190+ Seiten · 6-Wochen-Plan',
    price: '€33',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 60 Q28 20 40 40 Q52 60 64 20" stroke="#C17B5A" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="16" cy="60" r="4" fill="#C17B5A" opacity="0.4"/>
      <circle cx="40" cy="40" r="4" fill="#C17B5A" opacity="0.6"/>
      <circle cx="64" cy="20" r="4" fill="#C17B5A" opacity="0.8"/>
      <path d="M12 68h56" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #C17B5A 0%, #A66745 100%)',
    bgPattern: 'radial-gradient(circle at 70% 70%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
  {
    slug: 'food-guide',
    title: 'Food Guide',
    subtitle: '80+ Seiten · Rezepte & Tipps',
    price: '€29,95',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="48" rx="28" ry="16" stroke="#C17B5A" stroke-width="3"/>
      <path d="M28 36c0 0 4-16 12-16s12 16 12 16" stroke="#C17B5A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="36" cy="44" r="3" fill="#C17B5A" opacity="0.3"/>
      <circle cx="46" cy="42" r="2" fill="#C17B5A" opacity="0.4"/>
      <circle cx="40" cy="50" r="2.5" fill="#C17B5A" opacity="0.25"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #D4956E 0%, #C17B5A 100%)',
    bgPattern: 'radial-gradient(circle at 30% 30%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
  {
    slug: 'smoothie-guide',
    title: 'Smoothie-Gids',
    subtitle: '30 Mahlzeit-Smoothies',
    price: '€14,95',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 24h28l-4 40H30z" stroke="#C17B5A" stroke-width="3" stroke-linejoin="round"/>
      <path d="M22 24h36" stroke="#C17B5A" stroke-width="3" stroke-linecap="round"/>
      <path d="M36 16c0 0 -4 0 -4 4s4 4 4 4" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
      <path d="M44 14c0 0 -4 0 -4 4s4 4 4 4" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <path d="M32 36h16" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <path d="M33 44h14" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #C17B5A 0%, #D4956E 100%)',
    bgPattern: 'radial-gradient(circle at 60% 40%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
  {
    slug: 'runners-guide',
    title: 'Von Null auf 10km',
    subtitle: '12-Wochen-Laufplan',
    price: '€24,95',
    icon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="44" cy="18" r="6" stroke="#C17B5A" stroke-width="3"/>
      <path d="M30 68l8-20 10 8 12-24" stroke="#C17B5A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M36 48l-10 6" stroke="#C17B5A" stroke-width="3" stroke-linecap="round"/>
      <path d="M48 52l8 10" stroke="#C17B5A" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 70h40" stroke="#C17B5A" stroke-width="2" stroke-linecap="round" opacity="0.2"/>
    </svg>`,
    accentGradient: 'linear-gradient(135deg, #A66745 0%, #C17B5A 100%)',
    bgPattern: 'radial-gradient(circle at 80% 60%, rgba(193,123,90,0.08) 0%, transparent 50%)',
  },
];

function buildHTML(product) {
  return `<!DOCTYPE html>
<html>
<head>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #F5EFE6;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    position: relative;
  }
  .bg-pattern {
    position: absolute;
    inset: 0;
    background: ${product.bgPattern};
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 60px 80px;
    gap: 60px;
  }
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .brand {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #C17B5A;
  }
  .title {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 700;
    color: #1F4E5F;
    line-height: 1.15;
  }
  .subtitle {
    font-size: 20px;
    color: #5A7A84;
    font-weight: 400;
    margin-top: 4px;
  }
  .price-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
  }
  .price {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: #1F4E5F;
  }
  .divider {
    width: 60px;
    height: 4px;
    background: ${product.accentGradient};
    border-radius: 2px;
    margin-top: 4px;
  }
  .right {
    width: 340px;
    height: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .icon-ring {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: rgba(193,123,90,0.06);
    border: 2px solid rgba(193,123,90,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .icon-ring::before {
    content: '';
    position: absolute;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    border: 1px solid rgba(193,123,90,0.06);
  }
  .icon-ring svg {
    width: 120px;
    height: 120px;
  }
  .corner-accent {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: ${product.accentGradient};
    opacity: 0.04;
    border-radius: 50% 0 0 0;
  }
  .top-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${product.accentGradient};
  }
  .by-line {
    font-size: 13px;
    color: #8A9BA0;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div class="top-line"></div>
  <div class="bg-pattern"></div>
  <div class="corner-accent"></div>
  <div class="container">
    <div class="left">
      <div class="brand">doc.veri</div>
      <div class="divider"></div>
      <h1 class="title">${product.title}</h1>
      <p class="subtitle">${product.subtitle}</p>
      <div class="price-tag">
        <span class="price">${product.price}</span>
      </div>
      <p class="by-line">Von Dr. Verena Mann</p>
    </div>
    <div class="right">
      <div class="icon-ring">
        ${product.icon}
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT } });

  for (const product of products) {
    const page = await context.newPage();
    await page.setContent(buildHTML(product), { waitUntil: 'networkidle' });

    const outputPath = join(OUTPUT_DIR, `${product.slug}.jpg`);
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 90,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    console.log(`✓ ${product.slug}.jpg`);
    await page.close();
  }

  await browser.close();
  console.log(`\nDone — ${products.length} product images generated.`);
}

main().catch(console.error);
