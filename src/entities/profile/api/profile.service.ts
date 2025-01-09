import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Language, LanguageService } from '../../../shared/services/language.service';

export interface ProfileFullName {
  first_name: string
  last_name: string
  second_name: string
}

export interface Profile extends ProfileFullName {
  id: string
  email: string
  created_at: string
  is_verified: boolean
  subscription: Subscription
}

export interface Subscription {
  id: string,
  status: SubscriptionStatuses,
  expiration_date: string,
  provider: string
}

export enum SubscriptionStatuses {
  TRIAL = 'Trial',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum SubscriptionPeriods {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export const SUBSCRIPTION_STATUSES_MAP = new Map<SubscriptionStatuses, string>([
  [SubscriptionStatuses.TRIAL, $localize`:@@trial_subscription:Trial subscription`],
  [SubscriptionStatuses.ACTIVE, $localize`:@@active_subscription:Active subscription`],
  [SubscriptionStatuses.INACTIVE, $localize`:@@inactive_subscription:Inactive subscription`],
])

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: WritableSignal<Profile | null> = signal<Profile | null>(null)

  constructor(private httpService: HttpClient, private languageService: LanguageService) {
  }

  loadProfile(): Observable<Profile> {
    return this.httpService.get<Profile>('/api/users/profile')
      .pipe(tap((profile: Profile) => this.profile.set(profile)))
  }

  changeFullName(fullName: ProfileFullName): Observable<Profile> {
    return this.httpService.put<Profile>('/api/users/profile/fullname', fullName)
      .pipe(tap((profileUpdated: Profile) => this.profile.update((profile) => ({ ...profile!, ...profileUpdated }))))
  }

  activateSubscription(period: SubscriptionPeriods): Observable<string> {
    const countryCode: Language = this.languageService.currentLanguage()
    return this.httpService.post<string>('/api/users/subscription', { period, country_code: countryCode })
  }
}
