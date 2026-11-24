import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputComponent } from '@/shared/components/input';
import { AuthStateService } from '@/core/services/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ZardButtonComponent, ZardInputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthStateService);
  private readonly router = inject(Router);

  readonly error = signal('');
  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set('');

    const { username, password } = this.form.getRawValue();
    if (!this.auth.login(username, password)) {
      this.loading.set(false);
      this.error.set('Username atau password salah. Coba admin / admin123.');
      return;
    }
    this.router.navigate(['/employees']);
  }
}
