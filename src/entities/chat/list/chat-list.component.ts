import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Chat, ChatsService } from '../../../shared/services/chats.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  chats: Signal<Chat[] | undefined> = inject(ChatsService).chats

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}

  onChatClick(id: string): void {
    void this.router.navigate([id], { relativeTo: this.activatedRoute })
  }
}
