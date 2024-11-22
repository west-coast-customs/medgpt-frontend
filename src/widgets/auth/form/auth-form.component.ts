import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { PasswordMatchValidatorDirective } from '../../../shared/components/form/validators/password-match-validator.directive';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../shared/services/auth.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { AuthFlow } from '../../../pages/auth/middleware/auth.routes';
import { fadeInOutHeight } from '../../../shared/utils/animations';

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
  loginFlow: Signal<boolean | undefined> = toSignal(
    inject(ActivatedRoute).data.pipe(map((data: Data) => data?.['flow'] as AuthFlow === AuthFlow.LOGIN))
  )

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
    private activatedRoute: ActivatedRoute
  ) {
  }

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
          next: () => this.authLoading.set(false),
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
