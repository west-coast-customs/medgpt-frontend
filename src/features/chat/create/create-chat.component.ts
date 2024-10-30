import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  model,
  ModelSignal,
  signal,
  WritableSignal
} from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { Chat, ChatService } from '../../../shared/services/chat.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-chat',
  standalone: true,
  imports: [
    ButtonComponent,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChatComponent {
  showChatNameInput: WritableSignal<boolean> = signal(false)

  chatName: ModelSignal<string> = model('')

  constructor(private chatService: ChatService,
              private destroyRef: DestroyRef) {
  }

  onNewChatClick(): void {
    this.showChatNameInput.set(true)
  }

  onCreateChatClick(): void {
    this.showChatNameInput.set(false)

    this.chatService.createChat(this.chatName())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chat: Chat) => {
        console.log(chat)
      })
  }
}
