import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Chat, ChatMessage, ChatsService } from './chats.service';

export enum MessageAuthors {
  USER = 'user',
  AGENT = 'agent'
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  #activeChatWebsocket$: WebSocketSubject<string> | undefined;

  activeChatId: WritableSignal<string> = signal<string>('')

  activeChatOldMessages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([])
  activeChatNewMessages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([])
  activeChatMessages: Signal<ChatMessage[]> = computed<ChatMessage[]>(() => [...this.activeChatOldMessages(), ...this.activeChatNewMessages()])

  gotNewMessage: Signal<boolean> = computed<boolean>(() => !!this.activeChatNewMessages().length)
  waitingBotResponse: Signal<boolean> = computed(() => this.activeChatMessages().at(-1)?.role === MessageAuthors.USER)

  constructor(private router: Router,
              private chatsService: ChatsService) {
    this.router.events
      .pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        map(({ urlAfterRedirects }) => urlAfterRedirects.split('/').pop()),
        filter(Boolean),
        switchMap((chatId: string) => this.chatsService.getChat(chatId)),
        distinctUntilChanged()
      )
      .subscribe((chat: Chat | null) => {
        this.disconnect()

        if (chat) {
          this.connect(chat.id)

          if (chat.messages) {
            this.activeChatOldMessages.set(chat.messages)
          }
        }
      })
  }

  #config: WebSocketSubjectConfig<string> = {
    url: `${ environment.wsApiUrl }/chat/ws`,
  }

  #closeObserver = (id: string) => ({
    next: () => {
      console.log(`WebSocket ${ id } DISCONNECTED!`);
    }
  })

  #openObserver = (id: string) => ({
    next: () => {
      console.log(`WebSocket ${ id } CONNECTED!`);
    }
  })

  connect(id: string): void {
    this.activeChatId.set(id)

    const config: WebSocketSubjectConfig<string> = {
      ...this.#config,
      url: `${ this.#config.url }/${ id }`,
      closeObserver: this.#closeObserver(id),
      openObserver: this.#openObserver(id)
    }

    this.#activeChatWebsocket$ = new WebSocketSubject(config);

    this.initWebsocketMessageHandler()
  }

  disconnect(): void {
    if (this.#activeChatWebsocket$) {
      this.#activeChatWebsocket$.unsubscribe()
      this.#activeChatWebsocket$.complete()

      this.activeChatId.set('')
      this.activeChatOldMessages.set([])
      this.activeChatNewMessages.set([])
    }
  }

  send(message: string): void {
    if (!this.#activeChatWebsocket$) return

    this.#activeChatWebsocket$.next({ content: message } as unknown as string)
  }

  initWebsocketMessageHandler(): void {
    if (!this.#activeChatWebsocket$) return

    this.#activeChatWebsocket$
      .pipe(map((message: string) => JSON.parse(message)))
      .subscribe((message: ChatMessage) => {
        this.activeChatNewMessages.update((messages: ChatMessage[]) => [...messages, message])
      })
  }
}
