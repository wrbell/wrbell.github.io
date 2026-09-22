// Renders scripts/og-image.html to assets/og-image.png and assets/og-card.png.
import { chromium } from 'playwright';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = new URL('./og-image.html', import.meta.url).href;
const out = fileURLToPath(new URL('../assets/og-image.png', import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(src);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
copyFileSync(out, out.replace('og-image.png', 'og-card.png'));
console.log('wrote assets/og-image.png + og-card.png');
