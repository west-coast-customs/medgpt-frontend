import { ChangeDetectionStrategy, Component, DestroyRef, input, InputSignal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [
    ButtonComponent,
    NgOptimizedImage,
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutButtonComponent {
  customClass: InputSignal<string> = input('')

  constructor(private authService: AuthService,
              private destroyRef: DestroyRef,
              private router: Router) {}

  onLogoutClick(): void {
    this.authService.logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        void this.router.navigate(['/'])
      })
  }
}
