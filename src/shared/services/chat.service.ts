import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chat {
  id: string;
  name: string;
  messages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private httpService: HttpClient) {}

  createChat(name: string): Observable<Chat> {
    return this.httpService.post<Chat>('/api/chat', {name})
  }
}
