import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChatComponent } from '../../features/chat/create/create-chat.component';
import { NavigationComponent } from '../../features/navigation/navigation.component';
import { ChatListComponent } from '../../entities/chat/list/chat-list.component';
import { ChatsService } from '../../shared/services/chats.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats',
  standalone: true,
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  imports: [RouterOutlet, CreateChatComponent, NavigationComponent, ChatListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatsComponent {
  constructor(private chatService: ChatsService,
              private destroyRef: DestroyRef) {
    this.chatService.loadAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
