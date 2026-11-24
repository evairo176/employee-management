import { Component, EventEmitter, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardSheetService } from '@/shared/components/sheet';
import { ZardAlertDialogService } from '@/shared/components/alert-dialog';
import { ZardSonnerService } from '@/shared/components/sonner';
import { EmployeeService } from '@/core/services/employee.service';
import { EMPLOYEE_STATUSES, Employee, EmployeeStatus, PAGE_SIZES, SEARCH_FIELDS, SortKey } from '@/core/models/employee.model';
import { formatRupiah, pageWindow } from '@/core/utils/format.util';
import { EmployeeFormComponent, EmployeeFormData } from '../employee-form/employee-form.component';

const LIST_URL_KEY = 'emp.listUrl';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink, ZardButtonComponent, ZardInputComponent, ZardBadgeComponent],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent {
  private readonly service = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ZardSonnerService);
  readonly sheets = inject(ZardSheetService);
  readonly dialogs = inject(ZardAlertDialogService);
  private activeRef: { close: () => void } | null = null;

  readonly searchFields = SEARCH_FIELDS;
  readonly statuses = EMPLOYEE_STATUSES;
  readonly pageSizes = PAGE_SIZES;

  readonly query = this.service.query;
  readonly rows = this.service.pageRows;
  readonly total = this.service.total;
  readonly totalPages = this.service.totalPages;

  readonly keywordDraft = signal(this.query().keyword);
  readonly pageNumbers = computed(() => pageWindow(this.query().page, this.totalPages()));
  readonly rangeLabel = computed(() => {
    const q = this.query();
    if (!this.total()) return '0 data';
    const start = (q.page - 1) * q.limit + 1;
    const end = Math.min(q.page * q.limit, this.total());
    return `${start}-${end} dari ${this.total()}`;
  });

  private timer?: ReturnType<typeof setTimeout>;
  private hydrated = false;

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      if (this.hydrated) return;
      this.hydrated = true;
      const num = (k: string, def: number) => {
        const v = Number(params.get(k));
        return Number.isFinite(v) && v > 0 ? v : def;
      };
      this.service.patch(
        {
          page: num('page', 1),
          limit: num('limit', 10),
          keyword: params.get('keyword') ?? '',
          field: params.get('field') ?? 'firstName',
          status: params.get('status') ?? '',
          sortKey: (params.get('sortKey') as SortKey) ?? 'username',
          sortDir: params.get('sortDir') === 'desc' ? 'desc' : 'asc',
        },
        false,
      );
      this.keywordDraft.set(this.query().keyword);
      this.syncUrl();
    });

    effect(() => {
      this.query();
      if (this.hydrated) this.syncUrl();
    });
  }

  /** Sheet dipakai untuk tambah dan edit: hemat halaman, filter list tetap di belakang. */
  openForm(employee: Employee | null = null): void {
    this.rememberPosition();
    const submitted = new EventEmitter<Employee>();

    submitted.subscribe((saved) => {
      this.activeRef?.close();
      this.toast.success(
        employee
          ? 'Data karyawan berhasil diperbarui.'
          : `Employee ${saved.username} berhasil ditambahkan.`,
      );
      if (!employee) {
        this.reset();
        this.keywordDraft.set('');
      }
    });

    const ref = this.sheets.create<EmployeeFormComponent, EmployeeFormData>({
      zTitle: employee ? 'Edit Employee' : 'Add Employee',
      zDescription: employee
        ? `Ubah data ${employee.firstName} ${employee.lastName}.`
        : 'Semua field wajib diisi.',
      zContent: EmployeeFormComponent,
      zData: { employee, submitted },
      zSide: 'right',
      zWidth: '34rem',
      // Footer Zard tidak dipakai: tombol simpan ada di dalam form supaya bisa ikut validasi.
      zHideFooter: true,
      zMaskClosable: false,
    });

    this.activeRef = ref;
  }

  confirmDelete(employee: Employee): void {
    this.dialogs.create({
      zTitle: 'Hapus karyawan?',
      zDescription: `${employee.firstName} ${employee.lastName} (${employee.username}) akan dihapus dari daftar.`,
      zOkText: 'Hapus',
      zCancelText: 'Batal',
      zOkDestructive: true,
      zData: employee.id,
      zOnOk: (id: number) => {
        this.service.remove(id);
        this.toast.success('Employee berhasil dihapus.');
        if (!this.rows().length && this.query().page > 1) this.goPage(this.query().page - 1);
        return undefined as unknown as void;
      },
    });
  }

  onKeyword(value: string): void {
    this.keywordDraft.set(value);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.service.patch({ keyword: value }), 400);
  }

  onField(value: string): void {
    this.service.patch({ field: value });
  }

  onStatus(value: string): void {
    this.service.patch({ status: value });
  }

  onLimit(value: string): void {
    this.service.patch({ limit: Number(value) || 10 });
  }

  sort(key: SortKey): void {
    this.service.setSort(key);
  }

  sortIcon(key: SortKey): string {
    const q = this.query();
    if (q.sortKey !== key) return 'M8 9l4-4 4 4M8 15l4 4 4-4';
    return q.sortDir === 'asc' ? 'M8 14l4-4 4 4' : 'M8 10l4 4 4-4';
  }

  goPage(page: number): void {
    const target = Math.min(Math.max(1, page), this.totalPages());
    if (target === this.query().page) return;
    this.service.patch({ page: target }, false);
  }

  reset(): void {
    this.keywordDraft.set('');
    this.service.reset();
  }

  rememberPosition(): void {
    sessionStorage.setItem(LIST_URL_KEY, this.router.url);
  }

  money = formatRupiah;

  badgeType(status: EmployeeStatus): 'default' | 'secondary' | 'destructive' {
    if (status === 'Permanent') return 'default';
    if (status === 'Contract') return 'secondary';
    return 'destructive';
  }

  private syncUrl(): void {
    const q = this.query();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: q.page,
        limit: q.limit,
        keyword: q.keyword || null,
        field: q.field,
        status: q.status || null,
        sortKey: q.sortKey,
        sortDir: q.sortDir,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
