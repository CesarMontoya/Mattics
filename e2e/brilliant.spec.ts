import { test, expect } from '@playwright/test';

// Requiere haber corrido antes: bunx playwright test e2e/auth.setup.ts --headed
// Usa storageState de playwright/.auth/brilliant.json (configurado en playwright.config.ts)

test('brilliant está autenticado', async ({ page }) => {
  await page.goto('https://brilliant.org/');

  // Si la sesión es válida, no deberíamos ser redirigidos a /login
  await expect(page).not.toHaveURL(/.*\/login.*/);

  // Ejemplo: verificar que hay contenido autenticado (ajusta el selector a tu caso)
  // await expect(page.getByRole('link', { name: /profile|dashboard/i })).toBeVisible();
});
