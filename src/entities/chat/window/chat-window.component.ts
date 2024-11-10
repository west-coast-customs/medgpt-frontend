import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { ChatService, MessageAuthors } from '../../../shared/services/chat.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ChatMessage } from '../../../shared/services/chats.service';
import { fadeInUpOnEnter, fadeOnEnter } from '../../../shared/animations';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUpOnEnter(250), fadeOnEnter(250)]
})
export class ChatWindowComponent {
  MessageAuthors = MessageAuthors

  constructor(private chatService: ChatService) {}

  activeChatMessages: Signal<ChatMessage[]> = this.chatService.activeChatMessages
  gotNewMessage: Signal<boolean> = this.chatService.gotNewMessage

  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse
}
