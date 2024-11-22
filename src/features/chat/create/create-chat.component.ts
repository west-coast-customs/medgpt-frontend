import { ChangeDetectionStrategy, Component, DestroyRef, output, OutputEmitterRef } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-chat',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage, FormsModule],
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChatComponent {
  onChatCreated: OutputEmitterRef<string> = output<string>()

  constructor(private chatsService: ChatsService,
              private destroyRef: DestroyRef,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  onNewChatClick(): void {
    this.chatsService.create()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chat: Chat) => {
        void this.router.navigate([chat.id], { relativeTo: this.activatedRoute })
      })
  }
}
