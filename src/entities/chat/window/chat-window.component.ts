import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { ActiveChatMessage, ChatService, MessageAuthors } from '../../../shared/services/chat.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class ChatWindowComponent {
  MessageAuthors = MessageAuthors

  constructor(private chatService: ChatService) {}

  activeChatMessages: Signal<ActiveChatMessage[]> = this.chatService.activeChatMessages.asReadonly()

  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse
}
