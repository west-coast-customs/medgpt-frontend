import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef,
  ElementRef,
  model,
  ModelSignal,
  signal,
  Signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { FormInputComponent } from '../../shared/components/form/input/form-input.component';
import { FormFieldComponent } from '../../shared/components/form/field/form-field.component';
import { FormsModule, NgControl } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, of, switchMap, tap } from 'rxjs';
import { ToastsService, ToastType } from '../../shared/services/toasts.service';
import { FormErrorComponent } from '../../shared/components/form/error/form-error.component';
import { fadeInOutHeight } from '../../shared/utils/animations';

@Component({
  selector: 'app-change-password-button',
  standalone: true,
  imports: [
    ButtonComponent,
    FormInputComponent,
    FormFieldComponent,
    FormsModule,
    FormErrorComponent,
  ],
  templateUrl: './change-password-button.component.html',
  styleUrl: './change-password-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutHeight(250)],
})
export class ChangePasswordButtonComponent implements AfterViewInit {
  currentPassword: ModelSignal<string> = model<string>('')
  currentPasswordFieldComponent: Signal<FormFieldComponent | undefined> = viewChild<FormFieldComponent>('currentPasswordInput')
  currentPasswordControl: Signal<NgControl | undefined> = computed(() => this.currentPasswordFieldComponent()?.inputModel())

  newPassword: ModelSignal<string> = model<string>('')
  newPasswordFieldComponent: Signal<FormFieldComponent | undefined> = viewChild<FormFieldComponent>('newPasswordInput')
  newPasswordControl: Signal<NgControl | undefined> = computed(() => this.newPasswordFieldComponent()?.inputModel())

  changePasswordDialog: Signal<ElementRef<HTMLDialogElement>> = viewChild.required('newPasswordDialog')

  changePasswordLoading: WritableSignal<boolean> = signal(false)
  changePasswordError: WritableSignal<boolean> = signal(false)

  constructor(private authService: AuthService,
              private destroyRef: DestroyRef,
              private toastsService: ToastsService) {
  }

  ngAfterViewInit(): void {
    combineLatest([this.currentPasswordControl()?.valueChanges!, this.newPasswordControl()?.valueChanges!])
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changePasswordError.set(false))
  }

  onSavePasswordClick(): void {
    if (this.currentPasswordControl()?.invalid || this.newPasswordControl()?.invalid) return

    of(this.changePasswordLoading.set(true), this.changePasswordError.set(false))
      .pipe(
        switchMap(() =>
          this.authService.changePassword(this.currentPassword(), this.newPassword())
        ),
        tap({
          next: () => {
            this.changePasswordLoading.set(false)
            this.toastsService.show($localize`:@@password_was_changed:Password was changed`, ToastType.SUCCESS)
            this.onCloseModalClick()
          },
          error: () => {
            this.changePasswordLoading.set(false)
            this.changePasswordError.set(true)
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  onCloseModalClick(): void {
    this.changePasswordDialog()?.nativeElement.close()
    this.currentPasswordControl()?.reset()
    this.newPasswordControl()?.reset()
  }

  onChangePasswordClick(): void {
    this.changePasswordDialog()?.nativeElement.showModal()
  }
}
