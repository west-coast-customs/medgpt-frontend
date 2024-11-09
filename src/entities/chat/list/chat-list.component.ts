import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  signal,
  Signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { Chat, ChatsService } from '../../../shared/services/chats.service';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../shared/services/chat.service';
import { fadeOnEnter } from '../../../shared/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    ClickOutsideDirective
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOnEnter(250)]
})
export class ChatListComponent {
  chats: Signal<Chat[] | undefined> = this.chatsService.chats
  activeChatId: Signal<string> = this.chatService.activeChatId
  editingChatName: WritableSignal<boolean> = signal(false)

  input: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('input')

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private chatsService: ChatsService,
              private chatService: ChatService,
              private destroyRef: DestroyRef) {
    this.chatsService.loadAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  onChatClick(id: string): void {
    void this.router.navigate([id], { relativeTo: this.activatedRoute })
  }

  onChatDeleteClick(id: string) {
    this.chatsService.delete(id)
      .pipe(
        switchMap(() => this.chatsService.loadAll()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((chats: Chat[]) => {
        const lastChat = chats.at(-1)
        void this.router.navigate(lastChat ? ['chats', lastChat.id] : ['chats'], {})
      })
  }

  onChatEdit(chat: Chat, newName: string) {
    if (!newName || chat.name === newName) {
      this.editingChatName.set(false)
      return
    }

    this.chatsService.update(chat.id, newName)
      .pipe(
        switchMap(() => this.chatsService.loadAll()),
        tap(() => this.editingChatName.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  onChatEditClick(): void {
    this.editingChatName.set(true);

    setTimeout(() => {
      this.input()?.nativeElement.focus();
    })
  }
}
