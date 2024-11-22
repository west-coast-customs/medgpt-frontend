import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaService } from '../../../shared/services/media.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { DescriptionCardsComponent } from '../../../shared/components/description-cards/description-cards.component';
import { fadeOnEnter } from '../../../shared/utils/animations';

const STEPS: number = 3

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent, ButtonComponent, NgTemplateOutlet, NgOptimizedImage, DescriptionCardsComponent
  ],
  animations: [fadeOnEnter(1000)]
})
export default class LandingComponent {
  STEPS: number[] = [...Array(STEPS).keys()]

  private mobileViewObs: Observable<boolean> = inject(MediaService).mobileViewObs

  mobileView: Signal<boolean | undefined> = toSignal(this.mobileViewObs)

  currentStep: WritableSignal<number> = signal(0)

  firstStep: Signal<boolean> = computed(() => this.currentStep() === 0)
  secondStep: Signal<boolean> = computed(() => this.currentStep() === 1)
  lastStep: Signal<boolean> = computed(() => this.currentStep() === STEPS - 1)

  constructor(private router: Router) {
    console.log(window.location)
    this.mobileViewObs
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.currentStep.set(0))
  }

  onButtonClick(): void {
    if (this.mobileView() && this.currentStep() < STEPS - 1) {
      this.currentStep.update((value: number) => value + 1)
    } else {
      void this.router.navigate(['chats'])
    }
  }
}
