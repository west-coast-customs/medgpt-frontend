import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormsModule, NgForm } from '@angular/forms';
import { PasswordMatchValidatorDirective } from '../../../shared/validators/password-match-validator.directive';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { AuthService } from '../../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { fadeInOutHeight } from '../../../shared/animations';

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
    FormInputComponent,
    FormsModule,
    PasswordMatchValidatorDirective,
    FormFieldComponent,
    FormErrorComponent
  ],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  animations: [fadeInOutHeight(250)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements AfterViewInit {
  formValue: SignupFormValue = {
    email: '',
    password: '',
    passwordConfirm: ''
  }

  signupLoading: WritableSignal<boolean> = signal(false)
  signupError: WritableSignal<string> = signal('')

  form: Signal<NgForm> = viewChild.required(NgForm)

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.form().form.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.signupError.set(''))
  }

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
        catchError((error: string) => {
          this.signupError.set(error)
          return EMPTY
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        void this.router.navigate(['../', 'login'], { relativeTo: this.activatedRoute })
      })
  }
}
