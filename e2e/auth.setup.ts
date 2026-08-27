import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/brilliant.json';

/**
 * Setup para login manual con Google en Brilliant.
 * Flujo Opción B — no guarda credenciales, guarda solo storageState.
 *
 * Pasos:
 *  1. Corre: bunx playwright test e2e/auth.setup.ts --headed
 *  2. Se abre Chromium en https://brilliant.org/login
 *  3. Haz click en "Continue with Google" y completa el login a mano
 *     (incluido 2FA si aplica). Tienes 5 minutos.
 *  4. Una vez que aterrices en https://brilliant.org/** (no /login),
 *     el test guarda automáticamente playwright/.auth/brilliant.json
 *  5. Los siguientes tests reusarán esa sesión sin volver a loguear.
 */
setup('authenticate brilliant (Google)', async ({ page }) => {
  setup.setTimeout(6 * 60 * 1000);
  await page.goto('https://brilliant.org/login');

  console.log('\n=== LOGIN MANUAL REQUERIDO ===');
  console.log('1. Haz click en "Continue with Google"');
  console.log('2. Completa el login en la ventana de Google');
  console.log('3. Espera a ser redirigido a brilliant.org');
  console.log('==============================\n');

  // Esperar a que el usuario complete el flujo de Google.
  // Detectamos salida de /login hacia la app (cualquier ruta sin /login).
  // Timeout largo para dar tiempo al 2FA.
  await page.waitForURL((url) => !url.pathname.includes('/login'), {
    timeout: 5 * 60 * 1000,
  });

  // Verificación extra: ya no hay botón de login visible
  await expect(page).not.toHaveURL(/.*\/login.*/);

  await page.context().storageState({ path: authFile });
  console.log(`\n✓ Sesión guardada en ${authFile}\n`);
});
