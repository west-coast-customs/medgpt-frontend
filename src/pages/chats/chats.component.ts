import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private chatService: ChatsService,
              private destroyRef: DestroyRef) {
    this.loadChats()
  }

  onChatCreated(id: string): void {
    this.loadChats()
    void this.router.navigate([id], { relativeTo: this.activatedRoute })
  }

  private loadChats(): void {
    this.chatService.loadChats()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
