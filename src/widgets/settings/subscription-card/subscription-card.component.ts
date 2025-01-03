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

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [
    DatePipe,
    ButtonComponent
  ],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionCardComponent {
  SubscriptionPeriods: typeof SubscriptionPeriods = SubscriptionPeriods

  settings: WritableSignal<Profile> = signal(inject(ActivatedRoute).snapshot.data?.['settings'])
  subscriptionStatus: Signal<string | undefined> = computed(() => SUBSCRIPTION_STATUSES_MAP.get(this.settings().subscription.status))

  constructor(private profileService: ProfileService, private destroyRef: DestroyRef) {}

  onSubscriptionPlanClick(period: SubscriptionPeriods) {
    this.profileService.activateSubscription(period)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
