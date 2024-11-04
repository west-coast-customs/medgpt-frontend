import { ChangeDetectionStrategy, Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  disabled: InputSignal<boolean> = input<boolean>(false)
  placeholder: InputSignal<string> = input<string>('')
  customClass: InputSignal<string> = input<string>('')

  inputText: ModelSignal<string> = model<string>('')
}
