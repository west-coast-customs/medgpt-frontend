import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { MessageAuthors } from './chat.service';

export interface Chat {
  id: string;
  name: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  role: MessageAuthors
  content: string;
  references: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  chats: WritableSignal<Chat[]> = signal<Chat[]>([])

  constructor(private httpService: HttpClient) {}

  loadAll(): Observable<Chat[]> {
    return this.httpService.request<Chat[]>('GET', '/api/chat/', { body: { email: 'test@test.org' } })
      .pipe(tap((chats: Chat[]) => this.chats.set(chats)))
  }

  create(name: string): Observable<Chat> {
    return this.httpService.post<Chat>('/api/chat/', { name })
  }

  get(id: string): Observable<Chat | null> {
    return this.httpService.get<Chat | null>(`/api/chat/${id}`)
      .pipe(catchError(() => of(null)))
  }

  delete(id: string): Observable<void> {
    return this.httpService.delete<void>(`/api/chat/${id}`)
      .pipe(
        switchMap(() => this.loadAll()),
        map(() => void null)
      )
  }
}
