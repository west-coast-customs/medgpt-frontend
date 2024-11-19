import { computed, DestroyRef, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Chat, ChatMessage, ChatsService } from './chats.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export enum MessageAuthors {
  USER = 'user',
  AGENT = 'agent'
}

@Injectable()
export class ChatService {
  #activeChatWebsocket$: WebSocketSubject<string> | undefined;

  activeChatId: WritableSignal<string> = signal<string>('')

  activeChatOldMessages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([])
  activeChatNewMessages: WritableSignal<ChatMessage[]> = signal<ChatMessage[]>([])
  activeChatMessages: Signal<ChatMessage[]> = computed<ChatMessage[]>(() => [...this.activeChatOldMessages(), ...this.activeChatNewMessages()])

  gotNewMessage: Signal<boolean> = computed<boolean>(() => !!this.activeChatNewMessages().length)
  waitingBotResponse: Signal<boolean> = computed(() => this.activeChatMessages().at(-1)?.role === MessageAuthors.USER)

  constructor(private router: Router,
              private chatsService: ChatsService,
              private destroyRef: DestroyRef) {
    this.router.events
      .pipe(
        filter((event: unknown) => event instanceof NavigationEnd),
        startWith({ urlAfterRedirects: window.location.href }),
        map(({ urlAfterRedirects }) => urlAfterRedirects.split('/').pop() as string),
        tap(() => this.disconnect()),
        filter((chatId: string) => !!chatId && chatId !== 'chats'),
        switchMap((chatId: string) => this.chatsService.get(chatId)),
        takeUntilDestroyed()
      )
      .subscribe((chat: Chat | null) => {
        if (chat) {
          this.connect(chat.id)

          if (chat.messages) {
            this.activeChatOldMessages.set(chat.messages)
          }
        } else {
          void this.router.navigate(['chats'])
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
      .pipe(
        map((message: string) => JSON.parse(message)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((message: ChatMessage) => {
        this.activeChatNewMessages.update((messages: ChatMessage[]) => [...messages, message])
      })
  }
}
