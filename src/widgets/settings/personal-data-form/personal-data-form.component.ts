import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { Profile, ProfileFullName, ProfileService } from '../../../entities/profile/api/profile.service';
import { ToastsService, ToastType } from '../../../shared/services/toasts.service';
import { FormsModule, NgForm } from '@angular/forms';
import { catchError, EMPTY, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { FormValueChangeDirective } from '../../../shared/directives/form-value-change.directive';
import {
  ChangePasswordButtonComponent
} from '../../../features/change-password-button/change-password-button.component';

interface PersonalSettingsFormValue {
  lastName: string;
  firstName: string;
  secondName: string;
  email: string;
}

@Component({
  selector: 'app-personal-data-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FormErrorComponent,
    FormFieldComponent,
    FormInputComponent,
    FormValueChangeDirective,
    FormsModule,
    ChangePasswordButtonComponent
  ],
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent {
  #profile: WritableSignal<Profile> = this.profileService.profile as WritableSignal<Profile>

  changePersonalDataLoading: WritableSignal<boolean> = signal(false)
  changePersonalError: WritableSignal<string> = signal('')

  passwordChangeAllowed: WritableSignal<boolean> = signal(this.#profile().auth_type == 'email')

  noChanges: Signal<boolean> = computed(() => {
    const { last_name, first_name, second_name } = this.#profile()
    const { lastName, firstName, secondName } = this.formValue()

    return last_name === lastName && first_name === firstName && second_name === secondName
  })

  formValue: WritableSignal<Partial<PersonalSettingsFormValue>> = signal({
    lastName: this.#profile().last_name,
    firstName: this.#profile().first_name,
    secondName: this.#profile().second_name,
    email: this.#profile().email
  })

  onFormValueChange(newValue: Partial<PersonalSettingsFormValue>): void {
    this.formValue.update((oldValue: Partial<PersonalSettingsFormValue>) => ({ ...oldValue, ...newValue }))
  }

  constructor(private profileService: ProfileService,
              private toastsService: ToastsService,
              private destroyRef: DestroyRef) {
  }

  onFormSubmit(form: NgForm): void {
    if (form.invalid) return

    const fullName: ProfileFullName = {
      last_name: form.value.lastName,
      first_name: form.value.firstName,
      second_name: form.value.secondName
    }

    of(this.changePersonalDataLoading.set(true))
      .pipe(
        switchMap(() => this.profileService.changeFullName(fullName)),
        tap({
          next: (profileUpdated: Profile) => {
            this.changePersonalDataLoading.set(false)
            this.toastsService.show($localize`:@@personal_data_changed:Personal data changed`, ToastType.SUCCESS)
            this.#profile.set(profileUpdated)
          },
          error: () => this.changePersonalDataLoading.set(false)
        }),
        catchError((error: string) => {
          this.changePersonalError.set(error)
          return EMPTY
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe()
  }
}
