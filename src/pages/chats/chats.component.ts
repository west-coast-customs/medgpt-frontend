import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChatComponent } from '../../features/chat/create/create-chat.component';
import { ChatNavigationComponent } from '../../entities/chat/navigation/chat-navigation.component';
import { ChatListComponent } from '../../entities/chat/list/chat-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { fadeOnEnter, slideInOut } from '../../shared/animations';
import { MediaService } from '../../shared/services/media.service';
import { NgOptimizedImage } from '@angular/common';
import { ChatService } from '../../shared/services/chat.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  imports: [RouterOutlet, CreateChatComponent, ChatNavigationComponent, ChatListComponent, NgOptimizedImage],
  animations: [fadeOnEnter(1000), slideInOut(250)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService],
})
export default class ChatsComponent {
  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)

  sidebarVisible: WritableSignal<boolean> = signal(false)

  toggleSidebarVisible(): void {
    this.sidebarVisible.update(value => !value)
  }
}
