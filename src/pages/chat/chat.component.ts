import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputComponent } from '../../shared/components/input/input.component';
import { CardComponent } from "../../shared/components/card/card.component";
import { DescriptionCardsComponent } from '../../widgets/description-cards/description-cards.component';
import { ChatWindowComponent } from '../../entities/chat/window/chat-window.component';
import { ChatService } from '../../shared/services/chat.service';
import { ChatInputComponent } from '../../features/chat/input/chat-input.component';

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
    ChatWindowComponent,
    ChatInputComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent implements OnDestroy {
  constructor(private chatService: ChatService) {
  }

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }
}
