import {
  ChangeDetectionStrategy,
  Component, computed,
  DestroyRef, effect,
  ElementRef, input, InputSignal,
  signal,
  Signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';
import { NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveChatService } from '../../../entities/chat/api/active-chat.service';
import { fadeOnEnter } from '../../../shared/utils/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-chat-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ButtonComponent,
    ClickOutsideDirective
  ],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeOnEnter(250)]
})
export class ChatItemComponent {
  activeChatId: Signal<string> = this.activeChatService.activeChatId

  chat: InputSignal<Chat> = input.required<Chat>()
  chatActive: Signal<boolean> = computed(() => this.chat().id === this.activeChatId())

  editingChatName: WritableSignal<boolean> = signal(false)

  inputElement: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('input')

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private chatsService: ChatsService,
              private activeChatService: ActiveChatService,
              private destroyRef: DestroyRef,
              private elementRef: ElementRef) {
    effect(() => {
      if (this.chatActive()) {
        this.elementRef.nativeElement.scrollIntoView()
      }
    });
  }

  onChatClick(id: string): void {
    void this.router.navigate([id], { relativeTo: this.activatedRoute })
  }

  onChatDeleteClick(id: string): void {
    this.chatsService.delete(id)
      .pipe(
        switchMap(() => this.chatsService.loadAll()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((chats: Chat[]) => {
        const lastChat: Chat | undefined = chats.at(-1)
        void this.router.navigate(lastChat ? ['chats', lastChat.id] : ['chats'])
      })
  }

  onChatEdit(chat: Chat, newName: string): void {
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
      this.inputElement()?.nativeElement.focus();
    }, 100)
  }
}
