import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChatComponent } from '../../features/chat/create/create-chat.component';
import { ChatNavigationComponent } from '../../entities/chat/navigation/chat-navigation.component';
import { ChatListComponent } from '../../entities/chat/list/chat-list.component';
import { ChatsService } from '../../shared/services/chats.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  imports: [RouterOutlet, CreateChatComponent, ChatNavigationComponent, ChatListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ChatsComponent {

}
