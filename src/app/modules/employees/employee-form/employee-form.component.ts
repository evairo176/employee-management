import { Component, EventEmitter, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { injectSheetData, ZardSheetCloseDirective } from '@/shared/components/sheet';
import { EmployeeService } from '@/core/services/employee.service';
import { EMPLOYEE_GROUPS, EMPLOYEE_STATUSES, Employee, EmployeeStatus } from '@/core/models/employee.model';

export interface EmployeeFormData {
  /** null = mode tambah, objek = mode edit. */
  employee: Employee | null;
  /** Diisi pemanggil: hasil simpan dikirim balik lewat emitter ini. */
  submitted: EventEmitter<Employee>;
}

/**
 * Form karyawan yang dipakai di dalam sheet, baik untuk tambah maupun edit.
 * Menutup sheet lewat `role="submit"` milik footer Zard; data hasil dikirim ke callback `zOnOk`.
 */
@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, ZardButtonComponent, ZardInputComponent, ZardSheetCloseDirective],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(EmployeeService);
  readonly data = injectSheetData<EmployeeFormData>();

  readonly editing = this.data?.employee ?? null;
  private readonly submitted = this.data?.submitted ?? null;

  readonly groups = EMPLOYEE_GROUPS;
  readonly statuses = EMPLOYEE_STATUSES;
  readonly today = new Date().toISOString().slice(0, 10);

  readonly submitAttempted = signal(false);
  readonly formInvalid = signal(true);

  readonly form = this.fb.nonNullable.group({
    username: [
      this.editing?.username ?? '',
      [Validators.required],
      [this.usernameTaken.bind(this)],
    ],
    firstName: [this.editing?.firstName ?? '', [Validators.required]],
    lastName: [this.editing?.lastName ?? '', [Validators.required]],
    email: [this.editing?.email ?? '', [Validators.required, Validators.email]],
    birthDate: [this.editing?.birthDate ?? '', [Validators.required, this.notFuture.bind(this)]],
    basicSalary: [this.editing?.basicSalary ?? (null as number | null), [Validators.required, Validators.min(1)]],
    status: [this.editing?.status ?? '', [Validators.required]],
    group: [this.editing?.group ?? '', [Validators.required]],
    description: [this.editing?.description ?? '', [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }

  constructor() {
    // zoneless: tombol butuh nilai reaktif, bukan `form.invalid` statis di template.
    this.form.statusChanges.subscribe(() => this.formInvalid.set(this.form.invalid));
    this.formInvalid.set(this.form.invalid);
  }

  private notFuture(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return control.value > this.today ? { future: true } : null;
  }

  private usernameTaken(control: AbstractControl) {
    const value = String(control.value ?? '').trim();
    if (!value) return Promise.resolve(null);
    const taken = this.service.isUsernameTaken(value, this.editing?.id);
    return Promise.resolve(taken ? { taken: true } : null);
  }

  /** Dipanggil footer sheet. Return false = sheet tetap terbuka. */
  commit(): false | Employee {
    this.submitAttempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    const raw = this.form.getRawValue();
    const payload = {
      username: raw.username.trim(),
      firstName: raw.firstName.trim(),
      lastName: raw.lastName.trim(),
      email: raw.email.trim(),
      birthDate: raw.birthDate,
      basicSalary: Number(raw.basicSalary),
      status: raw.status as EmployeeStatus,
      group: raw.group,
      description: raw.description.trim(),
    };

    const employee = this.editing
      ? this.service.update(this.editing.id, payload)
      : this.service.add(payload);

    this.submitted?.emit(employee);
    return employee;
  }
}
