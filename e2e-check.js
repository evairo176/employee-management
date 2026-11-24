const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://localhost:4300';
const res = [];
const ok = (n, pass, detail = '') => { res.push({ n, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${n}${detail ? ' :: ' + detail : ''}`); };

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();

  const bad = [];
  p.on('response', (r) => {
    if (r.status() >= 400 && !r.url().includes('/cdn-cgi/')) bad.push(`${r.status()} ${r.url()}`);
  });
  p.on('pageerror', (e) => bad.push('pageerror ' + e.message));

  const sheet = () => p.locator('[data-slot="sheet-content"], z-sheet-panel, [role="dialog"]').first();
  const dialog = () => p.locator('[role="alertdialog"], [role="dialog"]').first();
  const submitBtn = () => p.getByRole('button', { name: /^(Save Employee|Save Changes)$/ });

  // 1-3: login
  await p.goto(BASE + '/employees', { waitUntil: 'networkidle' });
  ok('redirect ke login saat belum sesi', p.url().includes('/auth/login'), p.url());

  await p.fill('#username', 'admin');
  await p.fill('#password', 'salah123');
  await p.click('button[type="submit"]');
  await p.waitForTimeout(600);
  ok('login salah ditolak', p.url().includes('/auth/login'));

  await p.fill('#username', 'admin');
  await p.fill('#password', 'admin123');
  await p.click('button[type="submit"]');
  await p.waitForURL('**/employees**', { timeout: 8000 }).catch(() => {});
  ok('login benar masuk /employees', p.url().includes('/employees'));

  // username riil untuk test duplikat (data dummy bukan 'admin')
  const realUsername = (await p.locator('tbody tr').first().locator('td').first().innerText().catch(() => '')).trim();

  // 4-5: layout fixed + compact
  const aside = p.locator('aside').first();
  const header = p.locator('header').first();
  const asidePos = await aside.evaluate((el) => getComputedStyle(el).position);
  const headerPos = await header.evaluate((el) => getComputedStyle(el).position);
  ok('sidebar fixed', asidePos === 'fixed', asidePos);
  ok('header fixed', headerPos === 'fixed', headerPos);

  const asideW = await aside.evaluate((el) => Math.round(el.getBoundingClientRect().width));
  const headerH = await header.evaluate((el) => Math.round(el.getBoundingClientRect().height));
  ok('sidebar compact (<=224px)', asideW <= 224, `${asideW}px`);
  ok('header pendek (<=64px)', headerH <= 64, `${headerH}px`);

  // 6: scroll -> posisi tetap
  await p.evaluate(() => window.scrollTo(0, 1200));
  await p.waitForTimeout(400);
  const afterScroll = await p.evaluate(() => {
    const a = document.querySelector('aside').getBoundingClientRect();
    const h = document.querySelector('header').getBoundingClientRect();
    return { aTop: Math.round(a.top), hTop: Math.round(h.top), sy: window.scrollY };
  });
  ok('sidebar tetap di posisi saat scroll', afterScroll.aTop === 0, JSON.stringify(afterScroll));
  ok('header tetap di posisi saat scroll', afterScroll.hTop === 0, `hTop=${afterScroll.hTop}`);
  await p.evaluate(() => window.scrollTo(0, 0));

  // 7-9: Add Employee buka sheet, bukan halaman baru
  const beforeUrl = p.url();
  await p.getByRole('button', { name: 'Add Employee' }).first().click();
  await p.waitForTimeout(700);
  const sheetVisible = await p.locator('z-sheet-panel, [data-slot="sheet-content"]').first().isVisible().catch(() => false);
  ok('Add Employee buka sheet', sheetVisible);
  ok('URL tidak berubah (bukan halaman baru)', p.url() === beforeUrl, p.url());
  const sheetTitle = await p.locator('text=Add Employee').nth(1).isVisible().catch(() => false);
  ok('judul sheet "Add Employee"', sheetTitle);

  // 10-12: form kosong -> tombol simpan disabled, sheet tetap terbuka
  ok('tombol simpan disabled saat form kosong', await submitBtn().isDisabled());
  await p.fill('#email', 'bukan-email');
  const realUser = (await realUsername) || 'budi.suryana001';
  await p.fill('#username', realUser);
  await p.locator('#username').blur();
  await p.waitForTimeout(1500);
  ok('email invalid ditandai', (await p.locator('text=Format email tidak valid').count()) > 0);
  ok('username duplikat ditandai', (await p.locator('text=Username sudah dipakai').count()) > 0);
  ok('simpan tetap disabled saat form invalid', await submitBtn().isDisabled());
  await p.fill('#email', '');

  // 13-16: isi form tambah
  await p.fill('#firstName', 'Test');
  await p.fill('#lastName', 'Sheet');
  await p.fill('#email', 'test.sheet@company.co.id');
  await p.fill('#username', 'test.sheet999');
  await p.fill('#birthDate', '1995-05-05');
  await p.fill('#basicSalary', '7500000');
  await p.selectOption('#formStatus', 'Contract');
  await p.selectOption('#formGroup', 'Engineering');
  await p.fill('#description', 'Dibuat lewat sheet');
  await p.waitForTimeout(500);
  await submitBtn().click();
  await p.waitForTimeout(1200);
  const sheetClosed = !(await p.locator('z-sheet-panel, [data-slot="sheet-content"]').first().isVisible().catch(() => false));
  ok('sheet tertutup setelah simpan', sheetClosed);
  ok('data baru tampil di list', (await p.locator('text=test.sheet999').count()) > 0);

  // 17-19: Edit buka sheet terisi
  const editBtn = p.getByRole('button', { name: 'Edit' }).first();
  await editBtn.click();
  await p.waitForTimeout(700);
  ok('Edit buka sheet', await p.locator('z-sheet-panel, [data-slot="sheet-content"]').first().isVisible());
  const preFilled = await p.inputValue('#username');
  ok('form edit terisi nilai tersimpan', preFilled.length > 0, preFilled);
  await p.fill('#basicSalary', '9100000');
  await submitBtn().click();
  await p.waitForTimeout(1200);
  ok('edit tersimpan tanpa pindah halaman', p.url().includes('/employees') && !p.url().includes('/new'));

  // 20-22: Delete konfirmasi dialog
  const rowsBefore = await p.locator('tbody tr').count();
  await p.getByRole('button', { name: 'Delete' }).first().click();
  await p.waitForTimeout(600);
  const confirmVisible = await p.locator('[role="alertdialog"], [role="dialog"]').first().isVisible().catch(() => false);
  ok('Delete buka dialog konfirmasi', confirmVisible);
  await p.getByRole('button', { name: 'Batal' }).first().click();
  await p.waitForTimeout(700);
  ok('batal hapus -> data tidak berubah', (await p.locator('tbody tr').count()) === rowsBefore);

  // 23-27: list behaviour tetap
  const count = await p.locator('tbody tr').count();
  ok('list render 10 baris default', count === 10, String(count));
  const money = await p.locator('tbody tr').first().locator('td').nth(5).innerText();
  ok('format rupiah benar', /^Rp\.\s[\d.]+,\d{2}$/.test(money.trim()), money.trim());

  await p.selectOption('#field', 'lastName');
  await p.fill('#keyword', 'suryana');
  await p.waitForTimeout(900);
  const lastNameHits = await p.locator('tbody tr').count();
  ok('search kolom lastName dapat hasil', lastNameHits > 0, String(lastNameHits));

  // 28: pagination URL state
  await p.fill('#keyword', '');
  await p.waitForTimeout(900);
  await p.getByRole('button', { name: '2', exact: true }).first().click();
  await p.waitForTimeout(700);
  ok('pagination update URL', p.url().includes('page=2'), p.url());

  // 29-30: mobile
  const mobile = await ctx.newPage();
  await mobile.setViewportSize({ width: 390, height: 800 });
  await mobile.goto(BASE + '/employees', { waitUntil: 'networkidle' });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok('nol overflow horizontal di mobile', overflow <= 1, `${overflow}px`);
  const burger = mobile.locator('button[aria-label="Buka menu"]').first();
  await burger.click();
  await mobile.waitForTimeout(500);
  const asideLeft = await mobile.locator('aside').first().evaluate((el) => Math.round(el.getBoundingClientRect().left));
  ok('drawer mobile terbuka', asideLeft === 0, `${asideLeft}px`);

  ok('nol error console/jaringan', bad.length === 0, bad.slice(0, 3).join(' | '));


  // 31-38: avatar menu + halaman profile
  await p.goto(BASE + '/employees', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);

  const noLogoutBtn = await p.getByRole('button', { name: 'Logout' }).count();
  ok('tombol Logout tidak lagi tampil lepas di header', noLogoutBtn === 0, String(noLogoutBtn));

  const avatarBtn = p.getByRole('button', { name: 'Menu akun' }).first();
  ok('avatar trigger ada di header', await avatarBtn.isVisible());
  const avatarInitials = await p.locator('z-avatar').first().innerText().catch(() => '');
  ok('avatar pakai inisial nama', /^[A-Z]{1,2}$/.test(avatarInitials.trim()), avatarInitials.trim());

  await avatarBtn.click();
  await p.waitForTimeout(600);
  const menu = p.locator('[data-slot="dropdown-menu-content"]').first();
  ok('klik avatar buka menu', await menu.isVisible());
  const menuText = await menu.innerText();
  ok('menu tampilkan nama', menuText.includes('Admin HRD'), menuText.split('\n')[0]);
  ok('menu tampilkan role', menuText.includes('HR Administrator'));
  ok('menu ada item Profile', menuText.includes('Profile'));
  ok('menu ada item Logout', menuText.includes('Logout'));

  await menu.getByText('Profile', { exact: true }).click();
  await p.waitForURL('**/profile', { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(800);
  ok('menu Profile buka /profile', p.url().includes('/profile'), p.url());
  const profileText = await p.locator('main').innerText();
  ok('halaman profile tampil nama', profileText.includes('Admin HRD'));
  ok('halaman profile tampil role', profileText.includes('HR Administrator'));
  ok('halaman profile tampil username', profileText.includes('admin'));
  ok('menu tidak menutupi halaman setelah pindah', !(await menu.isVisible().catch(() => false)));

  // logout dari menu
  await p.goto(BASE + '/employees', { waitUntil: 'networkidle' });
  await p.waitForTimeout(700);
  await p.getByRole('button', { name: 'Menu akun' }).first().click();
  await p.waitForTimeout(500);
  await p.locator('[data-slot="dropdown-menu-content"]').first().getByText('Logout').click();
  await p.waitForURL('**/auth/login', { timeout: 8000 }).catch(() => {});
  ok('Logout dari menu kembali ke login', p.url().includes('/auth/login'), p.url());
  ok('sesi terhapus setelah logout', await p.evaluate(() => localStorage.getItem('emp.session')) === null);

  const fails = res.filter((r) => !r.pass);
  console.log(`\n=== ${res.length - fails.length}/${res.length} PASS ===`);
  if (fails.length) console.log('GAGAL: ' + fails.map((f) => f.n).join(', '));

  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
