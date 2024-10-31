import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Chat {
  id: string;
  name: string;
  messages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  chats: WritableSignal<Chat[]> = signal<Chat[]>([])

  constructor(private httpService: HttpClient) {}

  loadChats(): Observable<Chat[]> {
    return this.httpService.request<Chat[]>('GET', '/api/chat/', { body: { email: 'test@test.org' } })
      .pipe(tap((chats: Chat[]) => this.chats.set(chats)))
  }

  createChat(name: string): Observable<Chat> {
    return this.httpService.post<Chat>('/api/chat/', { name })
  }
}
