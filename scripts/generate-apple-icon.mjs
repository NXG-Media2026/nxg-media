import { chromium } from 'playwright-core';
import { join } from 'path';

const SIZE = 180;
const html = `<!DOCTYPE html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${SIZE}px; height: ${SIZE}px;
    background: #C17B5A;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
  }
  .mark {
    font-size: 72px; font-weight: 700; color: #FDFCFA;
    letter-spacing: -2px; line-height: 1;
  }
</style></head>
<body><div class="mark">dv</div></body></html>`;

async function main() {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: SIZE, height: SIZE } })).newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: join(process.cwd(), 'public/apple-touch-icon.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: SIZE, height: SIZE },
  });
  console.log('✓ apple-touch-icon.png (180x180)');
  await browser.close();
}

main().catch(console.error);
