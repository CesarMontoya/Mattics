import { chromium } from 'playwright';
import { createInterface } from 'node:readline';
import { existsSync, unlinkSync } from 'node:fs';

const PROFILE_DIR = './playwright/.auth/profile';
const LOGIN_URL = process.argv[2] || 'https://brilliant.org/login';
const SIGNAL_FILE = '/tmp/opencode/login-enter';

const browser = await chromium.launchPersistentContext(PROFILE_DIR, {
  channel: 'chrome',
  headless: false,
  viewport: null,
  args: ['--disable-blink-features=AutomationControlled'],
});

const page = browser.pages()[0] ?? (await browser.newPage());
await page.goto(LOGIN_URL);

console.log('\nLogueate en el navegador (Brilliant + Google).');
console.log('Esta ventana usa perfil persistente + --disable-blink-features=AutomationControlled para evitar captcha anti-bot.\n');
console.log('Cuando termines, presiona Enter aquí.\n');
console.log(`(Si se ejecuta en segundo plano: tocar ${SIGNAL_FILE} equivale a presionar Enter)\n`);

await new Promise<void>((resolve) => {
  if (existsSync(SIGNAL_FILE)) unlinkSync(SIGNAL_FILE);

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const checkSignal = setInterval(() => {
    if (existsSync(SIGNAL_FILE)) {
      clearInterval(checkSignal);
      rl.close();
      resolve();
    }
  }, 500);

  rl.on('line', () => {
    clearInterval(checkSignal);
    rl.close();
    resolve();
  });
  rl.resume();
});

// Exportar storageState para que los tests de Playwright (project brilliant) lo usen
// launchPersistentContext retorna un BrowserContext directamente, no un Browser
await browser.storageState({ path: './playwright/.auth/brilliant.json' });
console.log('\n✓ storageState guardado en playwright/.auth/brilliant.json');

await browser.close();
console.log(`✓ Perfil persistente guardado en ${PROFILE_DIR}\n`);
