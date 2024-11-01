import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { ChatService, MessageAuthors } from '../../../shared/services/chat.service';
import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ChatMessage } from '../../../shared/services/chats.service';

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
    trigger('fadeInUpOnEnter', [
      transition(':enter', [
        style({ visibility: 'hidden' }),
        animation([
          animate('250ms',
            keyframes([
              style({
                visibility: 'visible',
                opacity: 0,
                transform: 'translate3d(0, 100%, 0)',
                easing: 'ease',
                offset: 0
              }),
              style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 })
            ])
          )
        ])
      ])
    ])
  ]
})
export class ChatWindowComponent {
  MessageAuthors = MessageAuthors

  constructor(private chatService: ChatService) {}

  activeChatMessages: Signal<ChatMessage[]> = this.chatService.activeChatMessages
  gotNewMessage: Signal<boolean> = this.chatService.gotNewMessage

  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse
}
