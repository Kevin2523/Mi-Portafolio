const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4300/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  // Modo claro (default)
  await page.screenshot({ path: 'C:/Users/kjmg2/Documents/hermes/preview-light.png', fullPage: true });
  // Cambiar a oscuro
  await page.evaluate(() => { document.querySelector('main').classList.add('dark'); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/kjmg2/Documents/hermes/preview-dark.png', fullPage: true });
  await browser.close();
  console.log('OK');
})();
