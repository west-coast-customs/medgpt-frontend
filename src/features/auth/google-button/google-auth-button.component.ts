import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-auth-button',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage],
  templateUrl: './google-auth-button.component.html',
  styleUrl: './google-auth-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleAuthButtonComponent {
  activatedRoute = inject(ActivatedRoute).snapshot.routeConfig?.path;

  onGoogleButtonClick() {
    window.location.href = `${ environment.apiUrl }/google-auth/login`
  }
}
