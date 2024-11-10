import { ChangeDetectionStrategy, Component, DestroyRef, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../shared/services/auth.service';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  formValue: LoginFormValue = {
    email: '',
    password: ''
  }

  loginLoading: WritableSignal<boolean> = signal(false)

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router) {}

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.loginLoading.set(true)

    this.authService.login(form.value)
      .pipe(
        tap({
          next: () => this.loginLoading.set(false),
          error: () => this.loginLoading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        void this.router.navigate(['chats'])
      })
  }
}
