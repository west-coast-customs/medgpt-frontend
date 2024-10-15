import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { MediaService } from './services/media.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';

const STEPS: number = 3

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CardComponent, NgOptimizedImage, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class AppComponent {
  STEPS: number[] = [...Array(STEPS).keys()]

  private mobileViewObs: Observable<boolean> = inject(MediaService).mobileViewObs

  mobileView: Signal<boolean | undefined> = toSignal(this.mobileViewObs)

  currentStep: WritableSignal<number> = signal(0)

  firstStep: Signal<boolean> = computed(() => this.currentStep() === 0)
  secondStep: Signal<boolean> = computed(() => this.currentStep() === 1)
  lastStep: Signal<boolean> = computed(() => this.currentStep() === STEPS - 1)

  constructor() {
    this.mobileViewObs
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.currentStep.set(0))
  }

  onButtonClick(): void {
    if (this.mobileView() && this.currentStep() < STEPS - 1) {
      this.currentStep.update((value: number) => value + 1)
    }
  }
}
