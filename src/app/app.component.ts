import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsComponent } from '../shared/components/toasts/toasts.component';
import { ToastsService } from '../shared/services/toasts.service';
import { AuthService } from '../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(private authService: AuthService) {
    this.authService.isUserLoggedIn()
      .pipe(takeUntilDestroyed())
      .subscribe();
  }
}
