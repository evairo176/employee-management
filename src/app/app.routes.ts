import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { ShellComponent } from './modules/layout/shell.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'Sign In - Employee Management',
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'employees' },
      {
        path: 'employees',
        loadComponent: () =>
          import('./modules/employees/employee-list/employee-list.component').then(
            (m) => m.EmployeeListComponent,
          ),
        title: 'Employees - Employee Management',
      },
      {
        path: 'employees/:id',
        loadComponent: () =>
          import('./modules/employees/employee-detail/employee-detail.component').then(
            (m) => m.EmployeeDetailComponent,
          ),
        title: 'Employee Detail - Employee Management',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./modules/profile/profile.component').then((m) => m.ProfileComponent),
        title: 'Profil Saya - Employee Management',
      },
    ],
  },
  { path: '**', redirectTo: 'employees' },
];
