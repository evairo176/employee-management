import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { AuthStateService } from '@/core/services/auth-state.service';

@Component({
  selector: 'app-profile',
  imports: [ZardButtonComponent, ZardAvatarComponent, ZardBadgeComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly auth = inject(AuthStateService);
  private readonly router = inject(Router);

  readonly session = this.auth.session;
  readonly initials = this.auth.initials;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
