import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  customClass: InputSignal<string> = input('')
}
