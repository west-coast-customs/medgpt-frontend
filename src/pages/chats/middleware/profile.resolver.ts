import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Profile, ProfileService } from '../../../entities/profile/api/profile.service';

export const profileResolver: ResolveFn<Profile> = () => inject(ProfileService).getProfile();
