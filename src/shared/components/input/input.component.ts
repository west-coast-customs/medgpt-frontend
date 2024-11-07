import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  InputSignal,
  model,
  ModelSignal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true }]
})
export class InputComponent implements ControlValueAccessor {
  placeholder: InputSignal<string> = input<string>('')
  customClass: InputSignal<string> = input<string>('')
  type = input<'text' | 'email' | 'password'>('text')

  disabled: InputSignal<boolean> = input<boolean>(false)
  disabledForm: WritableSignal<boolean> = signal(false)

  value: ModelSignal<string> = model('')
  onChange: ((value: string) => void) | undefined
  onTouched: (() => void) | undefined

  constructor() {
    effect(() => {
      if (!this.disabled() && !this.disabledForm()) {
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

  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement')

  focus(): void {
    setTimeout(() => this.inputElement()?.nativeElement.focus())
  }

  onInputFocus(): void {
    this.onTouched?.()
  }
}
