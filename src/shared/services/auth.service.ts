import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) {}

  signup(credentials: Credentials): Observable<void> {
    return this.httpService.post<void>('/api/native-auth/register/', credentials)
  }

  login(credentials: Credentials): Observable<void> {
    return this.httpService.post<void>('/api/native-auth/login/', credentials)
  }

  logout(): Observable<void> {
    return this.httpService.post<void>('/api/common-auth/logout/', null)
  }
}
