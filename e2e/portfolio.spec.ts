import { test, expect } from '@playwright/test';

test.describe('Portfolio Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Kevin Mena/);
  });

  test('should display hero section with name and title', async ({ page }) => {
    await expect(page.locator('text=Kevin Mena')).toBeVisible();
    await expect(page.locator('text=Full-Stack Developer & Auditoría IA')).toBeVisible();
  });

  test('should display status badge', async ({ page }) => {
    await expect(page.locator('text=Disponible para proyectos')).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await expect(page.locator('text=inicio')).toBeVisible();
    await expect(page.locator('text=trayectoria')).toBeVisible();
    await expect(page.locator('text=proyectos')).toBeVisible();
  });

  test('should have theme toggle button', async ({ page }) => {
    const themeToggle = page.locator('button:has-text("Oscuro"), button:has-text("Claro")').first();
    await expect(themeToggle).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await page.click('a[href="/proyectos"]');
    await expect(page).toHaveURL(/.*proyectos/);
  });

  test('should navigate to experience page', async ({ page }) => {
    await page.click('a[href="/experiencia"]');
    await expect(page).toHaveURL(/.*experiencia/);
  });

  test('should have CTA buttons', async ({ page }) => {
    await expect(page.locator('a:has-text("Ver proyectos")')).toBeVisible();
    await expect(page.locator('a:has-text("Contactar")')).toBeVisible();
  });

  test('should have tech tags', async ({ page }) => {
    await expect(page.locator('text=Angular')).toBeVisible();
    await expect(page.locator('text=TypeScript')).toBeVisible();
    await expect(page.locator('text=Python')).toBeVisible();
    await expect(page.locator('text=Google Ads')).toBeVisible();
  });
});

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/proyectos');
    await page.waitForLoadState('networkidle');
  });

  test('should display projects section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Proyectos")')).toBeVisible();
  });

  test('should display 4 project cards', async ({ page }) => {
    const cards = page.locator('app-project-card');
    await expect(cards).toHaveCount(4);
  });

  test('should display project titles', async ({ page }) => {
    await expect(page.locator('text=NextAudit AI')).toBeVisible();
    await expect(page.locator('text=Jornada Industrial Coclé')).toBeVisible();
    await expect(page.locator('text=La Casa del Jean')).toBeVisible();
    await expect(page.locator('text=Publicidad Digital')).toBeVisible();
  });

  test('should open modal when clicking project card', async ({ page }) => {
    await page.click('app-project-card:has-text("NextAudit AI")');
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});

test.describe('Experience Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experiencia');
    await page.waitForLoadState('networkidle');
  });

  test('should display experience section', async ({ page }) => {
    await expect(page.locator('h2:has-text("Experiencia")')).toBeVisible();
  });

  test('should display timeline entries', async ({ page }) => {
    await expect(page.locator('text=Rosero One')).toBeVisible();
    await expect(page.locator('text=Jornada Industrial Coclé')).toBeVisible();
    await expect(page.locator('text=Proyectos para clientes')).toBeVisible();
  });
});

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('text=Contacto')).toBeVisible();
    await expect(page.locator('input[name="from_name"]')).toBeVisible();
    await expect(page.locator('input[name="from_email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    await expect(page.locator('button:has-text("enviar_mensaje")')).toBeVisible();
  });
});

test.describe('Dark Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should toggle dark mode', async ({ page }) => {
    const themeToggle = page.locator('button:has-text("Oscuro"), button:has-text("Claro")').first();
    const initialIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    
    await themeToggle.click();
    await page.waitForTimeout(300);
    
    const newIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(newIsDark).not.toBe(initialIsDark);
  });

  test('should persist theme preference', async ({ page }) => {
    const themeToggle = page.locator('button:has-text("Oscuro"), button:has-text("Claro")').first();
    
    await themeToggle.click();
    await page.waitForTimeout(300);
    
    const savedTheme = await page.evaluate(() => localStorage.getItem('km_theme'));
    expect(savedTheme).toBeTruthy();
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have skip link', async ({ page }) => {
    const skipLink = page.locator('a.skip-link:has-text("Saltar al contenido principal")');
    await expect(skipLink).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have alt text on images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have focusable elements with visible focus', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('text=Kevin Mena')).toBeVisible();
    await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('text=Kevin Mena')).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('text=Kevin Mena')).toBeVisible();
    await expect(page.locator('nav .hidden.md\\:flex')).toBeVisible();
  });
});