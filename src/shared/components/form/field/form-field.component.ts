import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  DestroyRef,
  input,
  InputSignal,
  Signal
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { PasswordMatchValidatorDirective } from '../../../validators/password-match-validator.directive';
import { FormInputComponent } from '../input/form-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormErrorComponent } from '../error/form-error.component';
import { fadeInOutHeight } from '../../../animations';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [FormsModule, NgClass, NgOptimizedImage, PasswordMatchValidatorDirective, FormErrorComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutHeight(250)],
})
export class FormFieldComponent implements AfterContentInit {
  customClass: InputSignal<string> = input<string>('')

  inputComponent: Signal<FormInputComponent> = contentChild.required<FormInputComponent>(FormInputComponent)
  inputModel: Signal<NgControl | undefined> = contentChild<NgControl>(NgControl)

  constructor(protected cdr: ChangeDetectorRef, private destroyRef: DestroyRef) {}

  ngAfterContentInit() {
    this.inputModel()?.valueChanges
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((() => this.cdr.markForCheck()))
  }

  focus(): void {
    this.inputComponent().focus()
  }
}
