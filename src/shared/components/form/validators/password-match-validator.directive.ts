import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class PasswordMatchValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password: string = control.parent?.get('password')?.value
    const passwordConfirm: string = control.value
    return password === passwordConfirm ? null : { passwordMatch: true }
  }
}
