import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Input,
  InputSignal,
  model,
  ModelSignal, Signal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  disabled: InputSignal<boolean> = input<boolean>(false)
  placeholder: InputSignal<string | undefined> = input<string>()

  inputText: ModelSignal<string> = model<string>('')
  inputTextEmpty: Signal<boolean> = computed(() => !this.inputText()?.trim().length)
}
