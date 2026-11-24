import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ZardSonnerComponent } from '@/shared/components/sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ZardSonnerComponent],
  template: `
    <router-outlet />
    <z-sonner />
  `,
})
export class App {}
