import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { fadeInOutHeight } from '../../../utils/animations';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOutHeight(250)],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: FormInputComponent, multi: true }],
})
export class FormInputComponent implements ControlValueAccessor {
  placeholder: InputSignal<string> = input<string>('')
  autocomplete: InputSignal<string> = input<string>('')
  type: InputSignal<"text" | "email" | "password"> = input<'text' | 'email' | 'password'>('text')

  showPassword: WritableSignal<boolean> = signal(false)

  disabled: InputSignal<boolean> = input<boolean>(false)
  disabledForm: WritableSignal<boolean> = signal(false)

  inputDisabled: Signal<boolean> = computed(() => this.disabled() || this.disabledForm())

  value: ModelSignal<string> = model('')
  onChange: ((value: string) => void) | undefined
  onTouched: (() => void) | undefined

  constructor() {
    effect(() => {
      if (!this.inputDisabled()) {
        this.onChange?.(this.value())
      }
    });
  }

  writeValue(newValue: string): void {
    this.value.set(newValue)
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabledForm.set(isDisabled)
  }

  inputElement: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('inputElement')

  focus(): void {
    this.inputElement()?.nativeElement.focus()
  }

  toggleShowPassword(event: MouseEvent): void {
    event.stopPropagation();
    this.showPassword.update((prev: boolean) => !prev)
  }
}
