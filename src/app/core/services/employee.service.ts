import { Injectable, computed, signal } from '@angular/core';
import { Employee, SortDir, SortKey } from '../models/employee.model';
import { buildDummyEmployees } from '../constants/employee.dummy';

export interface EmployeeQuery {
  page: number;
  limit: number;
  sortKey: SortKey;
  sortDir: SortDir;
  /** Pencarian dua parameter sekaligus: kata kunci + kolom yang dicari. */
  keyword: string;
  field: string;
  status: string;
}

const DEFAULT_QUERY: EmployeeQuery = {
  page: 1,
  limit: 10,
  sortKey: 'username',
  sortDir: 'asc',
  keyword: '',
  field: 'firstName',
  status: '',
};

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly _employees = signal<Employee[]>(buildDummyEmployees());
  private readonly _query = signal<EmployeeQuery>({ ...DEFAULT_QUERY });

  readonly employees = this._employees.asReadonly();
  readonly query = this._query.asReadonly();

  /** Data setelah filter + sort, sebelum dipotong per halaman. */
  readonly filtered = computed(() => {
    const q = this._query();
    const kw = q.keyword.trim().toLowerCase();
    let rows = this._employees();

    if (kw) {
      rows = rows.filter((e) => {
        const raw = String(e[q.field as keyof Employee] ?? '').toLowerCase();
        return raw.includes(kw);
      });
    }
    if (q.status) rows = rows.filter((e) => e.status === q.status);

    const dir = q.sortDir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[q.sortKey];
      const bv = b[q.sortKey];
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv), 'id', { sensitivity: 'base' }) * dir;
    });
  });

  readonly total = computed(() => this.filtered().length);
  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this._query().limit)));

  readonly pageRows = computed(() => {
    const { page, limit } = this._query();
    const start = (page - 1) * limit;
    return this.filtered().slice(start, start + limit);
  });

  /** Patch query; reset ke halaman 1 kalau filter berubah. */
  patch(patch: Partial<EmployeeQuery>, resetPage = true): void {
    this._query.update((q) => {
      const next = { ...q, ...patch };
      if (resetPage && (patch.keyword !== undefined || patch.field !== undefined || patch.status !== undefined)) {
        next.page = 1;
      }
      next.page = Math.min(Math.max(1, next.page), Math.max(1, Math.ceil(this.filtered().length / next.limit) || 1));
      return next;
    });
  }

  setSort(key: SortKey): void {
    const q = this._query();
    const sortDir: SortDir = q.sortKey === key && q.sortDir === 'asc' ? 'desc' : 'asc';
    this._query.update((s) => ({ ...s, sortKey: key, sortDir, page: 1 }));
  }

  reset(): void {
    this._query.set({ ...DEFAULT_QUERY });
  }

  byId(id: number): Employee | undefined {
    return this._employees().find((e) => e.id === id);
  }

  /** `excludeId` dipakai saat edit supaya username milik record itu sendiri tidak dianggap duplikat. */
  isUsernameTaken(username: string, excludeId?: number): boolean {
    const u = username.trim().toLowerCase();
    return this._employees().some((e) => e.id !== excludeId && e.username.toLowerCase() === u);
  }

  add(data: Omit<Employee, 'id'>): Employee {
    const nextId = Math.max(0, ...this._employees().map((e) => e.id)) + 1;
    const created: Employee = { ...data, id: nextId };
    this._employees.update((list) => [created, ...list]);
    return created;
  }

  update(id: number, data: Omit<Employee, 'id'>): Employee {
    const next: Employee = { ...data, id };
    this._employees.update((list) => list.map((e) => (e.id === id ? next : e)));
    return next;
  }

  remove(id: number): void {
    this._employees.update((list) => list.filter((e) => e.id !== id));
  }
}
