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
import { FormsModule, NgForm } from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../shared/services/auth.service';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { fadeInOutHeight } from '../../../shared/animations';

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
    FormInputComponent,
    ButtonComponent,
    RouterLink,
    FormErrorComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutHeight(250)],
})
export class LoginFormComponent implements AfterViewInit{
  formValue: LoginFormValue = {
    email: '',
    password: ''
  }

  loginLoading: WritableSignal<boolean> = signal(false)
  loginError: WritableSignal<string> = signal('')

  form: Signal<NgForm> = viewChild.required(NgForm)

  constructor(
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.form().form.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loginError.set(''))
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.loginLoading.set(true)

    this.authService.login(form.value)
      .pipe(
        tap({
          next: () => this.loginLoading.set(false),
          error: () => this.loginLoading.set(false)
        }),
        catchError((error: string) => {
          this.loginError.set(error)
          return EMPTY
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        void this.router.navigate(['chats'])
      })
  }
}
