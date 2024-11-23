import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from '../shared/components/toasts/toasts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full h-full">
      <app-toasts/>
      <router-outlet/>
    </div>`,
  imports: [RouterOutlet, ToastsComponent]
})
export class AppComponent {}
