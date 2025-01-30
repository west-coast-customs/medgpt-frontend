import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastsService, ToastType } from '../../../shared/services/toasts.service';

export const chatsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router: Router = inject(Router)
  const toastsService: ToastsService = inject(ToastsService)
  const successPayment: boolean = route.queryParamMap.get('success') === 'true';
  if (successPayment) {
    toastsService.show($localize`:@@subscription_activated:Subscription activated`, ToastType.SUCCESS)
    return router.navigate(['chats'], { queryParams: { 'success': null, }, queryParamsHandling: 'merge' })
  }
  return true;
};
