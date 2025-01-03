import { Directive, inject, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormValueChangeDirective<T> {
  #ngForm: NgForm = inject(NgForm, { self: true })

  @Output() public formValueChange: Observable<T> = this.#ngForm.form.valueChanges
}
