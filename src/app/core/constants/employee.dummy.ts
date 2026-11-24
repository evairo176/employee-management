import { Employee, EMPLOYEE_GROUPS, EmployeeStatus } from '../models/employee.model';

const FIRST = [
  'Budi', 'Siti', 'Agus', 'Dewi', 'Rudi', 'Ratna', 'Andi', 'Maya', 'Hendra', 'Lestari',
  'Fajar', 'Indah', 'Joko', 'Kartika', 'Lukman', 'Mega', 'Nanda', 'Oki', 'Putri', 'Qori',
  'Rizki', 'Sari', 'Tono', 'Umi', 'Vina', 'Wahyu', 'Yanto', 'Zahra', 'Bayu', 'Citra',
];
const LAST = [
  'Suryana', 'Pratama', 'Wijaya', 'Kusuma', 'Halim', 'Nugroho', 'Saputra', 'Anggraini',
  'Firmansyah', 'Rahmawati', 'Setiawan', 'Maulana', 'Hidayat', 'Permata', 'Santoso',
];
const STATUSES: EmployeeStatus[] = ['Permanent', 'Contract', 'Probation'];

/** 128 data dummy deterministik: cukup untuk menguji paging, sorting, dan pencarian. */
export function buildDummyEmployees(total = 128): Employee[] {
  const out: Employee[] = [];
  for (let i = 1; i <= total; i++) {
    const first = FIRST[(i - 1) % FIRST.length];
    const last = LAST[(i * 7) % LAST.length];
    const username = `${first.toLowerCase()}.${last.toLowerCase()}${String(i).padStart(3, '0')}`;
    const year = 1985 + (i % 20);
    const month = ((i * 3) % 12) + 1;
    const day = ((i * 5) % 27) + 1;
    out.push({
      id: i,
      username,
      firstName: first,
      lastName: last,
      email: `${username}@company.co.id`,
      birthDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      basicSalary: 4_500_000 + ((i * 137_000) % 26_000_000),
      status: STATUSES[i % STATUSES.length],
      group: EMPLOYEE_GROUPS[(i * 3) % EMPLOYEE_GROUPS.length],
      description: `Karyawan divisi ${EMPLOYEE_GROUPS[(i * 3) % EMPLOYEE_GROUPS.length]} bergabung sejak ${2015 + (i % 9)}.`,
    });
  }
  return out;
}
