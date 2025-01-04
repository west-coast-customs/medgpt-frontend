import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {
  Profile,
  ProfileService,
  SUBSCRIPTION_STATUSES_MAP,
  SubscriptionPeriods
} from '../../../entities/profile/api/profile.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { of, switchMap, tap } from 'rxjs';
import { fadeOnEnter } from '../../../shared/utils/animations';

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [
    DatePipe,
    ButtonComponent,
    LoaderComponent
  ],
  animations: [fadeOnEnter(300)],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionCardComponent {
  SubscriptionPeriods: typeof SubscriptionPeriods = SubscriptionPeriods

  settings: WritableSignal<Profile> = signal(inject(ActivatedRoute).snapshot.data?.['settings'])
  subscriptionStatus: Signal<string | undefined> = computed(() => SUBSCRIPTION_STATUSES_MAP.get(this.settings().subscription.status))
  subscriptionPlanLoading: WritableSignal<boolean> = signal(false)

  constructor(private profileService: ProfileService, private destroyRef: DestroyRef) {}

  onSubscriptionPlanClick(period: SubscriptionPeriods): void {
    of(this.subscriptionPlanLoading.set(true))
      .pipe(
        switchMap(() => this.profileService.activateSubscription(period)),
        tap({
          next: () => this.subscriptionPlanLoading.set(false),
          error: () => this.subscriptionPlanLoading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((paymentUrl: string) => {
        window.location.href = paymentUrl
      })
  }
}
