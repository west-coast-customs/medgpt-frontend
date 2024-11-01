import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { Chat, ChatsService } from '../../../shared/services/chats.service';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListComponent {
  chats: Signal<Chat[] | undefined> = this.chatsService.chats
  activeChatId: Signal<string> = this.chatService.activeChatId

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private chatsService: ChatsService,
              private chatService: ChatService) {}

  onChatClick(id: string): void {
    void this.router.navigate([id], { relativeTo: this.activatedRoute })
  }
}
