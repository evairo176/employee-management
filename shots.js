const { chromium } = require('playwright');
const B = 'https://employee.evairo.fun';
(async () => {
  const br = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await br.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(B + '/auth/login', { waitUntil: 'networkidle' });
  await p.screenshot({ path: '/tmp/e2e/f2-login.png' });
  await p.fill('#username', 'admin'); await p.fill('#password', 'admin123');
  await p.click('button[type="submit"]'); await p.waitForURL('**/employees**');
  await p.waitForTimeout(1200);
  await p.screenshot({ path: '/tmp/e2e/f2-list.png' });

  // scroll bukti sidebar+header diam
  await p.evaluate(() => window.scrollTo(0, 800));
  await p.waitForTimeout(600);
  await p.screenshot({ path: '/tmp/e2e/f2-scrolled.png' });
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);

  // sheet add
  await p.getByRole('button', { name: 'Add Employee' }).first().click();
  await p.waitForTimeout(1200);
  await p.screenshot({ path: '/tmp/e2e/f2-sheet-add.png' });
  await p.getByRole('button', { name: 'Cancel' }).first().click();
  await p.waitForTimeout(900);

  // sheet edit
  await p.getByRole('button', { name: 'Edit' }).first().click();
  await p.waitForTimeout(1200);
  await p.screenshot({ path: '/tmp/e2e/f2-sheet-edit.png' });
  await p.getByRole('button', { name: 'Cancel' }).first().click();
  await p.waitForTimeout(900);

  // dialog delete
  await p.getByRole('button', { name: 'Delete' }).first().click();
  await p.waitForTimeout(900);
  await p.screenshot({ path: '/tmp/e2e/f2-dialog-delete.png' });

  // mobile
  const m = await ctx.newPage();
  await m.setViewportSize({ width: 390, height: 844 });
  await m.goto(B + '/employees', { waitUntil: 'networkidle' });
  await m.waitForTimeout(1000);
  await m.screenshot({ path: '/tmp/e2e/f2-mobile.png' });

  console.log('shots ok');
  await br.close();
})();
