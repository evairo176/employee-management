# Employee Management

Frontend technical assessment. Employee directory dengan login, list berpaging, tambah karyawan, dan halaman detail.

**Live:** https://employee.evairo.fun
**Demo login:** `admin` / `admin123` (alternatif: `hrd` / `hrd123`)

## Stack

| Bagian | Pilihan |
|---|---|
| Framework | Angular 22 (standalone components, signals, zoneless) |
| UI | [Zard UI](https://zardui.com) - komponen shadcn-style di atas Tailwind CSS v4 |
| Styling | Tailwind CSS v4, design token OKLCH |
| Form | Reactive Forms + validator sinkron & async |
| Notifikasi | sonner (toast) |
| E2E | Playwright Chromium |
| Deploy | Cloudflare Pages (static) |

## Halaman

1. **Login** (`/auth/login`) - validasi form, pesan error kredensial, tombol loading.
2. **Employee List** (`/employees`) - 128 data dummy, pencarian 2 parameter, filter status, sorting 6 kolom, paging + page size, hapus data.
3. **Add Employee** (`/employees/add`) - semua field wajib, validasi email, tanggal lahir tidak boleh masa depan, username unik dicek async.
4. **Employee Detail** (`/employees/:id`) - seluruh field + tombol **Ok** kembali ke list.

## Requirement yang dipenuhi

- **Pencarian 2 parameter:** kata kunci dikombinasikan dengan pilihan kolom (`firstName`, `lastName`, `email`, `username`). Debounce 400 ms.
- **Pencarian tidak hilang:** query aktif disimpan di URL, jadi tetap ada saat kembali dari halaman detail maupun setelah reload.
- **Format basic salary:** `Rp. 4.911.000,00` (lihat `src/app/core/utils/format.util.ts`).
- **Data dummy:** 128 karyawan dibangkitkan deterministik di `src/app/core/constants/employee.dummy.ts`.

## Struktur

```
src/app/
  core/
    constants/employee.dummy.ts     # 128 data dummy
    guards/auth.guard.ts            # proteksi route
    models/employee.model.ts        # tipe + konstanta (group, status, page size)
    services/auth-state.service.ts   # sesi login (localStorage)
    services/employee.service.ts     # state data: filter, sort, paging
    utils/format.util.ts             # rupiah, tanggal, window pagination
  modules/
    auth/login/                      # halaman login
    layout/shell.component.*         # sidebar + header
    employees/employee-list/         # list + filter + tabel
    employees/employee-add/          # form tambah
    employees/employee-detail/       # detail
  shared/components/                 # komponen Zard UI (button, input, badge, sonner)
```

Seluruh perhitungan filter/sort/paging ada di `EmployeeService` memakai `signal` + `computed`; komponen hanya membaca hasilnya.

## Menjalankan

Butuh Node 20+.

```bash
npm install
npx ng serve
```

Buka `http://localhost:4200`.

## Build produksi

```bash
npx ng build
```

Output di `dist/emp-new/browser`.

## E2E

```bash
npx playwright install chromium   # sekali saja
npx ng serve --port 4300          # terminal terpisah
BASE_URL=http://localhost:4300 node e2e-check.js
```

23 skenario: guard route, login gagal/berhasil, jumlah data, page size, format rupiah, pencarian 2 parameter, sinkronisasi URL, sorting, filter status, validasi form tambah, username duplikat, penambahan data, halaman detail, tombol Ok, pencarian bertahan setelah reload, pagination, dan overflow mobile.

## Deploy

Cloudflare Pages, project `employee-management`, custom domain `employee.evairo.fun`.
SPA fallback lewat `public/_redirects`:

```
/*  /index.html  200
```
