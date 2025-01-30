import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastsService } from '../../../shared/services/toasts.service';
import { AuthService } from '../../../shared/services/auth.service';

export const chatsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router: Router = inject(Router)
  const toastService: ToastsService = inject(ToastsService)
  const authService: AuthService = inject(AuthService)

  if (req.url.includes('/api/chat/')) {
    return next(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            toastService.show(
              authService.loggedIn()
                ? `${ $localize`:@@session_expired:Session expired` }. ${ $localize`:@@login_required:Login required` }`
                : $localize`:@@login_required:Login required`
            )
            authService.updateIsLoggedIn(false)
            void router.navigateByUrl('/auth')
          }
          return next(req)
        })
      )
  }

  return next(req);
};
