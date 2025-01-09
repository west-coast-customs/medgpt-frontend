import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastsService } from '../../../shared/services/toasts.service';

export const chatsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router: Router = inject(Router)
  const toastService: ToastsService = inject(ToastsService)

  if (req.url.includes('/api/chat/')) {
    return next(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            toastService.show($localize`:@@login_required:Login required`)
            void router.navigateByUrl('/auth')
          }
          return next(req)
        })
      )
  }

  return next(req);
};
