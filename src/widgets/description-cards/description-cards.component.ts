import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Observable } from 'rxjs';
import { MediaService } from '../../shared/services/media.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-description-cards',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './description-cards.component.html',
  styleUrl: './description-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionCardsComponent {
  private mobileViewObs: Observable<boolean> = inject(MediaService).mobileViewObs

  mobileView: Signal<boolean | undefined> = toSignal(this.mobileViewObs)
}
