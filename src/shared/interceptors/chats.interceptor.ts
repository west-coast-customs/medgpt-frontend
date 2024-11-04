import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const chatsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router)

  if (req.url.includes('/api/chat/')) {
    return next(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            void router.navigateByUrl('/')
          }
          return EMPTY
        })
      )
  }

  return next(req);
};
