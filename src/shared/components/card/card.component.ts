import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [NgOptimizedImage, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  customClass: InputSignal<string | undefined> = input<string>()
  image: InputSignal<string | undefined> = input<string>()
  title: InputSignal<string | undefined> = input<string>()
  titleClass: InputSignal<string | undefined> = input<string>()
  text: InputSignal<string | undefined> = input<string>()
}
