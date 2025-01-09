import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  input,
  InputSignal,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import {
  PasswordMatchValidatorDirective
} from '../../../shared/components/form/validators/password-match-validator.directive';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, of, switchMap, tap } from 'rxjs';
import { fadeInOutHeight } from '../../../shared/utils/animations';
import { ToastsService, ToastType } from '../../../shared/services/toasts.service';

interface AuthFormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    FormFieldComponent,
    FormInputComponent,
    PasswordMatchValidatorDirective,
    FormsModule,
    FormErrorComponent,
    RouterLink,
    ButtonComponent
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutHeight(250)],
})
export class AuthFormComponent implements AfterViewInit {
  loginFlow: InputSignal<boolean | undefined> = input<boolean>()

  formValue: AuthFormValue = {
    email: '',
    password: '',
    passwordConfirm: ''
  }

  authLoading: WritableSignal<boolean> = signal(false)
  authError: WritableSignal<string> = signal('')

  form: Signal<NgForm> = viewChild.required(NgForm)
  passwordMatch: Signal<NgModel | undefined> = viewChild('passwordMatch')

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastsService: ToastsService
  ) {}

  ngAfterViewInit(): void {
    this.form().form.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.authError.set(''))
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return;

    const { email, password } = form.value as AuthFormValue

    const authObs = this.loginFlow()
      ? this.authService.login({ email, password })
      : this.authService.signup({ email, password })

    of(this.authLoading.set(true))
      .pipe(
        switchMap(() => authObs),
        tap({
          next: () => {
            this.authLoading.set(false)
            this.toastsService.show(
              this.loginFlow()
                ? $localize`:@@login_successful:Login successful`
                : $localize`:@@signup_successful:Signup successful`,
              ToastType.SUCCESS
            )
          },
          error: () => this.authLoading.set(false)
        }),
        catchError((error: string) => {
          this.authError.set(error)
          return EMPTY
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const successUrl: string[] = this.loginFlow() ? ['../../', 'chats'] : ['../', 'login']
        void this.router.navigate(successUrl, { relativeTo: this.activatedRoute })
      })
  }

  onPasswordModelChange(): void {
    if (!this.passwordMatch()) return;

    this.passwordMatch()!.control.updateValueAndValidity();
    this.passwordMatch()!.control.markAsTouched()
  }
}
