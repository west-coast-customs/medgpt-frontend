import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  image: InputSignal<string | undefined> = input<string>()
  title: InputSignal<string> = input.required<string>()
  text: InputSignal<string> = input.required<string>()
}
