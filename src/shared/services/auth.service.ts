import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, Observable, ObservedValueOf, OperatorFunction, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface Credentials {
  email: string;
  password: string;
}

export enum AuthErrors {
  USER_EXISTS = 'User with given email already exists',
  INVALID_CREDENTIALS = 'invalid username or password',
  NO_SUCH_USER = 'No such user in DB',
  UNKNOWN_ERROR = 'Unknown error',
}

interface AuthError {
  detail: AuthErrors;
}

const AUTH_ERRORS_MAP = new Map<AuthErrors, string>([
  [AuthErrors.USER_EXISTS, $localize`:@@user_exists:User with given email already exists`],
  [AuthErrors.INVALID_CREDENTIALS, $localize`:@@invalid_credentials:Invalid username or password`],
  [AuthErrors.NO_SUCH_USER, $localize`:@@invalid_credentials:Invalid username or password`],
  [AuthErrors.UNKNOWN_ERROR, $localize`:@@unknown_error:Unknown error`],
])

const authCatchError: () => OperatorFunction<unknown, ObservedValueOf<Observable<never>> | unknown> = () =>
  catchError((error: HttpErrorResponse): Observable<string> => {
    const errorDetail: AuthErrors = (error.error as AuthError).detail
    const errorMessage: AuthErrors = typeof errorDetail === 'string' ? errorDetail : AuthErrors.UNKNOWN_ERROR
    return throwError(() => AUTH_ERRORS_MAP.get(errorMessage) as string)
  })

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: WritableSignal<boolean> = signal(!!localStorage.getItem('loggedIn'))

  constructor(private httpService: HttpClient) {}

  signup(credentials: Credentials): Observable<void | unknown> {
    return this.httpService.post<void>('/api/native-auth/register/', credentials)
      .pipe(authCatchError())
  }

  login(credentials: Credentials): Observable<void | unknown> {
    return this.httpService.post<void>('/api/native-auth/login/', credentials)
      .pipe(
        tap(() => {
          localStorage.setItem('loggedIn', String(true))
          this.loggedIn.set(true)
        }),
        authCatchError()
      )
  }

  logout(): Observable<void> {
    return this.httpService.post<void>('/api/common-auth/logout/', null)
      .pipe(
        tap(() => {
          localStorage.removeItem('loggedIn')
          this.loggedIn.set(false)
        })
      )
  }
}
