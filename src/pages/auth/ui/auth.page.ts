import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AuthFlow } from '../middleware/auth.routes';
import { AuthFormComponent } from '../../../widgets/auth/form/auth-form.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, AuthFormComponent, ButtonComponent, NgOptimizedImage],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AuthPage {
  loginFlow: Signal<boolean | undefined> = toSignal(
    inject(ActivatedRoute).data.pipe(map((data: Data) => data?.['flow'] as AuthFlow === AuthFlow.LOGIN))
  )

  onGoogleButtonClick() {
    window.location.href = `${ environment.apiUrl }/google-auth/login`
  }
}
