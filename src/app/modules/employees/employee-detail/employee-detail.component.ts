import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { EmployeeService } from '@/core/services/employee.service';
import { formatDate, formatRupiah } from '@/core/utils/format.util';

const LIST_URL_KEY = 'emp.listUrl';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, ZardButtonComponent, ZardBadgeComponent],
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(EmployeeService);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly employee = computed(() => this.service.byId(this.id));

  readonly money = formatRupiah;
  readonly date = formatDate;

  badgeType(status: string): 'default' | 'secondary' | 'destructive' {
    if (status === 'Permanent') return 'default';
    if (status === 'Contract') return 'secondary';
    return 'destructive';
  }

  /** Kembali ke URL list terakhir supaya hasil pencarian tidak hilang. */
  back(): void {
    const saved = sessionStorage.getItem(LIST_URL_KEY);
    this.router.navigateByUrl(saved ?? '/employees');
  }
}
