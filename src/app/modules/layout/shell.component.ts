import { Component, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardAvatarComponent } from '@/shared/components/avatar';
import {
  ZardDropdownMenuItemComponent,
  ZardDropdownMenuComponent,
  ZardDropdownMenuSeparatorComponent,
} from '@/shared/components/dropdown';
import { AuthStateService } from '@/core/services/auth-state.service';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ZardButtonComponent,
    ZardAvatarComponent,
    ZardDropdownMenuComponent,
    ZardDropdownMenuItemComponent,
    ZardDropdownMenuSeparatorComponent,
  ],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  private readonly auth = inject(AuthStateService);
  private readonly router = inject(Router);

  readonly session = this.auth.session;
  readonly initials = this.auth.initials;
  readonly sidebarOpen = signal(false);
  readonly sidebarCompact = signal(false);

  readonly menu = viewChild<ZardDropdownMenuComponent>('menu');

  readonly nav = [
    { path: '/employees', label: 'Employees', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 011.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
  ];

  closeMenu(): void {
    this.menu()?.close();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  toggleCompact(): void {
    this.sidebarCompact.update((v) => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
