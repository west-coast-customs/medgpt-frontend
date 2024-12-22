import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-pricing-cards',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './pricing-cards.component.html',
  styleUrl: './pricing-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingCardsComponent {

}
