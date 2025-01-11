import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CreateChatComponent } from '../../../features/chat/create/create-chat.component';
import { ChatItemComponent } from '../../../widgets/chat/item/chat-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { fadeOnEnter, fadeOnTrigger, slideInRightOutLeft } from '../../../shared/utils/animations';
import { MediaService } from '../../../shared/services/media.service';
import { NgOptimizedImage } from '@angular/common';
import { ActiveChatService } from '../../../entities/chat/api/active-chat.service';
import { filter } from 'rxjs';
import { Chat, ChatsService } from '../../../entities/chat/api/chats.service';
import { HeaderComponent } from "../../../widgets/header/header.component";
import { UploadFileComponent } from '../../../features/chat/upload-file/upload-file.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-chats',
  standalone: true,
  templateUrl: './chats.layout.html',
  styleUrl: './chats.layout.scss',
  imports: [RouterOutlet, CreateChatComponent, ChatItemComponent, NgOptimizedImage, HeaderComponent, UploadFileComponent, ButtonComponent],
  animations: [fadeOnEnter(1000), fadeOnTrigger(1000), slideInRightOutLeft(250)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ActiveChatService],
})
export default class ChatsLayout {
  chats: WritableSignal<Chat[]> = inject(ChatsService).chats

  mobileView: Signal<boolean | undefined> = toSignal(inject(MediaService).mobileViewObs)

  navigationEnd = toSignal(
    inject(Router).events.pipe(filter(event => event instanceof NavigationEnd))
  )

  sidebarVisible: WritableSignal<boolean> = signal(false)

  toggleSidebarVisible(): void {
    this.sidebarVisible.update(value => !value)
  }
}
