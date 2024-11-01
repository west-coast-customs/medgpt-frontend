import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Chat, ChatsService } from './chats.service';

export enum MessageAuthors {
  USER,
  BOT
}

export interface ActiveChatMessage {
  author: MessageAuthors,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  #activeChatWebsocket$: WebSocketSubject<string> | undefined;

  activeChatId: WritableSignal<string> = signal<string>('')
  activeChatMessages: WritableSignal<ActiveChatMessage[]> = signal<ActiveChatMessage[]>([])
  lastActiveChatMessage: Signal<ActiveChatMessage | undefined> = computed(() => this.activeChatMessages().at(-1))
  waitingBotResponse: Signal<boolean> = computed(() => this.lastActiveChatMessage()?.author === MessageAuthors.USER)

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
            const activeChatMessages: ActiveChatMessage[] = chat.messages.map(({ content }, index) => {
              return { content, author: index % 2 !== 0 ? MessageAuthors.BOT : MessageAuthors.USER }
            })
            this.activeChatMessages.set(activeChatMessages)
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
      this.activeChatMessages.set([])
    }
  }

  send(message: string): void {
    if (!this.#activeChatWebsocket$) return

    this.activeChatMessages.update((messages: ActiveChatMessage[]) => [
      ...messages, { content: message, author: MessageAuthors.USER }
    ])

    this.#activeChatWebsocket$.next({ content: 'so what?' } as unknown as string)
  }

  initWebsocketMessageHandler(): void {
    if (!this.#activeChatWebsocket$) return

    this.#activeChatWebsocket$
      .pipe(map((message: string) => JSON.parse(message)))
      .subscribe((message: ActiveChatMessage) => {
        this.activeChatMessages.update((messages: ActiveChatMessage[]) => [
          ...messages, { content: message.content, author: MessageAuthors.BOT }
        ])
      })
  }
}
