/** Format mata uang rupiah: 9500000 -> "Rp. 9.500.000,00" */
export function formatRupiah(value: number): string {
  const fixed = Math.round(value * 100) / 100;
  const parts = fixed.toFixed(2).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp. ${intPart},${parts[1]}`;
}

/** yyyy-MM-dd -> "24 Nov 2026" */
export function formatDate(iso: string): string {
  if (!iso) return '-';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Rentang nomor halaman yang ditampilkan di pagination. */
export function pageWindow(page: number, totalPages: number, span = 2): number[] {
  const start = Math.max(1, Math.min(page - span, totalPages - span * 2));
  const end = Math.min(totalPages, start + span * 2);
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}
