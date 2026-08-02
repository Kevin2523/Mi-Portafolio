const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:4300/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // Proyectos
  await page.evaluate(() => document.getElementById('projects')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/kjmg2/Documents/hermes/preview-projects.png' });

  // Habilidades
  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/kjmg2/Documents/hermes/preview-skills.png' });

  // Experiencia
  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/kjmg2/Documents/hermes/preview-experience.png' });

  await browser.close();
  console.log('OK');
})();
