import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { ActiveChatService, MessageAuthors } from '../../../entities/chat/api/active-chat.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ChatMessage } from '../../../entities/chat/api/chats.service';
import { fadeInUpOnEnter, fadeOnEnter } from '../../../shared/utils/animations';
import { ChatWindowMessagePipe } from './chat-window-message.pipe';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [LoaderComponent, ChatWindowMessagePipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnter(250), fadeOnEnter(250)]
})
export class ChatWindowComponent {
  MessageAuthors: typeof MessageAuthors = MessageAuthors

  constructor(private activeChatService: ActiveChatService) {}

  activeChatMessages: Signal<ChatMessage[]> = this.activeChatService.activeChatMessages
  gotNewMessage: Signal<boolean> = this.activeChatService.gotNewMessage

  waitingBotResponse: Signal<boolean> = this.activeChatService.waitingBotResponse
}
