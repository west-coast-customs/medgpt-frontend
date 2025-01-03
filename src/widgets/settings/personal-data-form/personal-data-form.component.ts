import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import { Profile, ProfileFullName, ProfileService } from '../../../entities/profile/api/profile.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsService, ToastType } from '../../../shared/services/toasts.service';
import { FormsModule, NgForm } from '@angular/forms';
import { catchError, EMPTY, of, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormErrorComponent } from '../../../shared/components/form/error/form-error.component';
import { FormFieldComponent } from '../../../shared/components/form/field/form-field.component';
import { FormInputComponent } from '../../../shared/components/form/input/form-input.component';
import { FormValueChangeDirective } from '../../../shared/directives/form-value-change.directive';

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
    FormsModule
  ],
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent {
  #settings: WritableSignal<Profile> = signal(inject(ActivatedRoute).snapshot.data?.['settings'])

  changePersonalDataLoading: WritableSignal<boolean> = signal(false)
  changePersonalError: WritableSignal<string> = signal('')

  noChanges: Signal<boolean> = computed(() => {
    const { last_name, first_name, second_name } = this.#settings()
    const { lastName, firstName, secondName } = this.formValue()

    return last_name === lastName && first_name === firstName && second_name === secondName
  })

  formValue: WritableSignal<Partial<PersonalSettingsFormValue>> = signal({
    lastName: this.#settings().last_name,
    firstName: this.#settings().first_name,
    secondName: this.#settings().second_name,
    email: this.#settings().email
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
            this.#settings.set(profileUpdated)
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
