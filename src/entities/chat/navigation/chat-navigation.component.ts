import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { NgOptimizedImage } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-navigation',
  standalone: true,
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './chat-navigation.component.html',
  styleUrl: './chat-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatNavigationComponent {
  constructor(private authService: AuthService,
              private destroyRef: DestroyRef,
              private router: Router) {}

  onLogoutClick() {
    this.authService.logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/']))
  }
}
