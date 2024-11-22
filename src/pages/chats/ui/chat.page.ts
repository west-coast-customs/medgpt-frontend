import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  Signal,
  untracked
} from '@angular/core';
import { ChatWindowComponent } from '../../../widgets/chat/window/chat-window.component';
import { ChatInputComponent } from '../../../features/chat/input/chat-input.component';
import { ActivatedRoute, Data } from '@angular/router';
import { ActiveChatService } from '../../../entities/chat/api/active-chat.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Chat } from '../../../entities/chat/api/chats.service';
import { DescriptionCardsComponent } from '../../../shared/components/description-cards/description-cards.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.page.html',
  styleUrl: './chat.page.scss',
  imports: [ChatWindowComponent, ChatInputComponent, DescriptionCardsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatPage implements OnDestroy {
  #chat: Signal<Chat | null> = toSignal(
    inject(ActivatedRoute).data.pipe(map((data: Data) => data?.['chat']))
  )

  placeholderPage: Signal<boolean> = computed(() => !this.#chat())

  constructor(private activeChatService: ActiveChatService) {
    effect(() => {
      const chat: Chat | null = this.#chat()
      if (chat) {
        untracked(() => this.activeChatService.initChat(chat))
      }
    });
  }

  ngOnDestroy(): void {
    this.activeChatService.disconnect()
  }
}
