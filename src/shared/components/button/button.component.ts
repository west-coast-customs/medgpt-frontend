import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  disabled: InputSignal<boolean> = input<boolean>(false)
  customClass: InputSignal<string> = input<string>('')
}
