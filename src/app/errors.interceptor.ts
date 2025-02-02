import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastsService } from '../shared/services/toasts.service';
import { AuthService } from '../shared/services/auth.service';

export const errorsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router: Router = inject(Router)
  const toastService: ToastsService = inject(ToastsService)
  const authService: AuthService = inject(AuthService)

  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (req.url.includes('/api/native-auth/password')) {
          return throwError(() => error)
        }

        if (error.status === 401) {
          if (req.url.includes('/api/chat')) {
            toastService.show(
              authService.loggedIn()
                ? `${ $localize`:@@session_expired:Session expired` }. ${ $localize`:@@login_required:Login required` }`
                : $localize`:@@login_required:Login required`
            )
            authService.updateIsLoggedIn(false)
            void router.navigateByUrl('/auth')
          }

          return throwError(() => error)
        }

        toastService.show($localize`:@@request_error:Some error has occurred during the request, please try again later.`,)
        return throwError(() => error)
      })
    )
};
