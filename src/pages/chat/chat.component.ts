import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ChatWindowComponent } from '../../entities/chat/window/chat-window.component';
import { ChatInputComponent } from '../../features/chat/input/chat-input.component';
import { ActivatedRoute, Data } from '@angular/router';
import { ChatService } from '../../shared/services/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Chat } from '../../shared/services/chats.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [ChatWindowComponent, ChatInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatComponent implements OnDestroy {
  constructor(private activatedRoute: ActivatedRoute,
              private chatService: ChatService) {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed())
      .subscribe((data: Data) => {
        this.chatService.initChat(data?.['chat'] as Chat)
      })
  }

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }
}
