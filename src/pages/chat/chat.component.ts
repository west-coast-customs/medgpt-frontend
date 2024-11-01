import { ChangeDetectionStrategy, Component, OnDestroy, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { DescriptionCardsComponent } from '../../shared/components/description-cards/description-cards.component';
import { ChatWindowComponent } from '../../entities/chat/window/chat-window.component';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    NgOptimizedImage,
    InputComponent,
    CardComponent,
    DescriptionCardsComponent,
    ChatWindowComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent implements OnDestroy {
  waitingBotResponse: Signal<boolean> = this.chatService.waitingBotResponse

  constructor(protected chatService: ChatService) {}

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }
}
