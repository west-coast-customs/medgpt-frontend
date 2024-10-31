import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { map } from 'rxjs';

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

  activeChatMessages: WritableSignal<ActiveChatMessage[]> = signal<ActiveChatMessage[]>([])

  lastActiveChatMessage: Signal<ActiveChatMessage | undefined> = computed(() => this.activeChatMessages().at(-1))

  waitingBotResponse: Signal<boolean> = computed(() => this.lastActiveChatMessage()?.author === MessageAuthors.USER)

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
    this.disconnect()

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
    }

    if (this.activeChatMessages()) {
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
