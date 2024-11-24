import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from '../shared/components/toasts/toasts.component';
import { ToastsService } from '../shared/services/toasts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full h-full">
      @defer (when toastsService.toasts().length) {
        <app-toasts/>
      }
      <router-outlet/>
    </div>`,
  imports: [RouterOutlet, ToastsComponent]
})
export class AppComponent {
  toastsService: ToastsService = inject(ToastsService);
}
