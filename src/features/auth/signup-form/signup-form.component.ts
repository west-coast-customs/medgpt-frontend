import { ChangeDetectionStrategy, Component, DestroyRef, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { InputComponent } from "../../../shared/components/input/input.component";
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordMatchValidatorDirective } from '../../../shared/validators/password-match-validator.directive';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { AuthService } from '../../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export interface SignupFormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    FormsModule,
    PasswordMatchValidatorDirective,
    FormFieldComponent
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {
  formValue: SignupFormValue = {
    email: '',
    password: '',
    passwordConfirm: ''
  }

  signupLoading: WritableSignal<boolean> = signal(false)

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return;

    const { email, password } = form.value as SignupFormValue

    this.signupLoading.set(true)

    this.authService.signup({ email, password })
      .pipe(
        tap({
          next: () => this.signupLoading.set(false),
          error: () => this.signupLoading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        void this.router.navigate(['../', 'login'], { relativeTo: this.activatedRoute})
      })
  }
}
