import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  output,
  OutputEmitterRef,
  Signal
} from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { NgOptimizedImage } from '@angular/common';
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService, SubscriptionStatuses } from '../../../entities/profile/api/profile.service';

@Component({
  selector: 'app-create-chat',
  standalone: true,
  imports: [ButtonComponent, NgOptimizedImage, FormsModule],
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChatComponent {
  viableSubscription: Signal<boolean> = computed(() =>
    [SubscriptionStatuses.ACTIVE, SubscriptionStatuses.TRIAL].includes(this.profileService.subscription()!.status))

  onChatCreated: OutputEmitterRef<string> = output<string>()

  constructor(private chatsService: ChatsService,
              private destroyRef: DestroyRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) {}

  onNewChatClick(): void {
    this.chatsService.create()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((chat: Chat) => {
        void this.router.navigate([chat.id], { relativeTo: this.activatedRoute })
      })
  }
}
