import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProfileService, Subscription } from '../../../entities/profile/api/profile.service';

export const subscriptionResolver: ResolveFn<Subscription> = () => inject(ProfileService).getSubscription();
