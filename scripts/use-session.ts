import { chromium } from 'playwright';

const PROFILE_DIR = './playwright/.auth/profile';
const TARGET_URL = process.argv[2] || 'https://brilliant.org/';

const browser = await chromium.launchPersistentContext(PROFILE_DIR, {
  channel: 'chrome',
  headless: true,
  args: ['--disable-blink-features=AutomationControlled'],
});

const page = browser.pages()[0] ?? (await browser.newPage());
await page.goto(TARGET_URL);

console.log('Título:', await page.title());
console.log('URL:', page.url());
console.log('Cookies:', (await browser.cookies()).length, 'cookies en perfil');

await browser.close();
